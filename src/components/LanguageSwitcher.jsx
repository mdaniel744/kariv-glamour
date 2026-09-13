import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';

const LANGUAGE_OPTIONS = {
  de: { label: 'Deutsch' },
  en: { label: 'English' },
  cs: { label: 'Čeština' },
};

function FlagIcon({ locale, className = '' }) {
  if (locale === 'cs') {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 60 36" className={`overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] ${className}`}>
        <rect width="60" height="18" fill="#fff" />
        <rect width="60" height="18" y="18" fill="#D7141A" />
        <path d="M0 0 30 18 0 36Z" fill="#11457E" />
      </svg>
    );
  }
  if (locale === 'en') {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 60 36" className={`overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] ${className}`}>
        <rect width="60" height="36" fill="#012169" />
        <path d="M0 0 60 36M60 0 0 36" stroke="#fff" strokeWidth="7" />
        <path d="M0 0 60 36M60 0 0 36" stroke="#C8102E" strokeWidth="3" />
        <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="11" />
        <path d="M30 0v36M0 18h60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 60 36" className={`overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] ${className}`}>
      <rect width="60" height="12" y="0" fill="#000" />
      <rect width="60" height="12" y="12" fill="#DD0000" />
      <rect width="60" height="12" y="24" fill="#FFCE00" />
    </svg>
  );
}

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, supportedLocales } = useLanguage();
  const [open, setOpen] = useState(false);
  const switcherRef = useRef(null);
  const switcherLabel = { de: 'Sprache ändern', en: 'Change language', cs: 'Změnit jazyk' }[locale];

  useEffect(() => {
    if (!open) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!switcherRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const selectLanguage = (language) => {
    setOpen(false);
    if (language !== locale) setLocale(language);
  };

  return (
    <div ref={switcherRef} className={`relative font-body ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={switcherLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-2 text-foreground shadow-sm transition-colors hover:border-primary/60 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <FlagIcon locale={locale} className="h-4 w-6" />
        <ChevronDown size={12} strokeWidth={2} className={`text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={switcherLabel}
          className="absolute left-0 z-[70] mt-2 min-w-[160px] overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-xl md:left-auto md:right-0"
        >
          {supportedLocales.map((language) => {
            const option = LANGUAGE_OPTIONS[language] || { label: language.toUpperCase() };
            const selected = locale === language;

            return (
              <button
                key={language}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => selectLanguage(language)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${selected ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'}`}
              >
                <FlagIcon locale={language} className="h-4 w-6 flex-none" />
                <span className="flex-1">{option.label}</span>
                {selected && <Check size={15} strokeWidth={2.5} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
