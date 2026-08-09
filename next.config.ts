import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.new-brz.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // <-- Добавь эту строчку
      },
    ],
  },
};

export default nextConfig;
