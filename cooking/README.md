# cooking

The cooking game. This folder is notes and tools only; it isn't published.

## where things are

| file | what |
|---|---|
| `_data/kitchen.yml` | all the game data: ingredients, dishes, plants, stations, recipes, eat text. Planned things live here too: anything without a png is left out of the game. |
| `assets/cooking/*.png` | sprites, named by id: `clementine.png`, `clementineplant.png`, `pot.png`, `inventoryslot.png` |
| `assets/cooking/kitchen.js` | the game |
| `assets/cooking/kitchen.css` | its styles |
| `_includes/kitchen.html` | turns the game on (`kitchen_public` in `_config.yml`, or `?kitchen=on`) |
| `_includes/plant.html`, `_includes/station.html` | what goes in a page: `{% include plant.html kind="clementine" %}` |
| `cooking/combos.py` | lists what every combination makes |
| `cooking/combos.md` | its output, the full checklist |

## adding an ingredient

1. Add it under `ingredients:` in `_data/kitchen.yml` with its tags (it may be there already as a planned one).
2. Draw `assets/cooking/<id>.png` (16x16) and the plant, `<id>plant.png`.
3. Add it under `plants:`: `spots:` for fruit on the plant, or `pull: true` for roots.
4. Put `{% include plant.html kind="<id>" %}` in its page.
5. Run `python cooking/combos.py <id>` to see what it makes with everything else. Anything from a catch-all ("soup?", "???") that should be its own dish gets a recipe; recipes go above the catch-alls.
6. Draw any new dishes (20x20, `<id>.png`).
7. Run `python cooking/combos.py` to refresh `combos.md`.

In the checklist, "rule" says how specific the match was: **exact** (a recipe names both items), **tag rule** (`any leafy`), **catch-all** (`anything`). "not drawn; today: ..." means the recipe exists but the dish has no png yet, so the game gives the fallback for now.
