import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-4">WSSC Water: Next Generation Website</h1>
          <p className="text-2xl mb-8">Powered by Next.js & Sanity CMS</p>
          <p className="text-lg max-w-2xl mx-auto">
            Full migration in progress. This is a complete rebuild with Sanity-first architecture,
            maintaining all features from the original demo while adding content management capabilities.
          </p>
          <div className="mt-12 p-6 bg-white/10 backdrop-blur rounded-lg max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Migration Status</h3>
            <ul className="text-left space-y-2">
              <li className="flex items-center">
                <span className="mr-2">✅</span> Next.js 14 Setup Complete
              </li>
              <li className="flex items-center">
                <span className="mr-2">✅</span> Sanity CMS Integration
              </li>
              <li className="flex items-center">
                <span className="mr-2">✅</span> Content Schemas Defined
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔄</span> Component Migration In Progress
              </li>
              <li className="flex items-center">
                <span className="mr-2">⏳</span> Content Population Pending
              </li>
              <li className="flex items-center">
                <span className="mr-2">⏳</span> Testing & Deployment Pending
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
