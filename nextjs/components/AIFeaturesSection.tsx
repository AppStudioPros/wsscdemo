import { getAIFeatures } from '@/lib/sanity/client';

const iconMap: Record<string, string> = {
  'search': '🤖',
  'magnifier': '🔍',
  'chart': '📊',
  'document': '📄',
  'tool': '🔧',
  'accessibility': '♿',
};

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
          {features.map((feature: any, index: number) => {
            const iconKey = feature.iconText?.toLowerCase() || '';
            const icon = iconMap[iconKey] || '🤖';
            
            return (
              <div
                key={feature._id}
                className="bg-white rounded-2xl p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_0_0_2px_rgba(37,99,235,0.5),0_8px_24px_rgba(37,99,235,0.25)] transition-shadow duration-300"
                data-testid={`ai-feature-card-${index + 1}`}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-slate-800 via-slate-700 to-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700 mb-4">{feature.description}</p>
                {feature.demo && (
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 italic">
                    {feature.demo}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
