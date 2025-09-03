import { Router } from 'express';
import { DesignController } from '../controllers/designController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

/**
 * @route POST /api/admin/designs
 * @desc Create a new design
 * @access Admin only
 */
router.post('/designs', upload.single('image'), DesignController.createDesign);

/**
 * @route PUT /api/admin/designs/:id
 * @desc Update a design
 * @access Admin only
 */
router.put('/designs/:id', upload.single('image'), DesignController.updateDesign);

/**
 * @route DELETE /api/admin/designs/:id
 * @desc Delete a design
 * @access Admin only
 */
router.delete('/designs/:id', DesignController.deleteDesign);

/**
 * @route GET /api/admin/designs
 * @desc Get all designs for admin management
 * @access Admin only
 */
router.get('/designs', DesignController.getDesigns);

export default router;