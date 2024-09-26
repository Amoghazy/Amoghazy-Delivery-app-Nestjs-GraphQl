import { PrismaClient } from '@prisma/client';


export const prisma = global.prisma || new PrismaClient();

try {
    if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
} catch (error) {
  console.error("Prisma client initialization error:", error);
}
