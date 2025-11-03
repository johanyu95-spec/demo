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

    // 1️⃣ 요청 본문 형식 검증
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "잘못된 요청 본문입니다." },
        { status: 400 }
      );
    }

    const { answers, code, nickname, comment } = body as {
      answers?: unknown;
      code?: unknown;
      nickname?: unknown;
      comment?: unknown;
    };

    // 2️⃣ 필수값/타입 검증
    const isJsonLike =
      answers !== null &&
      (Array.isArray(answers) || typeof answers === "object");

    if (!isJsonLike || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { error: "answers(객체/배열)와 code(문자열)는 필수입니다." },
        { status: 400 }
      );
    }

    // 3️⃣ 스키마 상 NOT NULL 필드 모두 채우기
    const now = new Date();

    const result = await prisma.results.create({
      data: {
        answers: answers as any,
        code: code.trim(),
        nickname:
          typeof nickname === "string" && nickname.trim()
            ? nickname.trim()
            : "익명", // 기본 닉네임
        comment:
          typeof comment === "string" && comment.trim() ? comment.trim() : "", // ✅ comment 필드 NOT NULL 대응
        created_at: now,
        updated_at: now,
      },
      select: { id: true, code: true },
    });

    // 4️⃣ 201 성공 응답
    return NextResponse.json(
      { success: true, data: { id: result.id, code: result.code } },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ 결과 저장 오류:", error);
    return NextResponse.json(
      { error: "결과 저장에 실패했습니다." },
      { status: 500 }
    );
  }
}
