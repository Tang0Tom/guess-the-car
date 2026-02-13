import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// Utiliser la connexion directe PostgreSQL (plus simple, sans Accelerate)
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: isDevelopment ? ["query", "error", "warn"] : ["error"],
  });

if (!isProduction) globalForPrisma.prisma = prisma;
