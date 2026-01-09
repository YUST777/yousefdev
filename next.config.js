/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce memory usage
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,

  // External packages for server components (moved from experimental in Next.js 16)
  // Enable React Compiler for automatic memoization
  reactCompiler: true,

  // External packages for server components (moved from experimental in Next.js 16)
  serverExternalPackages: ['better-sqlite3'],

  // Disable webpack cache to prevent disk writes
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.cache = false; // Disable webpack cache in dev mode
    }
    return config;
  },

  // Turbopack config to silence Next.js 16 warning
  turbopack: {},


  // Optimize images
  images: {
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },

  poweredByHeader: false,

  // Cache control headers to prevent aggressive caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Reduce standalone output size
  output: 'standalone',
}

module.exports = nextConfig
