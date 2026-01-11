/**
 * MongoDB connection module
 * Handles connection pooling and reconnection logic
 *
 * @module db/mongodb
 */

import mongoose, { Connection } from 'mongoose';
import { env } from '@/env';
import { logger } from '@/lib/logger';
import { DatabaseError } from '@/lib/errors';

const MONGODB_URI = env.mongodb.uri;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

/**
 * MongoDB connection options
 */
const mongooseOptions = {
  maxPoolSize: parseInt(process.env.MONGODB_POOL_SIZE || '10'),
  minPoolSize: parseInt(process.env.MONGODB_MIN_POOL_SIZE || '2'),
  socketTimeoutMS: env.mongodb.timeout,
  serverSelectionTimeoutMS: env.mongodb.timeout,
  connectTimeoutMS: env.mongodb.timeout,
  retryWrites: true,
  retryReads: true,
  w: 'majority' as const,
};

interface CachedConnection {
  conn: Connection | null;
  promise: Promise<typeof mongoose> | null;
  error: Error | null;
}

type GlobalWithCache = typeof globalThis & { mongoose?: CachedConnection };

let cached = (global as GlobalWithCache).mongoose;

if (!cached) {
  cached = (global as GlobalWithCache).mongoose = {
    conn: null,
    promise: null,
    error: null,
  };
}

// Type guard to ensure cached is never undefined after initialization
const getCached = (): CachedConnection => {
  const c = (global as GlobalWithCache).mongoose;
  if (!c) {
    throw new Error('Cached connection not initialized');
  }
  return c;
};

/**
 * Connects to MongoDB
 * Uses connection pooling to reuse connections in serverless environments
 *
 * @returns MongoDB connection
 * @throws DatabaseError if connection fails
 */
async function connectMongo(): Promise<Connection> {
  const cache = getCached();

  if (cache.conn) {
    logger.debug('Using cached MongoDB connection');
    return cache.conn;
  }

  if (!cache.promise) {
    logger.info('Initiating new MongoDB connection');

    cache.promise = (async () => {
      try {
        const start = Date.now();
        const result = await mongoose.connect(MONGODB_URI, mongooseOptions);
        const duration = Date.now() - start;

        logger.perf('MongoDB connection established', duration);
        logger.info(`Connected to MongoDB (pool size: ${mongooseOptions.maxPoolSize})`);

        return result;
      } catch (error) {
        cache.promise = null;
        cache.error = error as Error;
        logger.error('MongoDB connection failed', error);
        throw new DatabaseError(`Failed to connect to MongoDB: ${(error as Error).message}`);
      }
    })();
  }

  try {
    const mongoose = await cache.promise;
    cache.conn = mongoose.connection;
    return cache.conn;
  } catch (error) {
    logger.error('Error retrieving MongoDB connection', error);
    throw new DatabaseError('Failed to retrieve MongoDB connection');
  }
}

/**
 * Closes MongoDB connection
 * Used for graceful shutdown
 */
export async function disconnectMongo(): Promise<void> {
  const cache = getCached();
  if (cache.conn) {
    await mongoose.disconnect();
    cache.conn = null;
    logger.info('MongoDB connection closed');
  }
}

/**
 * Custom MongoDB Error type
 */
export interface MongoDBError extends Error {
  code?: number;
  codeName?: string;
  errmsg?: string;
}

export default connectMongo;
