import React, { useMemo } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/lib/themeContext';

export default function ThemeSwitcher({ className = '' }) {
  const { t } = useTranslation('navigation');
  const { themePreference, setThemePreference } = useTheme();

  const options = useMemo(() => [
    { value: 'system', label: t('footer.themeDevice'), icon: Monitor },
    { value: 'light', label: t('footer.themeLight'), icon: Sun },
    { value: 'dark', label: t('footer.themeDark'), icon: Moon },
  ], [t]);
  const appearanceLabel = t('footer.appearance');

  return (
    <div className={`inline-flex max-w-full ${className}`}>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        role="group"
        aria-label={appearanceLabel}
        className="inline-flex min-h-11 max-w-full items-center gap-1 overflow-hidden rounded-full border border-[#cddbd2] bg-white p-1 shadow-sm dark:border-white/15 dark:bg-white/5"
      >
          {options.map(({ value, label, icon: Icon }) => {
            const selected = themePreference === value;

            return (
              <motion.button
                layout
                key={value}
                type="button"
                title={label}
                aria-label={selected ? `${appearanceLabel}: ${label}` : label}
                aria-pressed={selected}
                onClick={() => setThemePreference(value)}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className={`flex h-9 flex-none items-center justify-center rounded-full text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${selected ? 'gap-1.5 bg-[#173d31] px-3 text-white shadow-sm dark:bg-[#C5A367] dark:text-[#06110d]' : 'w-9 text-[#496057] hover:bg-[#edf3ef] hover:text-primary dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'}`}
              >
                <Icon size={16} aria-hidden="true" />
                <AnimatePresence initial={false}>
                  {selected && (
                    <motion.span
                      key={`${value}-label`}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
      </motion.div>
    </div>
  );
}
