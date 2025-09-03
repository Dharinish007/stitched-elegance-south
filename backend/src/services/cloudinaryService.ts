import { v2 as cloudinary } from 'cloudinary';
import { env } from '../env';
import { logger } from '../logger';

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export class CloudinaryService {
  static async uploadImage(buffer: Buffer, originalName: string): Promise<{ url: string; publicId: string }> {
    try {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'tailoring-portfolio',
            public_id: `design-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            transformation: [
              { width: 1200, height: 1200, crop: 'limit', quality: 'auto:good' },
            ],
          },
          (error, result) => {
            if (error) {
              logger.error('Cloudinary upload error:', error);
              reject(new Error(`Failed to upload image: ${error.message}`));
            } else if (result) {
              logger.info(`Image uploaded to Cloudinary: ${result.public_id}`);
              resolve({
                url: result.secure_url,
                publicId: result.public_id,
              });
            } else {
              reject(new Error('Unknown error occurred during upload'));
            }
          }
        ).end(buffer);
      });
    } catch (error) {
      logger.error('Cloudinary service error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  }

  static async deleteImage(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result === 'ok') {
        logger.info(`Image deleted from Cloudinary: ${publicId}`);
        return true;
      } else {
        logger.warn(`Failed to delete image from Cloudinary: ${publicId}, result: ${result.result}`);
        return false;
      }
    } catch (error) {
      logger.error('Cloudinary delete error:', error);
      return false;
    }
  }

  static async updateImage(buffer: Buffer, originalName: string, oldPublicId: string): Promise<{ url: string; publicId: string }> {
    // Delete old image
    await this.deleteImage(oldPublicId);
    
    // Upload new image
    return this.uploadImage(buffer, originalName);
  }
}