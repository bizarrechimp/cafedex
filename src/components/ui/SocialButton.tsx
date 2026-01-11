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
    'flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black shadow-lg hover:scale-[1.02] transition-all';

  const variantClasses = {
    instagram: 'bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white',
    website: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900',
    facebook: 'bg-blue-600 text-white hover:shadow-blue-500/20',
    github: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900',
    twitter: 'bg-blue-400 text-white hover:shadow-blue-400/20',
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
