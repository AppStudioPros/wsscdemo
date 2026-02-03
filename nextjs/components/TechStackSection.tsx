import { getTechStack } from '@/lib/sanity/client';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

export async function TechStackSection() {
  const techStack = await getTechStack();

  if (!techStack || techStack.length === 0) {
    return null;
  }

  return (
    <section id="tech-stack" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Modern Tech Stack</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Built with cutting-edge technologies for maximum performance, scalability, and user
            experience.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {techStack.map((tech: any) => (
            <div
              key={tech._id}
              className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-700 transition-colors"
            >
              {tech.logo && (
                <div className="w-16 h-16 mb-4 relative">
                  <Image
                    src={urlFor(tech.logo).width(64).height(64).url()}
                    alt={tech.logo.alt || tech.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
              {tech.description && <p className="text-sm text-gray-400">{tech.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
