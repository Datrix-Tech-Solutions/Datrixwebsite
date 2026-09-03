#!/usr/bin/env python3
"""Extract embedded base64 PNGs from pack-*.svg mockups for inspection/patching."""
import re, base64, os

SRC = "/home/z/my-project/public/assets/img"
OUT = "/home/z/my-project/scripts/pack_png"
os.makedirs(OUT, exist_ok=True)

for name in ["pack-payroll", "pack-contract", "pack-crm"]:
    svg = open(f"{SRC}/{name}.svg", encoding="utf-8").read()
    m = re.search(r'data:image/png;base64,([A-Za-z0-9+/=]+)', svg)
    if not m:
        print(name, "NO IMAGE"); continue
    b64 = m.group(1)
    data = base64.b64decode(b64 + "=" * (-len(b64) % 4))
    out = f"{OUT}/{name}.png"
    open(out, "wb").write(data)
    from PIL import Image
    im = Image.open(out)
    print(name, im.size, im.mode, f"{len(data)//1024}KB")
