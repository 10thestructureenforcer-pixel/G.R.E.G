import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        port: "",
        pathname: "**", // Update this line to match all paths
        search: "",
      },
    ],
  },
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
