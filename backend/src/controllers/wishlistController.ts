import { Response } from 'express';
import { WishlistService } from '../services/wishlistService';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../logger';

export class WishlistController {
  static async addToWishlist(req: AuthRequest, res: Response) {
    try {
      const { designId } = req.params;
      const userId = req.user!.id;

      const wishlistItem = await WishlistService.addToWishlist(userId, designId);

      res.status(201).json({
        message: 'Design added to wishlist',
        wishlistItem,
      });
    } catch (error) {
      if (error.message === 'Design not found') {
        return res.status(404).json({ error: error.message });
      }
      
      if (error.message === 'Design already in wishlist') {
        return res.status(400).json({ error: error.message });
      }
      
      logger.error('Add to wishlist error:', error);
      res.status(500).json({ error: 'Failed to add to wishlist' });
    }
  }

  static async removeFromWishlist(req: AuthRequest, res: Response) {
    try {
      const { designId } = req.params;
      const userId = req.user!.id;

      await WishlistService.removeFromWishlist(userId, designId);

      res.json({ message: 'Design removed from wishlist' });
    } catch (error) {
      if (error.message === 'Design not found in wishlist') {
        return res.status(404).json({ error: error.message });
      }
      
      logger.error('Remove from wishlist error:', error);
      res.status(500).json({ error: 'Failed to remove from wishlist' });
    }
  }

  static async getUserWishlist(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const wishlistItems = await WishlistService.getUserWishlist(userId);

      res.json({
        wishlist: wishlistItems,
        total: wishlistItems.length,
      });
    } catch (error) {
      logger.error('Get wishlist error:', error);
      res.status(500).json({ error: 'Failed to fetch wishlist' });
    }
  }

  static async checkWishlistStatus(req: AuthRequest, res: Response) {
    try {
      const { designId } = req.params;
      const userId = req.user!.id;

      const isInWishlist = await WishlistService.isInWishlist(userId, designId);

      res.json({ isInWishlist });
    } catch (error) {
      logger.error('Check wishlist status error:', error);
      res.status(500).json({ error: 'Failed to check wishlist status' });
    }
  }
}