/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configuração para servidor local
  env: {
    CUSTOM_PORT: process.env.PORT || '3001',
  },

  // Configuração para permitir imagens externas se necessário
  images: {
    domains: ['localhost'],
  },

  // Configuração para desenvolvimento local
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
