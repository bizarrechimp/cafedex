import { cache } from 'react';
import { Cafe } from '@/data/types';
import CafeModel from '../models/cafe';
import connectMongo from '../mongodb';

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

export const getCafe = cache(async (slug: string): Promise<Cafe | null> => {
  await connectMongo();
  const cafe = await CafeModel.findOne({ slug }).lean();
  return serializeMongoose(cafe) as Cafe | null;
});

export const getAllCafes = cache(async (): Promise<Cafe[]> => {
  await connectMongo();
  const cafes = await CafeModel.find().sort({ slug: 1 }).lean();
  return cafes.map(serializeMongoose) as Cafe[];
});

export const getFeaturedCafes = cache(async (): Promise<Cafe[]> => {
  await connectMongo();
  const cafes = await CafeModel.find({ featured: true }).sort({ rating: -1 }).limit(3).lean();
  return cafes.map(serializeMongoose) as Cafe[];
});
