import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * Server-side relay: validates the enquiry and forwards it to the
 * Datrix dps@ inbox through FormSubmit's AJAX endpoint.
 * The 9s timeout + explicit browser-ish headers keep FormSubmit happy.
 */

const TARGET_EMAIL = "dps@datrixtechsolutions.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; mobile?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const mobile = (body.mobile ?? "").trim();
  const notes = (body.notes ?? "").trim();

  if (name.length < 2 || name.length > 25) {
    return NextResponse.json({ ok: false, error: "Invalid name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; DatrixSite/1.0)",
        Referer: "https://www.datrixtechsolutions.com/",
      },
      body: JSON.stringify({
        name,
        email,
        mobile,
        notes: notes || "—",
        _subject: `Website Enquiry — ${name}`,
        _template: "table",
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Relay unavailable" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Relay unreachable" },
      { status: 502 }
    );
  } finally {
    clearTimeout(timer);
  }
}
