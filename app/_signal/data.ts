// Every claim on the page comes from lib/resume-data.ts or the previous portfolio copy.
// Demo numbers that are illustrative (not claims) are labelled as such where they render.

export type DemoKind = 'sync' | 'chat' | 'call' | 'lighthouse' | 'shop' | 'table';

export interface Channel {
  id: string;
  ch: string;
  title: string;
  short: string;
  category: string;
  description: string;
  impact: string[];
  stack: string[];
  demo: DemoKind;
  hue: 'voice' | 'data';
  link?: string;
}

export const channels: Channel[] = [
  {
    id: 'worksyncx',
    ch: '01',
    title: 'WorkSyncX',
    short: 'Team sync, in real time',
    category: 'Full-stack · Real-time collaboration',
    description:
      'A team collaboration platform where tasks, assignments and workflows stay in sync across every open screen. React and Next.js on the front, Spring Boot and PostgreSQL behind, WebSockets in between.',
    impact: ['Real-time task sync', 'Multi-user concurrency', 'React + Spring Boot', 'Production-grade backend'],
    stack: ['React.js', 'Next.js', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'WebSockets'],
    demo: 'sync',
    hue: 'data',
    link: 'https://github.com/Akshat53/worksyncx-backend',
  },
  {
    id: 'calling-widget',
    ch: '02',
    title: 'Calling Widget',
    short: 'Voice calls, inside any page',
    category: 'WebRTC · Real-time voice',
    description:
      'An embeddable voice-calling widget used by Zomato Nugget, Eternal and other enterprise clients: WebRTC calls with reliable connection handling, tuned latency and multi-client support.',
    impact: ['Used by Zomato Nugget & Eternal', 'Real-time voice', 'Multi-client', 'Enterprise ready'],
    stack: ['React.js', 'WebRTC', 'TypeScript', 'WebSockets', 'REST APIs'],
    demo: 'call',
    hue: 'voice',
  },
  {
    id: 'sparkchat',
    ch: '03',
    title: 'SparkChat Widget',
    short: 'One script tag, 100+ websites',
    category: 'SaaS · Web Components',
    description:
      'An embeddable AI chat widget living on 100+ client websites. Built with Web Components for cross-domain isolation, so it never leaks a style into the host page, and answers in under half a second.',
    impact: ['100+ client sites', '<500 ms latency', '99.9% uptime', 'AI conversations'],
    stack: ['React.js', 'Web Components', 'TypeScript', 'WebSockets', 'REST APIs'],
    demo: 'chat',
    hue: 'voice',
  },
  {
    id: 'sparktg',
    ch: '04',
    title: 'sparktg.com',
    short: 'The marketing site, end to end',
    category: 'Marketing · Next.js',
    description:
      'The complete SparkTG marketing website: modern UI, responsive layouts, full SEO and a 98+ Lighthouse score, so a cloud-telephony platform loads in under a second.',
    impact: ['98+ Lighthouse', '<1 s load', 'Full SEO', 'Responsive'],
    stack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    demo: 'lighthouse',
    hue: 'data',
  },
  {
    id: 'ellemora',
    ch: '05',
    title: 'Ellemora',
    short: 'Fashion e-commerce, SSR + PWA',
    category: 'Full-stack · E-commerce',
    description:
      'A full fashion store: Strapi CMS, Stripe payments, server-side rendering and a progressive web app, which lifted SEO by 40% and kept every page fast from 320px to 2560px.',
    impact: ['40% SEO improvement', 'SSR + PWA', '98+ Lighthouse', 'Stripe payments'],
    stack: ['Next.js', 'React.js', 'Node.js', 'Strapi', 'PostgreSQL', 'Stripe'],
    demo: 'shop',
    hue: 'voice',
  },
  {
    id: 'alight',
    ch: '06',
    title: 'Alight FinTech',
    short: 'Enterprise data, made usable',
    category: 'Enterprise · FinTech (at Wipro)',
    description:
      'Reusable components and fast rendering for large financial datasets at Alight Solutions, with WCAG AA accessibility work that improved UX by 25-30%.',
    impact: ['25-30% UX improvement', 'WCAG AA', 'Large datasets', 'Reusable components'],
    stack: ['React.js', 'Bootstrap', 'Java', 'Spring Boot', 'REST APIs'],
    demo: 'table',
    hue: 'data',
  },
];

export const metrics: { value: string; label: string }[] = [
  { value: '<500 ms', label: 'chat widget latency' },
  { value: '99.9%', label: 'widget uptime' },
  { value: '100+', label: 'sites embed SparkChat' },
  { value: '500+', label: 'enterprise clients on the platform' },
  { value: '98+', label: 'Lighthouse, sparktg.com' },
  { value: '40%', label: 'SEO lift, Ellemora' },
  { value: 'WCAG AA', label: 'FinTech dashboards' },
  { value: '4+ yrs', label: 'shipping to production' },
];

export interface Stop {
  year: string;
  place: string;
  role: string;
  org: string;
  kind: 'work' | 'study';
  now?: boolean;
  points: string[];
}

export const line: Stop[] = [
  {
    year: '2019',
    place: 'Bareilly',
    role: 'Bachelor of Computer Applications',
    org: 'Invertis University',
    kind: 'study',
    points: ['BCA, 2019 – 2022'],
  },
  {
    year: '2022',
    place: 'Noida',
    role: 'Project Engineer',
    org: 'Wipro Technologies',
    kind: 'work',
    points: [
      'React components for an enterprise FinTech dashboard at Alight Solutions',
      'Java Spring Boot microservices for backend APIs and data processing',
      'UX up 25-30% through WCAG AA accessibility work',
    ],
  },
  {
    year: '2023',
    place: 'Bareilly',
    role: 'Full Stack Engineer',
    org: 'Ellemora',
    kind: 'work',
    points: [
      'Built the fashion e-commerce platform with React and Next.js',
      'SSR + PWA, a 40% SEO improvement',
      'Stripe payments; 98+ Lighthouse; 320px to 2560px',
    ],
  },
  {
    year: '2023',
    place: 'Bengaluru',
    role: 'Master of Computer Applications',
    org: 'Jain University',
    kind: 'study',
    points: ['MCA, 2023 – 2025, alongside full-time work'],
  },
  {
    year: '2025',
    place: 'Noida',
    role: 'Frontend Engineer',
    org: 'SparkTG',
    kind: 'work',
    now: true,
    points: [
      'AI-powered cloud communication: telephony, IVR, AI voice bots',
      'Frontend for a contact-centre platform serving 500+ clients',
      'Calling widget, SparkChat widget and sparktg.com',
    ],
  },
];

export const bands: { name: string; skills: string[] }[] = [
  { name: 'Frontend', skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { name: 'State', skills: ['Redux', 'Context API', 'Zustand', 'Custom Hooks', 'Micro Frontends'] },
  { name: 'Real-time', skills: ['WebRTC', 'WebSockets', 'REST', 'GraphQL', 'Optimistic UI'] },
  { name: 'Speed', skills: ['Code Splitting', 'Lazy Loading', 'Memoization', 'Virtualization', 'Caching'] },
  { name: 'Design', skills: ['Design Systems', 'WCAG AA', 'ShadCN UI', 'Figma', 'Responsive'] },
  { name: 'Backend', skills: ['Node.js', 'Express', 'Spring Boot', 'PostgreSQL', 'MySQL', 'Strapi'] },
  { name: 'Ship', skills: ['Git', 'CI/CD', 'Jenkins', 'Docker', 'Vercel', 'Agile'] },
  { name: 'Web', skills: ['PWA', 'Service Workers', 'IndexedDB', 'Web Workers', 'SEO'] },
];

export const contact = {
  email: 'work.iamakshat@gmail.com',
  github: 'https://github.com/Akshat53',
  linkedin: 'https://linkedin.com/in/akshat53',
};
