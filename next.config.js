/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    path: './src/assets/**/*',
  },
};

module.exports = nextConfig;
