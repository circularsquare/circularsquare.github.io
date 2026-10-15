#!/usr/bin/env python3
"""Build the link graph drawn on /projects/site/.

Reads the built site in _site/ (so run `jekyll build` or serve.sh first) and
collects every internal link between pages. Links in the header and footer are
skipped: they appear on every page and would tie everything to the nav pages.

Page views come from a Google Analytics CSV export, if one is at
scripts/page_views.csv (or passed as --views <path>). In GA4 that is Reports >
Engagement > Pages and screens, with the first column switched to "Page path and
screen class", then Share this report > Download file > CSV. The graph sizes
dots by views when it has them and by link count when it does not.

Writes assets/site_graph.json: {"nodes": [{id, title, group, views?}], "links": [{source, target}]}.
Run with --preview to print a summary without writing anything.
"""

import csv
import json
import os
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(REPO, "_site")
OUT = os.path.join(REPO, "assets", "site_graph.json")
VIEWS_CSV = os.path.join(REPO, "scripts", "page_views.csv")
HOSTS = {"", "anita.garden", "www.anita.garden", "circularsquare.github.io"}
SKIP_URLS = {"/404.html"}


class PageParser(HTMLParser):
    """Collects the title, robots meta and hrefs outside header/footer."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.noindex = False
        self.hrefs = []
        self._in_title = False
        self._skip_depth = 0   # >0 while inside <header> or <footer>

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("header", "footer"):
            self._skip_depth += 1
        elif tag == "title":
            self._in_title = True
        elif tag == "meta" and (attrs.get("name") or "").lower() == "robots":
            self.noindex = "noindex" in (attrs.get("content") or "").lower()
        elif tag == "a" and self._skip_depth == 0 and attrs.get("href"):
            self.hrefs.append(attrs["href"])

    def handle_endtag(self, tag):
        if tag in ("header", "footer") and self._skip_depth:
            self._skip_depth -= 1
        elif tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data


def page_url(relpath):
    """_site-relative file path -> site URL (index.html collapses to its dir)."""
    url = "/" + relpath.replace(os.sep, "/")
    if url.endswith("/index.html"):
        url = url[: -len("index.html")]
    return url


def normalise(href, base):
    """Resolve an href against the page URL; None if it leaves the site."""
    if href.startswith(("mailto:", "javascript:", "tel:", "#")):
        return None
    parsed = urlparse(urljoin("https://anita.garden" + base, href))
    if parsed.hostname not in HOSTS and parsed.hostname is not None:
        return None
    path = parsed.path or "/"
    if not path.endswith("/") and not os.path.splitext(path)[1]:
        path += "/"   # /languagedots -> /languagedots/
    return path


def clean_title(title):
    """Strip the site name; None for pages with no title of their own."""
    title = title.strip()
    if title.startswith("anita.garden |"):
        return None   # untitled page: head.html falls back to the site description
    return re.sub(r"\s*\|\s*anita\.garden\s*$", "", title) or None


def group_of(url):
    first = url.strip("/").split("/")[0]
    return first or "home"


def load_views(path):
    """Read a GA4 CSV export into {url: views}.

    The export starts with '#' comment lines and may hold several tables; the
    first one with a Views column and a column of /paths is used.
    """
    with open(path, encoding="utf-8-sig", errors="replace") as fh:
        rows = [r for r in csv.reader(fh) if r and not r[0].startswith("#")]
    for i, header in enumerate(rows):
        lowered = [h.strip().lower() for h in header]
        if "views" not in lowered:
            continue
        views_col = lowered.index("views")
        body = []
        for row in rows[i + 1:]:
            if len(row) != len(header):
                break   # next table, or the totals row GA sometimes adds
            body.append(row)
        path_col = next((c for c in range(len(header))
                         if body and all(r[c].startswith("/") for r in body[:20])), None)
        if path_col is None:
            continue
        views = {}
        for row in body:
            url = normalise(row[path_col], "/")
            try:
                count = int(float(row[views_col].replace(",", "")))
            except ValueError:
                continue
            if url:
                views[url] = views.get(url, 0) + count
        return views
    sys.exit(f"{path}: found no table with a Views column and page paths. "
             "Was the first column set to 'Page path and screen class'?")


def main():
    if not os.path.isdir(SITE):
        sys.exit("no _site/ folder; build the site first")
    views_path = VIEWS_CSV
    if "--views" in sys.argv:
        views_path = sys.argv[sys.argv.index("--views") + 1]
    views = load_views(views_path) if os.path.exists(views_path) else None

    pages = {}   # url -> {title, hrefs}
    for root, _dirs, files in os.walk(SITE):
        for name in files:
            if not name.endswith(".html"):
                continue
            abspath = os.path.join(root, name)
            url = page_url(os.path.relpath(abspath, SITE))
            if url in SKIP_URLS:
                continue
            parser = PageParser()
            with open(abspath, encoding="utf-8", errors="replace") as fh:
                parser.feed(fh.read())
            title = clean_title(parser.title)
            if parser.noindex or not title:
                continue
            pages[url] = {"title": title, "hrefs": parser.hrefs}

    links = set()
    for url, info in pages.items():
        for href in info["hrefs"]:
            target = normalise(href, url)
            if target and target != url and target in pages:
                links.add((url, target))

    # Groups with a single page would each need their own colour. The map
    # projects live at top-level URLs like /flights/, so a lone page that
    # /projects/ links to joins "projects"; the rest are lumped into "other".
    counts = {}
    for url in pages:
        counts[group_of(url)] = counts.get(group_of(url), 0) + 1
    from_projects = {t for s, t in links if s == "/projects/"}
    nodes = []
    for url in sorted(pages):
        group = group_of(url)
        if counts[group] == 1 and group != "home":
            group = "projects" if url in from_projects else "other"
        node = {"id": url, "title": pages[url]["title"], "group": group}
        if views is not None:
            node["views"] = views.get(url, 0)
        nodes.append(node)
    data = {
        "nodes": nodes,
        "links": [{"source": s, "target": t} for s, t in sorted(links)],
    }

    if "--preview" in sys.argv:
        sys.stdout.reconfigure(encoding="utf-8")   # GA paths can hold any script
        print(f"{len(nodes)} pages, {len(links)} links")
        orphans = [n["id"] for n in nodes
                   if not any(n["id"] in pair for pair in links)]
        print(f"unlinked: {', '.join(orphans) or 'none'}")
        groups = sorted({n['group'] for n in nodes})
        print(f"groups: {', '.join(groups)}")
        if views is None:
            print("no page views file; dots will be sized by link count")
        else:
            top = sorted(nodes, key=lambda n: -n["views"])[:10]
            print("most viewed: " + ", ".join(f"{n['id']} {n['views']}" for n in top))
            missing = sorted(u for u in views if u not in pages)
            print(f"views for pages not in the graph: {', '.join(missing[:15]) or 'none'}")
        return

    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
    print(f"wrote {OUT} ({len(nodes)} pages, {len(links)} links)")


if __name__ == "__main__":
    main()
