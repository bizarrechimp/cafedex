import { getAllPosts, getPostBySlug } from '@/utils/blogUtils';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Make it dynamic since we're using MongoDB now
export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="mb-8 text-gray-600">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {post.author && (
          <span className="ml-4">por {post.author}</span>
        )}
      </div>
      {post.coverImage && (
        <div className="mb-8 relative w-full h-[400px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      <div className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
