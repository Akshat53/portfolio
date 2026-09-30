'use client';

import { ReactNode } from 'react';

// ============================================================================
// PROJECT DATA - From Resume (100% Accurate)
// ============================================================================

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  impact: string[];
  techStack: string[];
  accentColor: string;
}

const projects: Project[] = [
  {
    id: 'sparktg-widgets',
    title: 'AI Chatbot & Dialer Widgets',
    category: 'SaaS / WebRTC',
    description:
      'Built embeddable SaaS widgets including AI chatbot with WebRTC voice calling and dialer widget for ticketing dashboards. Designed for reusability, modularity, and low-friction integration across multiple client platforms including Zomato\'s Nugget dashboard via Shiprocket integration.',
    impact: ['Multi-platform integration', 'Modular architecture', 'WebRTC real-time voice calling'],
    techStack: ['React.js', 'Web Components', 'WebRTC', 'Tailwind CSS', 'REST APIs', 'CI/CD'],
    accentColor: 'var(--project-sparktg)',
  },
  {
    id: 'sparktg-website',
    title: 'SparkTG Client Website & Dashboard',
    category: 'Next.js / Design System',
    description:
      'Developed client-facing marketing website with modern UI, responsive design, and full SEO optimization. Leading ongoing effort to revamp the internal agent/admin dashboard UI using atomic design principles and modern design systems.',
    impact: ['35% dashboard performance improvement', 'Full SEO optimization', 'Atomic design system'],
    techStack: ['Next.js', 'React.js', 'Tailwind CSS', 'ShadCN UI', 'Vercel', 'Agile'],
    accentColor: 'var(--project-marketing)',
  },
  {
    id: 'ellemora',
    title: 'Ellemora Fashion E-commerce Platform',
    category: 'Full-Stack / E-commerce',
    description:
      'Built full-featured fashion e-commerce platform with Stripe payments, Strapi CMS backend, and responsive UI. Implemented server-side rendering (SSR) and progressive web app (PWA) features resulting in 40% better SEO and page load speed.',
    impact: ['40% SEO & page load improvement', 'Full SSR implementation', 'Offline PWA support', 'Stripe integration'],
    techStack: ['Next.js', 'React.js', 'Node.js', 'Strapi', 'PostgreSQL', 'Stripe API', 'Tailwind CSS'],
    accentColor: 'var(--project-ellemora)',
  },
  {
    id: 'alight-fintech',
    title: 'FinTech Dashboard — Alight Solutions',
    category: 'Enterprise / FinTech',
    description:
      'Created reusable UI components and optimized data rendering for large datasets in enterprise financial tools. Improved accessibility and reduced user workflow times through thoughtful UX design and performance tuning.',
    impact: ['25-30% UX improvement', 'Accessibility optimization', 'Large dataset handling', 'Workflow time reduction'],
    techStack: ['React.js', 'Bootstrap', 'REST APIs', 'Jenkins', 'Jira', 'Agile'],
    accentColor: 'var(--project-alight)',
  },
  {
    id: 'sparktg-dashboard-revamp',
    title: 'SparkTG Dashboard UI Revamp',
    category: 'Design Systems / Performance',
    description:
      'Enhanced entire SparkTG dashboard UI applying modern design systems, accessibility standards, and performance best practices. Achieved 35% performance improvement through code splitting, memoization, and optimized rendering.',
    impact: ['35% performance improvement', 'Modern design system', 'WCAG accessibility compliance', 'Code splitting optimization'],
    techStack: ['React.js', 'Next.js', 'Tailwind CSS', 'Code Splitting', 'Memoization'],
    accentColor: 'var(--project-dashboard)',
  },
  {
    id: 'pocket-notes',
    title: 'Pocket Notes PWA',
    category: 'PWA / Personal Project',
    description:
      'Built offline-first progressive web app for note-taking with local storage persistence and push notifications. Demonstrates expertise in Service Workers, Cache API, and IndexedDB for seamless offline functionality.',
    impact: ['Offline-first functionality', 'Push notifications', 'Local storage persistence'],
    techStack: ['React.js', 'IndexedDB', 'Cache API', 'Service Workers', 'PWA'],
    accentColor: 'var(--project-pocketnotes)',
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
  const { title, category, description, impact, techStack, accentColor } = project;

  return (
    <article className="card">
      <div className="card-body">
        <div className="card-kind" style={{ color: accentColor }}>
          {category}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
          <p className="eyebrow mb-2">Impact</p>
          <ul className="space-y-1">
            {impact.map((point) => (
              <li key={point} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                • {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-soft)' }}>
          <p className="eyebrow mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded border"
                style={{
                  backgroundColor: accentColor + '15',
                  color: accentColor,
                  borderColor: accentColor,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// SKILLS
// ============================================================================

const skillCategories = [
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'Web Components', 'TypeScript', 'Tailwind CSS', 'ShadCN UI'],
  },
  {
    category: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Java (Spring Boot)'],
  },
  {
    category: 'Specializations',
    skills: ['PWA', 'WebRTC', 'SEO', 'Accessibility (WCAG)', 'Micro Frontends', 'Code Splitting'],
  },
  {
    category: 'Tools & Practices',
    skills: ['Git', 'GitHub', 'CI/CD', 'Jenkins', 'Docker', 'Agile', 'Jira'],
  },
];

// ============================================================================
// PAGE
// ============================================================================

export default function Home() {
  return (
    <div>
      <a href="#main" className="skip-to-main">
        Skip to main content
      </a>

      <nav className="fixed top-0 w-full z-50">
        <Container className="flex items-center justify-between py-4">
          <div className="font-semibold text-lg">Akshat Kumar Singh</div>
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

      <Section className="pt-32 sm:pt-40 md:pt-48 bg-gradient-to-b from-var(--bg-base) to-var(--bg-sunken)">
        <Container className="container-narrow">
          <div className="animate-fade-in-up">
            <p className="eyebrow mb-6">Frontend Engineer</p>
            <h1 className="display mb-8">Building high-performance, scalable applications</h1>
            <p className="lede mb-12 max-w-2xl">
              3+ years crafting production-grade frontends with React.js, Next.js, and Web Components. Specializing in
              SaaS product development, responsive design, and performance optimization. Currently building embeddable
              widgets at SparkTG.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#work" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get In Touch
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="work">
        <Container>
          <Heading level="h1" eyebrow="Featured Work">
            Projects & Impact
          </Heading>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-var(--gap-card)">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="skills" className="bg-var(--bg-sunken)">
        <Container>
          <Heading level="h1" eyebrow="Technical Skills">
            Expertise & Stack
          </Heading>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map((category) => (
              <div key={category.category}>
                <h3 className="h3 mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium border hover:border-var(--border-strong) transition-colors duration-base"
                      style={{
                        borderColor: 'var(--border-soft)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="about">
        <Container>
          <Heading level="h1" eyebrow="About">
            Who I Am
          </Heading>

          <div className="mt-12 space-y-6 max-w-3xl">
            <p className="body-lg">
              I'm a results-driven <strong>Frontend Engineer</strong> with 3+ years of hands-on experience building
              high-performance, scalable applications. My expertise spans React.js, Next.js, and Web Components, with a
              proven track record of improving UI responsiveness and application performance by 30%+.
            </p>

            <p className="body-lg">
              <strong>Current Focus:</strong> At SparkTG, I'm developing embeddable SaaS widgets including an AI chatbot
              with WebRTC voice calling, integrated into client platforms like Zomato's Nugget dashboard. I'm also
              leading the dashboard UI revamp using modern design systems and accessibility best practices.
            </p>

            <p className="body-lg">
              <strong>Track Record:</strong> Built full-stack e-commerce platforms with Stripe integration and 40% SEO
              improvements. Optimized enterprise FinTech dashboards for 25-30% better UX. Architected modular,
              reusable components for production-grade applications. Comfortable with Agile delivery, CI/CD pipelines,
              and cross-browser compatibility.
            </p>

            <p className="body-lg">
              <strong>Education:</strong> Master of Computer Application (Jain University, 2025) • Bachelor of Computer
              Application (Invertis University, 2022). Certified in Microsoft Azure Fundamentals (AZ-900) and Google PWA
              Fundamentals.
            </p>
          </div>
        </Container>
      </Section>

      <Section id="contact" className="text-center bg-var(--bg-sunken)">
        <Container className="container-narrow">
          <Heading level="h1" eyebrow="Contact">
            Let's Work Together
          </Heading>

          <p className="lede mt-8 mb-12">
            Have an exciting project or opportunity? I'd love to hear from you. Reach out via email or connect on
            LinkedIn/GitHub.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:work.iamakshat@gmail.com" className="btn btn-primary">
              Email Me
            </a>
            <a href="https://linkedin.com/in/akshat53" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/Akshat53" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </Container>
      </Section>

      <footer
        className="border-t border-var(--border-soft) py-12 text-center text-var(--text-tertiary)"
        style={{ borderColor: 'var(--border-soft)' }}
      >
        <Container>
          <p className="caption">
            © 2026 Akshat Kumar Singh • work.iamakshat@gmail.com • +91-9634780846 • India
          </p>
        </Container>
      </footer>
    </div>
  );
}
