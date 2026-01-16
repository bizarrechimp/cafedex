'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/client';
import { localizePathname } from '@/lib/i18n/routing';
import { useLocale } from '@/lib/i18n/useLocale';

interface BackLinkProps {
  href?: string;
  label?: string;
}

export default function BackLink({ href = '/cafeterias', label }: BackLinkProps) {
  const { t } = useI18n();
  const locale = useLocale();
  const resolvedLabel = label ?? t('cafe.backLink.label');

  return (
    <Link
      href={localizePathname(href, locale)}
      className="inline-flex items-center gap-2 text-brand-primary text-ui-button font-ui hover:text-brand-secondary hover:underline mb-20"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {resolvedLabel}
    </Link>
  );
}
