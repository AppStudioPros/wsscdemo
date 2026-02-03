import { Suspense } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { AIFeaturesSection } from '@/components/AIFeaturesSection';
import { ChatbotDemo } from '@/components/ChatbotDemo';
import { ROICalculator } from '@/components/ROICalculator';
import { TechStackSection } from '@/components/TechStackSection';
import { EncoreContactSection } from '@/components/EncoreContactSection';
import { getChatbotConfig, getROICalculator } from '@/lib/sanity/client';

function LoadingSection({ height = 'min-h-screen' }: { height?: string }) {
  return (
    <div className={`${height} flex items-center justify-center bg-gray-100`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading content...</p>
      </div>
    </div>
  );
}

export default async function Home() {
  // Fetch client-component props from Sanity
  const chatbotConfig = await getChatbotConfig();
  const roiCalculator = await getROICalculator();

  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSection />}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <ComparisonSection />
      </Suspense>

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <AIFeaturesSection />
      </Suspense>

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <ChatbotDemo
          welcomeMessage={chatbotConfig?.welcomeMessage}
          quickQuestions={chatbotConfig?.quickQuestions}
        />
      </Suspense>

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <ROICalculator fields={roiCalculator?.fields} />
      </Suspense>

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <TechStackSection />
      </Suspense>

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <EncoreContactSection />
      </Suspense>
    </main>
  );
}
