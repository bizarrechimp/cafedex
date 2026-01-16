'use client';

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  variant?: 'instagram' | 'website' | 'facebook' | 'github' | 'twitter';
  className?: string;
}

export default function SocialButton({
  href,
  label,
  icon,
  variant = 'website',
  className,
}: SocialButtonProps) {
  const baseClasses =
    'flex items-center gap-2 px-8 py-3.5 rounded-2xl text-ui-button font-ui shadow-lg hover:scale-[1.02] transition-all';

  const variantClasses = {
    instagram: 'bg-brand-secondary text-brand-primary',
    website: 'bg-brand-primary text-white',
    facebook: 'bg-brand-primary text-white',
    github: 'bg-brand-primary text-white',
    twitter: 'bg-brand-primary text-white',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`}
      aria-label={label}
    >
      {icon}
      {label}
    </a>
  );
}
