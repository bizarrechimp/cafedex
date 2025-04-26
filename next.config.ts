/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cafedex',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
