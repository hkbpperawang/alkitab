// next.config.ts - Simple version untuk Vercel
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['alkitab-api-v3.vercel.app'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig