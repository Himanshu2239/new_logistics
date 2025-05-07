/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': '../shared',
    };
    return config;
  },
};

export default nextConfig;
