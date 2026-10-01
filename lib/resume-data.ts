// ATS-Friendly Resume Data Structure
// Optimized for: LinkedIn, Indeed, Google Cloud Talent, Workday, Greenhouse

export const resumeData = {
  personal: {
    name: 'Akshat Kumar Singh',
    title: 'Senior Frontend Engineer',
    email: 'work.iamakshat@gmail.com',
    phone: '+91-9634780846',
    location: 'Noida, India',
    portfolio: 'https://akshat-portfolio-xi.vercel.app',
    github: 'https://github.com/Akshat53',
    linkedin: 'https://linkedin.com/in/akshat53',
  },

  summary:
    'Results-driven Frontend Engineer with 4+ years of production experience building high-performance, scalable applications. Expert in React.js, Next.js, TypeScript, Java Spring Boot, and real-time systems. Built WorkSyncX, a comprehensive team collaboration platform with full-stack architecture. Specialized in building complex UIs, real-time synchronization, accessible applications, and modern design systems.',

  experience: [
    {
      company: 'SparkTG',
      position: 'Frontend Engineer',
      duration: 'February 2025 – Present',
      location: 'Noida, India',
      description: 'AI-Powered Cloud Communication Platform (Cloud Telephony, IVR, AI Voice Bots)',
      achievements: [
        'Building frontend features for enterprise contact center platform serving 500+ clients',
        'Working with React.js, Next.js, TypeScript for scalable SaaS applications',
        'Collaborating on real-time systems and performance optimization',
        'Using AI tools (Claude Code, Codex) for accelerated development',
      ],
      technologies: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'REST APIs',
        'Claude Code',
      ],
    },
    {
      company: 'Ellemora (Fashion E-commerce)',
      position: 'Full Stack Engineer (Frontend Heavy)',
      duration: 'August 2023 – February 2025',
      location: 'Bareilly, India',
      description: 'E-commerce Platform Development',
      achievements: [
        'Built complete fashion e-commerce platform with React.js and Next.js',
        'Implemented server-side rendering (SSR) and progressive web app (PWA) - 40% SEO improvement',
        'Integrated Stripe payment processing with secure handling',
        'Built responsive UI supporting desktop, tablet, and mobile (320px-2560px)',
        'Achieved 98+ Lighthouse score through optimization',
      ],
      technologies: [
        'Next.js',
        'React.js',
        'Node.js',
        'Strapi CMS',
        'PostgreSQL',
        'Stripe API',
        'Tailwind CSS',
      ],
    },
    {
      company: 'Wipro Technologies',
      position: 'Project Engineer (Frontend Heavy)',
      duration: 'June 2022 – August 2023',
      location: 'Noida, India',
      description: 'Enterprise FinTech Solutions (Frontend & Spring Boot)',
      achievements: [
        'Built frontend components with React.js for enterprise FinTech dashboard at Alight Solutions',
        'Developed Java Spring Boot microservices for backend APIs and data processing',
        'Improved UX by 25-30% through accessibility optimization (WCAG AA compliance)',
        'Built reusable components for large dataset handling',
        'Collaborated in Agile teams with bi-weekly releases',
      ],
      technologies: [
        'React.js',
        'Bootstrap',
        'Java',
        'Spring Boot',
        'REST APIs',
        'PostgreSQL',
        'Jira',
        'Agile',
      ],
    },
  ],

  education: [
    {
      degree: 'Master of Computer Application (MCA)',
      institution: 'Jain University',
      location: 'Bengaluru, India',
      year: '2023-2025',
    },
    {
      degree: 'Bachelor of Computer Application (BCA)',
      institution: 'Invertis University',
      location: 'Bareilly, India',
      year: '2019-2022',
    },
  ],

  certifications: [
    {
      name: 'Microsoft Azure Fundamentals (AZ-900)',
      issuer: 'Microsoft',
      year: '2024',
    },
    {
      name: 'Progressive Web Apps (PWA) - Google Web Fundamentals',
      issuer: 'Google',
      year: '2023',
    },
  ],

  skills: {
    'Frontend Core': ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS'],
    'State & Architecture': ['Redux', 'Context API', 'Zustand', 'Custom Hooks', 'Component Architecture', 'Micro Frontends'],
    'Real-Time & APIs': ['WebRTC', 'WebSockets', 'REST APIs', 'GraphQL', 'Axios', 'Fetch API', 'Optimistic Updates'],
    'Performance & Optimization': [
      'Code Splitting',
      'Lazy Loading',
      'Memoization',
      'Virtualization',
      'Bundle Optimization',
      'Image Optimization',
      'Caching Strategies',
    ],
    'UI/UX & Design': [
      'Responsive Design',
      'Accessibility (WCAG AA)',
      'Design Systems',
      'Component Libraries',
      'ShadCN UI',
      'Bootstrap',
      'Figma',
    ],
    'Backend & Databases': ['Node.js', 'Express.js', 'Java (Spring Boot)', 'PostgreSQL', 'MySQL', 'Strapi CMS'],
    'Tools & DevOps': ['Git', 'GitHub', 'Bitbucket', 'CI/CD', 'Jenkins', 'Docker', 'Vercel', 'Agile/Jira'],
    'Web Technologies': ['PWA', 'Service Workers', 'IndexedDB', 'LocalStorage', 'WebWorkers', 'SEO Optimization'],
  },

  projects: [
    {
      name: 'WorkSyncX - Team Collaboration & Sync Platform',
      description: 'Comprehensive team collaboration platform enabling real-time task synchronization, team management, and communication. Full-stack application with React.js frontend and Spring Boot backend supporting concurrent users, real-time updates, and seamless data sync.',
      highlights: [
        'Full-stack architecture (React + Spring Boot)',
        'Real-time task synchronization',
        'Multi-user concurrent support',
        'Team workflows and task assignments',
        'Production-grade implementation',
      ],
      technologies: [
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
      link: 'https://github.com/Akshat53/worksyncx-backend',
    },
  ],

  summary_short:
    'Senior Frontend Engineer | React & Next.js Specialist | Real-time Systems Expert | 3+ Years SaaS Experience',
};

// ATS Keywords (for parsing optimization)
export const atsKeywords = {
  hard_skills: [
    'React.js',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS',
    'Tailwind',
    'Redux',
    'WebRTC',
    'WebSockets',
    'REST API',
    'GraphQL',
    'Node.js',
    'PostgreSQL',
    'Git',
    'Agile',
  ],
  soft_skills: ['Communication', 'Problem Solving', 'Team Leadership', 'Code Review', 'Mentoring', 'Agile Methodology'],
  industries: ['SaaS', 'FinTech', 'E-commerce', 'Cloud Communication', 'Enterprise Software'],
  achievements: [
    '35% performance improvement',
    '25-30% UX improvement',
    '98+ Lighthouse score',
    '500+ clients',
    '50M+ calls/month',
    '2.4M+ concurrent conversations',
  ],
};
