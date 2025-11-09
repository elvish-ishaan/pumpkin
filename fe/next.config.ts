import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://storage.googleapis.com/pumpkin-bucket-v2/**')],
  },
};

export default nextConfig;
