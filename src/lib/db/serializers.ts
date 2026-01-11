/**
 * Serialization utilities for converting MongoDB documents to JSON-serializable objects
 */

import { Cafe } from '@/types/cafe';

/**
 * Converts Mongoose documents to plain JavaScript objects
 * Handles Date objects, Maps, and nested structures
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeMongoose = (doc: any): Record<string, unknown> | null => {
  if (!doc) return null;

  // Clone the object to avoid mutating the original
  const obj = { ...doc } as Record<string, unknown>;

  // Convert _id to string
  if (obj._id) obj._id = String(obj._id);

  // Convert Dates to ISO strings
  if (obj.createdAt instanceof Date) obj.createdAt = obj.createdAt.toISOString();
  if (obj.updatedAt instanceof Date) obj.updatedAt = obj.updatedAt.toISOString();

  // Handle specialty_features Map
  const features = obj.specialty_features as Record<string, unknown>;
  if (features?.opening_Hours) {
    const hours = features.opening_Hours;
    if (hours instanceof Map) {
      features.opening_Hours = Object.fromEntries(hours);
    } else if (typeof (hours as Record<string, unknown>).toJSON === 'function') {
      features.opening_Hours = ((hours as Record<string, unknown>).toJSON as () => unknown)();
    }
  }

  return obj;
};

/**
 * Serialize multiple documents
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeMongooseArray = (docs: any[]): Record<string, unknown>[] => {
  return docs.map(serializeMongoose).filter((doc): doc is Record<string, unknown> => doc !== null);
};

/**
 * Type-safe serialization for Cafe documents
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeCafe = (doc: any): Cafe | null => {
  return serializeMongoose(doc) as Cafe | null;
};

/**
 * Type-safe serialization for array of Cafes
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serializeCafes = (docs: any[]): Cafe[] => {
  return serializeMongooseArray(docs) as unknown as Cafe[];
};
