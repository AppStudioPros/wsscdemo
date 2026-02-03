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

      {/* Subtle blue glow background for readability - positioned at top */}
      <div className="absolute inset-x-0 top-0 h-[65vh] md:h-[60vh] bg-gradient-to-b from-blue-900/85 via-blue-800/60 to-transparent pointer-events-none z-[5]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8 md:py-0">
        <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white space-y-4 md:space-y-6">
            {hero.logo && (
              <Image
                src={hero.logo.asset.url}
                alt={hero.logo.alt || 'WSSC Water Logo'}
                width={300}
                height={100}
                className="mb-4 md:mb-6 w-48 md:w-[300px] h-auto"
                priority
              />
            )}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {hero.title}
            </h1>
            {hero.tagline && (
              <p className="text-xl md:text-2xl font-semibold text-blue-300">
                {hero.tagline}
              </p>
            )}
            {hero.subtitle && (
              <p className="text-base md:text-lg text-gray-200 max-w-xl">
                {hero.subtitle}
              </p>
            )}
            {hero.ctaButton && (
              <button
                onClick={scrollToAIFeatures}
                className="inline-block px-6 py-3 md:px-8 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 min-h-[48px]"
                data-testid="hero-primary-cta-button"
              >
                {hero.ctaButton.text}
              </button>
            )}
          </div>

          {/* Right Side - Phone Simulation */}
          <div className="flex justify-center mt-4 md:mt-0">
            <PhoneSimulation />
          </div>
        </div>
      </div>
    </section>
  );
}
