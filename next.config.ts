/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.samsung.com',
      },
      {
        protocol: 'https',
        hostname: 'i01.appmifile.com',
      },
      {
        protocol: 'https',
        hostname: 'row.hyperx.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.new-brz.net',
      },
    ],
  },
};

module.exports = nextConfig;
