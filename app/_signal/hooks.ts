'use client';

import { RefObject, useEffect, useState } from 'react';

// The moment this visitor "connected". Shared by the hero's call timer and the footer's call duration.
let connectedAt = 0;
export function callStart() {
  if (!connectedAt) connectedAt = Date.now();
  return connectedAt;
}

export function fmtDuration(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s % 60)}`;
}

export function useCallClock() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = callStart();
    const tick = () => setElapsed(Date.now() - start);
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return elapsed;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function useInView<T extends Element>(ref: RefObject<T>, opts: IntersectionObserverInit = {}, once = false) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (once && e.isIntersecting) io.disconnect();
    }, opts);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once]);
  return inView;
}

/** Noida local time, ticking. */
export function useNoidaTime() {
  const [t, setT] = useState('');
  useEffect(() => {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return t;
}

/** Real round-trip time from this browser to the site, measured with a no-store HEAD request. */
export async function measureRtt(): Promise<number | null> {
  try {
    const t0 = performance.now();
    await fetch(`/?rtt=${Date.now()}`, { method: 'HEAD', cache: 'no-store' });
    return Math.round(performance.now() - t0);
  } catch {
    return null;
  }
}
