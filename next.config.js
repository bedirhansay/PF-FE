const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // webpack: (config, { isServer }) => {
  //   // Client için chunk adlarını belirleme
  //   if (!isServer) {
  //     config.optimization.splitChunks.cacheGroups = {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "common",
  //         chunks: "all",
  //       },
  //     };
  //   }

  //   // Server için chunk adlarını belirleme
  //   if (isServer) {
  //     config.optimization.splitChunks.cacheGroups = {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "common.server",
  //         chunks: "all",
  //       },
  //     };
  //   }

  //   return config;
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
