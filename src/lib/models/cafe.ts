import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  googleMapsUrl: { type: String },
  instagramUrl: { type: String },
  websiteUrl: { type: String },
  slug: { type: String, required: true, unique: true },
  rating: { type: Number },
  features: [String],
  openingHours: {
    type: Map,
    of: String
  },
  description: { type: String },
  lastUpdated: { type: String },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true,
  collection: 'cafes', // Explicitly set collection name
});

// Add indexes for common queries (slug already has an index due to unique: true)
cafeSchema.index({ city: 1 });
cafeSchema.index({ featured: 1 });
cafeSchema.index({ rating: -1 });

// Force model to use cafedex.cafes collection
const Cafe = mongoose.models.Cafe || mongoose.model('Cafe', cafeSchema, 'cafes');

export default Cafe;
