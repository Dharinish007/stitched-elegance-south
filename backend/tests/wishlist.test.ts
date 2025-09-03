import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app';
import { prisma } from './setup';

describe('Wishlist', () => {
  let userToken: string;
  let userId: string;
  let designId: string;

  beforeEach(async () => {
    // Create user
    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: hashedPassword,
        name: 'Test User',
        role: 'USER',
      },
    });
    userId = user.id;

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'password123',
      });
    userToken = loginResponse.body.token;

    // Create design
    const design = await prisma.design.create({
      data: {
        title: 'Test Design',
        description: 'A test design for wishlist',
        tags: ['test'],
        imageUrl: 'https://example.com/image.jpg',
        cloudinaryId: 'test-design-id',
      },
    });
    designId = design.id;
  });

  describe('POST /api/wishlist/:designId', () => {
    it('should add design to wishlist', async () => {
      const response = await request(app)
        .post(`/api/wishlist/${designId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(201);

      expect(response.body.message).toBe('Design added to wishlist');
      expect(response.body.wishlistItem).toMatchObject({
        userId,
        designId,
      });

      // Verify in database
      const wishlistItem = await prisma.wishlistItem.findUnique({
        where: {
          userId_designId: {
            userId,
            designId,
          },
        },
      });
      expect(wishlistItem).toBeTruthy();
    });

    it('should not add same design twice', async () => {
      // Add once
      await request(app)
        .post(`/api/wishlist/${designId}`)
        .set('Authorization', `Bearer ${userToken}`);

      // Try to add again
      const response = await request(app)
        .post(`/api/wishlist/${designId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400);

      expect(response.body.error).toBe('Design already in wishlist');
    });

    it('should not add non-existent design', async () => {
      const response = await request(app)
        .post('/api/wishlist/non-existent-id')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);

      expect(response.body.error).toBe('Design not found');
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .post(`/api/wishlist/${designId}`)
        .expect(401);

      expect(response.body.error).toBe('Access token required');
    });
  });

  describe('DELETE /api/wishlist/:designId', () => {
    beforeEach(async () => {
      // Add design to wishlist first
      await prisma.wishlistItem.create({
        data: {
          userId,
          designId,
        },
      });
    });

    it('should remove design from wishlist', async () => {
      const response = await request(app)
        .delete(`/api/wishlist/${designId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.message).toBe('Design removed from wishlist');

      // Verify removal from database
      const wishlistItem = await prisma.wishlistItem.findUnique({
        where: {
          userId_designId: {
            userId,
            designId,
          },
        },
      });
      expect(wishlistItem).toBeNull();
    });

    it('should not remove non-existent wishlist item', async () => {
      // Remove the item first
      await prisma.wishlistItem.delete({
        where: {
          userId_designId: {
            userId,
            designId,
          },
        },
      });

      const response = await request(app)
        .delete(`/api/wishlist/${designId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);

      expect(response.body.error).toBe('Design not found in wishlist');
    });
  });

  describe('GET /api/wishlist', () => {
    beforeEach(async () => {
      // Add design to wishlist
      await prisma.wishlistItem.create({
        data: {
          userId,
          designId,
        },
      });
    });

    it('should get user wishlist', async () => {
      const response = await request(app)
        .get('/api/wishlist')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.wishlist).toHaveLength(1);
      expect(response.body.wishlist[0]).toMatchObject({
        userId,
        designId,
        design: {
          title: 'Test Design',
          description: 'A test design for wishlist',
        },
      });
      expect(response.body.total).toBe(1);
    });

    it('should return empty wishlist for new user', async () => {
      // Remove the wishlist item
      await prisma.wishlistItem.deleteMany({
        where: { userId },
      });

      const response = await request(app)
        .get('/api/wishlist')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.wishlist).toHaveLength(0);
      expect(response.body.total).toBe(0);
    });
  });

  describe('GET /api/wishlist/:designId/status', () => {
    it('should return true if design is in wishlist', async () => {
      await prisma.wishlistItem.create({
        data: {
          userId,
          designId,
        },
      });

      const response = await request(app)
        .get(`/api/wishlist/${designId}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.isInWishlist).toBe(true);
    });

    it('should return false if design is not in wishlist', async () => {
      const response = await request(app)
        .get(`/api/wishlist/${designId}/status`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.isInWishlist).toBe(false);
    });
  });
});