#!/usr/bin/env python3
"""Derive RSS feed entries from git history.

The site is a wiki of undated pages, so there is nothing in the frontmatter to
sort a feed by. This walks the git log and decides, per page, when it changed
enough to be worth telling a subscriber about.

Two rules:
  1. A page's first appearance is always an entry ("new").
  2. After that, edits accumulate a score. When the running score crosses
     THRESHOLD the page gets an entry ("updated") and the score resets.

Accumulating rather than testing each commit in isolation matters: a page
rewritten across fifteen small commits would never trip a per-commit test, and
would stay invisible forever. Conversely a one-line "path fix?" commit scores
close to nothing and never trips the threshold on its own.

Scoring is in points:
  - text: one point per changed line (added + deleted) in the page itself
  - assets: an image/audio/video blob is worth its size in bytes divided by
    BYTES_PER_POINT, credited to whichever pages reference it

Writes _data/feed_entries.yml. Run with --preview to see what the feed would
contain without writing anything.
"""

import os
import re
import subprocess
import sys
from collections import defaultdict

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- tuning ---------------------------------------------------------------
# Roughly: a dozen changed lines of prose, or one biggish replaced image, or a
# mix, is "substantial". Raise THRESHOLD for a quieter feed.
THRESHOLD = 12
# Photos here run 0.5-1MB, which is routine rather than notable, so one of them
# is worth ~2-4 points: a page needs several new images (or images plus prose)
# before it earns an entry. A genuine photo dump clears the bar easily.
BYTES_PER_POINT = 250_000
MAX_ENTRIES = 30          # feeds should not be unbounded

PAGES_DIR = "pages"
ASSET_RE = re.compile(r"/assets/[A-Za-z0-9_./%-]+\.(?:png|jpe?g|gif|webp|svg|mp3|mp4|m4a|wav|ogg)", re.I)
BINARY_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".mp3", ".mp4", ".m4a", ".wav", ".ogg"}
EXCERPT_WORDS = 60


def git(*args):
    """Run git in the repo and return stdout as text."""
    out = subprocess.run(
        ["git", "-c", "core.quotepath=false", *args],
        cwd=REPO, capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    if out.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed: {out.stderr.strip()}")
    return out.stdout


def split_frontmatter(text):
    """Return (frontmatter_dict, body). Only the few scalar keys we need."""
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    raw, body = text[3:end], text[end + 4:]
    meta = {}
    for line in raw.splitlines():
        if ":" not in line or line.lstrip().startswith("#"):
            continue
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip().strip("\"'")
    return meta, body


def make_excerpt(body):
    """Flatten markdown/HTML into a short plain-text summary."""
    text = body
    text = re.sub(r"(?s)<(script|style)\b.*?</\1>", " ", text)
    text = re.sub(r"(?s)\{%.*?%\}", " ", text)          # liquid tags
    text = re.sub(r"(?s)\{\{.*?\}\}", " ", text)        # liquid output
    text = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", text)   # images
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)  # links -> label
    text = re.sub(r"(?s)<[^>]+>", " ", text)            # html tags
    text = re.sub(r"[#>*_`~|-]+", " ", text)            # markdown punctuation
    text = re.sub(r"\s+", " ", text).strip()
    words = text.split()
    if len(words) <= EXCERPT_WORDS:
        return " ".join(words)
    return " ".join(words[:EXCERPT_WORDS]).rstrip(",.;:") + "…"


def load_pages():
    """Map repo-relative page path -> {url, title, excerpt} for feed-eligible pages."""
    pages = {}
    for root, _dirs, files in os.walk(os.path.join(REPO, PAGES_DIR)):
        for name in files:
            if not name.endswith((".md", ".html")):
                continue
            abspath = os.path.join(root, name)
            relpath = os.path.relpath(abspath, REPO).replace(os.sep, "/")
            with open(abspath, encoding="utf-8", errors="replace") as fh:
                meta, body = split_frontmatter(fh.read())
            # Opt-outs: explicit feed:false, or anything already hidden from
            # search engines (notes.md is noindex), or the 404 page.
            if meta.get("feed", "").lower() == "false":
                continue
            if meta.get("sitemap", "").lower() == "false":
                continue
            permalink = meta.get("permalink")
            if not permalink:
                continue
            pages[relpath] = {
                "url": permalink,
                "title": meta.get("title") or os.path.splitext(name)[0],
                "excerpt": make_excerpt(body),
                "body": body,
            }
    return pages


def asset_owners(pages):
    """Map repo-relative asset path -> list of page paths that reference it."""
    owners = defaultdict(list)
    for relpath, info in pages.items():
        for match in set(ASSET_RE.findall(info["body"])):
            owners[match.lstrip("/")].append(relpath)
    return owners


def blob_sizes(pairs):
    """Batch-resolve sizes for (commit, path) pairs via one cat-file process."""
    if not pairs:
        return {}
    revs = [f"{commit}:{path}" for commit, path in pairs]
    proc = subprocess.run(
        ["git", "cat-file", "--batch-check"],
        cwd=REPO, input="\n".join(revs) + "\n",
        capture_output=True, text=True, encoding="utf-8", errors="replace",
    )
    sizes = {}
    for rev, line in zip(revs, proc.stdout.splitlines()):
        parts = line.split()
        # "<sha> blob <size>" on success; "<rev> missing" when absent
        if len(parts) == 3 and parts[1] == "blob":
            sizes[rev] = int(parts[2])
    return sizes


def walk_history(pages, owners):
    """Replay commits oldest-first, emitting an entry per qualifying change."""
    # Separators are written as git format escapes (%x1e/%x1f) rather than real
    # bytes: Windows forbids a NUL in argv, so git must emit them, not us.
    log = git(
        "log", "--reverse", "--no-renames", "--no-merges",
        "--pretty=format:%x1e%H%x1f%aI", "--numstat",
    )

    commits = []  # (sha, date, [(added, deleted, path)])
    for chunk in log.split("\x1e"):
        if not chunk.strip():
            continue
        header, _, rest = chunk.partition("\n")
        sha, _, date = header.partition("\x1f")
        files = []
        for line in rest.splitlines():
            parts = line.split("\t")
            if len(parts) != 3:
                continue
            added, deleted, path = parts
            files.append((added, deleted, path))
        commits.append((sha, date, files))

    # Asset sizes need a second git pass; collect every pair we will ask about.
    wanted = []
    for sha, _date, files in commits:
        for _a, _d, path in files:
            if os.path.splitext(path)[1].lower() in BINARY_EXT and path in owners:
                wanted.append((sha, path))
    sizes = blob_sizes(wanted)

    score = defaultdict(float)
    seen = set()
    events = {}  # page path -> (date, kind); later events overwrite earlier

    for sha, date, files in commits:
        bumped = set()
        for added, deleted, path in files:
            if path in pages:
                if path not in seen:
                    seen.add(path)
                    events[path] = (date, "new")
                    score[path] = 0.0
                    continue
                lines = 0
                for value in (added, deleted):
                    if value.isdigit():
                        lines += int(value)
                score[path] += lines
                bumped.add(path)
            elif path in owners:
                size = sizes.get(f"{sha}:{path}")
                if not size:
                    continue
                for owner in owners[path]:
                    if owner in seen:
                        score[owner] += size / BYTES_PER_POINT
                        bumped.add(owner)

        for path in bumped:
            if score[path] >= THRESHOLD:
                events[path] = (date, "updated")
                score[path] = 0.0

    entries = []
    for path, (date, kind) in events.items():
        info = pages[path]
        entries.append({
            "url": info["url"],
            "title": info["title"],
            "excerpt": info["excerpt"],
            "date": date,
            "kind": kind,
        })
    entries.sort(key=lambda e: e["date"], reverse=True)
    return entries[:MAX_ENTRIES]


def yaml_quote(value):
    return '"' + str(value).replace("\\", "\\\\").replace('"', '\\"') + '"'


def main():
    preview = "--preview" in sys.argv
    pages = load_pages()
    owners = asset_owners(pages)
    entries = walk_history(pages, owners)

    if preview:
        print(f"{len(pages)} feed-eligible pages, {len(owners)} referenced assets")
        print(f"threshold={THRESHOLD} bytes_per_point={BYTES_PER_POINT}\n")
        for entry in entries:
            print(f"  {entry['date'][:10]}  {entry['kind']:<8} {entry['title']:<24} {entry['url']}")
        print(f"\n{len(entries)} entries would be published")
        return

    out_dir = os.path.join(REPO, "_data")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "feed_entries.yml")
    with open(out_path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("# Generated by scripts/build_feed_data.py -- do not edit by hand.\n")
        for entry in entries:
            fh.write(f"- url: {yaml_quote(entry['url'])}\n")
            fh.write(f"  title: {yaml_quote(entry['title'])}\n")
            fh.write(f"  excerpt: {yaml_quote(entry['excerpt'])}\n")
            fh.write(f"  date: {yaml_quote(entry['date'])}\n")
            fh.write(f"  kind: {yaml_quote(entry['kind'])}\n")
    print(f"wrote {out_path} ({len(entries)} entries)")


if __name__ == "__main__":
    main()
