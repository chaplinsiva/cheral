/* agent-notes: { ctx: "Next.js configuration allowing Unsplash remote images", deps: [], state: active, last: "sato@2026-07-26" } */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
