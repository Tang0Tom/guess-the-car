import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Test de connexion basique
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "ok",
      database: "connected",
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasAccelerateUrl: !!process.env.PRISMA_ACCELERATE_URL,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
        env: {
          hasDatabaseUrl: !!process.env.DATABASE_URL,
          hasAccelerateUrl: !!process.env.PRISMA_ACCELERATE_URL,
          nodeEnv: process.env.NODE_ENV,
        },
      },
      { status: 500 }
    );
  }
}
