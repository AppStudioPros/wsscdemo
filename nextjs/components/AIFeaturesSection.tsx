import { getAIFeatures } from '@/lib/sanity/client';

export async function AIFeaturesSection() {
  const features = await getAIFeatures();

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section id="ai-features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Encore's Exclusive, Custom Built, Self-Healing AI
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our proprietary AI technology transforms how customers interact with WSSC Water
            services—learning, adapting, and improving continuously.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: any, index: number) => (
            <div
              key={feature._id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              data-testid={`ai-feature-card-${index + 1}`}
            >
              <div className="text-4xl mb-4">{feature.iconText || '🤖'}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700 mb-4">{feature.description}</p>
              {feature.demo && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-gray-700 italic">
                  {feature.demo}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
