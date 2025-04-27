import { Types } from 'mongoose';

export interface Cafe {
  _id?: Types.ObjectId;  // Mongoose ObjectId
  name: string;
  image: string;
  city: string;
  country: string;
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
  createdAt?: Date;      // Mongoose timestamp
  updatedAt?: Date;      // Mongoose timestamp
}

export interface MongoDBError extends Error {
  code?: number;
  codeName?: string;
}