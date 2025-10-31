// app/api/results/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/**
 * POST: 테스트 결과 저장
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // 1) 바디 형식 검증
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "잘못된 요청 본문입니다." },
        { status: 400 }
      );
    }

    const { answers, code, nickname } = body as {
      answers?: unknown;
      code?: unknown;
      nickname?: unknown;
    };

    // 2) 필수값/타입 검증
    const isJsonLike =
      answers !== null &&
      (Array.isArray(answers) || typeof answers === "object");

    if (!isJsonLike || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { error: "answers(객체/배열)와 code(문자열)는 필수입니다." },
        { status: 400 }
      );
    }

    // 3) 생성 (스키마에 createdAt/updatedAt 자동 처리가 없다면 아래 now 사용)
    const now = new Date();

    const result = await prisma.results.create({
      data: {
        answers: answers as any, // Prisma Json 타입
        code: code.trim(),
        nickname:
          typeof nickname === "string" && nickname.trim()
            ? nickname.trim()
            : null,
        // 스키마에 기본값/updatedAt이 없다면만 넣어주세요
        created_at: now, // <- 스키마에 @default(now()) 있으면 제거
        updated_at: now, // <- 스키마에 @updatedAt 있으면 제거
      },
      select: { id: true, code: true },
    });

    // 4) 201 응답
    return NextResponse.json(
      { success: true, data: { id: result.id, code: result.code } },
      { status: 201 }
    );
  } catch (error) {
    console.error("결과 저장 오류:", error);
    return NextResponse.json(
      { error: "결과 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}
