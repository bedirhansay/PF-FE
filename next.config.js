const ContentSecurityPolicy = require("./csp");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
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
  // async headers() {
  //   const headers = [];

  //   headers.push({
  //     source: "/(.*)",
  //     headers: [
  //       {
  //         key: "Content-Security-Policy",
  //         value: ContentSecurityPolicy,
  //       },
  //     ],
  //   });

  //   return headers;
  // },
};

module.exports = withBundleAnalyzer(nextConfig);
