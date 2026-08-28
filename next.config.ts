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
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hp.com',
      },
      {
        protocol: 'https',
        hostname: 'br-media.hptiendaenlinea.com',
      },
      {
        protocol: 'https',
        hostname: 'pisces.bbystatic.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gamescom.gr',
      },
    ],
  },
};

export default nextConfig;
