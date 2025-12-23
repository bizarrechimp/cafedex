import type { Cafe } from '@/data/types';
import { cache } from 'react';
import CafeModel from '@/lib/models/cafe';
import connectMongo from '@/lib/mongodb';
import mongoose from 'mongoose';

export const getAllCafes = cache(async (): Promise<Cafe[]> => {
  try {
    console.log('getAllCafes: Starting to fetch cafes...');

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const connection = await connectMongo();
    const db = connection.connection.db;
    if (db) {
      console.log('getAllCafes: Connected to database:', db.databaseName);
      console.log('getAllCafes: Collections:', await db.listCollections().toArray());
    }

    if (!connection.connection.readyState) {
      throw new Error('MongoDB connection is not ready');
    }

    // Verify that the CafeModel exists and has the correct collection
    console.log('getAllCafes: Collection name:', CafeModel.collection.name);
    console.log('getAllCafes: Collection namespace:', CafeModel.collection.namespace);
    console.log('getAllCafes: Model name:', CafeModel.modelName);

    const cafes = await CafeModel.find({}).lean();

    console.log('getAllCafes: Query executed');
    console.log('getAllCafes: Number of cafes found:', cafes.length);

    if (cafes.length === 0) {
      console.log('getAllCafes: No cafes found in database');
      return [];
    } else {
      console.log('getAllCafes: First cafe data:', JSON.stringify(cafes[0], null, 2));
    }

    // Transform MongoDB documents to match Cafe interface
    return cafes.map(cafe => ({
      _id: cafe._id,
      name: cafe.name,
      image: cafe.image,
      city: cafe.city,
      country: cafe.country,
      address: cafe.address,
      googleMapsUrl: cafe.googleMapsUrl,
      instagramUrl: cafe.instagramUrl,
      websiteUrl: cafe.websiteUrl,
      slug: cafe.slug,
      rating: cafe.rating,
      features: cafe.features,
      openingHours: cafe.openingHours,
      description: cafe.description,
      lastUpdated: cafe.lastUpdated,
      featured: cafe.featured,
      createdAt: cafe.createdAt,
      updatedAt: cafe.updatedAt
    })) as Cafe[];
  } catch (error) {
    console.error('getAllCafes: Detailed error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined,
      mongooseError: error instanceof mongoose.Error,
      mongooseErrorName: error instanceof mongoose.Error ? error.constructor.name : undefined
    });
    throw error;
  }
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