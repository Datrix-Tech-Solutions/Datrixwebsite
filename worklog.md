---
Task ID: 1
Agent: main (Super Z)
Task: Replace site logo with uploaded Datrix Tech Solutions logo and re-theme the entire rebuilt Factura website using the logo's colors (expert UI/UX pass)

Work Log:
- Sampled exact brand colors from upload/logo (1).png: Navy #21346B, Orange #F7941D, Red #E31B22, Purple #440E62, Gray #4C4D4D
- Generated brand assets (scripts/make_datrix_assets.py): datrix-logo.png (color, header), datrix-logo-white.png (white wordmark for navy footer), datrix-mark.png (square favicon cropped from circle mark)
- Recolored subscribe-bg.svg green gradient to orange; re-themed src/styles/factura.css: 100+ color tokens mapped (financial->navy, payroll/HRMS->purple, contract->red, crm->orange, headings/footer/buttons->navy, footer links->orange, demo-btn gradient navy->purple, payroll gradient purple, crm gradient red->orange)
- Swapped header logo (Header.tsx), added footer brand row with white logo + tagline (Footer.tsx), updated WorldMap colors (orange landmass, navy markers/balloon), updated layout.tsx metadata + favicon
- Rebranded all user-visible "Factura" -> "Datrix" / "Factura Softwares" -> "Datrix Tech Solutions", emails/URLs -> datrixtechsolutions.com across pages + data.ts
- Repaired broken PNG CRCs in pack-*.svg mockups (Sketch export bug), located old "factura" logo block on 3D box art, erased and pasted Datrix logo, re-embedded base64 (scripts/extract_pack_pngs.py, fix_pack_crcs.py, rebrand_pack_svgs.py)
- Verified visually via agent-browser: home, financial, payroll, contract, crm, contact pages + testimonial bands, competitive table, module tabs, demo modal, footer, mobile viewport + mobile menu
- bun run build: compiled successfully

Stage Summary:
- Site fully rebranded to Datrix Tech Solutions with logo-derived theme; production build passes
- Key assets: public/assets/img/datrix-logo.png, datrix-logo-white.png, datrix-mark.png
- Scripts persisted in /home/z/my-project/scripts/ for future asset regeneration
- Note: hero product videos (public/assets/vid/*.mp4) still contain original screen-recording footage (not re-colorable)
