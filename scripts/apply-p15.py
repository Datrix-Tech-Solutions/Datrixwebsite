#!/usr/bin/env python3
"""Re-apply Task 12-15 page fixes after snapshot restore reverted them.
Idempotent: skips work already done. Targets exact production state."""
import re, sys

BASE = "/home/z/my-project/src/components/factura"

HERO_CTA = """            <a
              href="#"
              className="request-btn ghost big"
              onClick={(e) => {{
                e.preventDefault();
                onRequestDemo();
              }}
            >
              Book a Demo
            </a>"""

def hero(section_cls, h1_lines, para_lines, extra_before_cta=""):
    h1 = "\n              ".join(h1_lines)
    para = "\n              ".join(para_lines)
    return f"""      <section className="{section_cls}">
        <ParticleField interactive />
        <div className="container vibe-hero-inner">
          <div className="factura-intro">
            <span className="vibe-kicker">Datrix Tech Solutions</span>
            <h1>
              {h1}
            </h1>
            <span className="vibe-divider" aria-hidden="true" />
{extra_before_cta}<p className="paragraph2">
              {para}
            </p>
            <a
              href="#"
              className="request-btn ghost big"
              onClick={{(e) => {{
                e.preventDefault();
                onRequestDemo();
              }}}}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>"""

def patch(path, subs, regex_subs=()):
    with open(path) as f:
        src = f.read()
    orig = src
    for old, new in subs:
        if old in src:
            src = src.replace(old, new, 1)
        elif new in src:
            pass  # already applied
        else:
            print(f"  !! literal not found in {path}:\n{old[:90]}...")
    for pat, rep in regex_subs:
        flags = None if hasattr(pat, "pattern") else re.S
        src, n = re.subn(pat, rep, src, count=1, flags=flags)
        if n == 0:
            print(f"  !! regex missed in {path}: {getattr(pat, 'pattern', pat)[:70]}")
    if src != orig:
        with open(path, "w") as f:
            f.write(src)
        print(f"  patched {path}")
    else:
        print(f"  no change {path}")

# ---------- shared bits ----------
IMPORT_OLD = 'import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";'
IMPORT_NEW = 'import ParticleField from "./../ParticleField";\nimport { ClientsSlider } from "./../TestimonialSliders";'

TESTIMONIAL_SECTION = re.compile(
    r'\n      <section className="testimonial2 sectionPadding" id="testimonials">.*?</section>\n', re.S
)

# ---------- FinancialPage ----------
p = f"{BASE}/pages/FinancialPage.tsx"
src = open(p).read()
if "screen-pos" in src:
    # remove POS slide (line block) from FEATURE_SLIDES
    lines = src.split("\n")
    start = next(i for i, l in enumerate(lines) if "screen-pos" in l)
    # backtrack to slide opening brace
    while not lines[start].strip().startswith("{"):
        start -= 1
    end = start
    depth = 0
    while True:
        depth += lines[end].count("{") - lines[end].count("}")
        if depth == 0 and end > start:
            break
        end += 1
    del lines[start:end + 1]
    # also swallow a trailing blank line if doubled
    src = "\n".join(lines)
patch(p, [
    (IMPORT_OLD, IMPORT_NEW),
    ('  ["#testimonials", "Testimonials"],\n', ''),
], regex_subs=[
    (r'      <section className="financial-banner topBannerSection">.*?</section>\n',
     hero("financial-banner topBannerSection vibe-hero vibe-hero--navy",
          ["AccountingPhelo — online accounting", "<br />", "built for your business."],
          ["Discover why over 6,000 users run on AccountingPhelo."]) + "\n"),
    (TESTIMONIAL_SECTION, "\n"),
])

# ---------- CrmPage ----------
p = f"{BASE}/pages/CrmPage.tsx"
patch(p, [
    (IMPORT_OLD, IMPORT_NEW),
    ('''          <li>
            <a href="#testimonials" onClick={scrollTo("#testimonials")}>Testimonials</a>
          </li>
''', ''),
], regex_subs=[
    (r'      <section className="crm-banner topBannerSection">.*?</section>\n',
     hero("crm-banner topBannerSection vibe-hero vibe-hero--navy",
          ["CRM Built for Lifelong Customer Bonds"],
          ["Keep your sales pipeline moving, track team activity and", "win more deals."]) + "\n"),
    (TESTIMONIAL_SECTION, "\n"),
])

# ---------- PayrollPage ----------
p = f"{BASE}/pages/PayrollPage.tsx"
patch(p, [
    (IMPORT_OLD, IMPORT_NEW),
    ('''          <li>
            <a href="#testimonials" onClick={scrollTo("#testimonials")}>Testimonials</a>
          </li>
''', ''),
], regex_subs=[
    (r'      <section className="payroll-banner topBannerSection">.*?</section>\n',
     hero("payroll-banner topBannerSection vibe-hero vibe-hero--navy",
          ["An HRMS That’s Efficient, Flexible &amp; Complete"],
          ["HRPhelo takes the hassle out of Payroll and HR management", "for organizations of every size."]) + "\n"),
    (TESTIMONIAL_SECTION, "\n"),
])

# ---------- ContractPage (keeps testimonials, gains vibe hero) ----------
CONTRACT_HERO = '''      <section className="financial-banner vibe-hero vibe-hero--navy">
        <ParticleField interactive />
        <div className="container vibe-hero-inner">
          <div className="factura-intro">
            <span className="vibe-kicker">Datrix Tech Solutions</span>
            <h1>
              Customized Software,
              <br />
              Made Around You.
            </h1>
            <span className="vibe-divider" aria-hidden="true" />
            <ul className="contract-intro-points ml-4">
              {[
                "Shaped To Your Workflows",
                "Web & Mobile Applications",
                "Effortless Integrations",
                "Grows With You, Securely",
              ].map((p) => (
                <li key={p}>
                  <span className="fa-check"></span>
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="request-btn ghost big"
              onClick={(e) => {
                e.preventDefault();
                onRequestDemo();
              }}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>
'''
p = f"{BASE}/pages/ContractPage.tsx"
src = open(p).read()
if 'import ParticleField' not in src:
    src = src.replace(
        'import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";',
        'import ParticleField from "./../ParticleField";\nimport { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";',
        1)
src, n = re.subn(r'      <section className="financial-banner">.*?</section>\n', CONTRACT_HERO, src, count=1, flags=re.S)
if n == 0:
    print("  !! contract hero regex missed")
open(p, "w").write(src)
print(f"  patched {p}")

# ---------- Header (POS) ----------
p = f"{BASE}/Header.tsx"
patch(p, [
    ('    { label: "Order & POS", slug: "/financial#features" },\n', ''),
    ('      "Customisable Templates", "POS", "Delivery Notes/Waybills",',
     '      "Customisable Templates", "Delivery Notes/Waybills",'),
])

# ---------- factura.css casing ----------
p = "/home/z/my-project/src/styles/factura.css"
patch(p, [
    (".productMenu a{\n        margin:0;\n        text-transform: capitalize;",
     ".productMenu a{\n        margin:0;\n        text-transform: none;"),
])

print("done")
