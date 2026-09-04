#!/usr/bin/env python3
"""Rebrand pack-*.svg product box mockups:
   1. detect the old 'factura' logo block on the box front face
   2. erase it with the local background color
   3. paste the Datrix logo (mark + wordmark)
   4. re-embed the PNG into the SVG (public/assets/img/pack-*.svg)
"""
import re, base64, io, os
from PIL import Image

IMG_DIR = "/home/z/my-project/public/assets/img"
PNG_DIR = "/home/z/my-project/scripts/pack_png"
LOGO = Image.open(f"{IMG_DIR}/datrix-logo.png").convert("RGBA")  # 3995x1071

def near_white(p, tol=40):
    r, g, b = p[0], p[1], p[2]
    return (255 - r) + (255 - g) + (255 - b) < tol * 3

def rebrand(name):
    png_path = f"{PNG_DIR}/{name}.png"
    im = Image.open(png_path).convert("RGBA")
    W, H = im.size
    px = im.load()

    # --- detect old logo block in ROI (front face, above illustration) ---
    # y stops at 0.32*H: mark + wordmark + subtitle live there; the illustration
    # artwork starts lower (~0.36H) and must NOT be caught in the bbox
    x0r, x1r = int(0.12 * W), int(0.55 * W)
    y0r, y1r = int(0.08 * H), int(0.32 * H)
    xs, ys = [], []
    for y in range(y0r, y1r, 3):
        for x in range(x0r, x1r, 3):
            p = px[x, y]
            if p[3] > 200 and not near_white(p):
                xs.append(x); ys.append(y)
    bx0, bx1, by0, by1 = min(xs), max(xs), min(ys), max(ys)
    print(f"{name}: old logo bbox = ({bx0},{by0})-({bx1},{by1}) size {bx1-bx0}x{by1-by0}")

    # --- background color sampled just above the block ---
    sx, sy = (bx0 + bx1) // 2, max(0, by0 - 60)
    bg = px[sx, sy][:3]
    print(f"   bg sample at ({sx},{sy}) = {bg}")

    # --- erase with padding ---
    pad = 50
    ex0, ey0 = max(0, bx0 - pad), max(0, by0 - pad)
    ex1, ey1 = min(W, bx1 + pad), min(H, by1 + pad)
    draw_region = (ex0, ey0, ex1, ey1)
    from PIL import ImageDraw
    d = ImageDraw.Draw(im)
    d.rectangle(draw_region, fill=bg + (255,))

    # --- paste Datrix logo ---
    bw = bx1 - bx0
    logo_w = max(420, min(660, int(bw * 1.12)))
    logo_h = int(logo_w * LOGO.height / LOGO.width)
    lg = LOGO.resize((logo_w, logo_h), Image.LANCZOS)
    cx = (bx0 + bx1) // 2
    cy = (by0 + by1) // 2
    px_pos = (cx - logo_w // 2, cy - logo_h // 2)
    im.paste(lg, px_pos, lg)
    print(f"   pasted Datrix logo {logo_w}x{logo_h} at {px_pos}")

    # --- re-embed into SVG ---
    buf = io.BytesIO()
    im.save(buf, format="PNG", optimize=False, compress_level=6)
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    svg_path = f"{IMG_DIR}/{name}.svg"
    svg = open(svg_path, encoding="utf-8").read()
    new_svg, n = re.subn(
        r'(data:image/png;base64,)[A-Za-z0-9+/=]+',
        r'\g<1>' + b64,
        svg, count=1)
    open(svg_path, "w", encoding="utf-8").write(new_svg)
    print(f"   re-embedded into {svg_path} ({len(b64)//1024}KB b64), sub={n}")

for name in ["pack-payroll", "pack-contract", "pack-crm"]:
    rebrand(name)
print("DONE")
