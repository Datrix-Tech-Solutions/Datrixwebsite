"use client";

import React, { useEffect, useRef } from "react";

/**
 * CustomCursor — a blend-difference dot with a lagging ring.
 * Activation re-checks pointer capabilities on mount (HMR-safe);
 * state classes live on <html> so CSS owns every visual transition.
 *
 *  - only activates on fine-pointer, hover-capable devices (the pair
 *    stays inert otherwise: opacity 0 + touch devices hide it via CSS)
 *  - disabled for prefers-reduced-motion users (native cursor stays)
 *  - ring trails the pointer with easing; dot follows tighter
 *  - grows over interactive elements, contracts on press, fades over
 *    text fields so the native I-beam stays readable
 *  - mix-blend-mode: difference keeps it visible on every hero colour
 */

const HOVER_SELECTOR =
  'a, button, [role="button"], [data-cursor], label, summary, select, .nav-link, .dropdown-toggle, .request-btn, .navbar-toggler, .slick-arrow, .industries-icon';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const root = document.documentElement;
    root.classList.add("da-cursor-on");

    const s = {
      x: -100, y: -100, // raw pointer
      dx: -100, dy: -100, // dot (eased)
      rx: -100, ry: -100, // ring (lagging)
      seen: false,
    };

    const onMove = (e: PointerEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
      if (!s.seen) {
        s.seen = true;
        s.dx = s.rx = s.x;
        s.dy = s.ry = s.y;
        root.classList.add("da-cursor-seen");
      }
    };

    const toggle = (cls: string, on: boolean) => root.classList.toggle(cls, on);

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || typeof t.closest !== "function") return;
      const text = t.closest(TEXT_SELECTOR);
      const hov = text ? null : t.closest(HOVER_SELECTOR);
      toggle("da-cursor-text", !!text);
      toggle("da-cursor-hover", !!hov);
    };

    const onDown = () => toggle("da-cursor-down", true);
    const onUp = () => toggle("da-cursor-down", false);
    // leaving the window hides the pair until the pointer returns
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) root.classList.add("da-cursor-hidden");
    };
    const onEnter = () => root.classList.remove("da-cursor-hidden");

    let raf = 0;
    const loop = () => {
      s.dx += (s.x - s.dx) * 0.55;
      s.dy += (s.y - s.dy) * 0.55;
      s.rx += (s.x - s.rx) * 0.16;
      s.ry += (s.y - s.ry) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.dx}px, ${s.dy}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mouseover", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseover", onEnter);
      root.classList.remove(
        "da-cursor-on",
        "da-cursor-seen",
        "da-cursor-hover",
        "da-cursor-down",
        "da-cursor-text",
        "da-cursor-hidden"
      );
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="da-cursor-ring" aria-hidden="true">
        <span />
      </div>
      <div ref={dotRef} className="da-cursor-dot" aria-hidden="true">
        <span />
      </div>
    </>
  );
}
