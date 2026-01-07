import type { Cafe } from '@/data/types';
import { cache } from 'react';
import CafeModel from '@/lib/models/cafe';
import connectMongo from '@/lib/mongodb';

const serializeMongoose = (doc: any) => {
  if (!doc) return null;

  // Clone the object to avoid mutating the original
  const obj = { ...doc };

  // Convert _id to string
  if (obj._id) obj._id = obj._id.toString();

  // Convert Dates to ISO strings
  if (obj.createdAt instanceof Date) obj.createdAt = obj.createdAt.toISOString();
  if (obj.updatedAt instanceof Date) obj.updatedAt = obj.updatedAt.toISOString();

  // Handle specialty_features Map
  if (obj.specialty_features?.opening_Hours) {
    if (obj.specialty_features.opening_Hours instanceof Map) {
      obj.specialty_features.opening_Hours = Object.fromEntries(
        obj.specialty_features.opening_Hours
      );
    } else if (typeof obj.specialty_features.opening_Hours.toJSON === 'function') {
      obj.specialty_features.opening_Hours = obj.specialty_features.opening_Hours.toJSON();
    }
  }

  return obj;
};

export const getAllCafes = cache(async (): Promise<Cafe[]> => {
  await connectMongo();
  const cafes = await CafeModel.find().sort({ slug: 1 }).lean();
  return cafes.map(serializeMongoose) as Cafe[];
});

export const getFeaturedCafes = cache(async (): Promise<Cafe[]> => {
  await connectMongo();

  // First try to get featured cafes
  const featuredCafes = await CafeModel.find({ featured: true })
    .sort({ rating: -1 })
    .limit(3)
    .lean();

  // If no featured cafes, get top rated ones instead
  if (featuredCafes.length === 0) {
    const topRatedCafes = await CafeModel.find().sort({ rating: -1 }).limit(3).lean();
    return topRatedCafes.map(serializeMongoose) as Cafe[];
  }

  return featuredCafes.map(serializeMongoose) as Cafe[];
});

export const getCafesByCity = cache(async (city: string): Promise<Cafe[]> => {
  await connectMongo();
  const cafes = await CafeModel.find({ city }).sort({ rating: -1 }).lean();
  return cafes.map(serializeMongoose) as Cafe[];
});

export const getCafesByFeature = cache(async (feature: string): Promise<Cafe[]> => {
  await connectMongo();
  const cafes = await CafeModel.find({
    $or: [
      { 'specialty_features.brew_methods': feature },
      { 'specialty_features.services': feature },
      { 'specialty_features.serving': feature },
    ],
  })
    .sort({ rating: -1 })
    .lean();
  return cafes.map(serializeMongoose) as Cafe[];
});

import { isActiveProvince } from '@/lib/data/provinces';

export const getCafesByState = cache(async (state: string): Promise<Cafe[]> => {
  await connectMongo();

  // Normalize and validate against the active provinces list (MVP: only Alicante active)
  const normalized = state?.trim();
  if (!normalized || !isActiveProvince(normalized)) return [];

  const cafes = await CafeModel.find({ state: normalized }).sort({ rating: -1 }).lean();

  return cafes.map(serializeMongoose) as Cafe[];
});
