import React from 'react';
import { useLanguage } from '@/lib/languageContext';

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, supportedLocales } = useLanguage();

  return (
    <div className={`flex items-center gap-0.5 text-[10px] tracking-[0.12em] uppercase font-medium ${className}`}>
      {supportedLocales.map((lng, i) => (
        <React.Fragment key={lng}>
          {i > 0 && <span className="text-muted-foreground/40 mx-0.5">|</span>}
          <button
            onClick={() => setLocale(lng)}
            className={`transition-colors ${locale === lng ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {lng.toUpperCase()}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}