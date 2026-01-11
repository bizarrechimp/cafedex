'use client';

interface CafeDescriptionProps {
  description: string;
}

export default function CafeDescription({ description }: CafeDescriptionProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
      <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 italic border-l-4 border-amber-500 pl-6 py-2 bg-amber-50/30 dark:bg-amber-900/10 rounded-r-lg">
        {description}
      </p>
    </div>
  );
}
