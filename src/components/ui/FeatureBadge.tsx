'use client';

interface FeatureBadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'info' | 'warning';
}

const variantClasses = {
  default:
    'bg-brand-warm/70 text-brand-primary border-brand-secondary/40',
  success:
    'bg-brand-warm/70 text-brand-primary border-brand-secondary/40',
  info: 'bg-brand-warm/70 text-brand-primary border-brand-secondary/40',
  warning:
    'bg-brand-warm/70 text-brand-primary border-brand-secondary/40',
};

export default function FeatureBadge({ text, variant = 'default' }: FeatureBadgeProps) {
  return (
    <span
      className={`px-4 py-2 rounded-xl text-ui-label font-ui border ${variantClasses[variant]}`}
    >
      {text}
    </span>
  );
}
