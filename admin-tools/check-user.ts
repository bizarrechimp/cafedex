#!/usr/bin/env node

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../lib/models/user';

// Load environment variables
dotenv.config({ path: '.env.local' });

const USER_EMAIL = 'alexgr946@gmail.com';

async function checkUser() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'cafedex'
    });
    console.log('Connected successfully');

    const user = await User.findOne({ email: USER_EMAIL }).lean();

    if (!user) {
      console.log('No user found with this email');
    } else {
      console.log('User found:');
      console.log(JSON.stringify(user, null, 2));
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkUser();
