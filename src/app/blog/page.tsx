import BlogCard from '@/components/BlogCard';
import { getAllPosts } from '@/utils/blogUtils';
import type { BlogPost } from '@/utils/blogUtils';
import { Fragment } from 'react';

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {posts.map((post: BlogPost) => (
          <Fragment key={`blog-post-${post.slug}`}>
            <div className="w-full lg:w-1/3 md:w-1/2 px-4">
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                image={post.coverImage}
                date={new Date(post.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                slug={post.slug}
                author={post.author}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </main>
  );
}