// /app/api/results/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// ✅ Prisma는 Edge 런타임에서 작동하지 않음
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST: 테스트 결과 저장
 * - answers: JSON 객체 또는 배열
 * - code: 문자열 (필수)
 * - nickname: 선택 (문자열)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // 1️⃣ 요청 본문 검증
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "INVALID_BODY", message: "요청 본문이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    const { answers, code, nickname } = body as {
      answers?: unknown;
      code?: unknown;
      nickname?: unknown;
    };

    // 2️⃣ 필수값 및 타입 확인
    const isJsonLike =
      answers !== null &&
      (Array.isArray(answers) || typeof answers === "object");

    if (!isJsonLike || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        {
          error: "MISSING_FIELDS",
          message: "answers(객체/배열)와 code(문자열)는 필수입니다.",
        },
        { status: 400 }
      );
    }

    // 3️⃣ Prisma에 삽입 (created_at / updated_at 자동 처리 안 될 경우 수동 지정)
    const now = new Date();

    const result = await prisma.results.create({
      data: {
        answers: answers as any, // ✅ Prisma의 Json 타입
        code: code.trim(),
        nickname:
          typeof nickname === "string" && nickname.trim()
            ? nickname.trim()
            : null,
        // ⚙️ Prisma 스키마에 @default(now())/@updatedAt이 없을 경우에만 유지
        created_at: now,
        updated_at: now,
      },
      select: { id: true, code: true },
    });

    console.log("✅ Result Created:", result);

    // 4️⃣ 성공 응답
    return NextResponse.json(
      {
        success: true,
        data: { id: result.id, code: result.code },
        message: "결과가 성공적으로 저장되었습니다.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ 결과 저장 오류:", error);
    return NextResponse.json(
      {
        error: "INTERNAL_ERROR",
        message: "결과 저장 중 서버 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
