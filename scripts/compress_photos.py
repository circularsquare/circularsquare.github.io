"""
Compress and resize photos in assets/photos/ and assets/plants/ for web display.

- Standard photos: max dimension 1600px
- Panoramas (PANO in filename): max width 2400px
- JPEG quality 90 (near-lossless)
- Uses Lanczos resampling for high-quality downscaling
- Skips photos already at or below target size

Does not touch maps or other image directories.

Requirements: pip install Pillow
"""

import PIL.Image

PIL.Image.MAX_IMAGE_PIXELS = None

from PIL import Image
import os
import glob

ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "assets")
PHOTO_DIRS = [
    os.path.join(ASSETS_DIR, "photos"),
    os.path.join(ASSETS_DIR, "plants"),
]
QUALITY = 90
MAX_DIM_STANDARD = 1600
MAX_DIM_PANO = 2400


def compress_photos():
    total_before = 0
    total_after = 0
    count = 0

    for photos_dir in PHOTO_DIRS:
        print(f"\n=== {os.path.basename(photos_dir)} ===")
        photos = []
        for ext in ("*.jpg", "*.jpeg", "*.png"):
            photos.extend(glob.glob(os.path.join(photos_dir, ext)))

        for p in sorted(photos):
            name = os.path.basename(p)
            before_size = os.path.getsize(p)

            img = Image.open(p)
            w, h = img.size

            is_pano = "PANO" in name
            max_dim = MAX_DIM_PANO if is_pano else MAX_DIM_STANDARD

            if max(w, h) <= max_dim:
                print(f"{name}: {w}x{h}, already at target size, skipping")
                continue

            total_before += before_size

            ratio = max_dim / max(w, h)
            new_w = int(w * ratio)
            new_h = int(h * ratio)
            img = img.resize((new_w, new_h), Image.LANCZOS)

            if p.lower().endswith(".png"):
                img.save(p, "PNG", optimize=True)
            else:
                img.save(p, "JPEG", quality=QUALITY, optimize=True)

            after_size = os.path.getsize(p)
            total_after += after_size
            count += 1

            reduction = (1 - after_size / before_size) * 100
            print(
                f"{name}: {w}x{h} -> {new_w}x{new_h}, "
                f"{before_size/1024/1024:.1f}MB -> {after_size/1024/1024:.1f}MB "
                f"({reduction:.0f}% smaller)"
            )

    print(f"\n--- Summary ---")
    print(f"Files compressed: {count}")
    if total_before:
        print(f"Total before: {total_before/1024/1024:.1f} MB")
        print(f"Total after: {total_after/1024/1024:.1f} MB")
        saved = total_before - total_after
        pct = (1 - total_after / total_before) * 100
        print(f"Saved: {saved/1024/1024:.1f} MB ({pct:.0f}%)")
    else:
        print("Nothing to compress — all photos already at target size.")


if __name__ == "__main__":
    compress_photos()
