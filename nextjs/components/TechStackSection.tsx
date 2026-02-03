export function TechStackSection() {
  const technologies = [
    {
      icon: '⚛️',
      title: 'Next.js + React',
      description: 'Enterprise-grade framework with server-side rendering and optimal performance'
    },
    {
      icon: '🎨',
      title: 'Tailwind CSS',
      description: 'Modern, responsive design system for consistent UI across all devices'
    },
    {
      icon: '🚀',
      title: 'Vercel Edge',
      description: 'Global CDN deployment with 99.99% uptime and sub-second response times'
    },
    {
      icon: '🐍',
      title: 'Python FastAPI',
      description: 'High-performance backend for AI processing and data management'
    },
    {
      icon: '🧠',
      title: 'Claude AI',
      description: 'Advanced language model for intelligent customer interactions'
    },
    {
      icon: '📱',
      title: 'PWA Technology',
      description: 'Native app experience with offline support and push notifications'
    }
  ];

  return (
    <section id="tech-stack" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Technology</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built with cutting-edge technologies for maximum performance, scalability, and user
            experience.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_2px_rgba(37,99,235,0.5),0_8px_24px_rgba(37,99,235,0.25)] transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">{tech.title}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
