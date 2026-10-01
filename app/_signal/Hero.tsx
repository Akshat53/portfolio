'use client';

import { useCallback, useEffect, useState } from 'react';
import Scope from './Scope';
import { fmtDuration, measureRtt, useCallClock } from './hooks';

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {[...text].map((c, i) => (
        <span key={i} className="s-letter" style={{ '--i': i + offset } as React.CSSProperties}>
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const elapsed = useCallClock();
  const [rtt, setRtt] = useState<number | null>(null);
  const onRtt = useCallback((ms: number) => setRtt(ms), []);

  useEffect(() => {
    measureRtt().then((ms) => ms !== null && setRtt(ms));
  }, []);

  return (
    <section id="top" className="s-hero">
      <div className="s-hero-meta s-mono">
        <span><span className="s-live-dot" aria-hidden="true" /> CH 00 · LIVE</span>
        <span>CONNECTED {fmtDuration(elapsed)}</span>
        <span title="Measured from your browser to this site">RTT {rtt === null ? '…' : `${rtt} ms`}</span>
      </div>

      <div className="s-name-wrap">
        <div className="s-scope-wrap">
          <Scope onRtt={onRtt} />
          <span className="s-scope-hint s-mono">move to speak · click to ping</span>
        </div>
        <h1 className="s-name" aria-label="Akshat Kumar Singh">
          <span className="s-name-line" aria-hidden="true"><Letters text="Akshat" /></span>
          <span className="s-name-line s-name-thin" aria-hidden="true"><Letters text="Kumar Singh" offset={6} /></span>
        </h1>
      </div>

      <div className="s-hero-foot">
        <p className="s-lede">
          Frontend engineer at <strong>SparkTG</strong>. I build the interfaces where people talk:
          to each other, and to machines. Calling widgets, chat widgets, real-time sync.
        </p>
        <div className="s-ctas">
          <a href="#channels" className="s-btn s-btn-solid">
            <span>Tune in</span>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M3 8l5 5 5-5" /></svg>
          </a>
          <a href="#call" className="s-btn s-btn-ghost"><span>Place a call</span></a>
        </div>
      </div>
    </section>
  );
}
