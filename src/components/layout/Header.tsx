'use client';

import { useEffect, useState, type Key } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Select,
  SelectItem,
} from '@heroui/react';
import { Menu, Settings } from 'lucide-react';
import Switch from '@/components/ui/Switch';
import { useTheme } from '@/providers/ThemeProvider';
import { useI18n } from '@/lib/i18n/client';
import { localizePathname } from '@/lib/i18n/routing';
import { Locale } from '@/lib/i18n/config';
import { useLocale } from '@/lib/i18n/useLocale';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopConfigOpen, setIsDesktopConfigOpen] = useState(false);
  const { isDarkMode, toggleTheme, setLanguagePreference } = useTheme();
  const { t } = useI18n();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const isSelectPortalClick =
        target.closest('[role="listbox"]') ||
        target.closest('[data-slot="listbox"]') ||
        target.closest('[data-slot="option"]');

      if (isMenuOpen && !target.closest('.js-menu-panel') && !target.closest('.js-menu-toggle')) {
        setIsMenuOpen(false);
      }

      if (
        isDesktopConfigOpen &&
        !isSelectPortalClick &&
        !target.closest('.js-config-panel') &&
        !target.closest('.js-config-toggle')
      ) {
        setIsDesktopConfigOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick, true);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, true);
    };
  }, [isMenuOpen, isDesktopConfigOpen]);

  const handleMenuOpenChange = (open: boolean) => {
    if (open) {
      setIsMenuOpen(true);
      setIsDesktopConfigOpen(false);
      return;
    }

    setIsMenuOpen(false);
  };

  const handleConfigPopoverChange = (open: boolean) => {
    if (open) {
      setIsDesktopConfigOpen(true);
      setIsMenuOpen(false);
      return;
    }

    setIsDesktopConfigOpen(false);
  };

  const menuItems = [
    { label: t('header.nav.home'), href: '/' },
    { label: t('header.nav.cafes'), href: '/cafeterias' },
    { label: t('header.nav.contact'), href: '/contact' },
  ];
  const languageOptions = [
    { key: 'es', flagClass: 'fi fi-es' },
    { key: 'en', flagClass: 'fi fi-gb' },
  ] as const;

  const normalizePath = (path: string) => {
    if (!path) {
      return '/';
    }
    const normalized = path.replace(/\/+$/, '');
    return normalized === '' ? '/' : normalized;
  };

  const currentPath = normalizePath(pathname?.replace(`/${locale}`, '') || '/');

  const handleLanguageChange = (keys: 'all' | Set<Key>) => {
    if (keys === 'all') {
      return;
    }

    const [selected] = Array.from(keys);
    const nextLocale = selected as Locale | undefined;
    if (!nextLocale || nextLocale === locale) {
      return;
    }

    setLanguagePreference(nextLocale);
    const nextPath = localizePathname(pathname, nextLocale);
    const query = searchParams?.toString();
    router.replace(query ? `${nextPath}?${query}` : nextPath);
    router.refresh();
  };

  return (
    <Navbar
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenuOpenChange}
      className="shadow-md bg-brand-primary text-white"
      disableAnimation={true}
    >
      {/* Brand */}
      <NavbarBrand className="flex-1">
        <Link href={localizePathname('/', locale)} className="text-h4 font-display text-white">
          ☕
          <span className="bg-gradient-to-r from-brand-secondary to-brand-warm bg-clip-text text-transparent">
            Cafedex
          </span>
        </Link>
      </NavbarBrand>

      {/* Desktop Menu */}
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item) => {
          const itemPath = normalizePath(item.href);
          const isActive =
            itemPath === '/' ? currentPath === '/' : currentPath.startsWith(itemPath);
          return (
          <NavbarItem key={item.href}>
            <Link
              href={localizePathname(item.href, locale)}
              className={`text-body-s font-ui transition-colors font-medium ${
                isActive
                  ? 'text-brand-secondary border-b-2 border-brand-secondary'
                  : 'text-brand-warm hover:text-brand-secondary'
              }`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        )})}
      </NavbarContent>

      {/* Right Section */}
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Popover
            placement="bottom-end"
            offset={12}
            isOpen={isDesktopConfigOpen}
            onOpenChange={handleConfigPopoverChange}
            disableAnimation={true}
          >
            <PopoverTrigger>
              <Button
                isIconOnly
                variant="light"
                aria-label={t('header.settings.aria')}
                className="text-brand-beige hover:text-white js-config-toggle"
              >
                <Settings size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="card-custom p-3 js-config-panel bg-white/95 dark:bg-brand-primary/95 border border-brand-beige shadow-lg text-brand-ink dark:text-brand-secondary">
              <div className="flex flex-col gap-4 min-w-[180px]">
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-ui-label font-ui text-brand-ink dark:text-brand-secondary">
                    {t('header.settings.themeLabel')}
                  </span>
                  <Switch isDarkMode={isDarkMode} onToggle={toggleTheme} />
                </div>
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-ui-label font-ui text-brand-ink dark:text-brand-secondary">
                    {t('header.settings.languageLabel')}
                  </span>
                  <Select
                    aria-label={t('header.settings.languageLabel')}
                    selectedKeys={new Set([locale])}
                    onSelectionChange={handleLanguageChange}
                    selectionMode="single"
                    disallowEmptySelection
                    color="default"
                    variant="flat"
                    size="sm"
                    className="w-[56px] min-w-0"
                    classNames={{
                      trigger:
                        'h-7 min-h-7 rounded-full bg-brand-beige px-2 hover:bg-brand-secondary/80 border border-brand-beige dark:bg-brand-primary/20 dark:text-brand-secondary dark:border-brand-primary/30',
                      value: 'flex items-center justify-center',
                      popoverContent:
                        'min-w-[84px] bg-white dark:bg-brand-primary/95 border border-brand-beige shadow-lg',
                      listbox: 'bg-transparent',
                      listboxItem:
                        'text-brand-ink data-[hover=true]:bg-brand-secondary/20 data-[hover=true]:text-brand-secondary dark:text-brand-secondary',
                    }}
                    renderValue={(items) =>
                      items.map((item) => {
                        const data = languageOptions.find((option) => option.key === item.key);
                        return (
                          <span key={item.key} className={`${data?.flagClass} language-flag`} />
                        );
                      })
                    }
                  >
                    {languageOptions.map((option) => (
                      <SelectItem key={option.key} textValue={option.key}>
                        <span className={`${option.flagClass} language-flag`} />
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={t('header.menuToggle.aria')}
          className="md:hidden js-menu-toggle"
          icon={<Menu size={24} />}
        />
      </NavbarContent>

      {/* Mobile/Tablet Menu */}
      <NavbarMenu className="navbar-menu-float js-menu-panel card-custom !fixed !right-4 !left-auto !bottom-auto !h-auto !w-[min(85vw,14rem)] !max-h-none !overflow-visible !py-0 !px-0 !gap-0 !z-40">
        {menuItems.map((item, index) => {
          const itemPath = normalizePath(item.href);
          const isActive =
            itemPath === '/' ? currentPath === '/' : currentPath.startsWith(itemPath);
          return (
          <NavbarMenuItem
            key={`${item.href}-${index}`}
            className="border-b border-brand-beige/70 last:border-b-0 first:mt-1 last:mb-1"
          >
            <Link
              href={localizePathname(item.href, locale)}
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full rounded-md px-3 py-2 text-body-m font-ui transition-colors font-medium ${
                isActive
                  ? 'text-brand-secondary bg-brand-secondary/20'
                  : 'text-brand-ink hover:text-brand-primary hover:bg-brand-secondary/20'
              }`}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        )})}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
