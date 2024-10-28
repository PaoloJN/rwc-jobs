import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // Allow all hostnames for images
    images: {
        domains: ["serpapi.com"],
    },
};

export default nextConfig;
