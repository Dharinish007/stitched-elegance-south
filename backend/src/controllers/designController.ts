import { Request, Response } from 'express';
import { DesignService } from '../services/designService';
import { createDesignSchema, updateDesignSchema, designQuerySchema } from '../schemas/designSchemas';
import { AuthRequest } from '../middleware/auth';
import { logger } from '../logger';

export class DesignController {
  static async createDesign(req: AuthRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Image file is required' });
      }

      const validatedData = createDesignSchema.parse(req.body);
      const design = await DesignService.createDesign(
        validatedData,
        req.file.buffer,
        req.file.originalname,
        req.user!.id
      );

      res.status(201).json({
        message: 'Design created successfully',
        design,
      });
    } catch (error) {
      logger.error('Create design error:', error);
      res.status(500).json({ error: 'Failed to create design' });
    }
  }

  static async updateDesign(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateDesignSchema.parse(req.body);
      
      const design = await DesignService.updateDesign(
        id,
        validatedData,
        req.file?.buffer,
        req.file?.originalname,
        req.user!.id
      );

      res.json({
        message: 'Design updated successfully',
        design,
      });
    } catch (error) {
      if (error.message === 'Design not found') {
        return res.status(404).json({ error: error.message });
      }
      
      logger.error('Update design error:', error);
      res.status(500).json({ error: 'Failed to update design' });
    }
  }

  static async deleteDesign(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await DesignService.deleteDesign(id, req.user!.id);

      res.json({ message: 'Design deleted successfully' });
    } catch (error) {
      if (error.message === 'Design not found') {
        return res.status(404).json({ error: error.message });
      }
      
      logger.error('Delete design error:', error);
      res.status(500).json({ error: 'Failed to delete design' });
    }
  }

  static async getDesigns(req: Request, res: Response) {
    try {
      const query = designQuerySchema.parse(req.query);
      const result = await DesignService.getDesigns(query);

      res.json(result);
    } catch (error) {
      logger.error('Get designs error:', error);
      res.status(500).json({ error: 'Failed to fetch designs' });
    }
  }

  static async getDesignById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const design = await DesignService.getDesignById(id);

      if (!design) {
        return res.status(404).json({ error: 'Design not found' });
      }

      res.json({ design });
    } catch (error) {
      logger.error('Get design by ID error:', error);
      res.status(500).json({ error: 'Failed to fetch design' });
    }
  }
}