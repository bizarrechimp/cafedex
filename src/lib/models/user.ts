import mongoose from 'mongoose';
import { UserRole } from '@/data/types';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  emailVerified: Date,
  image: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }],
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  }]
}, {
  timestamps: true,
});

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
