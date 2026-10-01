'use client';

import { useEffect, useRef, useState } from 'react';
import { bands } from './data';
import { useInView } from './hooks';

// The stack as a frequency response. Idle, every band dances like an equaliser; pick a band and
// it locks at full level and reads out its skills. Segment count = number of skills in the band.
const SEG = 7;

export default function Spectrum() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [levels, setLevels] = useState<number[]>(() => bands.map(() => 3));
  const [sel, setSel] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const pick = hover ?? sel;

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLevels(bands.map((b) => b.skills.length));
      return;
    }
    const id = window.setInterval(() => {
      setLevels((lv) => lv.map((l, i) => {
        const max = bands[i].skills.length;
        const target = 1 + Math.floor(Math.random() * max);
        return Math.round(l + (target - l) * 0.6);
      }));
    }, 160);
    return () => window.clearInterval(id);
  }, [inView]);

  const shown = pick ?? 0;

  return (
    <section id="spectrum" ref={ref} className="s-spectrum" aria-label="Skills">
      <div className="s-spec-head" data-reveal>
        <p className="s-eyebrow s-mono">Frequency response</p>
        <h2 className="s-h2">The full range,<br /><em>front to back.</em></h2>
      </div>

      <div className="s-eq" onMouseLeave={() => setHover(null)}>
        {bands.map((b, i) => {
          const level = pick === i ? b.skills.length : pick !== null ? Math.min(levels[i], 2) : levels[i];
          return (
            <button
              key={b.name}
              className={`s-band ${pick === i ? 'is-pick' : ''} ${pick !== null && pick !== i ? 'is-dim' : ''}`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => setSel(sel === i ? null : i)}
              aria-pressed={sel === i}
              aria-label={`${b.name}: ${b.skills.join(', ')}`}
            >
              <span className="s-segs" aria-hidden="true">
                {Array.from({ length: SEG }).map((_, k) => {
                  const idx = SEG - 1 - k;
                  const exists = idx < b.skills.length;
                  return <i key={k} className={`${exists ? '' : 'none'} ${exists && idx < level ? 'on' : ''} ${idx >= 5 ? 'hot' : ''}`} />;
                })}
              </span>
              <span className="s-band-name s-mono">{b.name}</span>
            </button>
          );
        })}
      </div>

      <div className="s-readout" aria-live="polite">
        <p className="s-mono s-readout-k">{pick === null ? 'tap a band' : `band ${String(shown + 1).padStart(2, '0')} · ${bands[shown].name}`}</p>
        <p className="s-readout-v">
          {(pick === null ? bands.flatMap((b) => b.skills.slice(0, 1)) : bands[shown].skills).map((s, i) => (
            <span key={`${shown}-${pick}-${s}`} style={{ '--i': i } as React.CSSProperties}>{s}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
