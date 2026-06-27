import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Prevents SegmentViewNode manifest errors in local dev.
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
