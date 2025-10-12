/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Conditionally enable static export only for production builds
  ...(process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;