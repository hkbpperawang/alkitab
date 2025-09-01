/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['alkitab-api-v3.vercel.app'],
    unoptimized: true, // Untuk GitHub Pages
  },
  // Tambahkan konfigurasi ini untuk menghindari warning cross-origin
  allowedDevOrigins: [
    'preview-chat-68551dac-b500-4dc7-af86-11833e0ad094.space.z.ai',
    'localhost:3000',
  ],
  // Optimasi untuk production
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  // Konfigurasi untuk static export (GitHub Pages)
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig