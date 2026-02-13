import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// En production (Vercel), utiliser Prisma Accelerate
// En développement, utiliser la connexion directe avec l'adapter
const prismaConfig =
  process.env.PRISMA_ACCELERATE_URL && process.env.NODE_ENV === "production"
    ? {
        accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
        log: ["error"] as const,
      }
    : {
        adapter: new PrismaPg({
          connectionString: process.env.DATABASE_URL!,
        }),
        log: (process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]) as const,
      };

export const prisma = globalForPrisma.prisma || new PrismaClient(prismaConfig);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
