import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'customer-assets.emergentagent.com',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    // Only add rewrites if backend URL is configured
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    if (!backendUrl) {
      return [];
    }
    
    return [
      {
        source: '/api/chat',
        destination: `${backendUrl}/api/chat`,
      },
      {
        source: '/api/stats',
        destination: `${backendUrl}/api/stats`,
      },
    ];
  },
};

export default nextConfig;
