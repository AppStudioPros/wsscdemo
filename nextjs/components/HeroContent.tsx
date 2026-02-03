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

const VIDEO_URL = "https://customer-assets.emergentagent.com/job_e4309676-f936-468a-85ba-a6da5ef3628a/artifacts/v2g5ybas_Hailuo_Video_Create%20a%20high-quality%20video%20sh_475141841006280714.mp4";
const LOGO_URL = "https://customer-assets.emergentagent.com/job_e4309676-f936-468a-85ba-a6da5ef3628a/artifacts/0jjchx6u_Wlogo-REVERSED-01.png";

export function HeroContent({ hero }: HeroContentProps) {
  const scrollToAIFeatures = () => {
    document.getElementById('ai-features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Video Background - NO LOOP */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white text-center md:text-left">
            <Image
              src={LOGO_URL}
              alt="WSSC Water Logo"
              width={300}
              height={100}
              className="mb-4 md:mb-6 w-40 md:w-[300px] h-auto mx-auto md:mx-0"
              priority
            />
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 md:mb-4 text-white">
              {hero.title}
            </h1>
            {hero.tagline && (
              <p className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 italic">
                {hero.tagline}
              </p>
            )}
            {hero.subtitle && (
              <p className="text-base md:text-lg text-white max-w-xl mx-auto md:mx-0 mb-4 md:mb-6">
                {hero.subtitle}
              </p>
            )}
            {hero.ctaButton && (
              <button
                onClick={scrollToAIFeatures}
                className="inline-block px-6 py-3 md:px-8 md:py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-full border-2 border-white transition-colors duration-300 min-h-[48px]"
                data-testid="hero-primary-cta-button"
              >
                {hero.ctaButton.text}
              </button>
            )}
          </div>

          {/* Right Side - Phone Simulation */}
          <div className="flex justify-center mt-6 md:mt-0">
            <PhoneSimulation />
          </div>
        </div>
      </div>
    </section>
  );
}
