import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema(
  {
    // Unique identifier generated as a deterministic hash SHA-256 of name-city-country
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String, required: true },
    },
    specialty_features: {
      brew_methods: { type: [String], default: [] },
      roastery: { type: Boolean, default: false },
      beans_origin: { type: [String], default: [] },
      opening_Hours: { type: Map, of: String, default: {} },
      services: { type: [String], default: [] },
      serving: { type: [String], default: [] },
    },
    source: {
      origin: { type: String },
      curated: { type: Boolean, default: false },
    },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    rrss: {
      instagram: { type: String },
      website: { type: String },
      facebook: { type: String },
    },
    image: { type: String },
    rating: { type: Number },
    lastUpdated: { type: String },
  },
  {
    timestamps: true,
  }
);

// Add indexes for common queries
cafeSchema.index({ city: 1 });
cafeSchema.index({ published: 1 });
cafeSchema.index({ featured: 1 });

const Cafe = mongoose.models.Cafe || mongoose.model('Cafe', cafeSchema, 'cafes');
export default Cafe;
