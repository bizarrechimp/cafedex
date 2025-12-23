#!/usr/bin/env node

import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function checkDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    console.log('Attempting to connect to MongoDB...');
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'cafedex'
    });

    const db = connection.connection.db;
    if (!db) {
      throw new Error('Could not get database instance');
    }
    console.log('\nDatabase name:', db.databaseName);

    // List all collections
    console.log('\nListing all collections:');
    const collections = await db.listCollections().toArray();
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });

    // Try to find any users
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log('\nNumber of users in database:', userCount);

    if (userCount > 0) {
      console.log('\nFirst user in database:');
      const firstUser = await usersCollection.findOne({});
      // Safely log user info without sensitive data
      if (firstUser) {
        console.log('- Email:', firstUser.email);
        console.log('- Role:', firstUser.role || 'no role set');
        console.log('- Created at:', firstUser.createdAt);
      }
    }

    await mongoose.disconnect();
    console.log('\nDisconnected from database');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Run the check
checkDatabase();
