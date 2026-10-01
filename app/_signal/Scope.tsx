'use client';

import { useEffect, useRef } from 'react';
import { measureRtt } from './hooks';

// The hero oscilloscope. Idle = a carrier wave. Moving the pointer is "speaking": its speed
// drives the amplitude, centred where the pointer is. Clicking sends a ping along the line and
// measures the real round-trip time from this browser to the site.

interface Ping { x: number; t: number; label: string }

export default function Scope({ onRtt }: { onRtt?: (ms: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, running = false;
    let energy = 0.0, px = 0.5, lastX = 0, lastY = 0, lastT = 0;
    const pings: Ping[] = [];
    const css = getComputedStyle(canvas);
    const voice = css.getPropertyValue('--sig').trim() || '#ff5a1f';
    const data = css.getPropertyValue('--cyan').trim() || '#4fe3ff';
    const faint = css.getPropertyValue('--line').trim() || 'rgba(236,232,223,.09)';
    const mono = css.fontFamily || 'monospace'; // .s-scope is set in the mono face

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const wave = (x: number, t: number, amp: number, phase = 0) => {
      const u = x / w;
      const carrier = Math.sin(u * 22 + t * 2.1 + phase) * 0.55 + Math.sin(u * 51 - t * 3.3 + phase) * 0.25;
      const d = u - px;
      const local = Math.exp(-(d * d) / 0.012); // the voice sits where the pointer is
      const speech = Math.sin(u * 140 + t * 18 + phase) * local * energy * 2.4 + Math.sin(u * 77 - t * 11) * local * energy;
      let ping = 0;
      for (const p of pings) {
        const age = t - p.t;
        const front = age * 0.55; // fraction of width per second
        const dd = Math.abs(u - p.x) - front;
        ping += Math.exp(-(dd * dd) / 0.0009) * Math.max(0, 1 - age / 1.8) * Math.sin(u * 300) * 1.6;
      }
      return (carrier * 0.16 * amp + speech * 0.32 + ping * 0.3) * h;
    };

    const draw = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, w, h);
      // graticule
      ctx.strokeStyle = faint; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 0; gx <= w; gx += w / 16) { ctx.moveTo(gx, 0); ctx.lineTo(gx, h); }
      ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
      ctx.stroke();
      // echo (the far end hearing it, a beat later)
      ctx.strokeStyle = data; ctx.globalAlpha = 0.35; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 3) { const y = h / 2 + wave(x, t - 0.12, 1, 1.7) * 0.8; x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      // the voice
      ctx.globalAlpha = 1; ctx.strokeStyle = voice; ctx.lineWidth = 2;
      ctx.shadowColor = voice; ctx.shadowBlur = 14;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) { const y = h / 2 + wave(x, t, 1); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      ctx.shadowBlur = 0;
      // ping labels
      ctx.font = `500 11px ${mono}`;
      ctx.fillStyle = data;
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i]; const age = t - p.t;
        if (age > 2.2) { pings.splice(i, 1); continue; }
        if (p.label) { ctx.globalAlpha = Math.max(0, 1 - age / 2.2); ctx.fillText(p.label, Math.min(p.x * w + 8, w - 90), 16); }
      }
      ctx.globalAlpha = 1;
      energy *= 0.94;
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop); else running = false;
    };
    const start = () => { if (!running && !reduced) { running = true; raf = requestAnimationFrame(loop); } };

    const move = (ev: Event) => {
      const e = ev as PointerEvent;
      const r = canvas.getBoundingClientRect();
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const v = Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt;
      lastX = e.clientX; lastY = e.clientY; lastT = now;
      px = (e.clientX - r.left) / r.width;
      energy = Math.min(1, energy + v * 0.08);
    };
    const click = async (ev: Event) => {
      const e = ev as PointerEvent;
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top - 200 || e.clientY > r.bottom + 200) return;
      const ping: Ping = { x: (e.clientX - r.left) / r.width, t: performance.now() / 1000, label: '' };
      pings.push(ping);
      const ms = await measureRtt();
      if (ms !== null) { ping.label = `ping ${ms} ms`; onRtt?.(ms); }
    };

    size();
    if (reduced) draw(4000);
    const ro = new ResizeObserver(() => { size(); if (reduced) draw(4000); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(canvas);
    const vis = () => { if (!document.hidden) start(); };
    document.addEventListener('visibilitychange', vis);
    const host = canvas.closest('section') ?? window;
    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerdown', click);
    start();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', vis);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerdown', click);
    };
  }, [onRtt]);

  return <canvas ref={ref} className="s-scope" aria-hidden="true" />;
}
