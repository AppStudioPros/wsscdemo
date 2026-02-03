'use client';

import { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      setShowGlow(true);
    };

    video.addEventListener('ended', handleVideoEnd);
    
    // Show glow after 4 seconds as fallback (video may be looping)
    const timer = setTimeout(() => {
      setShowGlow(true);
    }, 4000);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      clearTimeout(timer);
    };
  }, []);

  const scrollToAIFeatures = () => {
    document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-start md:items-center pt-16 md:pt-0">
      {/* Video Background */}
      {hero.videoBackgroundUrl && (
        <video
          ref={videoRef}
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

      {/* Base dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Blue glow overlay that fades in after video plays - MOBILE OPTIMIZED */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-[#0066CC]/90 via-[#0066CC]/70 to-[#0066CC]/40 pointer-events-none z-[5] transition-opacity duration-1000 ease-in-out ${
          showGlow ? 'opacity-100' : 'opacity-0'
        }`}
        data-testid="hero-blue-glow"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Mobile: Stack vertically with minimal gap | Desktop: Side by side */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-12 md:items-center">
          
          {/* Text Content */}
          <div className="text-white text-center md:text-left">
            {hero.logo && (
              <Image
                src={hero.logo.asset.url}
                alt={hero.logo.alt || 'WSSC Water Logo'}
                width={300}
                height={100}
                className="mb-3 md:mb-6 w-32 md:w-[300px] h-auto mx-auto md:mx-0"
                priority
              />
            )}
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 md:mb-4">
              {hero.title}
            </h1>
            {hero.tagline && (
              <p className="text-lg md:text-2xl font-semibold text-blue-200 mb-2 md:mb-4">
                {hero.tagline}
              </p>
            )}
            {hero.subtitle && (
              <p className="text-sm md:text-lg text-gray-200 max-w-xl mx-auto md:mx-0 mb-3 md:mb-6">
                {hero.subtitle}
              </p>
            )}
            {hero.ctaButton && (
              <button
                onClick={scrollToAIFeatures}
                className="inline-block px-5 py-2.5 md:px-8 md:py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/40 transition-all duration-300 min-h-[44px]"
                data-testid="hero-primary-cta-button"
              >
                {hero.ctaButton.text}
              </button>
            )}
          </div>

          {/* Phone Simulation - DRASTICALLY REDUCED GAP ON MOBILE */}
          <div className="flex justify-center mt-4 md:mt-0">
            <PhoneSimulation />
          </div>
        </div>
      </div>
    </section>
  );
}
