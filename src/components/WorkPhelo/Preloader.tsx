"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Preloader — brand boot sequence.
 * Charcoal stage, spinning orange arc around the Datrix mark,
 * letter-by-letter wordmark reveal, thin progress bar synced to a
 * 0→100 counter, then the whole curtain lifts away.
 *
 * Rules of conduct:
 *  - plays at most once per browser session (sessionStorage guard)
 *  - skipped entirely for prefers-reduced-motion users
 *  - waits for window load, capped so slow networks never trap the user
 *  - locks scrolling only while visible
 */

type Phase = "boot" | "run" | "exit" | "done";

const SESSION_KEY = "da-preloaded";
const RUN_MS = 1350; // progress sweep duration
const HOLD_MS = 180; // brief pause once the counter hits 100
const MAX_WAIT_MS = 2600; // hard cap regardless of window load state
const EXIT_MS = 850; // must match the CSS curtain transition

const WORDMARK = "DATRIX TECH SOLUTIONS";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// useLayoutEffect on the client (removes the overlay before the first
// paint on repeat visits), plain useEffect on the server to keep SSR quiet.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Preloader() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);
  const raf = useRef<number | null>(null);

  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY) === "1";

    if (reduced || seen) {
      setPhase("done");
      return;
    }

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    setPhase("run");

    let loadDone = document.readyState === "complete";
    const onLoad = () => {
      loadDone = true;
    };
    window.addEventListener("load", onLoad);

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / RUN_MS);
      setProgress(Math.round(easeOutCubic(t) * 100));
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
        return;
      }
      // sweep finished — release as soon as the page is loaded (or the cap)
      const elapsed = now - start;
      const remaining = loadDone ? 0 : Math.max(0, MAX_WAIT_MS - RUN_MS - elapsed);
      timers.current.push(
        window.setTimeout(() => {
          setPhase("exit");
          sessionStorage.setItem(SESSION_KEY, "1");
          html.style.overflow = prevOverflow;
          timers.current.push(window.setTimeout(() => setPhase("done"), EXIT_MS));
        }, remaining + HOLD_MS)
      );
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      timers.current.forEach(clearTimeout);
      timers.current = [];
      window.removeEventListener("load", onLoad);
      html.style.overflow = prevOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="da-preloader" data-phase={phase} aria-hidden="true">
      <div className="da-preloader__inner">
        <div className="da-preloader__mark">
          <span className="da-preloader__arc" />
          <img src="/assets/img/datrix-mark.png" alt="" />
        </div>
        <div className="da-preloader__word">
          {WORDMARK.split("").map((ch, i) => (
            <span key={`${ch}-${i}`} style={{ animationDelay: `${0.15 + i * 0.028}s` }}>
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>
        <div
          className="da-preloader__bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="da-preloader__meta">
          <span>Loading experience</span>
          <span className="da-preloader__pct">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
