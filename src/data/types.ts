import { Types } from 'mongoose';

export interface Cafe {
  _id?: string;
  id: string; // The deterministic hash
  name: string;
  description: string;
  slug: string;
  city: string;
  state: string;
  country: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  specialty_features: {
    brew_methods: string[];
    roastery: boolean;
    beans_origin: string[];
    opening_Hours: { [key: string]: string };
    services: string[];
    serving: string[];
  };
  source: {
    origin: string;
    curated: boolean;
  };
  published: boolean;
  featured: boolean;
  rrss: {
    instagram: string;
    website: string;
    facebook: string;
  };
  image: string;
  rating?: number;
  lastUpdated: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MongoDBError extends Error {
  code?: number;
  codeName?: string;
}