// // app/api/results/[id]/route.ts
// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// import { NextResponse, NextRequest } from "next/server";
// import { prisma } from "@/app/lib/prisma";

// type RouteParams = { params?: { id?: string } };

// // ---- 공통: URL 또는 params에서 id 복구 ----
// function parseId(request: NextRequest, params?: { id?: string }) {
//   const raw =
//     params?.id ??
//     (() => {
//       // /api/results/65 -> "65"
//       const paths = request.nextUrl.pathname.split("/").filter(Boolean);
//       return paths[paths.length - 1];
//     })();
//   const n = Number.parseInt(String(raw), 10);
//   return Number.isFinite(n) ? n : null;
// }

// // (옵션) 조회
// export async function GET(request: NextRequest, ctx: RouteParams) {
//   try {
//     const resultId = parseId(request, ctx.params);
//     if (!resultId) {
//       return NextResponse.json(
//         {
//           error: "INVALID_ID",
//           detail: `id must be number: "${ctx.params?.id}"`,
//         },
//         { status: 400 }
//       );
//     }
//     const data = await prisma.results.findUnique({ where: { id: resultId } });
//     if (!data)
//       return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (e) {
//     console.error("[GET /api/results/[id]]", e);
//     return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
//   }
// }

// // ✅ 코멘트 저장/수정 (PATCH)
// export async function PATCH(request: NextRequest, ctx: RouteParams) {
//   try {
//     const resultId = parseId(request, ctx.params);
//     if (!resultId) {
//       return NextResponse.json(
//         {
//           error: "INVALID_ID",
//           detail: `id must be number: "${ctx.params?.id}"`,
//         },
//         { status: 400 }
//       );
//     }

//     // 본문 파싱 (json 실패 시 text 재시도)
//     let body: any = null;
//     try {
//       body = await request.json();
//     } catch {
//       const raw = await request.text().catch(() => "");
//       body = raw ? JSON.parse(raw) : null;
//     }

//     const comment =
//       typeof body?.comment === "string" ? body.comment.trim() : "";
//     if (!comment) {
//       return NextResponse.json(
//         { error: "EMPTY_COMMENT", detail: "comment must be non-empty string" },
//         { status: 400 }
//       );
//     }

//     const updated = await prisma.results.update({
//       where: { id: resultId },
//       data: { comment, updated_at: new Date() }, // updated_at 이름은 스키마에 맞추세요
//       select: {
//         id: true,
//         code: true,
//         nickname: true,
//         comment: true,
//         updated_at: true,
//       },
//     });

//     return NextResponse.json({ success: true, data: updated }, { status: 200 });
//   } catch (e: any) {
//     console.error("[PATCH /api/results/[id]]", e);
//     if (e?.code === "P2025") {
//       return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
//     }
//     return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
//   }
// }

// app/api/results/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET /api/results/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ Next 16 기대 타입
) {
  const { id } = await params; // ✅ Promise 해제
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "INVALID_ID" }, { status: 400 });
  }

  const data = await prisma.results.findUnique({ where: { id: numericId } });
  if (!data) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return NextResponse.json({ success: true, data });
}

// PATCH /api/results/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ 동일
) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return NextResponse.json({ error: "INVALID_ID" }, { status: 400 });
  }

  const body = (await req.json()) as Partial<{
    comment: string | null;
    code: string | null;
    nickname: string | null;
  }>;

  const updated = await prisma.results.update({
    where: { id: numericId },
    data: {
      ...(body.comment !== undefined ? { comment: body.comment } : {}),
      ...(body.code !== undefined ? { code: body.code } : {}),
      ...(body.nickname !== undefined ? { nickname: body.nickname } : {}),
    },
  });

  return NextResponse.json({ success: true, data: updated });
}
