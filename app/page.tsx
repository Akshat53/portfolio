'use client';

import { ReactNode } from 'react';

// ============================================================================
// PROJECT DATA - From Resume (100% Accurate)
// Hero: Portal v2 Dashboard (Most Proud Of)
// ============================================================================

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string[];
  techStack: string[];
  accentColor: string;
  isHero?: boolean;
}

const projects: Project[] = [
  {
    id: 'worksyncx',
    title: 'WorkSyncX - Team Collaboration & Sync Platform',
    category: 'Full-Stack / Real-time Collaboration',
    description:
      'Built a comprehensive team collaboration platform enabling real-time task synchronization, team management, and communication. Implemented with React.js frontend and Spring Boot backend supporting concurrent users, real-time updates, and seamless data sync. Features include task assignments, team workflows, instant notifications, and collaborative features for distributed teams.',
    impact: [
      'Full-stack platform for team collaboration',
      'Real-time task synchronization',
      'Multi-user concurrent support',
      'Production-grade backend architecture',
      'Comprehensive frontend UI with React',
    ],
    techStack: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'REST APIs',
      'WebSockets',
      'Tailwind CSS',
    ],
    accentColor: 'var(--accent-primary)',
    isHero: true,
  },
  {
    id: 'sparktg-website',
    title: 'SparkTG Website',
    category: 'Marketing / Next.js',
    description:
      'Built complete sparktg.com marketing website with modern UI, responsive design, full SEO optimization, and 98+ Lighthouse score. Focused on showcasing platform capabilities with fast load times, smooth animations, and professional visual design.',
    impact: ['98+ Lighthouse score', 'Full SEO optimization', 'Responsive design', '<1s load time'],
    techStack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Vercel', 'SEO'],
    accentColor: 'var(--project-marketing)',
  },
  {
    id: 'sparkchat-widget',
    title: 'SparkChat Widget',
    category: 'SaaS / Web Components',
    description:
      'Developed embeddable SaaS chatbot widget integrated into 100+ client websites. Built with Web Components for cross-domain isolation, ensuring zero side effects on client code. Achieved <500ms latency and 99.9% uptime with AI-powered conversations and real-time messaging.',
    impact: ['100+ client integrations', '<500ms latency', '99.9% uptime', 'AI conversations'],
    techStack: ['React.js', 'Web Components', 'TypeScript', 'REST APIs', 'WebSockets'],
    accentColor: 'var(--project-sparktg)',
  },
  {
    id: 'calling-widget',
    title: 'Calling Widget',
    category: 'WebRTC / Real-time',
    description:
      'Built integrable voice calling widget used by Zomato Nugget, Eternal, and multiple enterprise clients. Implemented WebRTC integration for real-time voice calls with reliable connection handling, optimized latency, and multi-client support.',
    impact: ['Production grade', 'Real-time voice', 'Multi-client', 'Enterprise ready'],
    techStack: ['React.js', 'WebRTC', 'TypeScript', 'REST APIs', 'WebSockets'],
    accentColor: 'var(--project-dashboard)',
  },
  {
    id: 'ellemora',
    title: 'Ellemora Fashion E-commerce',
    category: 'Full-Stack / E-commerce',
    description:
      'Built full-featured fashion e-commerce platform with Stripe payments, Strapi CMS backend, and responsive UI. Implemented server-side rendering (SSR) and progressive web app (PWA) resulting in 40% SEO improvement and fast page loads.',
    impact: ['40% SEO improvement', 'Full SSR + PWA', '98+ Lighthouse', 'Stripe integration'],
    techStack: ['Next.js', 'React.js', 'Node.js', 'Strapi', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    accentColor: 'var(--project-ellemora)',
  },
  {
    id: 'alight-fintech',
    title: 'FinTech Dashboard — Alight Solutions',
    category: 'Enterprise / FinTech',
    description:
      'Created reusable UI components and optimized data rendering for large datasets in enterprise financial tools. Improved UX by 25-30% through accessibility optimization (WCAG AA compliance) and performance tuning.',
    impact: ['25-30% UX improvement', 'WCAG AA compliance', 'Large dataset handling'],
    techStack: ['React.js', 'Bootstrap', 'REST APIs', 'Jenkins', 'Jira'],
    accentColor: 'var(--project-alight)',
  },
];

// ============================================================================
// COMPONENTS
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
  level: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
}

function Heading({ level, children, className = '' }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={`heading heading-${level} ${className}`}>
      {children}
    </Tag>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className={`project-card ${project.isHero ? 'project-card-hero' : ''}`}
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      <div className="project-card-header">
        <span className="project-category">{project.category}</span>
      </div>

      <Heading level={3} className="project-title">
        {project.title}
      </Heading>

      <p className="project-description">{project.description}</p>

      <div className="project-section">
        <h4 className="project-section-title">Impact</h4>
        <ul className="project-impact">
          {project.impact.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="project-section">
        <h4 className="project-section-title">Tech Stack</h4>
        <div className="tech-stack">
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function Home() {
  const heroProject = projects.find((p) => p.isHero);
  const otherProjects = projects.filter((p) => !p.isHero);

  return (
    <div className="page">
      {/* Navigation */}
      <nav className="nav">
        <Container className="nav-content">
          <a href="/" className="nav-logo">
            Akshat Kumar Singh
          </a>
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
              <a href="/resume" className="hover:text-var(--accent-primary) transition-colors duration-base">
                Resume
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

      {/* Hero Section - Portal v2 */}
      <Section id="hero" className="hero-section">
        <Container>
          {heroProject && (
            <div className="hero-content">
              <div className="hero-text">
                <span className="hero-tag">Featured Project</span>
                <Heading level={1} className="hero-title">
                  {heroProject.title}
                </Heading>
                <p className="hero-subtitle">{heroProject.description}</p>

                <div className="hero-stats">
                  {heroProject.impact.slice(0, 3).map((stat, idx) => (
                    <div key={idx} className="stat">
                      <div className="stat-value">{stat}</div>
                    </div>
                  ))}
                </div>

                <div className="hero-tech">
                  <h4 className="project-section-title">Built With</h4>
                  <div className="tech-stack">
                    {heroProject.techStack.slice(0, 5).map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Projects Grid */}
      <Section id="work" className="projects-section">
        <Container>
          <Heading level={2} className="section-title">
            Other Projects
          </Heading>

          <div className="projects-grid">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section id="about" className="about-section">
        <Container>
          <Heading level={2} className="section-title">
            About
          </Heading>

          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a <strong>Frontend Engineer</strong> with 3+ years of production experience building
                high-performance, scalable applications. I specialize in React.js, Next.js, and full-stack development
                at <strong>SparkTG</strong>, an AI-powered cloud communication platform.
              </p>

              <p>
                My expertise spans frontend architecture, real-time systems, performance optimization, accessibility standards, and design
                systems. I'm passionate about building products that are both powerful and delightful to use. Built <strong>WorkSyncX</strong>, a comprehensive team collaboration platform with React frontend and Spring Boot backend.
              </p>

              <p>
                Currently working at SparkTG on scalable SaaS features. Previously built Ellemora fashion e-commerce platform with SSR & PWA support,
                and worked on enterprise FinTech dashboards at Wipro with full-stack capabilities (React + Spring Boot).
              </p>
            </div>

            <div className="skills-grid">
              <div className="skill-category">
                <h4>Frontend</h4>
                <p>React.js, Next.js, TypeScript, Tailwind CSS, Web Components</p>
              </div>
              <div className="skill-category">
                <h4>State & Real-time</h4>
                <p>Redux, WebSockets, WebRTC, Optimistic Updates, Claude Code, Codex</p>
              </div>
              <div className="skill-category">
                <h4>Backend & Full-stack</h4>
                <p>Node.js, Java, Spring Boot, PostgreSQL, REST APIs, Stripe</p>
              </div>
              <div className="skill-category">
                <h4>Other</h4>
                <p>Performance Optimization, Accessibility (WCAG AA), Design Systems, Git, Agile</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="contact-section">
        <Container>
          <Heading level={2} className="section-title">
            Get In Touch
          </Heading>

          <div className="contact-content">
            <p>I'm always interested in connecting with fellow engineers and exploring new opportunities.</p>

            <div className="contact-links">
              <a
                href="mailto:work.iamakshat@gmail.com"
                className="contact-link"
              >
                Email
              </a>
              <a
                href="https://github.com/Akshat53"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/akshat53"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="footer">
        <Container>
          <p>© 2026 Akshat Kumar Singh. Built with React & Next.js.</p>
        </Container>
      </footer>
    </div>
  );
}
