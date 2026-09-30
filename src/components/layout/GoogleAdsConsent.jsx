'use client';

import { useEffect, useState } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';

const COPY = {
  en: {
    title: 'Cookie choices',
    description: 'We use essential cookies to run the website. With your permission, optional cookies help us understand visits and measure advertising. You can change your choice in Cookie settings at any time.',
    accept: 'Accept optional cookies',
    reject: 'Reject optional cookies',
    policy: 'Cookie policy',
  },
  de: {
    title: 'Cookie-Auswahl',
    description: 'Notwendige Cookies ermöglichen den Betrieb der Website. Mit Ihrer Einwilligung helfen uns optionale Cookies, Besuche zu verstehen und Werbung zu messen. Ihre Auswahl können Sie jederzeit in den Cookie-Einstellungen ändern.',
    accept: 'Optionale Cookies akzeptieren',
    reject: 'Optionale Cookies ablehnen',
    policy: 'Cookie-Richtlinie',
  },
  cs: {
    title: 'Nastavení cookies',
    description: 'Nezbytné cookies zajišťují fungování webu. S vaším souhlasem nám volitelné cookies pomáhají porozumět návštěvám a měřit reklamu. Volbu můžete kdykoli změnit v nastavení cookies.',
    accept: 'Přijmout volitelné cookies',
    reject: 'Odmítnout volitelné cookies',
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
