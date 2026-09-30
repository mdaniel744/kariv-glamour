'use client';

import { useEffect, useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';

const COPY = {
  en: {
    title: 'Advertising cookies',
    description: 'With your permission, we use the Google tag to measure visits and shopping actions. You can change your choice at any time in the footer.',
    accept: 'Allow',
    reject: 'Decline',
    policy: 'Cookie policy',
  },
  de: {
    title: 'Werbe-Cookies',
    description: 'Mit Ihrer Einwilligung nutzen wir das Google-Tag, um Besuche und Einkaufsaktionen zu messen. Ihre Auswahl können Sie jederzeit im Footer ändern.',
    accept: 'Zulassen',
    reject: 'Ablehnen',
    policy: 'Cookie-Richtlinie',
  },
  cs: {
    title: 'Reklamní cookies',
    description: 'S vaším souhlasem používáme značku Google k měření návštěv a nákupních akcí. Svou volbu můžete kdykoli změnit v zápatí.',
    accept: 'Povolit',
    reject: 'Odmítnout',
    policy: 'Zásady cookies',
  },
};

export default function GoogleAdsConsent() {
  const { locale } = useLanguage();
  const copy = COPY[locale] || COPY.en;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.karivGoogleAds?.choice());
    const open = () => setVisible(true);
    window.addEventListener('kariv:open-ads-consent', open);
    return () => window.removeEventListener('kariv:open-ads-consent', open);
  }, []);

  const choose = (allow) => {
    if (allow) {
      window.karivGoogleAds?.grant();
      window.dispatchEvent(new Event('kariv:ads-consent-granted'));
    }
    else window.karivGoogleAds?.deny();
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <section
      role="dialog"
      aria-label={copy.title}
      aria-modal="false"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-border bg-background p-5 text-foreground shadow-2xl sm:inset-x-6"
    >
      <h2 className="text-base font-semibold">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => choose(false)} className="min-h-11 rounded-xl border border-border px-5 text-sm font-medium hover:border-primary">
          {copy.reject}
        </button>
        <button type="button" onClick={() => choose(true)} className="min-h-11 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground">
          {copy.accept}
        </button>
        <LocalizedLink to="/legal/cookie-policy" className="text-sm text-primary underline underline-offset-4">
          {copy.policy}
        </LocalizedLink>
      </div>
    </section>
  );
}
