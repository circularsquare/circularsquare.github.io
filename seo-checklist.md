# SEO checklist

Working file, not part of the site (listed under `exclude:` in `_config.yml`).
Tick a box only after Anita has looked at the result. Nothing here goes out unreviewed.

Written 2026-10-17. "Now" columns are what the source files say today.

## Site-wide

- [x] Search Console account made (2026-10-17). Check back after a day.
- [ ] In Search Console: add the sitemap (`https://anita.garden/sitemap.xml`)
- [ ] In Search Console: after a few days, look at Pages (what is indexed) and Performance (what people searched)
- [ ] Open https://anita.garden/sitemap.xml and /robots.txt on the live site. Both should say anita.garden, not localhost
- [x] languagedots and religiondots back in the sitemap (removed `sitemap: false`, 2026-10-17)
- [ ] Default description in `_config.yml` is "hello welcome to my website!" and is used by every page without its own. Pick a better one
- [ ] `pendingnotes.html` and `pages/nix/fulanstory.html` are in the sitemap. Intended?
- [ ] Still `sitemap: false`: noritetsu (in progress), music. Flip when ready

## Standalone map pages (own `<head>`, in `<name>/index.html`)

For each: **title** (say what it is, include the phrase people would search), **description** (one sentence), **preview image** (absolute URL, about 1200x630, under 5 MB), **blurb** (visible text: what it shows, data source, what to try), **more maps link**.

| page | title now | description | preview image now | blurb | more maps link |
|---|---|---|---|---|---|
| languagedots | Language Dots | has one | absolute, preview.png | [ ] | [ ] |
| religiondots | Religion Dot Map | has one | absolute, preview.png | [ ] | [ ] |
| japanrail | japan rail flow, passenger throughput per segment | [ ] none | relative `index.png` (some crawlers drop these) | [ ] | [ ] |
| korearail | korea rail flow, passengers per segment | [ ] none | relative `index.png` | [ ] | [ ] |
| flights | flight traffic map | [ ] none | relative `preview.png` | [ ] | [ ] |
| cityhistory | city history | [ ] none | absolute, index.png | [ ] | [ ] |
| nycriders | nyc riders | [ ] none | [ ] none | [ ] | [ ] |
| londonriders | london riders | [ ] none | [ ] none | [ ] | [ ] |
| ancestrydotsna | North American Ancestry Dot Map | [ ] none | [ ] none | [ ] | [ ] |
| ancestrydots | Ancestry Dot Map | [ ] none | [ ] none | [ ] | [ ] |
| noritetsu | noritetsu | (in progress, skip) | | | |
| music | Music Map | has one | [ ] none | [ ] | [ ] |
| circles, guessthecity | not checked | | | | |

## Image maps (layout `staticmap`, in `pages/projects/maps/<name>.md`)

These get a title from front matter and use the map image itself as the preview image automatically (`image:` in front matter). No description of their own, so they fall back to the site default. Add `description:` to front matter. Some preview images are too big for social cards (Twitter/X caps at about 5 MB; I'm fairly sure Facebook and Discord also have limits), so those need a smaller `preview` version.

| page | title now | image size | description | smaller preview image | blurb |
|---|---|---|---|---|---|
| euro1m | europe in regions of 1 million people | 1.2 MB | [ ] | ok | [ ] |
| na1m | north america in regions of 1 million people | not checked | [ ] | [ ] | [ ] |
| sa1m | south america in regions of 1 million people | not checked | [ ] | [ ] | [ ] |
| asia1mloc | asia in regions of 1 million people (local language labels) | not checked | [ ] | [ ] | [ ] |
| asia1meng | asia in regions of 1 million people | not checked | [ ] | [ ] | [ ] |
| world10mfull | the world in regions of 10 million people | 1.8 MB | [ ] | ok | [ ] |
| nycvoronoi | nyc subway stations by population in catchment area | not checked | [ ] | [ ] | [ ] |
| nycarea | nyc subway and regional rail stations by population in catchment area | not checked (jpg) | [ ] | [ ] | [ ] |
| nystreets | nyc simulated street trips heat map | 20 MB | [ ] | [ ] needed | [ ] |
| bus | nyc bus lines by ridership | 4 MB | [ ] | [ ] probably | [ ] |
| worldtrain | fantasy world metro map | 1.5 MB | [ ] | ok | [ ] |

## Page-level things

- [ ] `/projects/` and `/maps/`: these are the pages most worth ranking. Each needs its own description and a sentence or two per map, not just a link
- [ ] Image alt text on posters and thumbnails (what place, what topic)
- [ ] Descriptive filenames for new posters (`japan-rail-poster.png` over `map3.png`)

## Promotion (matters more than tags)

- [ ] Pick one map to post first. Image in the post, link in a comment, data source credited
- [ ] Places to try: r/MapPorn, r/dataisbeautiful, r/imaginarymaps, r/transit, rail enthusiast forums, Bluesky
- [ ] Tell the people behind any open data you used
- [ ] Consider a "copy link to this view" button on the interactive maps
