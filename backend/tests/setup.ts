import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db',
    },
  },
});

beforeAll(async () => {
  // Connect to test database
  await prisma.$connect();
});

beforeEach(async () => {
  // Clean up database before each test
  await prisma.auditLog.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.design.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  // Disconnect from test database
  await prisma.$disconnect();
});

export { prisma };