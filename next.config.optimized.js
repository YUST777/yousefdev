/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce memory usage
  compress: true,
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Reduce ISR cache
  experimental: {
    isrMemoryCacheSize: 0, // Use disk instead of memory
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
