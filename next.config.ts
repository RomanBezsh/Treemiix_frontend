import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBase = (
      process.env.NEXT_PUBLIC_API_URL ||
      'https://treemiix-backend.onrender.com/api'
    ).replace(/\/api\/?$/, '');
    return [
      { source: '/media/:path*', destination: `${apiBase}/media/:path*` },
      { source: '/uploads/:path*', destination: `${apiBase}/uploads/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;