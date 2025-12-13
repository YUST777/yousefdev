/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce memory usage
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // External packages for server components (moved from experimental in Next.js 16)
  serverExternalPackages: ['better-sqlite3'],

  // Disable webpack cache to prevent disk writes
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false; // Disable webpack cache in dev mode
    }
    return config;
  },


  // Optimize images
  images: {
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },

  poweredByHeader: false,

  // Reduce standalone output size
  output: 'standalone',
}

module.exports = nextConfig
