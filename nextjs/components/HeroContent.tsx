'use client';

import Image from 'next/image';
import { PhoneSimulation } from './PhoneSimulation';

interface HeroContentProps {
  hero: {
    title: string;
    tagline?: string;
    subtitle?: string;
    videoBackgroundUrl?: string;
    logo?: {
      asset: { url: string };
      alt?: string;
    };
    ctaButton?: {
      text: string;
      link: string;
    };
  };
}

export function HeroContent({ hero }: HeroContentProps) {
  const scrollToAIFeatures = () => {
    document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-4 md:gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="text-white space-y-6">
          {/* Subtle blue glow background for readability */}
          <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
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
        </div>

        {/* Right Side - Phone Simulation */}
        <div className="flex justify-center">
          <PhoneSimulation />
        </div>
      </div>
    </section>
  );
}
