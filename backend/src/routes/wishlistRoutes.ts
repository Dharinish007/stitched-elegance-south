import { Router } from 'express';
import { WishlistController } from '../controllers/wishlistController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All wishlist routes require authentication
router.use(authenticate);

/**
 * @route GET /api/wishlist
 * @desc Get user's wishlist
 * @access Private
 */
router.get('/', WishlistController.getUserWishlist);

/**
 * @route POST /api/wishlist/:designId
 * @desc Add design to wishlist
 * @access Private
 */
router.post('/:designId', WishlistController.addToWishlist);

/**
 * @route DELETE /api/wishlist/:designId
 * @desc Remove design from wishlist
 * @access Private
 */
router.delete('/:designId', WishlistController.removeFromWishlist);

/**
 * @route GET /api/wishlist/:designId/status
 * @desc Check if design is in wishlist
 * @access Private
 */
router.get('/:designId/status', WishlistController.checkWishlistStatus);

export default router;