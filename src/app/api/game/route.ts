import { NextRequest, NextResponse } from "next/server";
import { generateRound } from "@/lib/game";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const usedIds = searchParams.get("used")?.split(",").filter(Boolean) || [];

  const round = generateRound(usedIds);

  return NextResponse.json(round);
}
