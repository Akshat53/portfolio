'use client';

import { useEffect, useState } from 'react';
import { callStart } from './hooks';

// The dial-in: once per browser session, the page "calls" Akshat before it opens.
// Skipped for reduced motion, and any key / click skips it.
const STEPS = ['dialing akshat', 'ringing', 'connected'];

export default function Intro() {
  const [phase, setPhase] = useState<'idle' | 'run' | 'open' | 'done'>('idle');
  const [step, setStep] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('sig-dialed') === '1';
      sessionStorage.setItem('sig-dialed', '1');
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ready = () => document.documentElement.classList.add('sig-ready');
    if (seen || reduced) {
      callStart();
      ready();
      setPhase('done');
      return;
    }
    setPhase('run');
    document.documentElement.classList.add('sig-locked');
    const timers = [
      window.setTimeout(() => setStep(1), 650),
      window.setTimeout(() => setStep(2), 1500),
      window.setTimeout(() => open(), 2000),
    ];
    const skip = () => open();
    function open() {
      timers.forEach(clearTimeout);
      callStart();
      setStep(2);
      setPhase('open');
      document.documentElement.classList.remove('sig-locked');
      window.setTimeout(ready, 250);
      window.setTimeout(() => setPhase('done'), 900);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    }
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
      document.documentElement.classList.remove('sig-locked');
    };
  }, []);

  if (phase === 'done' || phase === 'idle') return null;

  return (
    <div className={`s-intro ${phase === 'open' ? 'is-open' : ''}`} aria-hidden="true">
      <div className="s-intro-half s-intro-top" />
      <div className="s-intro-half s-intro-bottom" />
      <div className="s-intro-core">
        <div className={`s-intro-rings step-${step}`}>
          <span />
          <span />
          <span />
          <i />
        </div>
        <p className="s-intro-text">
          {STEPS[step]}
          {step < 2 && <span className="s-dots" />}
        </p>
        <p className="s-intro-skip">press any key to skip</p>
      </div>
    </div>
  );
}
