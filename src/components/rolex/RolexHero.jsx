import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ROLEX_HERO_IMAGE, ROLEX_LOGO } from '@/lib/rolexData';

const BRAND = 'Rolex';

export default function RolexHero() {
  const { t } = useTranslation('brandComponents');
  const anchorLinks = [
    { label: t('hero.anchorCollections'), href: '#rolex-collections' },
    { label: t('hero.anchorNewArrivals'), href: '#rolex-products' },
    { label: t('hero.anchorPreOwned', { brand: BRAND }), href: '/rolex-gebraucht-kaufen' },
    { label: t('hero.anchorBuyingGuide', { brand: BRAND }), href: '/welche-rolex-kaufen' },
    { label: t('hero.anchorMaintenance'), href: '#rolex-maintenance' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#d8cbb2] bg-[#f8f5ed] text-[#063528]">
      <div className="pointer-events-none absolute inset-0">
        <img src={ROLEX_HERO_IMAGE} alt="" aria-hidden="true" className="h-full w-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,245,237,0.48)_0%,rgba(248,245,237,0.88)_54%,#f8f5ed_100%)]" />
      </div>

      <div className="relative flex min-h-[620px] flex-col px-4 py-6 sm:px-6 md:min-h-[700px] md:px-12 md:py-10 lg:px-20">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#4f6b61]">
          <LocalizedLink to="/" className="transition-colors hover:text-[#063528]">{t('breadcrumb.home')}</LocalizedLink>
          <ChevronRight size={10} />
          <LocalizedLink to="/brands" className="transition-colors hover:text-[#063528]">{t('breadcrumb.brands')}</LocalizedLink>
          <ChevronRight size={10} />
          <span className="text-[#063528]">{BRAND}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center py-14 text-center md:py-20"
        >
          <span className="mb-7 block text-[10px] uppercase tracking-[0.34em] text-[#a37e2c]">{t('hero.boutique', { brand: BRAND })}</span>
          <h1 className="sr-only">{t('hero.title', { brand: BRAND })}</h1>
          <img
            src={ROLEX_LOGO}
            alt={BRAND}
            className="h-auto w-[min(82vw,560px)] drop-shadow-[0_20px_35px_rgba(6,53,40,0.16)]"
          />
          <p className="mt-8 max-w-2xl text-sm leading-7 text-[#2f4d43] md:text-base md:leading-8">{t('hero.description', { brand: BRAND })}</p>

          <div className="mt-9 flex w-full max-w-xl flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#rolex-products" className="inline-flex min-h-12 items-center justify-center bg-[#063528] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90">{t('hero.shopCTA', { brand: BRAND })}</a>
            <a href="#rolex-collections" className="inline-flex min-h-12 items-center justify-center border border-[#a37e2c]/60 px-7 py-3 text-[11px] font-medium uppercase tracking-[0.15em] text-[#063528] transition-colors hover:border-[#063528] hover:bg-white/35">{t('hero.discoverCollections', { brand: BRAND })}</a>
          </div>
        </motion.div>

        <nav aria-label="Rolex page sections" className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:justify-center sm:px-0">
          {anchorLinks.map((link, i) => (
            <a key={i} href={link.href} className="whitespace-nowrap text-[10px] uppercase tracking-[0.12em] text-[#0b4d3c] transition-opacity hover:opacity-70">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
