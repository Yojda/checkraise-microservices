import {PrismaClient} from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

try {
    if (process.env.NODE_ENV === 'production') {
        // @ts-ignore
        const {PrismaNeon} = require('@prisma/adapter-neon');
        const {neonConfig} = require('@neondatabase/serverless');

        neonConfig.webSocketConstructor = require('ws');
        const adapter = new PrismaNeon({connectionString: process.env.DATABASE_URL});
        prisma = new PrismaClient({adapter});
    } else {
        prisma = globalForPrisma.prisma ?? new PrismaClient();
        if (globalForPrisma.prisma) {
        } else {
            globalForPrisma.prisma = prisma;
        }
    }
} catch (error) {
    throw error;
}

export {prisma};
