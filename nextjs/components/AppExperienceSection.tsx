'use client';

export function AppExperienceSection() {
  const features = [
    {
      icon: '📱',
      title: 'Offline Access',
      description: 'View bills and account info even without internet connection'
    },
    {
      icon: '🔔',
      title: 'Push Notifications',
      description: 'Get instant alerts for bill due dates, outages, and conservation tips'
    },
    {
      icon: '📲',
      title: 'No App Store Needed',
      description: 'Install directly from browser—no downloads, no updates to manage'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'App-like experience with instant loading and smooth animations'
    },
    {
      icon: '💰',
      title: 'Zero Platform Fees',
      description: 'No Apple App Store fees, no Google Play fees—100% cost savings on app distribution'
    },
    {
      icon: '🔄',
      title: 'Instant Updates',
      description: 'Updates deploy immediately—no waiting for app store approval or user downloads'
    },
    {
      icon: '🌐',
      title: 'One Codebase, All Devices',
      description: 'Works on iPhone, Android, tablets, and desktops with one development effort'
    },
    {
      icon: '👆',
      title: 'User Friendly',
      description: 'Familiar web experience—customers already know how to use it from day one'
    }
  ];

  return (
    <section id="app-experience" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Phone Mockup */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-72 h-[580px] bg-black rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
                  {/* Phone Header */}
                  <div className="bg-gradient-to-b from-blue-600 to-blue-700 pt-12 pb-8 px-6 text-center">
                    {/* W Logo */}
                    <div className="text-white text-6xl font-bold mb-2">W</div>
                    <h3 className="text-white text-xl font-bold">WSSC Water</h3>
                    <p className="text-blue-200 text-sm">Your Water, Your Way</p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="flex-1 px-4 py-4 space-y-3">
                    <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-500">💧</span>
                      </div>
                      <span className="text-gray-800 font-medium">View Current Bill</span>
                    </button>
                    
                    <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <span className="text-teal-500">📊</span>
                      </div>
                      <span className="text-gray-800 font-medium">Usage Analytics</span>
                    </button>
                    
                    <button className="w-full flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-500">⚠️</span>
                      </div>
                      <span className="text-gray-800 font-medium">Report Issue</span>
                    </button>
                  </div>
                  
                  {/* Add to Home Screen Prompt */}
                  <div className="px-4 pb-6">
                    <div className="bg-gray-50 rounded-2xl p-4 shadow-inner">
                      <p className="font-semibold text-gray-800 mb-1">Add to Home Screen</p>
                      <p className="text-gray-500 text-sm mb-4">wsscwater.com</p>
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors">
                          Cancel
                        </button>
                        <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="lg:w-2/3">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center lg:text-left">
              App-Like Experience, No Download
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
