import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({
    log: ["query", "warn", "error"],
    accelerateUrl: process.env.DATABASE_URL as string,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
