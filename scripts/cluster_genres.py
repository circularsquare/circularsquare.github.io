"""Cluster liked-song artists by their Last.fm tags and lay them out in 2D.

    python scripts/cluster_genres.py [preview.png]

Reads music/liked_songs.json, music/artist_tags.json and music/cluster_names.json,
writes music/genre_map.json for the page at /music/.
Each artist becomes a tf-idf vector of its tags; t-SNE places them so that
artists with similar tags sit near each other, then nearby artists are grouped.
"""

import json
import math
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

import numpy as np
from scipy import sparse
from sklearn.cluster import AgglomerativeClustering
from sklearn.decomposition import TruncatedSVD
from sklearn.manifold import TSNE
from sklearn.preprocessing import normalize

MUSIC = Path(__file__).resolve().parent.parent / "music"
N_CLUSTERS = 24
MIN_ARTISTS_PER_TAG = 3
MIX_FROM = 0.6

# Tags that say nothing about the music.
DROP = {
    "all", "my top songs", "spotify", "seen live", "favorites", "favorite", "favourite",
    "favourites", "love", "beautiful", "awesome", "female vocalists", "female vocalist",
    "male vocalists", "male vocalist", "albums i own", "check out", "under 2000 listeners",
    "sofar sounds",
}

# Spelling variants, keyed by the tag with spaces, hyphens and underscores removed.
ALIASES = {
    "jpop": "j-pop", "jrock": "j-rock", "kpop": "k-pop", "kindie": "k-indie",
    "hiphop": "hip-hop", "triphop": "trip-hop", "postrock": "post-rock", "lofi": "lo-fi",
    "dnb": "drum and bass", "drumnbass": "drum and bass", "drum&bass": "drum and bass",
    "rnb": "r&b", "r&b": "r&b", "rb": "r&b",
    "japan": "japanese", "usa": "american", "america": "american", "us": "american", "unitedstates": "american",
    "uk": "british", "unitedkingdom": "british", "england": "british", "english": "british",
    "canada": "canadian", "australia": "australian", "france": "french", "germany": "german",
    "china": "chinese", "korea": "korean", "southkorea": "korean", "sweden": "swedish",
}


def squash(tag):
    return re.sub(r"[\s\-_]", "", tag)


def main():
    songs = json.loads((MUSIC / "liked_songs.json").read_text(encoding="utf-8"))
    raw = json.loads((MUSIC / "artist_tags.json").read_text(encoding="utf-8"))

    # Most common spelling of each squashed tag becomes its display form.
    spellings = defaultdict(Counter)
    for info in raw.values():
        for tag, _ in info["tags"]:
            spellings[squash(tag)][tag] += 1
    canonical = {k: ALIASES.get(k, c.most_common(1)[0][0]) for k, c in spellings.items()}

    artist_tags = {}
    for artist_id, info in raw.items():
        merged = defaultdict(float)
        for tag, weight in info["tags"]:
            # Underscored tags are people's library-tool labels ("funk_add_to_lidarr_batch_1").
            if tag in DROP or "_" in tag:
                continue
            name = canonical[squash(tag)]
            merged[name] = max(merged[name], weight / 100)
        if merged:
            artist_tags[artist_id] = merged

    df = Counter(t for tags in artist_tags.values() for t in tags)
    vocab = sorted(t for t, n in df.items() if n >= MIN_ARTISTS_PER_TAG)
    tag_index = {t: i for i, t in enumerate(vocab)}
    artist_tags = {a: {t: w for t, w in tags.items() if t in tag_index} for a, tags in artist_tags.items()}
    artist_tags = {a: tags for a, tags in artist_tags.items() if tags}
    ids = sorted(artist_tags)

    n = len(ids)
    idf = np.array([math.log(n / df[t]) + 1 for t in vocab])
    rows, cols, vals = [], [], []
    for r, a in enumerate(ids):
        for t, w in artist_tags[a].items():
            rows.append(r)
            cols.append(tag_index[t])
            vals.append(w)
    tfidf = normalize(sparse.csr_matrix((vals, (rows, cols)), shape=(n, len(vocab))).multiply(idf).tocsr())

    reduced = normalize(TruncatedSVD(n_components=60, random_state=0).fit_transform(tfidf))
    xy = TSNE(n_components=2, perplexity=40, init="pca", metric="cosine", random_state=0).fit_transform(reduced)
    xy = (xy - xy.min(axis=0)) / (xy.max(axis=0) - xy.min(axis=0))
    # Clustering in tag space leaves a big "everything else" group of artists with
    # scattered tags; clustering the layout gives each region of the map one label.
    labels = AgglomerativeClustering(n_clusters=N_CLUSTERS, linkage="ward").fit_predict(xy)

    # Name each cluster by the tags most over-represented in it.
    dense = tfidf.toarray()
    overall = dense.mean(axis=0) + 1e-9
    clusters = []
    for c in range(N_CLUSTERS):
        inside = dense[labels == c].mean(axis=0)
        score = inside * np.log1p(inside / overall)
        top = [vocab[i] for i in np.argsort(-score)[:5]]
        clusters.append({"id": c, "tags": top, "artists": int((labels == c).sum())})

    # t-SNE snaps every artist into one clump. An artist whose tags match a second
    # cluster nearly as well as their own is pulled toward that cluster's centre:
    # not at all below MIX_FROM, halfway when the two match equally.
    centres = np.array([np.median(xy[labels == c], axis=0) for c in range(N_CLUSTERS)])
    centroids = normalize(np.array([dense[labels == c].mean(axis=0) for c in range(N_CLUSTERS)]))
    sims = dense @ centroids.T
    rows_n = np.arange(n)
    own = sims[rows_n, labels]
    others = sims.copy()
    others[rows_n, labels] = -1
    second = others.argmax(axis=1)
    ratio = others.max(axis=1) / np.maximum(own, 1e-9)
    pull = np.clip((ratio - MIX_FROM) / (1 - MIX_FROM), 0, 1) * 0.5
    xy_mixed = xy + pull[:, None] * (centres[second] - xy)
    print(f"{(pull > 0).sum()} artists pulled toward a second cluster, {(pull > 0.25).sum()} more than halfway to midway")

    song_counts = Counter(a["id"] for s in songs for a in s["artists"])
    names = {a["id"]: a["name"] for s in songs for a in s["artists"]}
    placed = {a: (float(xy_mixed[i, 0]), float(xy_mixed[i, 1]), int(labels[i])) for i, a in enumerate(ids)}
    also = {a: int(second[i]) for i, a in enumerate(ids) if pull[i] > 0}

    # Untagged artists borrow the spot of a tagged artist they share a song with.
    for s in songs:
        anchor = next((a["id"] for a in s["artists"] if a["id"] in placed), None)
        for a in s["artists"]:
            if anchor and a["id"] not in placed and a["id"] not in artist_tags:
                x, y, c = placed[anchor]
                placed[a["id"]] = (x + 0.004, y + 0.004, c)
                if anchor in also:
                    also[a["id"]] = also[anchor]

    # Liked songs are newest first, so each artist's titles are too.
    titles = defaultdict(list)
    for s in songs:
        for a in s["artists"]:
            titles[a["id"]].append(s["name"])

    artists = []
    for a, (x, y, c) in placed.items():
        top = sorted(artist_tags.get(a, {}).items(), key=lambda kv: -kv[1])[:4]
        entry = {
            "id": a, "name": names[a], "x": round(x, 4), "y": round(y, 4),
            "cluster": c, "songs": song_counts[a], "tags": [t for t, _ in top],
            "titles": titles[a],
        }
        if a in also:
            entry["also"] = also[a]
        artists.append(entry)

    # Hand-written names, keyed by cluster id. The layout is seeded, so ids hold
    # across reruns until the tag cleanup or the songs change; check them then.
    names_file = MUSIC / "cluster_names.json"
    cluster_names = json.loads(names_file.read_text(encoding="utf-8")) if names_file.exists() else {}
    for cl in clusters:
        members = [art for art in artists if art["cluster"] == cl["id"]]
        cl["name"] = cluster_names.get(str(cl["id"]), cl["tags"][0])
        # Each song counts once, under its lead artist.
        cl["songs"] = sum(1 for s in songs if placed.get(s["artists"][0]["id"], (0, 0, -1))[2] == cl["id"])
        # labels go at the clump, not wherever the pulled artists drifted to
        cl["x"] = round(float(centres[cl["id"], 0]), 4)
        cl["y"] = round(float(centres[cl["id"], 1]), 4)

    out = {"songs": len(songs), "clusters": clusters, "artists": artists}
    (MUSIC / "genre_map.json").write_text(json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"{len(artists)} of {len(names)} artists placed, {len(vocab)} tags used")
    for cl in sorted(clusters, key=lambda c: -c["songs"]):
        print(f"  {cl['id']:2d}  {cl['artists']:4d} artists  {cl['songs']:4d} songs   {cl['name']:24s} {', '.join(cl['tags'])}")

    if len(sys.argv) > 1:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        fig, ax = plt.subplots(figsize=(14, 14))
        pts = np.array([[a["x"], a["y"]] for a in artists])
        ax.scatter(pts[:, 0], pts[:, 1], c=[a["cluster"] for a in artists], cmap="tab20",
                   s=[4 + 6 * a["songs"] for a in artists], alpha=0.6, linewidths=0)
        for cl in clusters:
            members = pts[[a["cluster"] == cl["id"] for a in artists]]
            if len(members):
                mx, my = np.median(members, axis=0)
                ax.text(mx, my, f"{cl['id']}: " + "\n".join(cl["tags"][:2]), fontsize=9,
                        ha="center", weight="bold", bbox=dict(facecolor="white", alpha=0.7, lw=0))
        ax.set_axis_off()
        fig.savefig(sys.argv[1], dpi=80, bbox_inches="tight")


if __name__ == "__main__":
    main()
