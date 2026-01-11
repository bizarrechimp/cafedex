#!/usr/bin/env node

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cafe from '../lib/db/cafe';
import initialCafes from '../lib/constants/initial_cafes.json';
import { logger } from '../lib/logger';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const uri: string = MONGODB_URI;

async function seed() {
  try {
    await mongoose.connect(uri);
    logger.info('Connected to MongoDB');

    // Clean up existing data
    await Cafe.deleteMany({});
    logger.info('Cleaned up existing cafes');

    const result = await Cafe.insertMany(initialCafes);
    logger.info(`Successfully seeded ${result.length} cafes`);

    await mongoose.disconnect();
    logger.info('Database connection closed');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

// Run the seed function
seed();
