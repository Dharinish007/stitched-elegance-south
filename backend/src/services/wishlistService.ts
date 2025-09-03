import { WishlistItem, Design } from '@prisma/client';
import { prisma } from '../prisma';
import { logger } from '../logger';

export type WishlistItemWithDesign = WishlistItem & {
  design: Design;
};

export class WishlistService {
  static async addToWishlist(userId: string, designId: string): Promise<WishlistItem> {
    try {
      // Check if design exists
      const design = await prisma.design.findUnique({
        where: { id: designId },
      });

      if (!design) {
        throw new Error('Design not found');
      }

      // Check if already in wishlist
      const existingItem = await prisma.wishlistItem.findUnique({
        where: {
          userId_designId: {
            userId,
            designId,
          },
        },
      });

      if (existingItem) {
        throw new Error('Design already in wishlist');
      }

      const wishlistItem = await prisma.wishlistItem.create({
        data: {
          userId,
          designId,
        },
      });

      // Log the action
      await prisma.auditLog.create({
        data: {
          action: 'WISHLIST_ADDED',
          userId,
          designId,
          details: { designTitle: design.title },
        },
      });

      logger.info(`Design ${designId} added to wishlist for user ${userId}`);
      return wishlistItem;
    } catch (error) {
      logger.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  static async removeFromWishlist(userId: string, designId: string): Promise<void> {
    try {
      const wishlistItem = await prisma.wishlistItem.findUnique({
        where: {
          userId_designId: {
            userId,
            designId,
          },
        },
        include: {
          design: true,
        },
      });

      if (!wishlistItem) {
        throw new Error('Design not found in wishlist');
      }

      await prisma.wishlistItem.delete({
        where: {
          userId_designId: {
            userId,
            designId,
          },
        },
      });

      // Log the action
      await prisma.auditLog.create({
        data: {
          action: 'WISHLIST_REMOVED',
          userId,
          designId,
          details: { designTitle: wishlistItem.design.title },
        },
      });

      logger.info(`Design ${designId} removed from wishlist for user ${userId}`);
    } catch (error) {
      logger.error('Error removing from wishlist:', error);
      throw error;
    }
  }

  static async getUserWishlist(userId: string): Promise<WishlistItemWithDesign[]> {
    try {
      const wishlistItems = await prisma.wishlistItem.findMany({
        where: { userId },
        include: {
          design: true,
        },
        orderBy: { addedAt: 'desc' },
      });

      return wishlistItems;
    } catch (error) {
      logger.error('Error fetching user wishlist:', error);
      throw new Error('Failed to fetch wishlist');
    }
  }

  static async isInWishlist(userId: string, designId: string): Promise<boolean> {
    try {
      const wishlistItem = await prisma.wishlistItem.findUnique({
        where: {
          userId_designId: {
            userId,
            designId,
          },
        },
      });

      return !!wishlistItem;
    } catch (error) {
      logger.error('Error checking wishlist status:', error);
      return false;
    }
  }
}