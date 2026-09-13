import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';
import { ArrowRight, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MediaImage from '@/components/shared/MediaImage';
import { useStorefrontPricing } from '@/lib/currencyContext';

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
};

export default function HeroSection() {
  const { t } = useTranslation();
  const { locale, fromEuro, formatMoney } = useStorefrontPricing();
  const budget = fromEuro(10000);
  const router = useRouter();
  const { localePath } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const submitSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    router.push(localePath(query ? `/shop?search=${encodeURIComponent(query)}` : '/shop'));
  };

  return (
    <section data-site-hero="home" className="relative w-full overflow-hidden border-b border-[#dce5df] bg-[#fbfcfa] text-[#10231d] dark:border-[#263747] dark:bg-[#0d1824] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(201,220,211,0.58),transparent_31%),linear-gradient(135deg,#ffffff_0%,#f8faf7_57%,#edf4ef_100%)] dark:bg-[radial-gradient(circle_at_83%_40%,rgba(98,114,128,0.22),transparent_32%),linear-gradient(135deg,#121e2b_0%,#0d1824_56%,#09121c_100%)]" />

      <div className="relative z-10 mx-auto grid min-w-0 max-w-7xl items-center gap-1 px-4 pb-7 pt-24 sm:gap-6 sm:px-7 sm:pb-12 sm:pt-28 md:min-h-[690px] md:px-10 md:pb-16 md:pt-36 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-8 lg:px-12 lg:pb-20 lg:pt-40">
        <div className="min-w-0 w-full max-w-3xl">
          <span className="mb-5 hidden items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a672e] dark:text-[#d9b56d] sm:inline-flex">
            <span className="h-px w-8 bg-primary dark:bg-[#d9b56d]" />
            {t(HERO.eyebrow)}
          </span>

          <h1 className="mb-5 max-w-full break-words font-display text-[clamp(2rem,10.5vw,2.3rem)] font-semibold leading-[1.04] tracking-[-0.05em] text-primary dark:text-white sm:max-w-3xl sm:text-5xl sm:tracking-[-0.055em] md:mb-6 md:text-[clamp(2.65rem,6.2vw,5.25rem)] md:tracking-[-0.06em]">
            {t(HERO.title[0])} {t(HERO.title[1])}<br />
            {t(HERO.title[2])} <span className="text-[#9b7333]">{t(HERO.title[3])}</span>
          </h1>

          <p className="hidden max-w-xl text-base leading-7 text-[#496057] dark:text-[#d0d8df] md:block md:text-lg md:leading-8">
            {t(HERO.description)}
          </p>

          <form
            onSubmit={submitSearch}
            role="search"
            className="mt-6 flex min-w-0 w-full max-w-full items-stretch overflow-hidden rounded-xl border border-[#b9cbc2] bg-white/90 p-1.5 shadow-[0_18px_55px_rgba(15,62,48,0.12)] backdrop-blur-md dark:border-[#526675] dark:bg-[#111e2a]/90 dark:shadow-[0_18px_55px_rgba(0,0,0,0.24)] sm:max-w-2xl md:mt-10"
          >
            <label htmlFor="home-watch-search" className="sr-only">{t('components.hero.searchLabel')}</label>
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3 md:px-4">
              <Search size={19} className="flex-shrink-0 text-primary dark:text-[#d9b56d]" strokeWidth={1.7} />
              <input
                id="home-watch-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t('components.hero.searchPlaceholder')}
                className="min-w-0 w-full flex-1 bg-transparent py-3 text-base text-foreground outline-none placeholder:text-[#71857c] dark:text-white dark:placeholder:text-[#9eacb7] md:py-4"
              />
            </div>
            <button
              type="submit"
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary px-0 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#174f3f] sm:h-auto sm:w-auto sm:rounded-md sm:px-5 md:px-7"
            >
              <span className="hidden sm:inline">{t('components.hero.searchCta')}</span>
              <Search size={16} className="sm:hidden" />
            </button>
          </form>

          <div className="mt-5 hidden flex-wrap items-center gap-2.5 md:flex">
            <span className="mr-1 text-xs font-medium text-[#60766c] dark:text-[#b9c5cf]">{t('components.hero.popularSearches')}</span>
            <LocalizedLink to="/shop?brand=Rolex" className="rounded-full border border-[#ccd9d2] bg-white/70 px-3 py-1.5 text-xs font-medium text-[#315247] hover:border-primary hover:text-primary dark:border-[#526675] dark:bg-white/5 dark:text-[#d8dfe5] dark:hover:border-white dark:hover:text-white">Rolex</LocalizedLink>
            <LocalizedLink to="/shop?brand=Omega" className="rounded-full border border-[#ccd9d2] bg-white/70 px-3 py-1.5 text-xs font-medium text-[#315247] hover:border-primary hover:text-primary dark:border-[#526675] dark:bg-white/5 dark:text-[#d8dfe5] dark:hover:border-white dark:hover:text-white">Omega</LocalizedLink>
            <LocalizedLink to="/shop?isCertifiedPreOwned=true" className="rounded-full border border-[#ccd9d2] bg-white/70 px-3 py-1.5 text-xs font-medium text-[#315247] hover:border-primary hover:text-primary dark:border-[#526675] dark:bg-white/5 dark:text-[#d8dfe5] dark:hover:border-white dark:hover:text-white">{t('components.hero.certified')}</LocalizedLink>
            {budget != null && <LocalizedLink to={`/shop?priceMax=${budget}`} className="rounded-full border border-[#ccd9d2] bg-white/70 px-3 py-1.5 text-xs font-medium text-[#315247] hover:border-primary hover:text-primary dark:border-[#526675] dark:bg-white/5 dark:text-[#d8dfe5] dark:hover:border-white dark:hover:text-white">{locale === 'cs' ? `Do ${formatMoney(budget)}` : t('components.hero.underTen')}</LocalizedLink>}
          </div>

          <LocalizedLink
            to={HERO.link}
            className="mt-7 hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:text-[#9b7333] dark:text-white dark:hover:text-[#d9b56d] md:inline-flex"
          >
            {t(HERO.cta)}
            <ArrowRight size={13} />
          </LocalizedLink>
        </div>

        <div className="relative mx-auto flex min-h-[200px] w-full max-w-[300px] items-center justify-center overflow-hidden sm:min-h-[360px] sm:max-w-[540px] sm:overflow-visible md:min-h-[460px] lg:min-h-[540px]">
          <div className="absolute inset-x-[8%] inset-y-[12%] rounded-[50%] bg-white/70 shadow-[0_35px_90px_rgba(19,66,52,0.14)] ring-1 ring-[#b99354]/20 dark:bg-white/[0.07] dark:shadow-[0_35px_90px_rgba(0,0,0,0.28)] dark:ring-[#d9b56d]/20 sm:inset-[8%] sm:rounded-full" />
          <MediaImage src="/brand-assets/patek-philippe/collections/patek-philippe-nautilus-collection.png" alt="" aria-hidden="true" width={420} height={420} sizes="(max-width: 1023px) 40vw, 210px" quality={80} className="absolute left-[1%] top-[18%] z-10 hidden h-[44%] w-[44%] -rotate-12 object-contain opacity-75 mix-blend-multiply drop-shadow-[0_24px_24px_rgba(20,45,37,0.18)] dark:mix-blend-normal dark:drop-shadow-[0_24px_24px_rgba(0,0,0,0.34)] sm:block" />
          <MediaImage src="/brand-assets/cartier/collections/cartier-santos-de-cartier.png" alt="" aria-hidden="true" width={420} height={420} sizes="(max-width: 1023px) 36vw, 190px" quality={80} className="absolute bottom-[10%] right-[0%] z-20 hidden h-[40%] w-[40%] rotate-12 object-contain opacity-80 mix-blend-multiply drop-shadow-[0_24px_24px_rgba(20,45,37,0.18)] dark:mix-blend-normal dark:drop-shadow-[0_24px_24px_rgba(0,0,0,0.34)] sm:block" />
          <MediaImage src="/brand-assets/rolex/collections/rolex-submariner.png" alt="Rolex Submariner watch" width={720} height={720} sizes="(max-width: 639px) 180px, (max-width: 1023px) 70vw, 380px" quality={88} priority className="relative z-30 h-[190px] w-[68%] max-w-[190px] object-contain mix-blend-multiply drop-shadow-[0_28px_26px_rgba(20,45,37,0.24)] dark:mix-blend-normal dark:drop-shadow-[0_28px_26px_rgba(0,0,0,0.38)] sm:h-[340px] sm:w-[72%] sm:max-w-none md:h-[440px] lg:h-[520px]" />
        </div>
      </div>
    </section>
  );
}
