'use client';

import { useEffect, useRef, useState } from 'react';
import { line } from './data';

// His path as a signal line: a packet travels down the cable as you scroll and each stop lights
// when the packet reaches it. The last stop (now) keeps pulsing.
export default function Line() {
  const sec = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [fill, setFill] = useState(0);
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = rail.current?.getBoundingClientRect();
        if (!r) return;
        const head = window.innerHeight * 0.62;
        const px = Math.min(r.height, Math.max(0, head - r.top));
        setFill(px);
        let l = -1;
        items.current.forEach((el, i) => {
          if (el && el.getBoundingClientRect().top + 18 - r.top <= px) l = i;
        });
        setLit(l);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="line" ref={sec} className="s-line" aria-label="Career path">
      <div className="s-line-head" data-reveal>
        <p className="s-eyebrow s-mono">The path</p>
        <h2 className="s-h2">Bareilly → Noida.<br /><em>Six years, one line.</em></h2>
      </div>
      <div className="s-rail" ref={rail}>
        <div className="s-rail-track" aria-hidden="true" />
        <div className="s-rail-fill" style={{ height: fill }} aria-hidden="true" />
        <div className="s-rail-head" style={{ transform: `translateY(${fill}px)` }} aria-hidden="true" />
        <ol>
          {line.map((s, i) => (
            <li
              key={`${s.org}-${s.year}`}
              ref={(el) => { items.current[i] = el; }}
              className={`s-stop is-${s.kind} ${i <= lit ? 'is-lit' : ''} ${s.now ? 'is-now' : ''}`}
            >
              <span className="s-node" aria-hidden="true" />
              <div className="s-stop-year">{s.year}</div>
              <div className="s-stop-body">
                <p className="s-mono s-stop-kind">
                  {s.kind === 'work' ? 'work' : 'study'} · {s.place}{s.now ? ' · now' : ''}
                </p>
                <h3 className="s-stop-role">{s.role}</h3>
                <p className="s-stop-org">{s.org}</p>
                <ul>
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <a href="/resume" className="s-resume-link">
          <span className="s-mono">one page · PDF · plain text</span>
          <b>Read the full résumé <span aria-hidden="true">→</span></b>
        </a>
      </div>
    </section>
  );
}
