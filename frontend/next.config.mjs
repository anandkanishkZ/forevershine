/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Conditionally enable static export only for production builds
  ...(process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'localhost', 'forevershine.com.np', 'www.forevershine.com.np'],
    remotePatterns: [
      // Development - localhost
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/api/media/serve/**',
      },
      // Production - HTTPS
      {
        protocol: 'https',
        hostname: 'forevershine.com.np',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'forevershine.com.np',
        pathname: '/api/media/serve/**',
      },
      {
        protocol: 'https',
        hostname: 'www.forevershine.com.np',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.forevershine.com.np',
        pathname: '/api/media/serve/**',
      },
    ],
  },
};

export default nextConfig;