import { z } from 'zod';

export const createDesignSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  tags: z.array(z.string().min(1).max(50)).max(10, 'Maximum 10 tags allowed').optional().default([]),
});

export const updateDesignSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  description: z.string().max(1000, 'Description too long').optional(),
  tags: z.array(z.string().min(1).max(50)).max(10, 'Maximum 10 tags allowed').optional(),
});

export const designQuerySchema = z.object({
  page: z.string().transform(Number).default(1),
  limit: z.string().transform(Number).default(10),
  tag: z.string().optional(),
  search: z.string().optional(),
});

export type CreateDesignInput = z.infer<typeof createDesignSchema>;
export type UpdateDesignInput = z.infer<typeof updateDesignSchema>;
export type DesignQueryInput = z.infer<typeof designQuerySchema>;