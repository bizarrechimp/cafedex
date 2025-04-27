import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // First check if we have a MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not configured');
    }

    console.log('Health check: Attempting to connect to MongoDB...');
    const connection = await connectMongo();

    // Test the connection using Mongoose
    const adminDb = connection.connection.db.admin();
    const pingResult = await adminDb.ping();

    if (pingResult?.ok !== 1) {
      throw new Error('MongoDB ping failed');
    }

    // Get database stats using Mongoose connection
    const db = connection.connection.db;
    const stats = await db.command({ dbStats: 1 });

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
        indexSize: stats.indexSize
      },
      timestamp: new Date().toISOString()
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Health check failed:', {
      name: error?.name || 'Unknown Error',
      message: error?.message || 'An unknown error occurred',
      code: err instanceof mongoose.Error ? (err as any).code : undefined,
      codeName: err instanceof mongoose.Error ? (err as any).codeName : undefined,
      stack: error?.stack
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
        details: err instanceof mongoose.Error ? {
          code: (err as any).code,
          codeName: (err as any).codeName
        } : undefined,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}