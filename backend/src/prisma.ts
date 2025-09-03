import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

prisma.$on('error', (e) => {
  logger.error('Prisma error:', e);
});

prisma.$on('warn', (e) => {
  logger.warn('Prisma warning:', e);
});

prisma.$on('info', (e) => {
  logger.info('Prisma info:', e);
});

prisma.$on('query', (e) => {
  logger.debug('Prisma query:', {
    query: e.query,
    params: e.params,
    duration: e.duration,
  });
});

export { prisma };