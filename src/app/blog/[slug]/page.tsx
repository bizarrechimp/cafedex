import { getPostBySlug } from '@/utils/blogUtils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

type Props = {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
        <Image
          src={post.coverImage}
          alt={`Imagen para ${post.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {new Date(post.date).toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} • {post.author}
      </div>

      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        {post.title}
      </h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}