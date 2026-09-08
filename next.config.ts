import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" is for self-hosting (Docker/Caddy). Vercel builds Next natively,
  // and forcing standalone there breaks its pipeline, so only use it off-Vercel.
  output: process.env.VERCEL ? undefined : "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
