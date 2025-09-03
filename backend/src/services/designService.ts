import { Design } from '@prisma/client';
import { prisma } from '../prisma';
import { CloudinaryService } from './cloudinaryService';
import { CreateDesignInput, UpdateDesignInput, DesignQueryInput } from '../schemas/designSchemas';
import { logger } from '../logger';

export class DesignService {
  static async createDesign(
    data: CreateDesignInput,
    imageBuffer: Buffer,
    imageName: string,
    adminId: string
  ): Promise<Design> {
    try {
      // Upload image to Cloudinary
      const { url, publicId } = await CloudinaryService.uploadImage(imageBuffer, imageName);

      // Create design in database
      const design = await prisma.design.create({
        data: {
          title: data.title,
          description: data.description,
          tags: data.tags || [],
          imageUrl: url,
          cloudinaryId: publicId,
        },
      });

      // Log the action
      await prisma.auditLog.create({
        data: {
          action: 'DESIGN_CREATED',
          userId: adminId,
          designId: design.id,
          details: { title: design.title, tags: design.tags },
        },
      });

      logger.info(`Design created: ${design.id} by admin: ${adminId}`);
      return design;
    } catch (error) {
      logger.error('Error creating design:', error);
      throw new Error('Failed to create design');
    }
  }

  static async updateDesign(
    designId: string,
    data: UpdateDesignInput,
    imageBuffer?: Buffer,
    imageName?: string,
    adminId?: string
  ): Promise<Design> {
    try {
      const existingDesign = await prisma.design.findUnique({
        where: { id: designId },
      });

      if (!existingDesign) {
        throw new Error('Design not found');
      }

      let updateData: any = {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.tags !== undefined && { tags: data.tags }),
      };

      // If new image is provided, update it
      if (imageBuffer && imageName) {
        const { url, publicId } = await CloudinaryService.updateImage(
          imageBuffer,
          imageName,
          existingDesign.cloudinaryId
        );
        updateData.imageUrl = url;
        updateData.cloudinaryId = publicId;
      }

      const updatedDesign = await prisma.design.update({
        where: { id: designId },
        data: updateData,
      });

      // Log the action if admin is provided
      if (adminId) {
        await prisma.auditLog.create({
          data: {
            action: 'DESIGN_UPDATED',
            userId: adminId,
            designId: updatedDesign.id,
            details: { 
              title: updatedDesign.title, 
              updatedFields: Object.keys(updateData) 
            },
          },
        });
      }

      logger.info(`Design updated: ${designId}`);
      return updatedDesign;
    } catch (error) {
      logger.error('Error updating design:', error);
      throw new Error('Failed to update design');
    }
  }

  static async deleteDesign(designId: string, adminId: string): Promise<void> {
    try {
      const design = await prisma.design.findUnique({
        where: { id: designId },
      });

      if (!design) {
        throw new Error('Design not found');
      }

      // Delete image from Cloudinary
      await CloudinaryService.deleteImage(design.cloudinaryId);

      // Delete design from database
      await prisma.design.delete({
        where: { id: designId },
      });

      // Log the action
      await prisma.auditLog.create({
        data: {
          action: 'DESIGN_DELETED',
          userId: adminId,
          designId: designId,
          details: { title: design.title },
        },
      });

      logger.info(`Design deleted: ${designId} by admin: ${adminId}`);
    } catch (error) {
      logger.error('Error deleting design:', error);
      throw new Error('Failed to delete design');
    }
  }

  static async getDesigns(query: DesignQueryInput): Promise<{ designs: Design[]; total: number; page: number; totalPages: number }> {
    try {
      const skip = (query.page - 1) * query.limit;
      
      const where: any = {};
      
      if (query.tag) {
        where.tags = {
          has: query.tag,
        };
      }
      
      if (query.search) {
        where.OR = [
          {
            title: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        ];
      }

      const [designs, total] = await Promise.all([
        prisma.design.findMany({
          where,
          skip,
          take: query.limit,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.design.count({ where }),
      ]);

      const totalPages = Math.ceil(total / query.limit);

      return {
        designs,
        total,
        page: query.page,
        totalPages,
      };
    } catch (error) {
      logger.error('Error fetching designs:', error);
      throw new Error('Failed to fetch designs');
    }
  }

  static async getDesignById(designId: string): Promise<Design | null> {
    try {
      return await prisma.design.findUnique({
        where: { id: designId },
      });
    } catch (error) {
      logger.error('Error fetching design by ID:', error);
      throw new Error('Failed to fetch design');
    }
  }
}