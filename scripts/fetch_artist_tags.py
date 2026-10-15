"""Look up Last.fm tags for every artist in music/liked_songs.json.

    python scripts/fetch_artist_tags.py <lastfm-api-key>

Writes music/artist_tags.json as {spotify artist id: {name, tags: [[tag, weight], ...]}}.
Progress is saved as it goes, so an interrupted run picks up where it stopped.
"""

import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

MUSIC = Path(__file__).resolve().parent.parent / "music"
SONGS = MUSIC / "liked_songs.json"
OUT = MUSIC / "artist_tags.json"
TOP_N = 15
# Last.fm asks for no more than 5 requests a second.
DELAY = 0.25


def top_tags(name, key):
    params = urllib.parse.urlencode({
        "method": "artist.gettoptags",
        "artist": name,
        "autocorrect": 1,
        "api_key": key,
        "format": "json",
    })
    for attempt in range(5):
        try:
            with urllib.request.urlopen("https://ws.audioscrobbler.com/2.0/?" + params, timeout=20) as resp:
                data = json.load(resp)
            break
        except (urllib.error.URLError, TimeoutError):
            time.sleep(2 ** attempt)
    else:
        return None
    if "error" in data:
        # 6 = artist not found; anything else (bad key, rate limit) should stop the run.
        if data["error"] == 6:
            return []
        sys.exit(f"Last.fm error {data['error']}: {data.get('message')}")
    tags = data.get("toptags", {}).get("tag", [])
    return [[t["name"].lower(), int(t["count"])] for t in tags[:TOP_N] if int(t["count"]) > 0]


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    key = sys.argv[1]

    artists = {}
    for song in json.loads(SONGS.read_text(encoding="utf-8")):
        for a in song["artists"]:
            artists.setdefault(a["id"], a["name"])

    done = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}
    todo = [(i, n) for i, n in artists.items() if i not in done]
    print(f"{len(artists)} artists, {len(todo)} left to look up")

    for count, (artist_id, name) in enumerate(todo, 1):
        tags = top_tags(name, key)
        if tags is not None:
            done[artist_id] = {"name": name, "tags": tags}
        if count % 50 == 0 or count == len(todo):
            OUT.write_text(json.dumps(done, ensure_ascii=False, indent=1), encoding="utf-8")
            print(f"  {count} / {len(todo)}")
        time.sleep(DELAY)

    tagged = sum(1 for v in done.values() if v["tags"])
    print(f"Done: {tagged} of {len(done)} artists have tags")


if __name__ == "__main__":
    main()
