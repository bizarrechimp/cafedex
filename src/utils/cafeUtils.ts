import type { Cafe } from '@/data/types';
import { cache } from 'react';
import CafeModel from '@/lib/models/cafe';
import connectMongo from '@/lib/mongodb';

export const getAllCafes = cache(async (): Promise<Cafe[]> => {
  console.log('Fetching all cafes...');
  const mongoose = await connectMongo();
  const cafes = await CafeModel.find()
    .sort({ slug: 1 })
    .lean();
  console.log('Cafes found:', cafes.length);
  console.log('Cafe data:', JSON.stringify(cafes, null, 2));
  return cafes as unknown as Cafe[];
});

export const getFeaturedCafes = cache(async (): Promise<Cafe[]> => {
  const mongoose = await connectMongo();

  // First try to get featured cafes
  const featuredCafes = await CafeModel.find({ featured: true })
    .sort({ rating: -1 })
    .limit(3)
    .lean();

  // If no featured cafes, get top rated ones instead
  if (featuredCafes.length === 0) {
    const topRatedCafes = await CafeModel.find()
      .sort({ rating: -1 })
      .limit(3)
      .lean();
    return topRatedCafes as unknown as Cafe[];
  }

  return featuredCafes as unknown as Cafe[];
});

export const getCafesByCity = cache(async (city: string): Promise<Cafe[]> => {
  const mongoose = await connectMongo();
  const cafes = await CafeModel.find({ city })
    .sort({ rating: -1 })
    .lean();
  return cafes as unknown as Cafe[];
});

export const getCafesByFeature = cache(async (feature: string): Promise<Cafe[]> => {
  const mongoose = await connectMongo();
  const cafes = await CafeModel.find({ features: feature })
    .sort({ rating: -1 })
    .lean();
  return cafes as unknown as Cafe[];
});