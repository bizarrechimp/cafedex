'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';
import { Menu } from 'lucide-react';
import Switch from '@/components/ui/Switch';
import { useTheme } from '@/providers/ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Cafeterías', href: '/cafeterias' },
    { label: 'Contacto', href: '/contact' },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white dark:bg-slate-950 shadow-sm"
    >
      {/* Brand */}
      <NavbarBrand className="flex-1">
        <Link
          href="/"
          className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent"
        >
          ☕ Cafedex
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

      {/* Right Section - Theme Toggle */}
      <NavbarContent justify="end">
        <NavbarItem>
          <Switch isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </NavbarItem>

        {/* Mobile Menu Toggle */}
        <NavbarMenuToggle
          aria-label="Alternar menú"
          className="md:hidden"
          icon={<Menu size={24} />}
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-white dark:bg-slate-950 shadow-lg">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <Link
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="w-full text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2"
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
