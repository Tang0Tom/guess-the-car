import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// En production (Vercel), utiliser Prisma Accelerate
// En développement, utiliser la connexion directe avec l'adapter
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

export const prisma =
  globalForPrisma.prisma ||
  (process.env.PRISMA_ACCELERATE_URL && isProduction
    ? new PrismaClient({
        accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
        log: ["error"],
      })
    : new PrismaClient({
        adapter: new PrismaPg({
          connectionString: process.env.DATABASE_URL!,
        }),
        log: isDevelopment ? ["query", "error", "warn"] : ["error"],
      }));

if (!isProduction) globalForPrisma.prisma = prisma;
