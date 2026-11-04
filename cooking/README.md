# cooking

The cooking game on anita.garden: plants on pages, a five-slot inventory, a pot
and a shared table on the home page, a dex. This folder is notes and tools
only; it isn't published (it's in `exclude:` in both Jekyll configs).

It's on for everyone (`kitchen_public: true` in `_config.yml`; set it false to
hide it again, and `?kitchen=on` still turns it on for one browser).

## where things are

| file | what |
|---|---|
| `_data/kitchen.yml` | all the game data: ingredients, dishes, plants, stations, recipes, eat text, what bunnies eat. Planned things live here too: anything without a png is left out of the game. The comments at the top of each section explain every field. |
| `assets/cooking/*.png` | sprites, named by id (see "sprites" below) |
| `assets/cooking/*.wav, *.mp3` | sounds: `pop.wav`, `boil.mp3`, `chew.mp3` |
| `assets/cooking/kitchen.js` | the game. It has Jekyll front matter: the yml and the list of pngs are written into it at build time |
| `assets/cooking/kitchen.css` | its styles |
| `_includes/kitchen.html` | the switch: loads the css, then the js, only when the kitchen is on and the page has a plant or station (or the visitor is carrying something) |
| `_includes/plant.html`, `_includes/station.html` | what goes in a page: `{% include plant.html kind="clementine" %}`, `{% include station.html kind="pot" %}` |
| `_includes/cursor.html` | the cursor bunnies. They eat food dropped on the floor through `window.kitchenFood`, which kitchen.js provides. A page's own grey bunnies: `grey_bunnies: 2` in its front matter |
| `C:\Users\anita\projects\shonei-server\kitchen.go` | the server behind the shared table, at https://market.anita.garden/kitchen/table. See that repo's CLAUDE.md, "Kitchen table" |
| `cooking/combos.py` | lists what every combination makes |
| `cooking/combos.md` | its output, the full checklist |
| `cooking/check-page.mjs` | screenshots a page's plants in headless Chrome |

## adding an ingredient

1. Add it under `ingredients:` in `_data/kitchen.yml` with its tags (it may be there already as a planned one).
2. Draw `assets/cooking/<id>.png` and the plant, `<id>plant.png`. Optionally `<id>onplant.png`, any size, for how it looks while still on the plant.
3. Add it under `plants:`: `spots:` (fruit centers) for fruit on the plant, `pull: true` for roots, `bare: true` for something just lying on the ground. `look: potato` borrows another plant's png, `png: beehive` names one outright. `repeat:` and `sway:` make a swaying field. `stalks: true` splits a same-size `<id>onplant.png` into separate stalks, each picked and swaying on its own. `bees:` puts bee.png around a plant.
4. Put `{% include plant.html kind="<id>" %}` in its page (where in the page doesn't matter; see below). Update the ingredient's `page:` note in the yml.
5. Run `python cooking/combos.py <id>` to see what it makes with everything else. Anything from a catch-all ("soup?", "???") that should be its own dish gets a recipe; recipes go above the catch-alls.
6. Draw any new dishes (`<id>.png`). A dish that would share an id with an ingredient gets `food` on the end: `teafood`, `ricefood`.
7. Run `python cooking/combos.py` to refresh `combos.md`.
8. Build, serve and look at it (see "checking your work").

In the checklist, "rule" says how specific the match was: **exact** (a recipe names both items), **tag rule** (`any leafy`), **catch-all** (`anything`). "not drawn; today: ..." means the recipe exists but the dish has no png yet, so the game gives the fallback for now.

## how it works, and what to keep true

- **Sprites are found by name.** Item `potato` is `potato.png`, its plant `potatoplant.png`, a station `pot.png`, while cooking `potcovered.png`. A png that doesn't exist switches its entry off; nothing else is needed.
- **Every png is shown at its own size**, one art pixel per png pixel. Ingredients are drawn 16x16 and dishes 20x20 by habit, but a dish drawn 16x16 just comes out smaller. `size:` in the yml is only the space held while the png loads. The slot pngs (`inventoryslot`, `potslot`, `infobook`) are drawn at 2x already and sized in half art pixels.
- **Pixel rules.** One art pixel is `--kpx` (an even number of device pixels, set by kitchen.js). Every size and position is a whole number of them. Animations step in whole pixels with `step-end`/`steps()`; only falling items move every frame.
- **Plants and stations don't stay in the text.** Wherever their include is, kitchen.js moves them into one row standing on the footer's top line (the ground), in page order, with the inventory at the right end. The row goes in once its pngs have loaded, so the page doesn't jump.
- **Recipes**: top to bottom, first match wins, either order. Recipes whose dish has no png are skipped. `combos.py` copies kitchen.js's matching; if one changes, change the other.
- **No words until someone plays.** Nothing visible says anything until they've picked something, cooked it and got the dish: then "eat", then "yum!" and friends, then the dex. The one exception is raw fruit, which shows "eat" straight away (`eat_from_start` in the yml). Any new text must be real DOM text (page translation reaches it), as few words as possible, lowercase like the rest of the site, and goes past Anita first.
- **Light.** It's extra flavour: nothing loads for visitors with the kitchen off, and with it on, only on pages with a plant or station or for someone carrying something. Nothing runs while idle except a regrow check on plant pages; bees only move while on screen; sounds load on first use and never play from a hidden tab. Keep new things like that.
- **Saved state** is localStorage `kitchen` (inventory, the pot, picked spots, dex counts, flags, `reported`). Dropped items are never saved.
- **People counts.** The dex also says how many people have eaten an item (light grey, under "found: n" / "made: n"). Each browser reports an item to shonei-server once, the first time it eats it (`POST /kitchen/seen`, remembered in `reported`), and the dex reads `GET /kitchen/stats` when it opens. Counts are per browser, no ids kept. Anything eaten before this existed reports on the next visit. The server also keeps found and made counts, but nothing sends them now. A test against the live server adds to the real counts, so point `kitchenApi` at a local one.

## checking your work

```
bundle exec jekyll build --config _config.yml,_config_dev.yml
python -m http.server 4000 --directory _site      (in the background)
node cooking/check-page.mjs friends/clementine/   (paths without a leading slash)
```

Port 4000 matters: the server only allows anita.garden and localhost:4000.
`check-page.mjs` prints what the game built on each page and saves a zoomed
screenshot of the ground row; look at it. For anything interactive, drive
Chrome the same way (it launches its own headless instance with its own
profile; never kill Chrome broadly).

**Don't write to the live shared table from a test.** Everyone sees it. Run
shonei-server locally (it listens on 127.0.0.1:8083) and set
`localStorage.kitchenApi = 'http://127.0.0.1:8083'` in the test browser to point
the table at it.

`node --check` can't read `assets/cooking/kitchen.js` (it has Liquid in it);
check the built copy in `_site/assets/cooking/kitchen.js` instead.

## rules for agents

- Never commit or push in this repo unless Anita says so in that message. shonei-server allows commits as you go; pushing and deploying (`deploy\deploy.ps1`) need her say-so.
- Draft any visible text and show it to her; don't put new words in the game on your own.
- If a png she drew looks wrong for the job (wrong size, missing frames), say so instead of working around it.
