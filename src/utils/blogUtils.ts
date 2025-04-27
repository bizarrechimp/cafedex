import { BlogPost } from '@/lib/models/blogpost';
import connectMongo from '@/lib/mongodb';
import { cache } from 'react';

export interface BlogPostType {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  coverImage: string;
}

export const getAllPosts = cache(async (): Promise<BlogPostType[]> => {
  console.log('Fetching all blog posts...');
  await connectMongo();
  const posts = await BlogPost.find()
    .sort({ date: -1 })
    .lean<BlogPostType[]>();

  console.log('Blog posts found:', posts.length);
  console.log('Blog data:', JSON.stringify(posts, null, 2));

  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    date: new Date(post.date).toISOString(),
    author: post.author,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
  }));
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPostType | null> => {
  console.log('Fetching blog post by slug:', slug);
  await connectMongo();
  const post = await BlogPost.findOne({ slug }).lean<BlogPostType>();

  console.log('Blog post found:', post ? 'yes' : 'no');
  if (post) console.log('Blog post data:', JSON.stringify(post, null, 2));

  if (!post) return null;

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    author: post.author,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
  };
});