"""
Compress and resize photos in assets/photos/ for web display.

- Standard photos: max dimension 1600px
- Panoramas (PANO in filename): max width 2400px
- JPEG quality 90 (near-lossless)
- Uses Lanczos resampling for high-quality downscaling

Only processes assets/photos/ — does not touch maps or other images.

Requirements: pip install Pillow
"""

from PIL import Image
import os
import glob

PHOTOS_DIR = os.path.join(os.path.dirname(__file__), "..", "assets", "photos")
QUALITY = 90
MAX_DIM_STANDARD = 1600
MAX_DIM_PANO = 2400


def compress_photos():
    photos = glob.glob(os.path.join(PHOTOS_DIR, "*.jpg"))

    total_before = 0
    total_after = 0
    count = 0

    for p in sorted(photos):
        name = os.path.basename(p)
        before_size = os.path.getsize(p)
        total_before += before_size

        img = Image.open(p)
        w, h = img.size

        is_pano = "PANO" in name
        max_dim = MAX_DIM_PANO if is_pano else MAX_DIM_STANDARD

        if max(w, h) > max_dim:
            ratio = max_dim / max(w, h)
            new_w = int(w * ratio)
            new_h = int(h * ratio)
            img = img.resize((new_w, new_h), Image.LANCZOS)

        img.save(p, "JPEG", quality=QUALITY, optimize=True)

        after_size = os.path.getsize(p)
        total_after += after_size
        count += 1

        reduction = (1 - after_size / before_size) * 100
        print(
            f"{name}: {w}x{h} -> {img.size[0]}x{img.size[1]}, "
            f"{before_size/1024/1024:.1f}MB -> {after_size/1024/1024:.1f}MB "
            f"({reduction:.0f}% smaller)"
        )

    print(f"\n--- Summary ---")
    print(f"Files processed: {count}")
    print(f"Total before: {total_before/1024/1024:.1f} MB")
    print(f"Total after: {total_after/1024/1024:.1f} MB")
    saved = total_before - total_after
    pct = (1 - total_after / total_before) * 100 if total_before else 0
    print(f"Saved: {saved/1024/1024:.1f} MB ({pct:.0f}%)")


if __name__ == "__main__":
    compress_photos()
