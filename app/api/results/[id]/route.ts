// /app/api/results/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const body = await req.json();
    const { comment } = body;

    if (!id || !comment) {
      return NextResponse.json(
        { error: "MISSING_PARAMS", message: "id and comment are required." },
        { status: 400 }
      );
    }

    const updated = await prisma.results.update({
      where: { id },
      data: { comment },
    });

    console.log("✅ Result Updated:", updated.id);

    return NextResponse.json({ data: updated }, { status: 200 });
  } catch (err) {
    console.error("❌ [/api/results/:id] PATCH error:", err);
    return NextResponse.json(
      { error: "INTERNAL_ERROR", message: "Unexpected server error." },
      { status: 500 }
    );
  }
}
