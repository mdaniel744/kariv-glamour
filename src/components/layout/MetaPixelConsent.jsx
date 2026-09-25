'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';

const PIXEL_ID = '1084417767682071';
const CONSENT_KEY = 'kariv-meta-marketing-consent-v1';
export const COOKIE_SETTINGS_EVENT = 'kariv:open-cookie-settings';

const COPY = {
  en: {
    title: 'Marketing cookies',
    description: 'With your permission, we use the Meta Pixel to measure visits from our advertising. You can change your choice at any time.',
    accept: 'Allow marketing',
    decline: 'Decline',
    policy: 'Cookie Policy',
  },
  de: {
    title: 'Marketing-Cookies',
    description: 'Mit Ihrer Einwilligung nutzen wir das Meta-Pixel, um Besuche über unsere Werbung zu messen. Sie können Ihre Auswahl jederzeit ändern.',
    accept: 'Marketing erlauben',
    decline: 'Ablehnen',
    policy: 'Cookie-Richtlinie',
  },
  cs: {
    title: 'Marketingové soubory cookie',
    description: 'S vaším souhlasem používáme Meta Pixel k měření návštěv z našich reklam. Svou volbu můžete kdykoli změnit.',
    accept: 'Povolit marketing',
    decline: 'Odmítnout',
    policy: 'Zásady cookies',
  },
};

export const COOKIE_SETTINGS_LABEL = {
  en: 'Cookie settings',
  de: 'Cookie-Einstellungen',
  cs: 'Nastavení cookies',
};

let pixelInitialized = false;

function initializePixel() {
  if (pixelInitialized || window.__karivMetaPixelInitialized) {
    pixelInitialized = true;
    return;
  }

  // Meta's standard queue lets PageView be sent even while its script loads asynchronously.
  if (!window.fbq) {
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
      else fbq.queue.push(args);
    };
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  window.fbq('init', PIXEL_ID);
  window.__karivMetaPixelInitialized = true;
  pixelInitialized = true;
}

export default function MetaPixelConsent() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const copy = COPY[locale] || COPY.en;
  const [choice, setChoice] = useState(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === 'accepted' || saved === 'declined') setChoice(saved);
    } catch {
      // Visitors who block storage can still make a choice for this page load.
    }
    setReady(true);

    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!ready || choice !== 'accepted') return;
    initializePixel();
    if (window.__karivMetaPixelTrackedPath !== pathname) {
      window.fbq('track', 'PageView');
      window.__karivMetaPixelTrackedPath = pathname;
    }
  }, [ready, choice, pathname]);

  const saveChoice = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // The current page still respects the visitor's choice.
    }
    setSettingsOpen(false);
    setChoice(value);

    // Unload Meta's script after withdrawal so no further events can be emitted.
    if (value === 'declined' && choice === 'accepted') {
      window.location.reload();
    }
  };

  if (!ready || (choice !== null && !settingsOpen)) return null;

  return (
    <section
      aria-label={copy.title}
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-2xl border border-[#dce5df] bg-[#fbfcfa] p-5 text-[#213d34] shadow-2xl dark:border-[#34485b] dark:bg-[#101b2b] dark:text-white sm:bottom-6 sm:p-6"
    >
      <h2 className="text-base font-semibold">{copy.title}</h2>
      <p className="mt-2 text-sm leading-relaxed">{copy.description}{' '}
        <LocalizedLink to="/legal/cookie-policy" className="underline underline-offset-2">{copy.policy}</LocalizedLink>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => saveChoice('declined')} className="rounded-full border border-current px-5 py-2 text-sm font-semibold">
          {copy.decline}
        </button>
        <button type="button" onClick={() => saveChoice('accepted')} className="rounded-full bg-[#164e47] px-5 py-2 text-sm font-semibold text-white dark:bg-[#d3ae67] dark:text-[#101b2b]">
          {copy.accept}
        </button>
      </div>
    </section>
  );
}
