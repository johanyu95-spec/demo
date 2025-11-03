import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  typescript: {
    // !! 경고 !!
    // 프로덕션 빌드 중 타입 오류가 발생하더라도 빌드가 성공적으로 완료되도록 허용합니다.
    // !! 경고 !!
    ignoreBuildErrors: true,
  },
  outputFileTracingIncludes: {
    '/api/**/*': ['./node_modules/.prisma/client/**/*'],
    '/*': ['./node_modules/.prisma/client/**/*'],
  },
};

export default nextConfig;
