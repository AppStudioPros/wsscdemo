export function TechStackSection() {
  const technologies = [
    {
      icon: '⚛️',
      title: 'Next.js + React',
      description: 'Lightning-fast performance, SEO-optimized, scalable to millions of users'
    },
    {
      icon: '🎨',
      title: 'Sanity CMS',
      description: 'Real-time content updates, no IT dependency, version control'
    },
    {
      icon: '🚀',
      title: 'Vercel Hosting',
      description: 'Global edge network, automatic scaling, 99.9% uptime SLA'
    },
    {
      icon: '🐍',
      title: 'Python APIs',
      description: 'Seamless integration with Oracle billing, GIS, work orders'
    },
    {
      icon: '🧠',
      title: "Encore's Self-Healing AI",
      description: 'Custom built, exclusive AI that learns, adapts, and continuously improves—accurate & safe'
    },
    {
      icon: '📱',
      title: 'PWA',
      description: 'Offline access, installable, push notifications—app-like experience'
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 aspect-square flex flex-col items-center justify-center text-center shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_2px_rgba(37,99,235,0.5),0_8px_24px_rgba(37,99,235,0.25)] transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{tech.title}</h3>
              <p className="text-sm text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
