'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm bg-white/80 border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-lg">Akshat Singh</div>
          <div className="flex gap-6 text-sm">
            <a href="#work" className="hover:text-blue-600">Work</a>
            <a href="#about" className="hover:text-blue-600">About</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm font-bold text-blue-600 uppercase mb-4">Frontend Engineer</div>
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Building premium digital experiences with React and Next.js
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            Specialized in high-performance, scalable applications. 3+ years crafting experiences for startups and enterprises.
          </p>
          <div className="flex gap-4">
            <a href="#work" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              View My Work
            </a>
            <a href="#contact" className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm font-bold text-blue-600 uppercase mb-4">Featured Work</div>
          <h2 className="text-5xl font-bold mb-16">Selected Projects</h2>
          
          <div className="space-y-20">
            {/* Project 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-6xl">🤖</div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">SaaS / WebRTC</div>
                <h3 className="text-3xl font-bold mb-3">SparkTG AI Chatbot & Dialer</h3>
                <p className="text-gray-600 leading-relaxed">Embeddable SaaS widgets with real-time voice calling via WebRTC, modular architecture, and production-grade infrastructure supporting 1000+ concurrent users.</p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">E-commerce / Next.js</div>
                <h3 className="text-3xl font-bold mb-3">Ellemora Fashion Platform</h3>
                <p className="text-gray-600 leading-relaxed">Full-featured e-commerce platform with Stripe payments, SSR, PWA support, and Strapi CMS backend. Achieved 98 Lighthouse score.</p>
              </div>
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-6xl">👗</div>
            </div>

            {/* Project 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-6xl">📊</div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">Dashboard / Design</div>
                <h3 className="text-3xl font-bold mb-3">SparkTG Dashboard Redesign</h3>
                <p className="text-gray-600 leading-relaxed">Modern analytics dashboard using atomic design principles, ShadCN UI components, and Tailwind CSS. Achieved 25% UX improvement.</p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">FinTech / Enterprise</div>
                <h3 className="text-3xl font-bold mb-3">Alight Solutions Dashboard</h3>
                <p className="text-gray-600 leading-relaxed">Enterprise financial dashboard with WCAG AA accessibility compliance, 40% performance optimization, serving 500+ users.</p>
              </div>
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-6xl">💳</div>
            </div>

            {/* Project 5 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-6xl">💻</div>
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">Marketing / SEO</div>
                <h3 className="text-3xl font-bold mb-3">SparkTG Marketing Website</h3>
                <p className="text-gray-600 leading-relaxed">Modern marketing website with Next.js, responsive design, full SEO optimization. Achieved 98+ Lighthouse scores.</p>
              </div>
            </div>

            {/* Project 6 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase mb-2">PWA / Offline-First</div>
                <h3 className="text-3xl font-bold mb-3">Pocket Notes App</h3>
                <p className="text-gray-600 leading-relaxed">Offline-first progressive web app with IndexedDB storage, Service Workers, push notifications, and cloud synchronization.</p>
              </div>
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center text-6xl">📝</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm font-bold text-blue-600 uppercase mb-4">About</div>
          <h2 className="text-5xl font-bold mb-8">Who I Am</h2>
          
          <div className="space-y-6 mb-10">
            <p className="text-lg text-gray-700"><strong>Frontend Engineer</strong> with 3+ years building scalable, high-performance applications. Specialized in React.js, Next.js, TypeScript, and modern web architecture.</p>
            <p className="text-lg text-gray-700"><strong>Track Record:</strong> 35%+ performance improvements on enterprise dashboards. 12+ production applications deployed. Consistent 98+ Lighthouse scores. WCAG AA accessibility compliance.</p>
            <p className="text-lg text-gray-700"><strong>Currently:</strong> Building embeddable SaaS widgets at SparkTG with WebRTC real-time features supporting 1000+ concurrent users.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web Components', 'REST APIs', 'GraphQL', 'WebRTC', 'Performance', 'Accessibility', 'Node.js', 'PostgreSQL'].map(skill => (
              <div key={skill} className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-semibold text-center">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm font-bold text-blue-600 uppercase mb-4">Contact</div>
          <h2 className="text-5xl font-bold mb-6">Let's Build Something Great</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Have an exciting project in mind? I'd love to hear about it.</p>
          <a href="mailto:work.iamakshat@gmail.com" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
            Get In Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 text-center text-gray-600">
        <div className="max-w-6xl mx-auto">
          <p>© 2026 Akshat Kumar Singh • <a href="https://github.com/Akshat53" className="text-blue-600 hover:underline">GitHub</a> • <a href="https://linkedin.com/in/akshat53" className="text-blue-600 hover:underline">LinkedIn</a></p>
        </div>
      </footer>
    </div>
  );
}
