import { cache } from 'react';
import { Cafe } from '@/data/types';
import CafeModel from '../models/cafe';
import connectMongo from '../mongodb';

export const getCafe = cache(async (slug: string): Promise<Cafe | null> => {
  const mongoose = await connectMongo();
  const cafe = await CafeModel.findOne({ slug }).lean();
  return cafe as unknown as Cafe | null;
});

export const getAllCafes = cache(async (): Promise<Cafe[]> => {
  const mongoose = await connectMongo();
  const cafes = await CafeModel.find()
    .sort({ slug: 1 })
    .lean();
  return cafes as unknown as Cafe[];
});

export const getFeaturedCafes = cache(async (): Promise<Cafe[]> => {
  const mongoose = await connectMongo();
  const cafes = await CafeModel.find({ featured: true })
    .sort({ rating: -1 })
    .limit(3)
    .lean();
  return cafes as unknown as Cafe[];
});