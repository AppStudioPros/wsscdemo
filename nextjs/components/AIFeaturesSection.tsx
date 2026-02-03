import { getAIFeatures } from '@/lib/sanity/client';

const iconMap: Record<string, { icon: string; bgColor: string }> = {
  'search': { icon: '🤖', bgColor: 'bg-gradient-to-br from-pink-200 to-orange-200' },
  'magnifier': { icon: '🔍', bgColor: 'bg-gradient-to-br from-teal-200 to-cyan-300' },
  'chart': { icon: '📊', bgColor: 'bg-gradient-to-br from-blue-100 to-indigo-200' },
  'document': { icon: '📄', bgColor: 'bg-gradient-to-br from-amber-100 to-yellow-200' },
  'tool': { icon: '🔧', bgColor: 'bg-gradient-to-br from-rose-200 to-pink-300' },
  'accessibility': { icon: '♿', bgColor: 'bg-gradient-to-br from-emerald-100 to-teal-200' },
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
            const iconData = iconMap[iconKey] || { icon: '🤖', bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200' };
            
            return (
              <div
                key={feature._id}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-500 hover:border-2 transition-all duration-300"
                data-testid={`ai-feature-card-${index + 1}`}
              >
                <div className={`w-14 h-14 ${iconData.bgColor} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {iconData.icon}
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
