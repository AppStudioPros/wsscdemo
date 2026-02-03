'use client';

import { useState, useEffect, useRef } from 'react';

const features = [
  {
    id: 'emergency',
    title: 'Emergency Alerts',
    description: 'Instantly notify customers about water main breaks, boil advisories, and service disruptions with one click.',
    image: 'https://customer-assets.emergentagent.com/job_e4309676-f936-468a-85ba-a6da5ef3628a/artifacts/3k01hw6v_emergency%20alerts%20page.png'
  },
  {
    id: 'announcements',
    title: 'Service Announcements',
    description: 'Schedule and manage maintenance notices, conservation tips, and important updates with live preview.',
    image: 'https://customer-assets.emergentagent.com/job_e4309676-f936-468a-85ba-a6da5ef3628a/artifacts/twjn84mb_Service%20Announcements.png'
  },
  {
    id: 'blog',
    title: 'Blog & Content',
    description: 'Create engaging content with AI writing assistance and see exactly how it will look before publishing.',
    image: 'https://customer-assets.emergentagent.com/job_e4309676-f936-468a-85ba-a6da5ef3628a/artifacts/qb2tgitx_blog%20posts.png'
  }
];

const badges = [
  { icon: '🎯', label: 'Zero Learning Curve', color: 'bg-orange-100' },
  { icon: '⚡', label: 'Real-Time Updates', color: 'bg-green-100' },
  { icon: '🤖', label: 'AI-Powered Assistance', color: 'bg-teal-100' },
  { icon: '👁️', label: 'Live Preview', color: 'bg-teal-100' }
];

export function CommandCenterSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section id="command-center" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-600 mb-2">Your Command Center</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            New Technology Doesn't Have to Be Scary
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We'll provide WSSC Water with a custom admin dashboard that's{' '}
            <span className="text-teal-600 font-semibold">intuitive, powerful, and easy to use</span>.
            No technical expertise required — your team will be managing content like pros from day one.
          </p>
        </div>

        {/* Main Content */}
        <div 
          className="flex flex-col lg:flex-row gap-8 items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Left Side - Feature Cards */}
          <div className="lg:w-1/3 space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                onClick={() => handleCardClick(index)}
                className={`bg-white rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-cyan-50 border border-cyan-200 shadow-lg'
                    : 'border border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex">
                  <div className={`w-1 rounded-full mr-4 self-stretch ${
                    activeIndex === index ? 'bg-teal-500' : 'bg-transparent'
                  }`}></div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Browser Mockup */}
          <div className="lg:w-2/3">
            <div className="bg-gray-800 rounded-t-xl p-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-700 rounded-md px-3 py-1 text-gray-400 text-sm text-center">
                admin.wsscwater.com
              </div>
            </div>
            <div className="bg-white rounded-b-xl shadow-xl overflow-hidden">
              <img
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Bottom Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm border border-gray-100"
            >
              <div className={`w-10 h-10 ${badge.color} rounded-xl flex items-center justify-center text-xl`}>
                {badge.icon}
              </div>
              <span className="font-medium text-gray-900 text-sm">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
