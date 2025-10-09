import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  outputFileTracingRoot: __dirname,
  experimental: {
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
  },
  webpack: (config: any) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/admin/**', '**/backend/**']
    };
    return config;
  }
};

export default nextConfig;
