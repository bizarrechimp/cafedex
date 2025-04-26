import { ObjectId } from 'mongodb';

export interface Cafe {
  _id?: ObjectId;        // MongoDB ID
  name: string;
  image: string;
  city: string;
  address: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  slug: string;
  rating?: number;
  features?: string[];
  openingHours?: {
    [key: string]: string;
  };
  description?: string;
  lastUpdated?: string;
  featured?: boolean;    // For featured cafes on homepage
  createdAt?: Date;      // MongoDB timestamp
  updatedAt?: Date;      // MongoDB timestamp
}

export interface MongoDBError extends Error {
  code?: number;
  codeName?: string;
}