"use client";

import React, { useEffect, useRef } from "react";

/**
 * ParticleField — living constellation drawn on a canvas.
 *
 * Props:
 *   color       "r,g,b" particle/line colour (default white)
 *   density     one particle per N square pixels (default 11000)
 *   interactive adds the pointer constellation: hairline links to the
 *               cursor within 150px, a 2.6px cursor dot, and a gentle
 *               120px repulsion impulse on click/drag
 *
 * Accessibility / performance:
 *   - DPR capped at 2
 *   - prefers-reduced-motion renders a single static frame
 *   - pauses via visibilitychange, events bound to the canvas parent
 */

interface ParticleFieldProps {
  color?: string;
  density?: number;
  interactive?: boolean;
}

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticleField({
  color = "255,255,255",
  density = 11000,
  interactive = false,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let particles: P[] = [];
    let raf = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };
    const impulse = { x: 0, y: 0 };

    const seed = () => {
      const count = Math.max(24, Math.round((w * h) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.15 + 0.55,
      }));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(); // static frame only
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // particle-to-particle constellation mesh
      const LINK = 130;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${color}, ${0.32 * (1 - d / LINK)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        if (p.y < -8) p.y = h + 8;
        if (p.y > h + 8) p.y = -8;

        if (interactive && pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          // pointer constellation links
          if (d < 150) {
            ctx.strokeStyle = `rgba(${color}, ${0.5 * (1 - d / 150)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
          // repulsion impulse
          if (d < 120 && d > 0.001) {
            const f = ((120 - d) / 120) * 0.55;
            p.vx = clamp(p.vx + (dx / d) * f, -2.2, 2.2);
            p.vy = clamp(p.vy + (dy / d) * f, -2.2, 2.2);
          }
        }

        ctx.fillStyle = `rgba(${color}, 0.85)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // cursor dot
      if (interactive && pointer.active) {
        ctx.fillStyle = `rgba(${color}, 0.95)`;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // decay velocities back toward drift
      for (const p of particles) {
        p.vx *= 0.9;
        p.vy *= 0.9;
        const sp = Math.hypot(p.vx, p.vy);
        if (sp < 0.05) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }
      }
    };

    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    const tick = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      impulse.x = e.clientX - rect.left;
      impulse.y = e.clientY - rect.top;
      for (const p of particles) {
        const dx = p.x - impulse.x;
        const dy = p.y - impulse.y;
        const d = Math.hypot(dx, dy);
        if (d < 120 && d > 0.001) {
          const f = ((120 - d) / 120) * 2.2;
          p.vx = clamp(p.vx + (dx / d) * f, -2.2, 2.2);
          p.vy = clamp(p.vy + (dy / d) * f, -2.2, 2.2);
        }
      }
    };
    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced) {
      draw(); // one calm frame, no motion
    } else {
      raf = requestAnimationFrame(tick);
      document.addEventListener("visibilitychange", onVisibility);
    }

    if (interactive) {
      parent.addEventListener("pointermove", onPointerMove);
      parent.addEventListener("pointerdown", onPointerDown);
      parent.addEventListener("pointerleave", onPointerLeave);
      parent.addEventListener("pointercancel", onPointerLeave);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (interactive) {
        parent.removeEventListener("pointermove", onPointerMove);
        parent.removeEventListener("pointerdown", onPointerDown);
        parent.removeEventListener("pointerleave", onPointerLeave);
        parent.removeEventListener("pointercancel", onPointerLeave);
      }
    };
  }, [color, density, interactive]);

  return <canvas ref={canvasRef} className="vibe-particles" aria-hidden="true" />;
}
