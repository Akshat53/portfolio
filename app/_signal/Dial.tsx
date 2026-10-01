'use client';

import { useEffect, useRef, useState } from 'react';
import { contact } from './data';
import { useNoidaTime } from './hooks';

// Contact as a call: press the button, it rings, it connects, and the ways to reach him appear.
export default function Dial() {
  const [state, setState] = useState<'idle' | 'ringing' | 'connected'>('idle');
  const [copied, setCopied] = useState(false);
  const time = useNoidaTime();
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const call = () => {
    if (state !== 'idle') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setState('ringing');
    timer.current = window.setTimeout(() => setState('connected'), reduced ? 0 : 1800);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="call" className={`s-call is-${state}`} aria-label="Contact">
      <p className="s-eyebrow s-mono">Stay on the line</p>
      <h2 className="s-call-title" data-reveal>
        Building something people <em>talk</em> through?
      </h2>

      <div className="s-call-stage">
        <button className="s-call-btn" onClick={call} aria-describedby="call-status" disabled={state !== 'idle'}>
          <span className="s-call-ripples" aria-hidden="true"><i /><i /><i /></span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
          </svg>
          <span className="s-call-label">{state === 'idle' ? 'Call Akshat' : state === 'ringing' ? 'Ringing…' : 'Connected'}</span>
        </button>
        <p id="call-status" className="s-mono s-call-status" aria-live="polite">
          {state === 'idle' && `it’s ${time || '--:--'} in Noida`}
          {state === 'ringing' && 'ringing Noida…'}
          {state === 'connected' && 'connected · pick a line'}
        </p>
      </div>

      <ul className="s-lines" aria-hidden={state !== 'connected'}>
        <li style={{ '--i': 0 } as React.CSSProperties}>
          <button className="s-line-btn" onClick={copy} tabIndex={state === 'connected' ? 0 : -1}>
            <span className="s-mono">email</span>
            <b>{copied ? 'Copied ✓' : contact.email}</b>
          </button>
          <a className="s-line-side s-mono" href={`mailto:${contact.email}`} tabIndex={state === 'connected' ? 0 : -1}>write ↗</a>
        </li>
        <li style={{ '--i': 1 } as React.CSSProperties}>
          <a className="s-line-btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={state === 'connected' ? 0 : -1}>
            <span className="s-mono">linkedin</span><b>in/akshat53</b>
          </a>
        </li>
        <li style={{ '--i': 2 } as React.CSSProperties}>
          <a className="s-line-btn" href={contact.github} target="_blank" rel="noopener noreferrer" tabIndex={state === 'connected' ? 0 : -1}>
            <span className="s-mono">github</span><b>Akshat53</b>
          </a>
        </li>
        <li style={{ '--i': 3 } as React.CSSProperties}>
          <a className="s-line-btn" href="/resume" tabIndex={state === 'connected' ? 0 : -1}>
            <span className="s-mono">résumé</span><b>Read or download</b>
          </a>
        </li>
      </ul>
    </section>
  );
}
