'use client';

import { useEffect, useRef, useState } from 'react';

// About, received word by word: each word comes in as the reader scrolls through it.
const TEXT =
  'Four years of making real-time feel instant. I care about the half-second between someone speaking and the screen answering: the latency, the reconnect, the accessible label, the layout that holds from 320 to 2560 pixels. Right now that means cloud telephony, IVR and AI voice bots at SparkTG.';
const KEY = new Set(['real-time', 'instant.', 'half-second', 'latency,', 'reconnect,', 'SparkTG.']);

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(0);
  const words = TEXT.split(' ');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const vh = window.innerHeight;
        setP(Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35))));
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  const lit = Math.floor(p * words.length * 1.05);

  return (
    <section className="s-statement" aria-label="About">
      <p className="s-eyebrow s-mono">Receiving · {Math.min(100, Math.round(p * 100))}%</p>
      <p ref={ref} className="s-statement-text">
        {words.map((w, i) => (
          <span key={i} className={`${i < lit ? 'on' : ''} ${KEY.has(w) ? 'key' : ''}`}>{w} </span>
        ))}
      </p>
    </section>
  );
}
