/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Sadece sunucu tarafında çalışan sürücüyü yükleyin
    if (!isServer) {
      config.resolve.alias['mongodb'] = 'mongodb-browser';
    }

    return config;
  },
  images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },{
        protocol:"https",
        hostname:"firebasestorage.googleapis.com"

      }
    ],
  },
};

module.exports = nextConfig;
