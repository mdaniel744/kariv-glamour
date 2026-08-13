import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';
import { ArrowRight, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HERO = {
  eyebrow: 'components.hero.slide1.eyebrow',
  title: [
    'components.hero.slide1.title1',
    'components.hero.slide1.title2',
    'components.hero.slide1.title3',
    'components.hero.slide1.title4',
  ],
  description: 'components.hero.slide1.description',
  cta: 'components.hero.slide1.cta',
  link: '/shop',
  image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=2000&q=80',
};

export default function HeroSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const { localePath } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(localePath(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop'));
  };

  return (
    <section className="relative min-h-[650px] w-full overflow-hidden bg-background md:min-h-[720px]">
      <img src={HERO.image} alt={t(HERO.eyebrow)} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/72 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />

      <div className="relative z-10 mx-auto flex min-h-[650px] max-w-7xl items-center px-6 pb-16 pt-32 md:min-h-[720px] md:px-10 md:pb-20 md:pt-40 lg:px-12">
        <div className="w-full max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-primary md:mb-5">
            <span className="h-px w-8 bg-primary" />
            {t(HERO.eyebrow)}
          </span>

          <h1 className="mb-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight text-white [font-family:'Cormorant_Garamond',_serif] sm:text-5xl md:text-6xl lg:text-7xl">
            {t(HERO.title[0])} {t(HERO.title[1])}<br />
            {t(HERO.title[2])} <span className="italic text-primary">{t(HERO.title[3])}</span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
            {t(HERO.description)}
          </p>

          <form
            onSubmit={submitSearch}
            role="search"
            className="mt-8 flex w-full max-w-2xl items-stretch border border-white/20 bg-black/65 p-1.5 shadow-2xl backdrop-blur-md md:mt-10"
          >
            <label htmlFor="home-watch-search" className="sr-only">{t('components.hero.searchLabel')}</label>
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 md:px-4">
              <Search size={18} className="flex-shrink-0 text-primary" strokeWidth={1.5} />
              <input
                id="home-watch-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t('components.hero.searchPlaceholder')}
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/45 md:py-4"
              />
            </div>
            <button
              type="submit"
              className="flex-shrink-0 bg-primary px-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-primary/90 md:px-7 md:text-[11px]"
            >
              <span className="hidden sm:inline">{t('components.hero.searchCta')}</span>
              <Search size={16} className="sm:hidden" />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="text-[9px] uppercase tracking-[0.18em] text-white/45">{t('components.hero.popularSearches')}</span>
            <LocalizedLink to="/shop?brand=Rolex" className="text-[10px] uppercase tracking-[0.12em] text-white/80 hover:text-primary">Rolex</LocalizedLink>
            <LocalizedLink to="/shop?brand=Omega" className="text-[10px] uppercase tracking-[0.12em] text-white/80 hover:text-primary">Omega</LocalizedLink>
            <LocalizedLink to="/shop?isCertifiedPreOwned=true" className="text-[10px] uppercase tracking-[0.12em] text-white/80 hover:text-primary">{t('components.hero.certified')}</LocalizedLink>
            <LocalizedLink to="/shop?priceMax=10000" className="text-[10px] uppercase tracking-[0.12em] text-white/80 hover:text-primary">{t('components.hero.underTen')}</LocalizedLink>
          </div>

          <LocalizedLink
            to={HERO.link}
            className="mt-7 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:text-primary"
          >
            {t(HERO.cta)}
            <ArrowRight size={13} />
          </LocalizedLink>
        </div>
      </div>
    </section>
  );
}
