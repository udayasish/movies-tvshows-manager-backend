"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
// Create a singleton instance of PrismaClient
exports.prisma = globalForPrisma.prisma || new client_1.PrismaClient({});
// new PrismaClient({
//   log: ["query", "info", "warn", "error"],
// });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
const dbConnect = async () => {
    try {
        await exports.prisma.$connect();
        console.log("MySQL Database connected successfully!");
    }
    catch (error) {
        console.error("MySQL Connection Error:", error);
        throw error;
    }
};
process.on("beforeExit", async () => {
    await exports.prisma.$disconnect();
    console.log("Database connection closed");
});
exports.default = dbConnect;
