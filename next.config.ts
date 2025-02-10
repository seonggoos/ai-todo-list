import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // SSL 인증서 검증 비활성화
  env: {
    NODE_TLS_REJECT_UNAUTHORIZED: "0",
  },
  // HTTPS 리다이렉트 비활성화
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
