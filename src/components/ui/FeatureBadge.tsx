'use client';

interface FeatureBadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'info' | 'warning';
}

const variantClasses = {
  default:
    'bg-amber-100/50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 border-amber-200/30 dark:border-amber-800/30',
  success:
    'bg-green-100/50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200/30 dark:border-green-800/30',
  info: 'bg-blue-100/50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200/30 dark:border-blue-800/30',
  warning:
    'bg-orange-100/50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 border-orange-200/30 dark:border-orange-800/30',
};

export default function FeatureBadge({ text, variant = 'default' }: FeatureBadgeProps) {
  return (
    <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${variantClasses[variant]}`}>
      {text}
    </span>
  );
}
