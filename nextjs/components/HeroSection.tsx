import { getHero } from '@/lib/sanity/client';
import { PhoneSimulation } from './PhoneSimulation';
import Image from 'next/image';

export async function HeroSection() {
  const hero = await getHero();

  if (!hero) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Hero content not configured in Sanity</p>
      </section>
    );
  }

  const scrollToAIFeatures = () => {
    if (typeof window !== 'undefined') {
      document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Video Background */}
      {hero.videoBackgroundUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={hero.videoBackgroundUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="text-white space-y-6">
          {hero.logo && (
            <Image
              src={hero.logo.asset.url}
              alt={hero.logo.alt || 'WSSC Water Logo'}
              width={300}
              height={100}
              className="mb-6"
              priority
            />
          )}
          <h1 className="text-5xl md:text-6xl font-bold">{hero.title}</h1>
          {hero.tagline && (
            <p className="text-2xl font-semibold text-blue-300">{hero.tagline}</p>
          )}
          {hero.subtitle && (
            <p className="text-lg text-gray-200 max-w-xl">{hero.subtitle}</p>
          )}
          {hero.ctaButton && (
            <button
              onClick={scrollToAIFeatures}
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
              data-testid="hero-primary-cta-button"
            >
              {hero.ctaButton.text}
            </button>
          )}
        </div>

        {/* Right Side - Phone Simulation */}
        <div className="flex justify-center">
          <PhoneSimulation />
        </div>
      </div>
    </section>
  );
}
