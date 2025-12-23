import { Types } from 'mongoose';

export type UserRole = 'user' | 'admin';

export interface User {
  _id?: Types.ObjectId;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  role: UserRole;
  accounts?: Account[];
  sessions?: Session[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Account {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export interface Session {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  expires: Date;
  sessionToken: string;
}

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