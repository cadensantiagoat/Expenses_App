import { PrismaClient } from '@prisma/client';

// assign prisma to 'globalThis'
// - fancy way to force a type into something (as unknown as [whatever you want])
//    - just a typescript thing.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// check if prisma is in global, if not create it
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // <-- logs all DB queries to the terminal
  });


// if not in production, add it to the global.
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// REASON:
// - Next.js does a hot reload on every refresh.
// - Which will eventually break the connection.
// - This code prevents that.
