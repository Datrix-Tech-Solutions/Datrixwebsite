"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal engine for the whole app.
 *
 * Progressive enhancement: the hidden state (.rv) is only ever ADDED
 * by this script when IntersectionObserver is available and the user
 * has not asked for reduced motion — so content is never lost without
 * JavaScript. Rows are revealed as one unit; rows made of a few grid
 * columns reveal column-by-column with a soft stagger.
 *
 * Re-scans on every hash change (route swap) so freshly mounted
 * pages animate in as well.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.rvDelay || "0", 10);
          el.classList.add("rv-in");
          // once the entrance finished, remove the stagger delay so
          // subsequent hover transitions on the element stay instant
          window.setTimeout(() => el.classList.add("rv-done"), 700 + delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    const bind = (el: HTMLElement, delay: number) => {
      if (el.dataset.rvBound === "1") return;
      el.dataset.rvBound = "1";
      el.dataset.rvDelay = String(delay);
      el.classList.add("rv");

      const rect = el.getBoundingClientRect();
      const alreadyVisible =
        rect.top < window.innerHeight * 0.94 && rect.bottom > 0;

      if (alreadyVisible) {
        // double rAF ensures the hidden state is painted first,
        // producing a soft entrance instead of a jumpy swap
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            el.classList.add("rv-in");
            window.setTimeout(() => el.classList.add("rv-done"), 700 + delay);
          })
        );
      } else {
        observer.observe(el);
      }
    };

    const scan = () => {
      const rows = document.querySelectorAll<HTMLElement>(
        "section .container > .row, section .container-fluid > .row"
      );

      rows.forEach((row) => {
        if (
          row.closest(
            'header, footer, .modal, .tab-content, .slick-slider, [class*="banner"]'
          )
        )
          return;

        const cols = Array.from(row.children).filter((child) => {
          const cls = (child as HTMLElement).className || "";
          return /(^|\s)col(-|sm|md|lg|xl|-xs|\s|$)/.test(cls);
        }) as HTMLElement[];

        if (cols.length > 1 && cols.length <= 6) {
          cols.forEach((col, i) => bind(col, Math.min(i, 5) * 90));
        } else {
          bind(row, 0);
        }
      });
    };

    const rescan = () => window.setTimeout(scan, 120);

    scan();
    window.addEventListener("hashchange", rescan);
    window.addEventListener("load", rescan);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", rescan);
      window.removeEventListener("load", rescan);
    };
  }, []);

  return null;
}
