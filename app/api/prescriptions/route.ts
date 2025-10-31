// /app/api/prescriptions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// ✅ Prisma는 Edge 런타임에서 동작하지 않음
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const raw = searchParams.get("code");
    const code = raw?.trim().toUpperCase();

    if (!code) {
      return NextResponse.json(
        { error: "MISSING_CODE", message: "code query is required." },
        { status: 400 }
      );
    }

    const item = await prisma.prescriptions.findUnique({
      where: { code },
    });

    if (!item) {
      return NextResponse.json(
        { error: "NOT_FOUND", message: "Prescription not found." },
        { status: 404 }
      );
    }

    // bigint → string 변환 (JSON 전송 오류 방지)
    (item as any).id = (item as any).id?.toString?.() ?? null;

    console.log("✅ Prescription Loaded:", item.code);
    return NextResponse.json(item, { status: 200 });
  } catch (err) {
    console.error("❌ [/api/prescriptions] GET error:", err);
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: "Unexpected server error." },
      { status: 500 }
    );
  }
}
