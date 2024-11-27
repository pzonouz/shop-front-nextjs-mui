import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "192.168.1.101",
      },
      {
        protocol: "http",
        hostname: "192.168.143.104",
      },
    ],
  },
  reactStrictMode: false,
};
export default nextConfig;
