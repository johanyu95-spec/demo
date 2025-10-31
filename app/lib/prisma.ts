// /app/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// 🔧 전역 객체에 prisma 인스턴스를 캐싱 (Vercel Serverless 환경 필수)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"] // 개발 중 쿼리 로그 전체 출력
        : ["error"],
  });

// 🔧 개발 환경에서는 Hot Reload에도 인스턴스 유지
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
