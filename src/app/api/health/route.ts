import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { MongoClient, MongoServerError } from 'mongodb';

export async function GET() {
  try {
    // First check if we have a MongoDB URI
    if (!process.env.MONGODB_URI) {
      throw new Error('MongoDB URI is not configured');
    }

    console.log('Health check: Attempting to connect to MongoDB...');
    const client = await clientPromise;

    // Test the connection explicitly
    const adminDb = client.db('admin');
    const pingResult = await adminDb.command({ ping: 1 });

    if (pingResult?.ok !== 1) {
      throw new Error('MongoDB ping failed');
    }

    // If we get here, basic connectivity is working. Now try to access our specific database
    const db = client.db('cafedex');
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
  } catch (error) {
    console.error('Health check failed:', {
      name: error.name,
      message: error.message,
      code: error instanceof MongoServerError ? error.code : undefined,
      codeName: error instanceof MongoServerError ? error.codeName : undefined,
      stack: error.stack
    });

    // Determine appropriate status code based on error type
    let statusCode = 500;
    let errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    if (error instanceof MongoServerError) {
      statusCode = 503; // Service Unavailable for MongoDB connection issues
      errorMessage = `MongoDB Error (${error.code}): ${error.message}`;
    }

    return NextResponse.json(
      {
        status: 'error',
        message: errorMessage,
        details: error instanceof MongoServerError ? {
          code: error.code,
          codeName: error.codeName
        } : undefined,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}