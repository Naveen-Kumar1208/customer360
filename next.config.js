/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // output: 'export', // Commented out to enable API routes
  trailingSlash: true,
  // distDir: 'out', // Commented out for development server
  eslint: {
    // we use biome for linting
    ignoreDuringBuilds: true,
  },
  // Exclude API routes from static export
  generateBuildId: () => 'build',
  images: {
    // Enable Next.js image optimization
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Enable production optimizations
  compress: true,
  // Optimize for production
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
};

module.exports = nextConfig;