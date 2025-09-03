import { Router } from 'express';
import { DesignController } from '../controllers/designController';

const router = Router();

/**
 * @route GET /api/designs
 * @desc Get all designs (public)
 * @access Public
 */
router.get('/', DesignController.getDesigns);

/**
 * @route GET /api/designs/:id
 * @desc Get design by ID (public)
 * @access Public
 */
router.get('/:id', DesignController.getDesignById);

export default router;