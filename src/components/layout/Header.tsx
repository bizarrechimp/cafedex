'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
} from '@heroui/react';
import { Menu, Settings } from 'lucide-react';
import Switch from '@/components/ui/Switch';
import { useTheme } from '@/providers/ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopConfigOpen, setIsDesktopConfigOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (
        isMenuOpen &&
        !target.closest('.js-menu-panel') &&
        !target.closest('.js-menu-toggle')
      ) {
        setIsMenuOpen(false);
      }

      if (
        isDesktopConfigOpen &&
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
    { label: 'Inicio', href: '/' },
    { label: 'Cafeterías', href: '/cafeterias' },
    { label: 'Contacto', href: '/contact' },
  ];

  return (
    <Navbar
      isBlurred
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={handleMenuOpenChange}
      className="shadow-md"
      disableAnimation={true}
    >
      {/* Brand */}
      <NavbarBrand className="flex-1">
        <Link
          href="/"
          className="font-bold text-xl"
        >
          ☕<span
            className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent"
          >
            Cafedex
          </span>
        </Link>
      </NavbarBrand>

      {/* Desktop Menu */}
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-medium"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
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
                aria-label="Configuración"
                className="text-gray-700 dark:text-gray-300 js-config-toggle"
              >
                <Settings size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="card-custom p-3 js-config-panel">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Selector light/dark
                </span>
                <Switch isDarkMode={isDarkMode} onToggle={toggleTheme} />
              </div>
            </PopoverContent>
          </Popover>
        </NavbarItem>
        <NavbarMenuToggle
          aria-label="Alternar menú"
          className="md:hidden js-menu-toggle"
          icon={<Menu size={24} />}
        />
      </NavbarContent>

      {/* Mobile/Tablet Menu */}
      <NavbarMenu className="navbar-menu-float js-menu-panel card-custom !fixed !right-4 !left-auto !bottom-auto !h-auto !w-[min(90vw,18rem)] !max-h-none !overflow-visible !p-4 !z-40">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-4"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
