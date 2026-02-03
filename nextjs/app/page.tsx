import { Suspense } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { AIFeaturesSection } from '@/components/AIFeaturesSection';
import { ChatbotDemo } from '@/components/ChatbotDemo';
import { PWASection } from '@/components/PWASection';
import { AppExperienceSection } from '@/components/AppExperienceSection';
import { CommandCenterSection } from '@/components/CommandCenterSection';
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

function SetupRequired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-gray-900 text-white p-6">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-bold mb-6">Sanity CMS Setup Required</h1>
        <p className="text-xl mb-8 text-blue-200">
          The Next.js + Sanity migration is complete, but you need to initialize your Sanity project first.
        </p>
        <div className="bg-white/10 backdrop-blur rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Setup Steps:</h2>
          <ol className="space-y-4 text-lg">
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</span>
              <div>
                <strong>Initialize Sanity:</strong>
                <code className="block bg-black/30 p-2 rounded mt-2 text-sm">cd /app/nextjs && npx sanity init</code>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</span>
              <div>
                <strong>Update .env.local with your Project ID and API tokens</strong>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</span>
              <div>
                <strong>Deploy Sanity Studio:</strong>
                <code className="block bg-black/30 p-2 rounded mt-2 text-sm">npx sanity deploy</code>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</span>
              <div>
                <strong>Seed content:</strong>
                <code className="block bg-black/30 p-2 rounded mt-2 text-sm">node scripts/seed-sanity.js</code>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">5</span>
              <div>
                <strong>Rebuild and start:</strong>
                <code className="block bg-black/30 p-2 rounded mt-2 text-sm">yarn build && yarn start</code>
              </div>
            </li>
          </ol>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-6">
          <h3 className="font-bold text-yellow-200 mb-2">📖 Full Instructions</h3>
          <p>See <code className="bg-black/30 px-2 py-1 rounded">/app/nextjs/SANITY_SETUP.md</code> for complete setup instructions.</p>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  // Check if Sanity is configured
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  
  // Show setup instructions if Sanity is not configured
  if (!projectId || projectId === 'wssc-demo-next') {
    return <SetupRequired />;
  }

  // Fetch client-component props from Sanity
  let chatbotConfig, roiCalculator;
  
  try {
    [chatbotConfig, roiCalculator] = await Promise.all([
      getChatbotConfig(),
      getROICalculator(),
    ]);
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
    return <SetupRequired />;
  }

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

      <PWASection />

      <AppExperienceSection />

      <TechStackSection />

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <ROICalculator fields={roiCalculator?.fields} />
      </Suspense>

      <Suspense fallback={<LoadingSection height="min-h-[50vh]" />}>
        <EncoreContactSection />
      </Suspense>
    </main>
  );
}
