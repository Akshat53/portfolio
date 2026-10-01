'use client';

import { useEffect, useRef, useState } from 'react';
import type { DemoKind } from './data';

// Each project performs itself. A demo only runs while its channel is on air.

function useStep(on: boolean, durations: number[]) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!on) { setStep(0); return; }
    let i = 0;
    let id = 0;
    const next = () => {
      id = window.setTimeout(() => { i = (i + 1) % durations.length; setStep(i); next(); }, durations[i]);
    };
    setStep(0);
    next();
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on]);
  return step;
}

/* ---------------------------------------------------------------- 01 WorkSyncX */
const TASKS = ['Design review', 'Fix reconnect', 'Ship v2.3', 'Auth tokens', 'Perf audit'];
const COLS = ['To do', 'Doing', 'Done'];
const STATES = [
  [0, 0, 1, 0, 2],
  [1, 0, 1, 0, 2],
  [1, 1, 2, 0, 2],
  [2, 1, 2, 1, 2],
  [2, 2, 2, 1, 2],
  [2, 2, 2, 2, 2],
  [0, 0, 1, 0, 2],
];

function Board({ state, who, flash }: { state: number[]; who: string; flash: number }) {
  const rowOf = (t: number) => state.slice(0, t).filter((c) => c === state[t]).length;
  return (
    <div className="d-board">
      <div className="d-board-who s-mono">{who}</div>
      <div className="d-cols">
        {COLS.map((c) => <span key={c}>{c}</span>)}
      </div>
      <div className="d-cards">
        {TASKS.map((t, i) => (
          <div
            key={t}
            className={`d-card ${flash === i ? 'is-flash' : ''}`}
            style={{ transform: `translate(${state[i] * 100}%, ${rowOf(i) * 50}px)` }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function SyncDemo({ on }: { on: boolean }) {
  // even steps: A moves + a frame leaves; odd steps: B receives it.
  const step = useStep(on, Array(STATES.length * 2).fill(0).map((_, i) => (i % 2 ? 1300 : 650)));
  const s = Math.floor(step / 2);
  const a = STATES[(s + 1) % STATES.length];
  const b = step % 2 ? a : STATES[s];
  const moved = a.findIndex((c, i) => c !== STATES[s][i]);
  return (
    <div className="d-sync">
      <Board state={a} who="riya · laptop" flash={step % 2 === 0 ? moved : -1} />
      <div className={`d-wire ${step % 2 === 0 ? 'is-sending' : ''}`}>
        <span className="d-packet" />
        <span className="d-wire-label s-mono">WebSocket frame</span>
      </div>
      <Board state={b} who="dev · phone" flash={step % 2 === 1 ? moved : -1} />
    </div>
  );
}

/* ---------------------------------------------------------------- 02 Calling widget */
function CallDemo({ on }: { on: boolean }) {
  const step = useStep(on, [1700, 450, 450, 450, 4200, 1000]);
  const [secs, setSecs] = useState(0);
  useEffect(() => {
    if (step !== 4) { setSecs(0); return; }
    const id = window.setInterval(() => setSecs((x) => x + 1), 1000);
    return () => window.clearInterval(id);
  }, [step]);
  const phase = step === 0 ? 'ringing' : step < 4 ? 'handshake' : step === 4 ? 'live' : 'ended';
  const checks = ['ICE', 'DTLS', 'SRTP'];
  return (
    <div className={`d-call is-${phase}`}>
      <div className="d-call-orb">
        <span /><span /><span />
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
        </svg>
      </div>
      <div className="d-call-status s-mono">
        {phase === 'ringing' && 'incoming call · support line'}
        {phase === 'handshake' && 'negotiating media'}
        {phase === 'live' && `on call · 00:${String(secs).padStart(2, '0')}`}
        {phase === 'ended' && 'call ended · thanks'}
      </div>
      <div className="d-checks s-mono">
        {checks.map((c, i) => (
          <span key={c} className={step > i && step < 5 ? 'ok' : ''}>{c} {step > i && step < 5 ? '✓' : '·'}</span>
        ))}
      </div>
      <div className="d-voice" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties} />)}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 03 SparkChat */
const CHAT: { who: 'me' | 'bot'; text: string; ms?: number }[] = [
  { who: 'me', text: 'Can I move my team to the yearly plan?' },
  { who: 'bot', text: 'Yes: Billing › Plan › Yearly. Want me to switch it now?', ms: 412 },
  { who: 'me', text: 'Do it.' },
  { who: 'bot', text: 'Done ✓ Your team is on yearly from today.', ms: 388 },
];

function ChatDemo({ on }: { on: boolean }) {
  const step = useStep(on, [700, 900, 1100, 1300, 900, 1000, 2600]);
  // 0 closed, 1 open, 2 me1, 3 typing→bot1, 4 me2, 5 typing→bot2, 6 hold
  const shown = step <= 1 ? 0 : step === 2 ? 1 : step === 3 ? 2 : step === 4 ? 3 : 4;
  const typing = step === 3 || step === 5;
  return (
    <div className="d-chat">
      <div className="d-host">
        <div className="d-host-bar"><i /><i /><i /><span className="s-mono">client-store.com</span></div>
        <div className="d-host-body">
          <b /><b /><b className="short" />
          <div className="d-host-grid"><i /><i /><i /></div>
        </div>
        <span className="d-shadow s-mono">#shadow-root · host CSS can’t reach in</span>
      </div>
      <div className={`d-widget ${step >= 1 ? 'is-open' : ''}`}>
        <div className="d-widget-head"><span className="s-live-dot" /> SparkChat</div>
        <div className="d-msgs">
          {CHAT.slice(0, shown).map((m, i) => (
            <p key={i} className={`d-msg ${m.who}`}>
              {m.text}
              {m.ms && <span className="s-mono">{m.ms} ms</span>}
            </p>
          ))}
          {typing && <p className="d-msg bot d-typing"><i /><i /><i /></p>}
        </div>
      </div>
      <div className="d-launcher" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4z" /></svg>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 04 sparktg.com */
function LighthouseDemo({ on }: { on: boolean }) {
  const step = useStep(on, [300, 300, 300, 300, 300, 2600, 900]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (step < 5) { setScore(0); return; }
    if (step === 6) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setScore(Math.round(98 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);
  const C = 2 * Math.PI * 44;
  return (
    <div className="d-lh">
      <div className="d-site">
        {['nav', 'hero', 'cards', 'band', 'foot'].map((b, i) => (
          <div key={b} className={`d-blk d-b-${b} ${step > i || step >= 5 ? 'is-in' : ''}`}>
            {b === 'cards' && (<><i /><i /><i /></>)}
          </div>
        ))}
      </div>
      <div className="d-gauge">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" className="d-gauge-bg" />
          <circle cx="50" cy="50" r="44" className="d-gauge-fg" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - score / 100) }} />
        </svg>
        <span className="d-gauge-n">{score}</span>
        <span className="d-gauge-l s-mono">Lighthouse</span>
        <div className="d-load s-mono"><span style={{ width: step >= 5 ? '100%' : '0%' }} /> loaded &lt; 1 s</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 05 Ellemora */
const GARMENTS = [
  { name: 'Linen dress', price: '₹2,490', d: 'M9 3h6l1 4-2 1 3 12H7l3-12-2-1z' },
  { name: 'Oxford shirt', price: '₹1,790', d: 'M8 3l4 2 4-2 4 4-3 2v11H7V9L4 7z' },
  { name: 'Tote bag', price: '₹1,290', d: 'M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0' },
  { name: 'Loafers', price: '₹3,190', d: 'M3 15c4 0 6-3 9-3s5 3 9 3v3H3z' },
];

function ShopDemo({ on }: { on: boolean }) {
  const step = useStep(on, [900, 700, 900, 1200, 2400]);
  // 0 browse, 1 hover tile 2, 2 add (fly), 3 checkout, 4 paid
  return (
    <div className="d-shop">
      <div className="d-shop-bar">
        <span className="d-brand">ELLEMORA</span>
        <span className={`d-bag ${step >= 2 ? 'is-bump' : ''}`}>
          bag <b>{step >= 2 ? 1 : 0}</b>
        </span>
      </div>
      <div className="d-tiles">
        {GARMENTS.map((g, i) => (
          <div key={g.name} className={`d-tile ${i === 1 && step >= 1 && step < 3 ? 'is-hover' : ''}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d={g.d} /></svg>
            <span>{g.name}</span>
            <b className="s-mono">{g.price}</b>
            {i === 1 && <em className={step === 2 ? 'is-fly' : ''} />}
          </div>
        ))}
      </div>
      <div className={`d-checkout ${step >= 3 ? 'is-in' : ''}`}>
        <span className="s-mono">Stripe · ₹1,790</span>
        <b className={step >= 4 ? 'is-paid' : ''}>{step >= 4 ? 'Paid ✓' : 'Paying…'}</b>
      </div>
      <div className="d-seo s-mono">
        <span>search visibility</span>
        <div><i style={{ width: step >= 1 ? '70%' : '50%' }} /></div>
        <b>+40%</b>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- 06 Alight FinTech */
const ROWS = 100000;
const ROW_H = 30;
function seeded(i: number) {
  let x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}
const FUNDS = ['Growth', 'Index', 'Bond', 'Target 2040', 'Stable', 'Intl'];

function TableDemo({ on }: { on: boolean }) {
  const [top, setTop] = useState(0);
  const vp = useRef<HTMLDivElement>(null);
  const [vh, setVh] = useState(240);
  useEffect(() => {
    if (vp.current) setVh(vp.current.clientHeight);
  }, []);
  useEffect(() => {
    if (!on) return;
    let raf = 0; let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last; last = t;
      setTop((y) => (y + dt * 2.4) % (ROWS * ROW_H - vh));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, vh]);
  const first = Math.floor(top / ROW_H);
  const count = Math.ceil(vh / ROW_H) + 1;
  const rows = Array.from({ length: count }, (_, k) => first + k).filter((i) => i < ROWS);
  return (
    <div className="d-table">
      <div className="d-thead s-mono"><span>#</span><span>Account</span><span>Fund</span><span>Balance</span><span>Δ</span></div>
      <div className="d-vp" ref={vp}>
        {rows.map((i) => {
          const r = seeded(i);
          const delta = (seeded(i + 7) - 0.48) * 4;
          return (
            <div key={i} className="d-tr s-mono" style={{ transform: `translateY(${i * ROW_H - top}px)` }}>
              <span>{(i + 1).toLocaleString('en-IN')}</span>
              <span>AC-{String(100000 + Math.floor(r * 899999))}</span>
              <span>{FUNDS[i % FUNDS.length]}</span>
              <span>₹{Math.floor(r * 9e6).toLocaleString('en-IN')}</span>
              <span className={delta >= 0 ? 'up' : 'down'}>{delta >= 0 ? '+' : ''}{delta.toFixed(2)}%</span>
            </div>
          );
        })}
      </div>
      <div className="d-tfoot s-mono">
        <span>rendering <b>{rows.length}</b> of {ROWS.toLocaleString('en-IN')} rows</span>
        <span className="d-aa">WCAG AA</span>
        <span className="d-syn">synthetic data</span>
      </div>
    </div>
  );
}

export function Demo({ kind, on }: { kind: DemoKind; on: boolean }) {
  switch (kind) {
    case 'sync': return <SyncDemo on={on} />;
    case 'call': return <CallDemo on={on} />;
    case 'chat': return <ChatDemo on={on} />;
    case 'lighthouse': return <LighthouseDemo on={on} />;
    case 'shop': return <ShopDemo on={on} />;
    case 'table': return <TableDemo on={on} />;
  }
}
