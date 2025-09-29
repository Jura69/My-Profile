/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Tối ưu hóa production
  swcMinify: true,
  // Tối ưu hóa images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },
  // Tối ưu hóa bundle
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'framer-motion', 'three'],
  },
  // Bundle analyzer (chỉ khi cần)
  webpack: (config, { isServer }) => {
    // Tối ưu hóa chunks
    if (!isServer) {
      // Ensure splitChunks exists and is an object
      if (!config.optimization.splitChunks || typeof config.optimization.splitChunks === 'boolean') {
        config.optimization.splitChunks = {}
      }
      
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/](three)[\\/]/,
            priority: 30,
            reuseExistingChunk: true,
          },
          chakra: {
            name: 'chakra',
            test: /[\\/]node_modules[\\/](@chakra-ui)[\\/]/,
            priority: 20,
            reuseExistingChunk: true,
          },
        }
      }
    }
    return config
  },
  async headers() {
    return [
      {
        source: '/totoro.glb',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache static assets
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
