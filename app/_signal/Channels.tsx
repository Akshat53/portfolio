'use client';

import { useEffect, useRef, useState } from 'react';
import { channels, type Channel } from './data';
import { Demo } from './demos';
import { useInView } from './hooks';

const STEP_VH = 85; // scroll distance per channel on the pinned switchboard

function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return wide;
}

function Meta({ c }: { c: Channel }) {
  return (
    <div className="s-meta">
      <p className="s-eyebrow s-mono">CH {c.ch} · {c.category}</p>
      <h3 className="s-ch-title">{c.title}</h3>
      <p className="s-ch-desc">{c.description}</p>
      <ul className="s-impact">
        {c.impact.map((x) => <li key={x}>{x}</li>)}
      </ul>
      <p className="s-stack s-mono">{c.stack.join(' · ')}</p>
      {c.link && (
        <a className="s-link" href={c.link} target="_blank" rel="noopener noreferrer">
          View the code <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

function Pinned() {
  const sec = useRef<HTMLElement>(null);
  const [p, setP] = useState(0); // 0..n-1, continuous
  const n = channels.length;
  const active = Math.min(n - 1, Math.max(0, Math.round(p)));
  const [flash, setFlash] = useState(0);
  const prev = useRef(active);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sec.current; if (!el) return;
        const step = (window.innerHeight * STEP_VH) / 100;
        const y = -el.getBoundingClientRect().top;
        setP(Math.min(n - 1, Math.max(0, y / step)));
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [n]);

  useEffect(() => {
    if (prev.current !== active) { setFlash((f) => f + 1); prev.current = active; }
  }, [active]);

  const go = (i: number) => {
    const el = sec.current; if (!el) return;
    const step = (window.innerHeight * STEP_VH) / 100;
    window.scrollTo({ top: el.offsetTop + i * step + 2, behavior: 'smooth' });
  };

  const inView = useInView(sec);
  const c = channels[active];

  return (
    <section
      id="channels"
      ref={sec}
      className="s-channels is-pinned"
      style={{ height: `calc(${(n - 1) * STEP_VH}vh + 100vh)` }}
      aria-label="Selected work"
    >
      <div className="s-board">
        <div className="s-board-head" data-reveal>
          <p className="s-eyebrow s-mono">Selected work</p>
          <h2 className="s-h2">Six channels.<br /><em>Each one performs itself.</em></h2>
        </div>

        <ol className="s-list" role="tablist" aria-label="Projects">
          {channels.map((ch, i) => (
            <li key={ch.id}>
              <button
                role="tab"
                aria-selected={i === active}
                className={`s-tab ${i === active ? 'is-on' : ''} is-${ch.hue}`}
                onClick={() => go(i)}
              >
                <span className="s-tab-ch s-mono">CH {ch.ch}</span>
                <span className="s-tab-title">{ch.title}</span>
                <span className="s-tab-short">{ch.short}</span>
                <span className="s-lamp" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ol>

        <div className="s-dial" aria-hidden="true">
          {Array.from({ length: (n - 1) * 5 + 1 }).map((_, i) => (
            <i key={i} className={i % 5 === 0 ? 'major' : ''} />
          ))}
          <span className="s-needle" style={{ top: `${(p / (n - 1)) * 100}%` }} />
        </div>

        <div className={`s-stage is-${c.hue}`} role="tabpanel" aria-label={c.title}>
          <div className="s-screen">
            <div className="s-screen-bar s-mono">
              <span><span className="s-live-dot" /> ON AIR · CH {c.ch}</span>
              <span>{c.short}</span>
            </div>
            <div className="s-screen-body" key={c.id}>
              <Demo kind={c.demo} on={inView} />
            </div>
            <div key={flash} className={`s-static ${flash ? 'is-flash' : ''}`} aria-hidden="true" />
          </div>
          <div key={`m-${c.id}`} className="s-meta-wrap">
            <Meta c={c} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ c }: { c: Channel }) {
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { threshold: 0.35 });
  return (
    <article ref={ref} className={`s-card is-${c.hue} ${on ? 'is-on' : ''}`}>
      <div className="s-screen">
        <div className="s-screen-bar s-mono">
          <span><span className="s-live-dot" /> CH {c.ch}</span>
          <span>{c.short}</span>
        </div>
        <div className="s-screen-body"><Demo kind={c.demo} on={on} /></div>
      </div>
      <Meta c={c} />
    </article>
  );
}

export default function Channels() {
  const wide = useWide();
  if (wide) return <Pinned />;
  return (
    <section id="channels" className="s-channels is-stacked" aria-label="Selected work">
      <div className="s-board-head" data-reveal>
        <p className="s-eyebrow s-mono">Selected work</p>
        <h2 className="s-h2">Six channels.<br /><em>Each one performs itself.</em></h2>
      </div>
      {channels.map((c) => <Card key={c.id} c={c} />)}
    </section>
  );
}
