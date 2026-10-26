"""
Make the hover thumbnails for the asia1m maps on the projects and maps pages.

Reads assets/maps/asia1m/flat_local.png and flat_eng.png (9500x8000), crops to
where the regions are (central asia across to japan, mongolia down to java),
and writes 400px wide JPEGs to assets/thumbs/maps/asia1mloc.jpg and asia1meng.jpg.

Run it again after re-exporting the flat maps.

Requirements: pip install Pillow
"""

import os
import sys

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "assets")
SRC = os.path.join(ASSETS_DIR, "maps", "asia1m")
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ASSETS_DIR, "thumbs", "maps")
BOX = (3040, 1330, 9405, 8000)  # left, top, right, bottom in full-size pixels
WIDTH = 400

for src, dst in (("flat_local.png", "asia1mloc.jpg"), ("flat_eng.png", "asia1meng.jpg")):
    im = Image.open(os.path.join(SRC, src)).convert("RGB").crop(BOX)
    im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
    path = os.path.join(OUT, dst)
    im.save(path, quality=85, optimize=True)
    print("wrote", path, im.size, os.path.getsize(path))
