#!/usr/bin/env python3
"""Compare remote production CSS chunks against local style files.
Finds rule selectors present remotely but missing locally (and vice versa)
for the vibe/apple/motion layers."""
import re, sys, glob

REMOTE = "/home/z/my-project/tool-results/remote-a091ce374fca638d.css"
LOCAL_GLOB = "/home/z/my-project/src/styles/factura-*.css"

def read(p):
    with open(p) as f:
        return f.read()

remote = read(REMOTE)
local = "\n".join(read(p) for p in sorted(glob.glob(LOCAL_GLOB)))

def class_tokens(css):
    return set(re.findall(r'\.([a-zA-Z][a-zA-Z0-9_-]+)', css))

rc = class_tokens(remote)
lc = class_tokens(local)

only_remote = sorted(rc - lc)
only_local = sorted(lc - rc)

print("=== class tokens ONLY in remote CSS (%d) ===" % len(only_remote))
for t in only_remote:
    print("  ." + t)
print("\n=== class tokens ONLY in local CSS (%d) ===" % len(only_local))
for t in only_local:
    print("  ." + t)

# also extract full rule bodies from remote for the classes we care about
KEY = ["vibe-hero-mark", "vibe-arrow", "smoothScroll", "vibe-hero-mailto",
       "reach-mail", "contact-failure", "service-tabs", "vibe-kicker"]
print("\n=== remote rules for key classes ===")
for key in KEY:
    for m in re.finditer(r'([^{}]*' + re.escape(key) + r'[^{}]*)\{([^{}]*)\}', remote):
        sel = re.sub(r'\s+', ' ', m.group(1)).strip()
        body = re.sub(r'\s+', ' ', m.group(2)).strip()
        in_local = re.search(re.escape(sel.split(',')[0].strip()), local) is not None
        print(f"\n--- {sel}  [local-has-selector: {in_local}]")
        print(f"    {body[:300]}")
