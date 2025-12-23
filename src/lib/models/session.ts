import mongoose from 'mongoose';
import type { Session as SessionType } from '@/data/types';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expires: { type: Date, required: true },
  sessionToken: { type: String, required: true, unique: true },
});

// Add indexes for queries
sessionSchema.index({ sessionToken: 1 });
sessionSchema.index({ userId: 1 });
sessionSchema.index({ expires: 1 });

export const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);
