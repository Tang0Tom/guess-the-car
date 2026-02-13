import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const scores = await prisma.score.findMany({
      orderBy: { score: "desc" },
      take: 50,
    });

    return NextResponse.json(scores);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Database error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
