// src/app/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// (TS가 아니라 JS면 아래 as 부분은 빼셔도 됩니다)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"] // ← 쿼리 로그 전체 출력
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
