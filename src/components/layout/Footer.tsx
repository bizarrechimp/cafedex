// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { Divider } from '@heroui/react';
import { Github, Twitter, Mail } from 'lucide-react';
import { useI18n } from '@/lib/i18n/client';
import { localizePathname } from '@/lib/i18n/routing';
import { useLocale } from '@/lib/i18n/useLocale';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();
  const locale = useLocale();

  return (
    <footer className="bg-brand-primary border-t border-brand-primary/40 mt-16 text-brand-beige">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-h4 font-display text-white">
              ☕
              <span className="bg-gradient-to-r from-brand-secondary to-brand-warm bg-clip-text text-transparent">
                Cafedex
              </span>
            </h2>
            <p className="text-body-s font-ui text-brand-beige/85">
              {t('footer.description')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-h4 font-display text-white">
              {t('footer.follow')}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/bizarrechimp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-beige text-brand-primary hover:bg-brand-secondary hover:text-brand-primary transition-all"
                aria-label={t('footer.social.github')}
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com/bizarrechimp1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-beige text-brand-primary hover:bg-brand-secondary hover:text-brand-primary transition-all"
                aria-label={t('footer.social.twitter')}
              >
                <Twitter size={18} />
              </a>
              <a
                href="mailto:contact@cafedex.com"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-beige text-brand-primary hover:bg-brand-secondary hover:text-brand-primary transition-all"
                aria-label={t('footer.social.email')}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Divider className="my-8 bg-brand-beige/40" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-body-s font-ui text-brand-beige/85">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex gap-6">
            <Link
              href={localizePathname('/privacy', locale)}
              className="hover:text-brand-warm transition-colors"
            >
              {t('footer.links.privacy')}
            </Link>
            <Link
              href={localizePathname('/terms', locale)}
              className="hover:text-brand-warm transition-colors"
            >
              {t('footer.links.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
