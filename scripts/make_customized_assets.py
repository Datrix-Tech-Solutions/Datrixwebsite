#!/usr/bin/env python3
"""Generate SVG assets for the renamed 'Customized Software' product page.
Brand palette (from Datrix logo): Navy #21346B, Orange #F7941D, Red #E31B22, Purple #440E62.
Feature icons reuse the page's existing red->orange gradient language (#ee4124 -> #ff9648).
"""
import os

OUT = "/home/z/my-project/public/assets/img"
OUT_PC = os.path.join(OUT, "page-contract")
os.makedirs(OUT_PC, exist_ok=True)

NAVY = "#21346B"
NAVY_DARK = "#1B2A57"
ORANGE = "#F7941D"
RED = "#E31B22"
PURPLE = "#440E62"
GRAY = "#E8ECF4"

GRAD = (
    '<linearGradient id="g" x1="0" y1="{y1}" x2="0" y2="{y2}" gradientUnits="userSpaceOnUse">'
    '<stop offset="0" stop-color="#ee4124"/><stop offset="0.35" stop-color="#f45a2f"/>'
    '<stop offset="1" stop-color="#ff9648"/></linearGradient>'
)


def write(path, svg):
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)
    print("wrote", path)


# ---------------------------------------------------------------- feature icons
def icon(name, vb_w, vb_h, body, y1=None, y2=None):
    y1 = y1 if y1 is not None else vb_h
    y2 = y2 if y2 is not None else 0
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} {vb_h}">'
        f"<defs>{GRAD.format(y1=y1, y2=y2)}</defs>{body}</svg>"
    )
    write(os.path.join(OUT_PC, name), svg)


# 1. Puzzle piece - Tailored To Your Workflows
icon(
    "feature-tailored.svg", 64, 64,
    '<path fill="url(#g)" d="M12 8H26A7 7 0 0 1 40 8H52A4 4 0 0 1 56 12V26A7 7 0 0 1 56 40V52'
    'A4 4 0 0 1 52 56H12A4 4 0 0 1 8 52V12A4 4 0 0 1 12 8Z"/>'
    '<circle cx="33" cy="33" r="6" fill="#fff"/>',
)

# 2. Integration hub - Seamless Integrations
icon(
    "feature-integration.svg", 64, 64,
    '<g stroke="url(#g)" stroke-width="5" stroke-linecap="round" fill="none">'
    '<path d="M32 38 32 16"/><path d="M32 38 15 50"/><path d="M32 38 49 50"/></g>'
    '<circle cx="32" cy="14" r="8" fill="url(#g)"/>'
    '<circle cx="13" cy="51" r="8" fill="url(#g)"/>'
    '<circle cx="51" cy="51" r="8" fill="url(#g)"/>'
    '<circle cx="32" cy="38" r="11" fill="url(#g)"/><circle cx="32" cy="38" r="4.5" fill="#fff"/>',
)

# 3. Growing bars + arrow - Scales As You Grow
icon(
    "feature-scalable.svg", 64, 64,
    '<path fill="url(#g)" d="M12 40h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V42a2 2 0 0 1 2-2Z"/>'
    '<path fill="url(#g)" d="M28 28h10a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H28a2 2 0 0 1-2-2V30a2 2 0 0 1 2-2Z"/>'
    '<path fill="url(#g)" d="M44 16h10a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2H44a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2Z"/>'
    '<path stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" fill="none" d="M8 30C18 16 34 10 50 7"/>'
    '<path fill="url(#g)" d="M44 2l14 3-8 11z"/>',
)

# 4. Shield + keyhole - Enterprise-Grade Security
icon(
    "feature-security.svg", 64, 64,
    '<path fill="url(#g)" d="M32 5 55 13v17c0 14.5-9.4 24.2-23 29C18.4 54.2 9 44.5 9 30V13Z"/>'
    '<circle cx="32" cy="27" r="6.5" fill="#fff"/>'
    '<rect x="29.4" y="30" width="5.2" height="13" rx="2.6" fill="#fff"/>',
)

# 5. Monitor + phone - Web & Mobile Ready
icon(
    "feature-web-mobile.svg", 72, 64,
    '<path fill="url(#g)" d="M8 8h44a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H34v4h6v5H16v-5h6v-4H8a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4Z"/>'
    '<rect x="9" y="13" width="42" height="26" rx="2" fill="#fff"/>'
    '<rect x="14" y="19" width="18" height="4" rx="2" fill="url(#g)"/>'
    '<rect x="14" y="27" width="28" height="4" rx="2" fill="url(#g)"/>'
    '<rect x="48" y="24" width="20" height="36" rx="5" fill="url(#g)" stroke="#fff" stroke-width="3"/>'
    '<rect x="52" y="31" width="12" height="20" rx="2" fill="#fff"/>'
    '<circle cx="58" cy="55.5" r="2" fill="#fff"/>',
)

# 6. Dashboard bars - Analytics & Reporting
icon(
    "feature-analytics.svg", 64, 64,
    '<path fill="url(#g)" d="M10 8h44a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4Z"/>'
    '<rect x="17" y="34" width="7" height="12" rx="2" fill="#fff"/>'
    '<rect x="28" y="26" width="7" height="20" rx="2" fill="#fff"/>'
    '<rect x="39" y="18" width="7" height="28" rx="2" fill="#fff"/>'
    '<circle cx="47" cy="17" r="4" fill="#fff"/>',
)

# 7. Headset - Dedicated Support
icon(
    "feature-support.svg", 64, 64,
    '<path stroke="url(#g)" stroke-width="5" stroke-linecap="round" fill="none" d="M13 36v-5a19 19 0 0 1 38 0v5"/>'
    '<rect x="7" y="33" width="12" height="18" rx="5" fill="url(#g)"/>'
    '<rect x="45" y="33" width="12" height="18" rx="5" fill="url(#g)"/>'
    '<path stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" fill="none" d="M51 51c0 6-6 8-12 8"/>'
    '<circle cx="36" cy="59" r="4" fill="url(#g)"/>',
)

# 8. Document + seal - Complete Ownership
icon(
    "feature-ownership.svg", 64, 64,
    '<path fill="url(#g)" d="M14 4h24l12 12v18.7A12 12 0 0 0 30 56H14a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z"/>'
    '<path fill="url(#g)" d="M38 4l12 12H42a4 4 0 0 1-4-4Z"/>'
    '<rect x="18" y="16" width="16" height="4" rx="2" fill="#fff"/>'
    '<rect x="18" y="25" width="22" height="4" rx="2" fill="#fff"/>'
    '<rect x="18" y="34" width="12" height="4" rx="2" fill="#fff"/>'
    '<circle cx="45" cy="46" r="11" fill="url(#g)" stroke="#fff" stroke-width="3"/>'
    '<path stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none" d="M39.5 46.5 43.5 50l7.5-8"/>'
    '<path fill="url(#g)" d="M39 55 36 64l5-3 4 3 2-7z"/>',
)

print("feature icons done")

# ---------------------------------------------------------- main illustration
# Modular "built for you" composition: app window with module tiles, gear,
# code tag and connectors. Flat style matching the original product SVGs.
TILES = [
    (76, 80, ORANGE), (120, 80, NAVY), (164, 80, RED),
    (76, 116, PURPLE), (120, 116, ORANGE), (164, 116, NAVY),
]
tiles_svg = ""
for i, (x, y, c) in enumerate(TILES):
    tiles_svg += f'<rect x="{x}" y="{y}" width="36" height="28" rx="4" fill="{c}"/>'
    if i == 0:  # little bar chart
        tiles_svg += (
            '<rect x="81" y="96" width="4" height="7" rx="1.5" fill="#fff"/>'
            '<rect x="87" y="91" width="4" height="12" rx="1.5" fill="#fff"/>'
            '<rect x="93" y="87" width="4" height="16" rx="1.5" fill="#fff"/>')
    elif i == 1:  # check
        tiles_svg += '<path d="M132 93l5 5 9-10" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    elif i == 2:  # user
        tiles_svg += '<circle cx="182" cy="90" r="4" fill="#fff"/><path d="M174 102a8 8 0 0 1 16 0z" fill="#fff"/>'
    elif i == 3:  # gear dot
        tiles_svg += '<circle cx="94" cy="130" r="6" fill="none" stroke="#fff" stroke-width="3"/>'
    elif i == 4:  # lines
        tiles_svg += '<rect x="126" y="122" width="24" height="4" rx="2" fill="#fff"/><rect x="126" y="130" width="16" height="4" rx="2" fill="#fff"/>'
    else:  # arrow up
        tiles_svg += '<path d="M176 138v-10m0 0-4 4m4-4 4 4" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'

gear_teeth = "".join(
    f'<rect x="212" y="30" width="8" height="12" rx="2" fill="{ORANGE}" transform="rotate({a} 216 52)"/>'
    for a in range(0, 360, 45)
)
customized = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 216">
<circle cx="144" cy="110" r="96" fill="#EEF1F8"/>
<circle cx="216" cy="52" r="24" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-dasharray="4 6"/>
<path d="M100 62 C130 40 190 40 224 78" stroke="{ORANGE}" stroke-width="2.5" fill="none" stroke-dasharray="1 7" stroke-linecap="round"/>
<path d="M60 148 C40 128 44 96 66 78" stroke="{NAVY}" stroke-width="2.5" fill="none" stroke-dasharray="1 7" stroke-linecap="round" opacity="0.5"/>
<rect x="64" y="48" width="160" height="120" rx="8" fill="#fff"/>
<path d="M64 56a8 8 0 0 1 8-8h144a8 8 0 0 1 8 8v12H64Z" fill="{NAVY}"/>
<circle cx="76" cy="59" r="3" fill="{RED}"/><circle cx="86" cy="59" r="3" fill="{ORANGE}"/><circle cx="96" cy="59" r="3" fill="#fff" opacity="0.7"/>
<rect x="106" y="54" width="106" height="10" rx="5" fill="#34497F"/>
{tiles_svg}
{gear_teeth}
<circle cx="216" cy="52" r="15" fill="{ORANGE}"/><circle cx="216" cy="52" r="7" fill="#fff"/>
<rect x="24" y="146" width="68" height="38" rx="8" fill="{NAVY}"/>
<text x="58" y="172" font-family="'Courier New', monospace" font-size="19" font-weight="bold" fill="#fff" text-anchor="middle">&lt;/&gt;</text>
<circle cx="50" cy="62" r="13" fill="{ORANGE}"/>
<path d="M44 62l4.5 4.5L57 57" stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M232 150l3.5 8 8 3.5-8 3.5-3.5 8-3.5-8-8-3.5 8-3.5Z" fill="{ORANGE}"/>
<circle cx="250" cy="120" r="4" fill="{RED}" opacity="0.75"/>
<ellipse cx="144" cy="182" rx="96" ry="7" fill="{NAVY}" opacity="0.08"/>
</svg>'''
write(os.path.join(OUT, "customized.svg"), customized)

# ---------------------------------------------------------- hero mockup (700x440)
menu_items = ""
y = 118
for i in range(6):
    if i == 0:
        menu_items += (
            f'<rect x="42" y="{y}" width="126" height="26" rx="6" fill="{ORANGE}"/>'
            f'<rect x="52" y="{y+10}" width="64" height="6" rx="3" fill="#fff"/>')
    else:
        menu_items += (
            f'<rect x="42" y="{y}" width="126" height="26" rx="6" fill="transparent"/>'
            f'<rect x="52" y="{y+10}" width="{70 - i * 4}" height="6" rx="3" fill="#8FA0C9"/>')
    y += 34

kpis = ""
kx, kcols = 195, [ORANGE, RED, PURPLE]
for i, c in enumerate(kcols):
    x = kx + i * 148
    kpis += (
        f'<rect x="{x}" y="104" width="136" height="60" rx="8" fill="#fff" stroke="{GRAY}"/>'
        f'<rect x="{x}" y="104" width="136" height="6" rx="3" fill="{c}"/>'
        f'<rect x="{x+12}" y="122" width="56" height="7" rx="3.5" fill="#C9D2E6"/>'
        f'<rect x="{x+12}" y="138" width="84" height="12" rx="4" fill="{NAVY}"/>'
        f'<rect x="{x+12}" y="152" width="40" height="5" rx="2.5" fill="{c}" opacity="0.7"/>')

bars = ""
heights = [46, 70, 58, 92, 74, 104, 88]
bx = 218
for i, h in enumerate(heights):
    c = ORANGE if i % 2 == 0 else NAVY
    bars += f'<rect x="{bx}" y="{316 - h}" width="18" height="{h}" rx="3" fill="{c}"/>'
    bx += 32

mockup = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 440" font-family="Arial, 'Segoe UI', sans-serif">
<circle cx="350" cy="224" r="212" fill="#F2F5FB"/>
<rect x="30" y="40" width="640" height="360" rx="12" fill="#fff" stroke="{GRAY}"/>
<path d="M30 52a12 12 0 0 1 12-12h616a12 12 0 0 1 12 12v32H30Z" fill="{NAVY}"/>
<circle cx="56" cy="62" r="6" fill="{RED}"/><circle cx="78" cy="62" r="6" fill="{ORANGE}"/><circle cx="100" cy="62" r="6" fill="#4C4D4D"/>
<rect x="130" y="52" width="310" height="21" rx="10.5" fill="#34497F"/>
<text x="146" y="67" font-size="12" fill="#CFD8EC">datrixtechsolutions.com/app</text>
<rect x="30" y="84" width="150" height="316" fill="{NAVY_DARK}"/>
{menu_items}
{kpis}
<rect x="195" y="182" width="290" height="150" rx="8" fill="#fff" stroke="{GRAY}"/>
<rect x="212" y="196" width="90" height="8" rx="4" fill="#C9D2E6"/>
{bars}
<rect x="480" y="182" width="146" height="150" rx="8" fill="#fff" stroke="{GRAY}"/>
<circle cx="553" cy="248" r="42" fill="none" stroke="{GRAY}" stroke-width="14"/>
<circle cx="553" cy="248" r="42" fill="none" stroke="{ORANGE}" stroke-width="14" stroke-dasharray="186 264" transform="rotate(-90 553 248)"/>
<rect x="533" y="243" width="40" height="10" rx="5" fill="{NAVY}"/>
<rect x="195" y="346" width="431" height="40" rx="8" fill="#fff" stroke="{GRAY}"/>
<rect x="210" y="358" width="24" height="16" rx="4" fill="{ORANGE}"/>
<rect x="246" y="362" width="120" height="8" rx="4" fill="#C9D2E6"/>
<rect x="420" y="362" width="80" height="8" rx="4" fill="{GRAY}"/>
<rect x="540" y="358" width="70" height="16" rx="8" fill="{NAVY}" opacity="0.85"/>
<rect x="600" y="150" width="70" height="132" rx="12" fill="#fff" stroke="{GRAY}"/>
<rect x="612" y="164" width="46" height="10" rx="5" fill="{ORANGE}"/>
<rect x="612" y="182" width="46" height="6" rx="3" fill="#C9D2E6"/>
<rect x="612" y="194" width="34" height="6" rx="3" fill="#C9D2E6"/>
<rect x="612" y="210" width="46" height="26" rx="5" fill="{NAVY}"/>
<rect x="612" y="244" width="46" height="26" rx="5" fill="{ORANGE}" opacity="0.85"/>
<rect x="8" y="96" width="96" height="76" rx="10" fill="#fff" stroke="{GRAY}"/>
<circle cx="34" cy="122" r="9" fill="{NAVY}"/><circle cx="78" cy="146" r="9" fill="{ORANGE}"/>
<path d="M34 122C50 110 62 128 78 146" stroke="{RED}" stroke-width="3" fill="none" stroke-dasharray="3 5" stroke-linecap="round"/>
<rect x="20" y="158" width="72" height="6" rx="3" fill="{GRAY}"/>
<circle cx="66" cy="380" r="27" fill="{ORANGE}"/>
<path d="M53 380l9 9 17-19" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''
write(os.path.join(OUT_PC, "customized-mockup.svg"), mockup)

# ---------------------------------------------------------- "idea to launch" block (500x350)
flow = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" font-family="Arial, 'Segoe UI', sans-serif">
<circle cx="150" cy="170" r="120" fill="#EEF1F8"/>
<rect x="52" y="60" width="180" height="220" rx="10" fill="{NAVY}"/>
<rect x="52" y="60" width="180" height="30" rx="10" fill="{NAVY_DARK}"/>
<circle cx="68" cy="75" r="4.5" fill="{RED}"/><circle cx="82" cy="75" r="4.5" fill="{ORANGE}"/><circle cx="96" cy="75" r="4.5" fill="#fff" opacity="0.6"/>
<rect x="68" y="106" width="100" height="10" rx="5" fill="#fff" opacity="0.9"/>
<rect x="68" y="128" width="70" height="44" rx="6" fill="{ORANGE}"/>
<rect x="148" y="128" width="70" height="44" rx="6" fill="#34497F"/>
<rect x="68" y="182" width="150" height="8" rx="4" fill="#8FA0C9"/>
<rect x="68" y="198" width="120" height="8" rx="4" fill="#8FA0C9"/>
<rect x="68" y="214" width="136" height="8" rx="4" fill="#8FA0C9"/>
<rect x="68" y="238" width="60" height="22" rx="11" fill="{ORANGE}"/>
<path d="M52 118l-8 0m8 104h-8M232 118h8m-8 104h8" stroke="{ORANGE}" stroke-width="3" stroke-linecap="round"/>
<path d="M244 170h56m0 0-12-10m12 10-12 10" stroke="{ORANGE}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="356" cy="170" r="96" fill="#F6E8D8" opacity="0.55"/>
<rect x="292" y="82" width="160" height="176" rx="10" fill="#fff" stroke="{GRAY}"/>
<path d="M292 92a10 10 0 0 1 10-10h140a10 10 0 0 1 10 10v18H292Z" fill="{ORANGE}"/>
<circle cx="306" cy="96" r="4" fill="#fff" opacity="0.85"/><circle cx="318" cy="96" r="4" fill="#fff" opacity="0.6"/>
<rect x="308" y="126" width="56" height="8" rx="4" fill="#C9D2E6"/>
<rect x="308" y="144" width="128" height="44" rx="6" fill="#EEF1F8"/>
<path d="M318 178l14-14 12 8 18-20 14 10 20-16" stroke="{NAVY}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="308" y="198" width="60" height="22" rx="6" fill="{NAVY}"/>
<rect x="308" y="228" width="128" height="8" rx="4" fill="#EEF1F8"/>
<circle cx="418" cy="234" r="22" fill="{ORANGE}"/>
<path d="M408 234l7 7 13-15" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M262 60l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="{RED}"/>
<circle cx="248" cy="262" r="5" fill="{PURPLE}" opacity="0.55"/>
<ellipse cx="250" cy="300" rx="180" ry="8" fill="{NAVY}" opacity="0.08"/>
</svg>'''
write(os.path.join(OUT_PC, "custom-flow.svg"), flow)

# ---------------------------------------------------------- delivery process diagram (600x600)
STEPS = [
    ("01", "Discover", "Workshops, analysis and a clear scope", NAVY),
    ("02", "Design", "Wireframes, prototype and sign-off", ORANGE),
    ("03", "Develop", "Agile sprints with regular demos", RED),
    ("04", "Deploy", "Testing, rollout and data migration", PURPLE),
    ("05", "Support", "Training, maintenance and evolution", NAVY),
]
rows = ""
line_y1, step_gap = 96, 102
for i, (num, title, desc, c) in enumerate(STEPS):
    cy = line_y1 + i * step_gap
    if i < len(STEPS) - 1:
        rows += f'<line x1="180" y1="{cy + 40}" x2="180" y2="{cy + step_gap - 40}" stroke="{NAVY}" stroke-width="2.5" stroke-dasharray="2 8" stroke-linecap="round" opacity="0.45"/>'
    rows += (
        f'<circle cx="180" cy="{cy}" r="38" fill="{c}"/>'
        f'<text x="180" y="{cy + 9}" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">{num}</text>'
        f'<text x="244" y="{cy - 6}" font-size="26" font-weight="bold" fill="{NAVY}">{title}</text>'
        f'<rect x="244" y="{cy + 8}" width="44" height="5" rx="2.5" fill="{c}"/>'
        f'<text x="244" y="{cy + 34}" font-size="15" fill="#6B7590">{desc}</text>'
    )
process = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" font-family="Arial, 'Segoe UI', sans-serif">
<circle cx="150" cy="120" r="86" fill="#F6E8D8" opacity="0.45"/>
<circle cx="470" cy="480" r="110" fill="#EEF1F8"/>
<path d="M470 64l4 9 9 4-9 4-4 9-4-9-9-4 9-4Z" fill="{ORANGE}"/>
<circle cx="96" cy="470" r="6" fill="{RED}" opacity="0.6"/>
{rows}
</svg>'''
write(os.path.join(OUT_PC, "delivery-process.svg"), process)

print("all customized assets generated")
