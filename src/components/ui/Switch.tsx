'use client';

import React from 'react';
import { Switch as HeroSwitch } from '@heroui/react';
import { Moon, Sun } from 'lucide-react';
import { useI18n } from '@/lib/i18n/client';

interface SwitchProps {
  isDarkMode: boolean;
  onToggle: (isChecked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ isDarkMode, onToggle }) => {
  const { t } = useI18n();

  return (
    <HeroSwitch
      isSelected={isDarkMode}
      onChange={(e) => onToggle(e.target.checked)}
      startContent={<Sun className="w-4 h-4" />}
      endContent={<Moon className="w-4 h-4" />}
      color="warning"
      aria-label={t('header.theme.switchAria')}
      classNames={{
        base: 'hover:opacity-100 transition-opacity',
        wrapper:
          'h-7 w-[56px] group-data-[selected=true]:bg-amber-500 group-data-[selected=false]:bg-gray-300',
      }}
    />
  );
};

export default Switch;
