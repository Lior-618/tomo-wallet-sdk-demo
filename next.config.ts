import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ['@tomo-inc/tomo-evm-kit', '@tomo-wallet/uikit-lite', '@tomo-inc/shared-type', '@tomo-inc/tomo-web-sdk','wagmi']
};

export default nextConfig;
