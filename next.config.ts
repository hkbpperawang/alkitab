// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['alkitab-api-v3.vercel.app'],
  },
  allowedDevOrigins: [
    'preview-chat-68551dac-b500-4dc7-af86-11833e0ad094.space.z.ai',
    'localhost:3000',
  ],
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  // Hapus static export config untuk Vercel
}

module.exports = nextConfig
