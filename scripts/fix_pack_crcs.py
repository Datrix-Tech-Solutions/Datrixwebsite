#!/usr/bin/env python3
"""Fix broken PNG chunk CRCs (Sketch export bug) in extracted pack PNGs,
then render downscaled previews for locating the old logo region."""
import struct, os, zlib
from PIL import Image

D = "/home/z/my-project/scripts/pack_png"

def fix_png_crcs(path):
    data = open(path, "rb").read()
    out = bytearray(data[:8])
    pos = 8
    fixed = 0
    while pos + 8 <= len(data):
        ln, typ = struct.unpack(">I4s", data[pos:pos+8])
        chunk = data[pos+8 : pos+8+ln]
        crc = struct.unpack(">I", data[pos+8+ln : pos+12+ln])[0]
        calc = zlib.crc32(typ + chunk) & 0xFFFFFFFF
        out += data[pos:pos+8] + chunk
        if crc != calc:
            fixed += 1
        out += struct.pack(">I", calc)
        pos += 12 + ln
        if typ == b"IEND":
            break
    open(path, "wb").write(bytes(out))
    return fixed

for name in ["pack-payroll", "pack-contract", "pack-crm"]:
    p = f"{D}/{name}.png"
    n = fix_png_crcs(p)
    im = Image.open(p)
    im.load()
    print(name, "CRCs fixed:", n, "size:", im.size)
    # preview
    bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
    bg.alpha_composite(im.convert("RGBA"))
    scale = 620 / bg.width
    prev = bg.resize((620, int(bg.height * scale)), Image.LANCZOS)
    prev.convert("RGB").save(f"{D}/{name}-view.jpg", quality=88)
print("done")
