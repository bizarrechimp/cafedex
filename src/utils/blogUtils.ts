// src/utils/blogUtils.ts
import { cache } from 'react';
import connectMongo from '@/lib/mongodb';
import { BlogPost } from '@/lib/models/blogpost';

export interface BlogPostType {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage: string;
}

/**
 * Devuelve todos los posts ordenados por fecha desc.
 * No recibe parámetros.
 */
export const getAllPosts = cache(async (): Promise<BlogPostType[]> => {
  await connectMongo();

  const docs = await BlogPost.find(
    {},
    'slug title date author excerpt content coverImage'
  )
    .sort({ date: -1 })
    .lean()
    .exec();

  return (docs ?? []).map((d: any) => ({
    slug: String(d.slug),
    title: String(d.title),
    date: String(d.date),
    author: String(d.author ?? ''),
    excerpt: String(d.excerpt ?? ''),
    content: String(d.content ?? ''),
    coverImage: String(d.coverImage ?? ''),
  }));
});

/**
 * Busca un post por slug (string) y lo devuelve o null si no existe.
 */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPostType | null> => {
  if (!slug || typeof slug !== 'string') {
    return null;
  }

  await connectMongo();

  const d = await BlogPost.findOne(
    { slug },
    'slug title date author excerpt content coverImage'
  )
    .lean()
    .exec();

  if (!d) return null;

  return {
    slug: String(d.slug),
    title: String(d.title),
    date: String(d.date),
    author: String(d.author ?? ''),
    excerpt: String(d.excerpt ?? ''),
    content: String(d.content ?? ''),
    coverImage: String(d.coverImage ?? ''),
  };
});
