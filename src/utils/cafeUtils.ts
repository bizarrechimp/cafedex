import { Cafe } from '@/data/types';
import clientPromise from '@/lib/mongodb';
import { cache } from 'react';

export const getAllCafes = cache(async (): Promise<Cafe[]> => {
  const client = await clientPromise;
  const db = client.db('cafedex');
  const cafes = await db.collection('cafes')
    .find({})
    .sort({ slug: 1 })
    .toArray();
  return cafes as Cafe[];
});

export const getFeaturedCafes = cache(async (): Promise<Cafe[]> => {
  const client = await clientPromise;
  const db = client.db('cafedex');

  // First try to get featured cafes
  const featuredCafes = await db.collection('cafes')
    .find({ featured: true })
    .sort({ rating: -1 })
    .limit(3)
    .toArray();

  // If no featured cafes, get top rated ones instead
  if (featuredCafes.length === 0) {
    const topRatedCafes = await db.collection('cafes')
      .find({})
      .sort({ rating: -1 })
      .limit(3)
      .toArray();
    return topRatedCafes as Cafe[];
  }

  return featuredCafes as Cafe[];
});

export const getCafesByCity = cache(async (city: string): Promise<Cafe[]> => {
  const client = await clientPromise;
  const db = client.db('cafedex');
  const cafes = await db.collection('cafes')
    .find({ city })
    .sort({ rating: -1 })
    .toArray();
  return cafes as Cafe[];
});

export const getCafesByFeature = cache(async (feature: string): Promise<Cafe[]> => {
  const client = await clientPromise;
  const db = client.db('cafedex');
  const cafes = await db.collection('cafes')
    .find({ features: feature })
    .sort({ rating: -1 })
    .toArray();
  return cafes as Cafe[];
});