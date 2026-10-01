'use client';

import { useEffect, useRef } from 'react';
import { metrics } from './data';

// Two rows of numbers he has actually shipped, running in opposite directions. Scroll velocity
// pushes them faster and skews them, so the strip reacts like a signal under load.
export default function Ticker() {
  const wrap = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0, visible = false, lastY = window.scrollY, vel = 0;
    const offs = [0, 0];
    const loop = () => {
      const y = window.scrollY;
      vel = vel * 0.9 + (y - lastY) * 0.1;
      lastY = y;
      rows.current.forEach((row, i) => {
        if (!row) return;
        const half = row.scrollWidth / 2;
        const dir = i === 0 ? -1 : 1;
        offs[i] += dir * (0.45 + Math.min(6, Math.abs(vel) * 0.35));
        if (offs[i] <= -half) offs[i] += half;
        if (offs[i] > 0) offs[i] -= half;
        const skew = Math.max(-8, Math.min(8, vel * 0.25)) * dir;
        row.style.transform = `translate3d(${offs[i]}px,0,0) skewX(${skew}deg)`;
      });
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) { lastY = window.scrollY; raf = requestAnimationFrame(loop); }
    });
    io.observe(wrap.current!);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const half = Math.ceil(metrics.length / 2);
  const sets = [metrics.slice(0, half), metrics.slice(half)];

  return (
    <div ref={wrap} className="s-ticker" aria-label="Numbers from his work">
      {sets.map((set, i) => (
        <div key={i} className="s-ticker-row" ref={(el) => { rows.current[i] = el; }}>
          {[0, 1].map((copy) =>
            [...set, ...set].map((m, j) => (
              <span key={`${copy}-${j}`} className="s-chip" aria-hidden={copy === 1 || j >= set.length ? true : undefined}>
                <b>{m.value}</b> {m.label}
                <i aria-hidden="true">✶</i>
              </span>
            )),
          )}
        </div>
      ))}
    </div>
  );
}
