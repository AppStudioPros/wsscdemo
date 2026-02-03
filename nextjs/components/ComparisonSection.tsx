import { getComparison } from '@/lib/sanity/client';

export async function ComparisonSection() {
  const comparison = await getComparison();

  if (!comparison) {
    return null;
  }

  return (
    <section id="pain-points" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {comparison.sectionTitle || 'Transforming Customer Experience'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From fragmented, outdated experiences to a unified, intelligent platform that customers
            love. This interactive demo showcases how AI and modern technology create seamless
            customer experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-red-500"
            data-testid="pain-current-list"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Current Challenges</h3>
            <ul className="space-y-4">
              {comparison.currentChallenges?.map((challenge: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-700">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500"
            data-testid="pain-solution-list"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Solution</h3>
            <ul className="space-y-4">
              {comparison.solutions?.map((solution: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
