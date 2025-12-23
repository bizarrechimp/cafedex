// src/lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
  if (cached.conn) {
    const db = cached.conn.connection.db;
    if (db) {
      console.log('Using cached connection to database:', db.databaseName);
    }
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: 'cafedex', // Explicitly set the database name
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    };

    console.log('Connecting to MongoDB with options:', JSON.stringify(opts, null, 2));
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      const db = mongoose.connection.db;
      if (db) {
        console.log('New connection established to database:', db.databaseName);
        console.log('Available collections:', db.listCollections());
      }
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectMongo;
