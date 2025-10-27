import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Create a singleton instance of PrismaClient
export const prisma = globalForPrisma.prisma || new PrismaClient({});
// new PrismaClient({
//   log: ["query", "info", "warn", "error"],
// });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

const dbConnect = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log("MySQL Database connected successfully!");
  } catch (error) {
    console.error("MySQL Connection Error:", error);
    throw error;
  }
};

process.on("beforeExit", async () => {
  await prisma.$disconnect();
  console.log("Database connection closed");
});

export default dbConnect;
