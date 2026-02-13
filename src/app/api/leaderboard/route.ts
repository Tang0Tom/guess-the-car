import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const scores = await prisma.score.findMany({
    orderBy: { score: "desc" },
    take: 50,
  });

  return NextResponse.json(scores);
}
