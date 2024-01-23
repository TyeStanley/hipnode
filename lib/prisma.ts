import { PrismaClient } from "@prisma/client";

const prismaSingleton = () => new PrismaClient();

type PrismaClientSingleton = ReturnType<typeof prismaSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
