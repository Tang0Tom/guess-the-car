import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, score, rounds } = body;

    if (!username || typeof score !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const sanitizedUsername = String(username).slice(0, 20).trim();
    if (!sanitizedUsername) {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }

    const entry = await prisma.score.create({
      data: {
        username: sanitizedUsername,
        score,
        rounds: rounds || 10,
      },
    });

    return NextResponse.json(entry);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Database error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
