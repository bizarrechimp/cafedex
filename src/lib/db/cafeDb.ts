import clientPromise from '../mongodb';
import { cache } from 'react';
import { Cafe } from '@/data/types';

export const getCafe = cache(async (slug: string) => {
  const client = await clientPromise;
  const db = client.db('cafedex');

  const cafe = await db.collection('cafes').findOne({ slug });
  return cafe as Cafe | null;
});

export const getAllCafes = cache(async () => {
  const client = await clientPromise;
  const db = client.db('cafedex');

  const cafes = await db.collection('cafes')
    .find({})
    .sort({ slug: 1 })
    .toArray();

  return cafes as Cafe[];
});

export const getFeaturedCafes = cache(async () => {
  const client = await clientPromise;
  const db = client.db('cafedex');

  const cafes = await db.collection('cafes')
    .find({ featured: true })
    .sort({ rating: -1 })
    .limit(3)
    .toArray();

  return cafes as Cafe[];
});