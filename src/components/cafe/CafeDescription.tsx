'use client';

interface CafeDescriptionProps {
  description: string;
}

export default function CafeDescription({ description }: CafeDescriptionProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
      <p className="text-body-l font-ui text-brand-ink italic border-l-4 border-brand-secondary pl-6 py-2 bg-brand-warm/40 rounded-r-lg">
        {description}
      </p>
    </div>
  );
}
