import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // SWC minification (faster than Terser)
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', 'framer-motion', 'three', 'react-icons'],
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Client-side optimizations
    if (!isServer) {
      // Ensure splitChunks exists
      if (!config.optimization.splitChunks || typeof config.optimization.splitChunks === 'boolean') {
        config.optimization.splitChunks = {}
      }

      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Three.js library
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/](three)[\\/]/,
            priority: 30,
            reuseExistingChunk: true,
          },
          // Chakra UI
          chakra: {
            name: 'chakra',
            test: /[\\/]node_modules[\\/](@chakra-ui|@emotion)[\\/]/,
            priority: 20,
            reuseExistingChunk: true,
          },
          // Framer Motion
          framerMotion: {
            name: 'framer-motion',
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            priority: 15,
            reuseExistingChunk: true,
          },
        }
      }

      // Reduce bundle size by replacing large libraries
      config.resolve.alias = {
        ...config.resolve.alias,
      }
    }

    return config
  },

  // Cache headers for static assets
  async headers() {
    return [
      {
        source: '/totoro-optimized.glb',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
}

export default withBundleAnalyzer(nextConfig)
