#!/usr/bin/env python3
"""Generate Datrix brand assets from the uploaded logo.

Outputs (into public/assets/img/):
  - datrix-logo.png        : trimmed full-color logo (for header, light backgrounds)
  - datrix-logo-white.png  : white wordmark version (for navy footer)
  - datrix-mark.png        : square circular mark only (favicon)
Recolors orig-assets/subscribe-bg.svg green gradient -> Datrix orange gradient
  and copies to public/assets/img/subscribe-bg.svg
"""
from PIL import Image
import os, re

SRC = "/home/z/my-project/upload/logo (1).png"
OUT_DIR = "/home/z/my-project/public/assets/img"
os.makedirs(OUT_DIR, exist_ok=True)

# ---- Brand palette sampled from the logo ----
NAVY   = (0x21, 0x34, 0x6B)
ORANGE = (0xF7, 0x94, 0x1D)
RED    = (0xE3, 0x1B, 0x22)
PURPLE = (0x44, 0x0E, 0x62)
GRAY   = (0x4C, 0x4D, 0x4D)
PALETTE = [NAVY, ORANGE, RED, PURPLE, GRAY]

im = Image.open(SRC).convert("RGBA")
W, H = im.size
print("source:", im.size)

# ---------- helpers ----------
def nearest(palette, px):
    best, bd = None, 1e9
    for c in palette:
        d = (px[0]-c[0])**2 + (px[1]-c[1])**2 + (px[2]-c[2])**2
        if d < bd:
            best, bd = c, d
    return best, bd

def remap(img, mapping):
    """mapping: {source_rgb: target_rgb}. Classify each opaque pixel to nearest
    palette color; if classified color is a key of mapping, replace RGB (keep alpha)."""
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            c, _ = nearest(PALETTE, (r, g, b))
            if c in mapping:
                t = mapping[c]
                px[x, y] = (t[0], t[1], t[2], a)
    return img

def trim(img, pad=0):
    bbox = img.getchannel("A").getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    l = max(0, l - pad); t = max(0, t - pad)
    r = min(img.width, r + pad); b = min(img.height, b + pad)
    return img.crop((l, t, r, b))

# ---------- 1. full-color logo ----------
logo = trim(im, pad=24)
logo.save(os.path.join(OUT_DIR, "datrix-logo.png"), optimize=True)
print("datrix-logo.png", logo.size)

# ---------- 2. white wordmark version (footer / dark surfaces) ----------
white = logo.copy()
# navy -> white, gray -> near-white cool gray
white = remap(white, {NAVY: (255, 255, 255), GRAY: (0xE9, 0xEC, 0xF5)})
white.save(os.path.join(OUT_DIR, "datrix-logo-white.png"), optimize=True)
print("datrix-logo-white.png", white.size)

# ---------- 3. square mark (favicon) ----------
# The circle mark is the only region containing ORANGE pixels (text is navy/gray).
# Use a tight threshold: navy #21346B is only ~2750 RGB units from purple.
small = logo.copy()
small.thumbnail((400, 400))
pxs = small.load()
xs, ys = [], []
for y in range(small.height):
    for x in range(small.width):
        r, g, b, a = pxs[x, y]
        if a > 40:
            c = ORANGE
            # orange is far (d>15000) from red/purple/navy/gray in RGB space,
            # 6000 captures all shaded orange tones of the circle
            if (r-c[0])**2 + (g-c[1])**2 + (b-c[2])**2 < 6000:
                xs.append(x); ys.append(y)
x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
sx = logo.width / small.width
sy = logo.height / small.height
box = (int(x0*sx)-6, int(y0*sy)-6, int((x1+1)*sx)+6, int((y1+1)*sy)+6)
box = (max(0, box[0]), max(0, box[1]), min(logo.width, box[2]), min(logo.height, box[3]))
mark = logo.crop(box)
# pad to square
side = max(mark.size)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
sq.paste(mark, ((side - mark.width)//2, (side - mark.height)//2))
sq = sq.resize((512, 512), Image.LANCZOS)
sq.save(os.path.join(OUT_DIR, "datrix-mark.png"), optimize=True)
print("datrix-mark.png", sq.size, "crop:", box)

# ---------- 4. recolor subscribe-bg.svg (green -> orange gradient) ----------
src_svg = "/home/z/my-project/orig-assets/subscribe-bg.svg"
svg = open(src_svg, encoding="utf-8").read()
svg = svg.replace("#9ECC57", "#FDB249").replace("#0DAF4B", "#F7941D")
svg = svg.replace("#9ecc57", "#FDB249").replace("#0daf4b", "#F7941D")
with open(os.path.join(OUT_DIR, "subscribe-bg.svg"), "w", encoding="utf-8") as f:
    f.write(svg)
print("subscribe-bg.svg recolored")
print("DONE")
