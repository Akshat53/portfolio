'use client';

import { useEffect, useRef } from 'react';

// Page-wide effects: scroll reveals for [data-reveal], and a signal-ring cursor on fine pointers.
export default function Effects() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    const scan = () => document.querySelectorAll('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    scan();
    // The switchboard swaps layouts after hydration, so watch for heads that mount later.
    const mo = new MutationObserver(scan);
    mo.observe(document.querySelector('.sig main') ?? document.body, { childList: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    document.documentElement.classList.add('sig-cursor');
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as Element | null;
      const hot = !!t?.closest('a, button, [role="tab"]');
      ring.current?.classList.toggle('is-hot', hot);
      dot.current?.classList.add('is-on'); ring.current?.classList.add('is-on');
    };
    const down = () => ring.current?.classList.add('is-down');
    const up = () => ring.current?.classList.remove('is-down');
    const leave = () => { dot.current?.classList.remove('is-on'); ring.current?.classList.remove('is-on'); };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('pointerleave', leave);
      document.documentElement.classList.remove('sig-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ring} className="s-cursor-ring" aria-hidden="true" />
      <div ref={dot} className="s-cursor-dot" aria-hidden="true" />
    </>
  );
}
