/**
 * Cafe validation schemas
 * Uses Zod for runtime type safety
 */

import { z } from 'zod';
import { isActiveProvince } from '@/lib/constants/provinces';

/**
 * Schema for cafe filtering by city
 */
export const CafeCityFilterSchema = z.object({
  city: z.string().trim().min(1, 'Ciudad es requerida'),
});

/**
 * Schema for cafe filtering by state/province
 */
export const CafeStateFilterSchema = z.object({
  state: z.string().refine(isActiveProvince, 'Provincia no válida'),
});

/**
 * Schema for pagination parameters
 */
export const PaginationSchema = z.object({
  page: z.number().positive('Página debe ser positiva').default(1),
  limit: z
    .number()
    .positive('Límite debe ser positivo')
    .max(100, 'Máximo 100 resultados')
    .default(10),
});

/**
 * Schema for cafe search queries
 */
export const CafeSearchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, 'Búsqueda debe tener al menos 2 caracteres')
    .max(100, 'Búsqueda no puede exceder 100 caracteres'),
});

/**
 * Schema for cafe feature filtering
 */
export const CafeFeatureSchema = z.object({
  feature: z.enum(['roastery', 'brew_methods', 'beans_origin']).default('roastery'),
});

/**
 * Combined filter schema for cafeteria listing
 */
export const CafeListFilterSchema = z.object({
  city: z.string().trim().optional(),
  state: z.string().optional(),
  limit: z.number().positive().default(10),
  skip: z.number().nonnegative().default(0),
});

/**
 * Type exports for use in components
 */
export type CafeCityFilter = z.infer<typeof CafeCityFilterSchema>;
export type CafeStateFilter = z.infer<typeof CafeStateFilterSchema>;
export type PaginationParams = z.infer<typeof PaginationSchema>;
export type CafeSearch = z.infer<typeof CafeSearchSchema>;
export type CafeFeatureFilter = z.infer<typeof CafeFeatureSchema>;
export type CafeListFilter = z.infer<typeof CafeListFilterSchema>;
