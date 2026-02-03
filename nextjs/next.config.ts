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
    return [
      {
        source: '/api/chat',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`,
      },
      {
        source: '/api/stats',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stats`,
      },
    ];
  },
};

export default nextConfig;
