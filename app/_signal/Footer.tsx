'use client';

import { fmtDuration, useCallClock } from './hooks';

export default function Footer() {
  const elapsed = useCallClock();
  return (
    <footer className="s-foot">
      <p className="s-foot-big" data-reveal>
        Call duration <span className="s-mono">{fmtDuration(elapsed)}</span>
        <br />
        <em>Thanks for staying on the line.</em>
      </p>
      <div className="s-foot-row s-mono">
        <span>© {new Date().getFullYear()} Akshat Kumar Singh · Noida, India</span>
        <a href="#top">back to the top ↑</a>
        <a className="s-made" href="https://anamaya.fyi" target="_blank" rel="noopener noreferrer">made by Anamaya</a>
      </div>
    </footer>
  );
}
