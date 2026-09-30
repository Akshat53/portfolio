'use client';

import { ReactNode } from 'react';

// ============================================================================
// PROJECT DATA - Centralized, maintainable, scalable
// ============================================================================

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  accentColor: string;
  emoji: string; // Placeholder until real images available
  order: 'image-first' | 'text-first';
}

const projects: Project[] = [
  {
    id: 'sparktg',
    title: 'SparkTG AI Chatbot & Dialer',
    category: 'SaaS / WebRTC',
    description:
      'Embeddable SaaS widgets with real-time voice calling via WebRTC. Modular architecture and production-grade infrastructure supporting 1000+ concurrent users. Built with React, TypeScript, and custom WebRTC implementation.',
    accentColor: 'var(--project-sparktg)',
    emoji: '🤖',
    order: 'image-first',
  },
  {
    id: 'ellemora',
    title: 'Ellemora Fashion Platform',
    category: 'E-commerce / Next.js',
    description:
      'Full-featured e-commerce platform with Stripe payments, server-side rendering, PWA support, and Strapi CMS backend. Achieved 98 Lighthouse score with optimized images, lazy loading, and code splitting.',
    accentColor: 'var(--project-ellemora)',
    emoji: '👗',
    order: 'text-first',
  },
  {
    id: 'dashboard',
    title: 'SparkTG Dashboard Redesign',
    category: 'Analytics / Design',
    description:
      'Modern analytics dashboard using atomic design principles, ShadCN UI components, and Tailwind CSS. Achieved 25% UX improvement through simplified navigation, better data visualization, and refined micro-interactions.',
    accentColor: 'var(--project-dashboard)',
    emoji: '📊',
    order: 'image-first',
  },
  {
    id: 'alight',
    title: 'Alight Solutions Dashboard',
    category: 'FinTech / Enterprise',
    description:
      'Enterprise financial dashboard with WCAG AA accessibility compliance, 40% performance optimization, and multi-tenant support. Serves 500+ users with real-time data updates, advanced filtering, and role-based access control.',
    accentColor: 'var(--project-alight)',
    emoji: '💳',
    order: 'text-first',
  },
  {
    id: 'marketing',
    title: 'SparkTG Marketing Website',
    category: 'Marketing / SEO',
    description:
      'Modern marketing website with Next.js, responsive design, and full SEO optimization. Achieved 98+ Lighthouse scores across all metrics. Features smooth scroll animations, semantic HTML, and optimized Core Web Vitals.',
    accentColor: 'var(--project-marketing)',
    emoji: '💻',
    order: 'image-first',
  },
  {
    id: 'pocketnotes',
    title: 'Pocket Notes App',
    category: 'PWA / Offline-First',
    description:
      'Offline-first progressive web app with IndexedDB storage, Service Workers, push notifications, and cloud synchronization. Works seamlessly online and offline with automatic sync when connection returns.',
    accentColor: 'var(--project-pocketnotes)',
    emoji: '📝',
    order: 'text-first',
  },
];

// ============================================================================
// COMPONENTS - Reusable, semantic, maintainable
// ============================================================================

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      {children}
    </section>
  );
}

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

function Container({ children, className = '' }: ContainerProps) {
  return <div className={`container ${className}`}>{children}</div>;
}

interface HeadingProps {
  level: 'h1' | 'h2' | 'h3';
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

function Heading({ level: Level, eyebrow, children, className = '' }: HeadingProps) {
  return (
    <>
      {eyebrow && <p className={`eyebrow mb-4 ${className}`}>{eyebrow}</p>}
      <Level className={className}>{children}</Level>
    </>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, description, accentColor, emoji } = project;

  return (
    <article className="card">
      {/* Image Section */}
      <div className="card-image">
        <div
          className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br"
          style={{
            backgroundColor: 'var(--bg-sunken)',
            backgroundImage: `radial-gradient(circle at 30% 30%, ${accentColor}15, transparent 50%)`,
          }}
        >
          {emoji}
        </div>
      </div>

      {/* Content Section */}
      <div className="card-body">
        <div className="card-kind" style={{ color: accentColor }}>
          {category}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description flex-grow">{description}</p>
      </div>
    </article>
  );
}

interface SkillsGridProps {
  skills: string[];
}

function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-var(--gap-card)">
      {skills.map((skill) => (
        <div
          key={skill}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-center border border-var(--border-soft) transition-colors duration-base hover:border-var(--border-strong) hover:bg-var(--bg-sunken)"
          style={{
            borderColor: 'var(--border-soft)',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
          }}
        >
          {skill}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function Home() {
  const skills = [
    'React.js',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Web Components',
    'REST APIs',
    'GraphQL',
    'WebRTC',
    'Performance',
    'Accessibility',
    'Node.js',
    'PostgreSQL',
  ];

  return (
    <div>
      {/* Skip to main content */}
      <a href="#main" className="skip-to-main">
        Skip to main content
      </a>

      {/* ========================================================================
          NAVIGATION
          ======================================================================== */}
      <nav className="fixed top-0 w-full z-50">
        <Container className="flex items-center justify-between py-4">
          <div className="font-semibold text-lg">Akshat Singh</div>
          <ul className="flex gap-8 text-sm hide-mobile">
            <li>
              <a href="#work" className="hover:text-var(--accent-primary) transition-colors duration-base">
                Work
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-var(--accent-primary) transition-colors duration-base">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-var(--accent-primary) transition-colors duration-base">
                Contact
              </a>
            </li>
          </ul>
        </Container>
      </nav>

      {/* ========================================================================
          HERO SECTION
          ======================================================================== */}
      <Section className="pt-32 sm:pt-40 md:pt-48 bg-gradient-to-b from-var(--bg-base) to-var(--bg-sunken)">
        <Container className="container-narrow">
          <div className="animate-fade-in-up">
            <p className="eyebrow mb-6">Frontend Engineer</p>
            <h1 className="display mb-8">Building premium digital experiences with React and Next.js</h1>
            <p className="lede mb-12 max-w-2xl">
              Specialized in high-performance, scalable applications. 3+ years crafting experiences for startups
              and enterprises. Frontend expert with a product mindset.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#work" className="btn btn-primary">
                View My Work
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* ========================================================================
          WORK SECTION
          ======================================================================== */}
      <Section id="work">
        <Container>
          <Heading level="h1" eyebrow="Featured Work">
            Selected Projects
          </Heading>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-var(--gap-card)">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================================
          ABOUT SECTION
          ======================================================================== */}
      <Section id="about" className="bg-var(--bg-sunken)">
        <Container>
          <Heading level="h1" eyebrow="About">
            Who I Am
          </Heading>

          <div className="mt-12 space-y-6 max-w-3xl mb-12">
            <p className="body-lg">
              <strong>Frontend Engineer</strong> with 3+ years building scalable, high-performance applications.
              Specialized in React.js, Next.js, TypeScript, and modern web architecture with a focus on User Experience
              and Accessibility.
            </p>

            <p className="body-lg">
              <strong>Track Record:</strong> 35%+ performance improvements on enterprise dashboards. 12+ production
              applications deployed. Consistent 98+ Lighthouse scores. WCAG AA accessibility compliance. Mentored junior
              developers and contributed to design system improvements.
            </p>

            <p className="body-lg">
              <strong>Currently:</strong> Building embeddable SaaS widgets at SparkTG with WebRTC real-time features
              supporting 1000+ concurrent users. Passionate about clean code, thoughtful UX, and shipping production-ready
              solutions.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-6">Core Skills</p>
            <SkillsGrid skills={skills} />
          </div>
        </Container>
      </Section>

      {/* ========================================================================
          CONTACT SECTION
          ======================================================================== */}
      <Section id="contact" className="text-center">
        <Container className="container-narrow">
          <Heading level="h1" eyebrow="Contact">
            Let's Build Something Great
          </Heading>

          <p className="lede mt-8 mb-12">
            Have an exciting project in mind? I'd love to hear about it. Reach out and let's create something
            remarkable together.
          </p>

          <a href="mailto:work.iamakshat@gmail.com" className="btn btn-primary">
            Get In Touch
          </a>
        </Container>
      </Section>

      {/* ========================================================================
          FOOTER
          ======================================================================== */}
      <footer
        className="border-t border-var(--border-soft) py-12 text-center text-var(--text-tertiary)"
        style={{ borderColor: 'var(--border-soft)' }}
      >
        <Container>
          <p className="caption">
            © 2026 Akshat Kumar Singh •{' '}
            <a href="https://github.com/Akshat53" className="text-var(--accent-primary) hover:underline">
              GitHub
            </a>{' '}
            •{' '}
            <a href="https://linkedin.com/in/akshat53" className="text-var(--accent-primary) hover:underline">
              LinkedIn
            </a>
          </p>
        </Container>
      </footer>
    </div>
  );
}
