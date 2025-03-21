/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    async rewrites() {
        return [
          {
            source: "/api/:path*", // Mapeia chamadas para /api/*
            destination: "http://127.0.0.1:3000/:path*", // Redireciona para o backend
          },
        ];
      },

};
module.exports = nextConfig
