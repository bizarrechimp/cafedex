import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  coverImage: { type: String },
  content: { type: String },
  date: { type: Date },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const BlogPost =
  mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema, 'Posts');
