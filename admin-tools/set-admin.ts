#!/usr/bin/env node

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../lib/models/user';

// Load environment variables
dotenv.config({ path: '.env.local' });

const ADMIN_EMAIL = 'alexgr946@gmail.com';

async function makeUserAdmin() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'cafedex'
    });
    console.log('Connected to MongoDB');

    // Find user by email and update role
    const user = await User.findOne({ email: ADMIN_EMAIL });

    if (!user) {
      console.error(`No user found with email: ${ADMIN_EMAIL}`);
      process.exit(1);
    }

    console.log('Found user:', user.email);

    // Update to admin role
    await User.updateOne(
      { _id: user._id },
      { $set: { role: 'admin' } }
    );

    console.log(`Successfully updated user ${user.email} to admin role`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// Run the script
makeUserAdmin();
