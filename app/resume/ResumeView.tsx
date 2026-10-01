'use client';

import { useEffect, useRef, useState } from 'react';
import { resumeData as r } from '@/lib/resume-data';

// The résumé is a real document: selectable text, one DOM order an ATS can read top to bottom,
// and a print stylesheet that makes the PDF. On screen it "prints" out of a slot in the Signal UI.

const PDF = '/Akshat_Kumar_Singh_Resume.pdf';
const SECTIONS = [
  { id: 'rz-summary', label: 'Summary' },
  { id: 'rz-experience', label: 'Experience' },
  { id: 'rz-projects', label: 'Project' },
  { id: 'rz-skills', label: 'Skills' },
  { id: 'rz-education', label: 'Education' },
];

const bare = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

function plainText() {
  const p = r.personal;
  const lines: string[] = [
    p.name,
    p.title,
    [p.email, p.phone, p.location].join(' | '),
    [bare(p.linkedin), bare(p.github), bare(p.portfolio)].join(' | '),
    '',
    'SUMMARY',
    r.summary,
    '',
    'EXPERIENCE',
  ];
  r.experience.forEach((e) => {
    lines.push('', `${e.position}, ${e.company} | ${e.duration} | ${e.location}`, e.description);
    e.achievements.forEach((a) => lines.push(`- ${a}`));
    lines.push(`Stack: ${e.technologies.join(', ')}`);
  });
  lines.push('', 'PROJECT');
  r.projects.forEach((pr) => {
    lines.push(pr.name, pr.description, `Stack: ${pr.technologies.join(', ')}`, pr.link);
  });
  lines.push('', 'SKILLS');
  Object.entries(r.skills).forEach(([k, v]) => lines.push(`${k}: ${v.join(', ')}`));
  lines.push('', 'EDUCATION');
  r.education.forEach((e) => lines.push(`${e.degree}, ${e.institution}, ${e.location} (${e.year})`));
  lines.push('', 'CERTIFICATIONS');
  r.certifications.forEach((c) => lines.push(`${c.name}, ${c.issuer} (${c.year})`));
  return lines.join('\n') + '\n';
}

function downloadText() {
  const url = URL.createObjectURL(new Blob([plainText()], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Akshat_Kumar_Singh_Resume.txt';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function ResumeView() {
  const [pct, setPct] = useState(0);
  const [active, setActive] = useState(SECTIONS[0].id);
  const [copied, setCopied] = useState(false);
  const sheet = useRef<HTMLElement>(null);

  // the print-out: a counter that runs with the paper feeding out of the slot
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPct(100); return; }
    let raf = 0;
    const t0 = performance.now() + 250;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - t0) / 1500));
      setPct(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // scroll-spy for the index rail
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(r.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${r.personal.email}`;
    }
  };

  const p = r.personal;
  const done = pct >= 100;

  return (
    <div className={`rz ${done ? 'is-printed' : ''}`}>
      <header className="rz-bar">
        <a href="/" className="rz-back">
          <span aria-hidden="true">←</span> <b>AKS</b> <span className="rz-back-txt">back to the site</span>
        </a>
        <p className="rz-status" aria-live="polite">
          <span className="rz-dot" aria-hidden="true" />
          {done ? 'printed · A4 · ready' : `printing… ${pct}%`}
        </p>
        <div className="rz-actions">
          <a className="rz-btn rz-btn-solid" href={PDF} download>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v9M4 7l4 4 4-4M3 14h10" /></svg>
            PDF
          </a>
          <button className="rz-btn" onClick={() => window.print()}>Print</button>
          <button className="rz-btn" onClick={downloadText}>.txt</button>
        </div>
      </header>
      <div className="rz-slot" aria-hidden="true" />

      <div className="rz-layout">
        <nav className="rz-rail" aria-label="Résumé sections">
          <p className="rz-rail-k">index</p>
          <ol>
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? 'is-on' : ''}>
                  <span>{String(i + 1).padStart(2, '0')}</span> {s.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="rz-rail-card">
            <p className="rz-rail-k">reach him</p>
            <button onClick={copyEmail}>{copied ? 'copied ✓' : 'copy email'}</button>
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href="/#call">place a call →</a>
          </div>
        </nav>

        <main className="rz-paper-wrap">
          <article ref={sheet} className="rz-sheet" aria-label={`Résumé of ${p.name}`}>
            <span className="rz-scan" aria-hidden="true" />

            <header className="rz-head rz-in" style={{ '--d': 0 } as React.CSSProperties}>
              <div>
                <h1 className="rz-name">{p.name}</h1>
                <p className="rz-title">{p.title} · React, Next.js, real-time UI</p>
              </div>
              <div className="rz-contact">
                <ul>
                  <li><a href={`mailto:${p.email}`}>{p.email}</a></li>
                  <li><a href={`tel:${p.phone.replace(/[^+\d]/g, '')}`}>{p.phone}</a></li>
                </ul>
                <ul>
                  <li>{p.location}</li>
                  <li><a href={p.portfolio}>{bare(p.portfolio)}</a></li>
                </ul>
                <ul>
                  <li><a href={p.linkedin}>{bare(p.linkedin)}</a></li>
                  <li><a href={p.github}>{bare(p.github)}</a></li>
                </ul>
              </div>
            </header>

            <section id="rz-summary" className="rz-sec rz-in" style={{ '--d': 1 } as React.CSSProperties}>
              <h2>Summary</h2>
              <p className="rz-summary">{r.summary}</p>
            </section>

            <section id="rz-experience" className="rz-sec rz-in" style={{ '--d': 2 } as React.CSSProperties}>
              <h2>Experience</h2>
              {r.experience.map((e) => (
                <div key={e.company} className="rz-job">
                  <div className="rz-job-top">
                    <h3>
                      {e.position} <span className="rz-at">·</span> <span className="rz-co">{e.company}</span>
                    </h3>
                    <p className="rz-when">{e.duration}</p>
                  </div>
                  <p className="rz-ctx">{e.description} <span className="rz-where">· {e.location}</span></p>
                  <ul className="rz-bullets">
                    {e.achievements.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                  <p className="rz-stack"><span>Stack</span> {e.technologies.join(' · ')}</p>
                </div>
              ))}
            </section>

            <section id="rz-projects" className="rz-sec rz-in" style={{ '--d': 3 } as React.CSSProperties}>
              <h2>Project</h2>
              {r.projects.map((pr) => (
                <div key={pr.name} className="rz-job">
                  <div className="rz-job-top">
                    <h3>{pr.name}</h3>
                    <p className="rz-when"><a href={pr.link}>{bare(pr.link)}</a></p>
                  </div>
                  <p className="rz-ctx rz-ctx-body">{pr.description}</p>
                  <p className="rz-stack"><span>Stack</span> {pr.technologies.join(' · ')}</p>
                </div>
              ))}
            </section>

            <section id="rz-skills" className="rz-sec rz-in" style={{ '--d': 4 } as React.CSSProperties}>
              <h2>Skills</h2>
              <dl className="rz-skills">
                {Object.entries(r.skills).map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="rz-education" className="rz-sec rz-in" style={{ '--d': 5 } as React.CSSProperties}>
              <h2>Education &amp; certifications</h2>
              <ul className="rz-edu">
                {r.education.map((e) => (
                  <li key={e.degree}><b>{e.degree}</b> · {e.institution}, {e.location} <span>{e.year}</span></li>
                ))}
                {r.certifications.map((c) => (
                  <li key={c.name}><b>{c.name}</b> · {c.issuer} <span>{c.year}</span></li>
                ))}
              </ul>
            </section>
          </article>

          <p className="rz-foot">
            The PDF is real text, so applicant-tracking systems read every word. Plain text for pasting into forms.
            <a href="/">Back to the site →</a>
          </p>
        </main>
      </div>
    </div>
  );
}
