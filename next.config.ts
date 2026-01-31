import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.apple.com",
        pathname: "/v/**",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
