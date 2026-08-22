import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 👈 改这里
    },
  },
  allowedDevOrigins: ["http://10.10.101.250","http://10.10.101.250:3001",'local-origin.dev', '*.local-origin.dev'],
};

export default nextConfig;
