/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.imgur.com', 'res.cloudinary.com'], // Ambos dominios deben estar en el mismo array
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
