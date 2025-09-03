import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { env } from '../src/env';
import { logger } from '../src/logger';

const prisma = new PrismaClient();

async function main() {
  try {
    logger.info('🌱 Starting database seed...');

    // Create admin user
    const hashedPassword = await bcrypt.hash(env.ADMIN_PASSWORD, 12);
    
    const admin = await prisma.user.upsert({
      where: { email: env.ADMIN_EMAIL },
      update: {},
      create: {
        email: env.ADMIN_EMAIL,
        password: hashedPassword,
        name: env.ADMIN_NAME,
        role: 'ADMIN',
      },
    });

    logger.info(`✅ Admin user created/updated: ${admin.email}`);

    // Create sample user
    const sampleUserPassword = await bcrypt.hash('password123', 12);
    const sampleUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        password: sampleUserPassword,
        name: 'Sample User',
        role: 'USER',
      },
    });

    logger.info(`✅ Sample user created/updated: ${sampleUser.email}`);

    // Create sample designs (without actual images for seeding)
    const sampleDesigns = [
      {
        title: 'Elegant Bridal Lehenga',
        description: 'A stunning bridal lehenga with intricate embroidery and gold thread work.',
        tags: ['bridal', 'lehenga', 'traditional', 'wedding'],
        imageUrl: 'https://via.placeholder.com/800x600/ff6b6b/ffffff?text=Bridal+Lehenga',
        cloudinaryId: 'sample-bridal-lehenga',
      },
      {
        title: 'Designer Silk Blouse',
        description: 'Beautiful silk blouse with traditional motifs and modern cuts.',
        tags: ['blouse', 'silk', 'designer', 'traditional'],
        imageUrl: 'https://via.placeholder.com/800x600/4ecdc4/ffffff?text=Silk+Blouse',
        cloudinaryId: 'sample-silk-blouse',
      },
      {
        title: 'Custom Evening Gown',
        description: 'Elegant evening gown perfect for special occasions and parties.',
        tags: ['gown', 'evening', 'party', 'elegant'],
        imageUrl: 'https://via.placeholder.com/800x600/45b7d1/ffffff?text=Evening+Gown',
        cloudinaryId: 'sample-evening-gown',
      },
    ];

    for (const designData of sampleDesigns) {
      const design = await prisma.design.upsert({
        where: { cloudinaryId: designData.cloudinaryId },
        update: {},
        create: designData,
      });

      logger.info(`✅ Sample design created/updated: ${design.title}`);
    }

    logger.info('🎉 Database seeded successfully!');
  } catch (error) {
    logger.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });