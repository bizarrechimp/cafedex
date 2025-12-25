#!/usr/bin/env node

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cafe from '../lib/models/cafe';
import initialCafes from '../lib/data/initial_cafes.json';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const uri: string = MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Clean up existing data
    await Cafe.deleteMany({});
    console.log('Cleaned up existing cafes');

    const result = await Cafe.insertMany(initialCafes);
    console.log(`Successfully seeded ${result.length} cafes`);

    await mongoose.disconnect();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

// Run the seed function
seed();