#!/usr/bin/env python3
"""Recolor legacy icon families to the Datrix brand palette.

Families & mappings (gradient stops + stray fills):
- page-payroll/*.svg  : purple #9028ad/#6228ad -> brand blue/navy
- page-financials/features-*.svg + industries-*.svg : cyan #00b5d3/#0066b0 -> brand blue/navy
- page-crm/{customer-retention,investing-CRM,sales-increased}.svg : #f6c315/#f0542d -> brand blue/navy
- page-contract/feature-*.svg : red-orange family -> brand blue/navy
- strays anywhere in page-* : #440E62 -> #1B75BB, #E31B22 -> #E8720C

Only recolors exact-case-insensitive hex matches inside stop-color / fill /
stroke attributes and CSS style blocks. Leaves whites/navies/greens intact.
"""
import re
from pathlib import Path

BASE = Path("/home/z/my-project/public/assets/img")

# Ordered mappings: (pattern_hex_set, replacement_map) — applied case-insensitively
GLOBAL_STRAY = {
    "#440E62": "#1B75BB",
    "#440e62": "#1B75BB",
    "#E31B22": "#E8720C",
    "#e31b22": "#E8720C",
}

FAMILY_MAPS = {
    # payroll purple gradient -> brand blue -> navy
    "#9028ad": "#1B75BB", "#6228ad": "#21346B",
    "#9028AD": "#1B75BB", "#6228AD": "#21346B",
    # financials cyan/blue gradient -> brand blue -> navy
    "#00b5d3": "#2D9CDB", "#0066b0": "#21346B",
    "#00B5D3": "#2D9CDB", "#0066B0": "#21346B",
    # crm counters yellow/orange -> brand blue -> navy
    "#f6c315": "#1B75BB", "#f0542d": "#21346B",
    "#F6C315": "#1B75BB", "#F0542D": "#21346B",
    # contract red-orange family -> brand pair (light stop family -> blue, dark -> navy)
    "#fd8b43": "#2D9CDB", "#ff9648": "#2D9CDB",
    "#FD8B43": "#2D9CDB", "#FF9648": "#2D9CDB",
    "#f56332": "#1B75BB", "#F56332": "#1B75BB",
    "#f04a28": "#21346B", "#ee4124": "#21346B",
    "#F04A28": "#21346B", "#EE4124": "#21346B",
}
FAMILY_MAPS.update(GLOBAL_STRAY)


def remap(text: str) -> tuple[str, int]:
    count = 0
    for old, new in FAMILY_MAPS.items():
        n = text.count(old)
        if n:
            text = text.replace(old, new)
            count += n
    return text, count


def main() -> None:
    targets = []
    targets += sorted((BASE / "page-payroll").glob("*.svg"))
    targets += sorted((BASE / "page-financials").glob("features-*.svg"))
    targets += sorted((BASE / "page-financials").glob("industries-*.svg"))
    targets += [BASE / "page-crm" / n for n in
                ("customer-retention.svg", "investing-CRM.svg", "sales-increased.svg")]
    targets += sorted((BASE / "page-contract").glob("feature-*.svg"))
    # strays in the three contract showcase files
    targets += [BASE / "page-contract" / n for n in
                ("customized-mockup.svg", "delivery-process.svg", "custom-flow.svg")]

    seen, total_files, total_subs = set(), 0, 0
    for path in targets:
        if path in seen or not path.exists():
            continue
        seen.add(path)
        original = path.read_text(encoding="utf-8")
        recolored, n = remap(original)
        if n:
            path.write_text(recolored, encoding="utf-8")
            total_files += 1
            total_subs += n
            print(f"  {path.relative_to(BASE)}: {n} substitutions")
    print(f"\nDone: {total_files} files recolored, {total_subs} substitutions")


if __name__ == "__main__":
    main()
