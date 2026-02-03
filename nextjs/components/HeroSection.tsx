import { getHero } from '@/lib/sanity/client';
import { HeroContent } from './HeroContent';

export async function HeroSection() {
  const hero = await getHero();

  if (!hero) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Hero content not configured in Sanity</p>
      </section>
    );
  }

  return <HeroContent hero={hero} />;
}
