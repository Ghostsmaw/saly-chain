/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', '@salychain/ui'],
  },
  transpilePackages: ['@salychain/ui', '@salychain/money'],
  webpack: (config, { dev }) => {
    // Monorepo `pnpm dev` runs 50+ watchers; polling avoids EMFILE route misses.
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
