import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db/mongodb';
import mongoose from 'mongoose';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    // First check if we have a MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not configured');
    }

    logger.info('Health check: Attempting to connect to MongoDB...');
    const connection = await connectMongo();

    // Test the connection using the admin database
    if (!connection.db) {
      throw new Error('Database connection is not available');
    }

    const adminDb = connection.db.admin();
    const pingResult = await adminDb.ping();

    if (pingResult?.ok !== 1) {
      throw new Error('MongoDB ping failed');
    }

    logger.info('Health check passed: MongoDB is operational');

    // Get database stats
    const stats = await connection.db.command({ dbStats: 1 });

    return NextResponse.json({
      status: 'ok',
      mongodb: 'connected',
      dbStats: {
        collections: stats.collections,
        views: stats.views,
        objects: stats.objects,
        avgObjSize: stats.avgObjSize,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const error = err as Error;
    logger.error('Health check failed', {
      name: error?.name || 'Unknown Error',
      message: error?.message || 'An unknown error occurred',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      code: err instanceof mongoose.Error ? (err as any).code : undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      codeName: err instanceof mongoose.Error ? (err as any).codeName : undefined,
      stack: error?.stack,
    });

    // Determine appropriate status code based on error type
    let statusCode = 500;
    let errorMessage = error?.message || 'Unknown error occurred';

    if (err instanceof mongoose.Error) {
      statusCode = 503; // Service Unavailable for MongoDB connection issues
      errorMessage = `MongoDB Error: ${error.message}`;
    }

    return NextResponse.json(
      {
        status: 'error',
        message: errorMessage,
        details:
          err instanceof mongoose.Error
            ? {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code: (err as any).code,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                codeName: (err as any).codeName,
              }
            : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    );
  }
}
