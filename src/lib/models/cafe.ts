import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number },
  description: { type: String },
  googleMapsUrl: { type: String },
  instagramUrl: { type: String },
  websiteUrl: { type: String },
  features: [String],
  hours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  }
});

export default mongoose.models.Cafe || mongoose.model('Cafe', cafeSchema);