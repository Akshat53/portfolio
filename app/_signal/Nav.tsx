'use client';

import { useEffect, useState } from 'react';
import { useNoidaTime } from './hooks';

// Signal-strength bars double as the scroll progress: five bars, one lights per fifth of the page.
export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const time = useNoidaTime();

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        setScrolled(window.scrollY > 24);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lit = Math.min(5, Math.floor(progress * 5 + 0.0001) + 1);

  return (
    <header className={`s-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a href="#top" className="s-logo" aria-label="Akshat Kumar Singh, back to top">
        <span className="s-logo-mark">AKS</span>
        <span className="s-bars" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className={i < lit ? 'on' : ''} style={{ height: `${6 + i * 3}px` }} />
          ))}
        </span>
      </a>
      <nav aria-label="Sections">
        <ul className="s-nav-links">
          <li><a href="#channels">Work</a></li>
          <li><a href="#line">Path</a></li>
          <li><a href="#spectrum">Stack</a></li>
          <li><a href="/resume">Résumé</a></li>
          <li><a href="#call" className="s-nav-call">Call</a></li>
        </ul>
      </nav>
      <span className="s-nav-time" aria-label="Local time in Noida">
        <span className="s-live-dot" aria-hidden="true" />
        NOIDA {time || '--:--:--'} IST
      </span>
    </header>
  );
}
