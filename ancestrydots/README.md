# Ancestry Dot Map

## How it works

The map uses [PMTiles](https://pmtiles.io/) to serve vector tile dots, and [MapLibre GL](https://maplibre.org/) to render them.

The PMTiles file is too large to serve from GitHub Pages (Cloudflare's CDN mangles range requests with gzip encoding, which breaks PMTiles). Instead, it's hosted on **Cloudflare R2**.

## Architecture

- `index.html` — the map page, served from GitHub Pages
- `data/processed/legend.json` — dot colors and populations, served from GitHub Pages
- `dots_all_1per100.pmtiles` — the actual dot tiles, served from **Cloudflare R2**

## Updating the dots

When you regenerate `dots_all_1per100.pmtiles`:

1. **Upload to R2**: Go to [Cloudflare dashboard](https://dash.cloudflare.com) > R2 Object Storage > `anita-maps` bucket > upload the new file (it will overwrite the old one)
2. **Update legend.json**: If the legend data changed, replace `data/processed/legend.json` in this repo and commit
3. **That's it** — the R2 URL stays the same: `https://pub-ae551368cea941f39101e13c84d60bde.r2.dev/dots_all_1per100.pmtiles`

Note: The `.pmtiles` file is in `.gitignore` so it won't get committed to the repo.

## R2 bucket details

- **Bucket name**: `anita-maps`
- **Public URL**: `https://pub-ae551368cea941f39101e13c84d60bde.r2.dev`
- **CORS allowed origins**: `http://localhost:3000`, `https://circularsquare.github.io`, `https://anita.garden`
- **CORS allowed methods**: GET, HEAD
- **CORS allowed headers**: Range

## Local development

```
bundle exec jekyll serve --port 3000
```

Port 3000 is needed to match the CORS allowed origins on R2.
