export function PWASection() {
  const benefits = [
    {
      title: 'No Apple App Store',
      description: 'Save $99/year developer fee + 15-30% commission on in-app purchases'
    },
    {
      title: 'No Google Play Store',
      description: 'Save $25 developer fee + 15-30% commission on transactions'
    },
    {
      title: 'No Dual Development',
      description: 'Save $50,000-$150,000 on building separate iOS & Android apps'
    },
    {
      title: 'No App Maintenance Hell',
      description: 'Save ongoing costs of maintaining two separate codebases'
    }
  ];

  const badges = ['FASTER', 'CHEAPER', 'EASIER', 'SAME FUNCTIONALITY', 'USER FRIENDLY'];

  return (
    <section id="pwa" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Progressive Web App. <span className="text-red-600">It's Included!</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Native app experience without the App Store. Install once, access anywhere.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-red-800 to-red-900 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <span className="text-3xl">🚫</span> NO MORE EXPENSIVE NATIVE APPS!
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-red-200/90 rounded-xl p-5">
                <h4 className="text-red-700 font-semibold mb-2 flex items-center gap-2">
                  <span className="text-red-500">✗</span> {benefit.title}
                </h4>
                <p className="text-red-900/80 text-sm">
                  – {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white text-red-800 rounded-full text-sm font-semibold"
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          <div className="border-2 border-dashed border-red-400/50 rounded-xl p-4 text-center">
            <p className="text-white/90 text-lg">
              All of this is ALREADY INCLUDED in your quote—no extra charge!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
