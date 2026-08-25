import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import MediaImage from '@/components/shared/MediaImage';

export default function BrandHero({
  brand,
  displayBrand = brand,
  image,
  imageAlt,
  shopTo,
  collectionsHref = '#collections',
  links = [],
  imageClassName = '',
}) {
  const { t } = useTranslation('brandComponents');

  return (
    <section data-site-hero="brand" className="relative overflow-hidden border-b border-[#d9e2dc] bg-[#fbfcfa] text-[#10231d] dark:border-[#263747] dark:bg-[#0d1824] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_83%_40%,rgba(203,221,212,0.52),transparent_31%),linear-gradient(135deg,#ffffff_0%,#f7faf7_55%,#eef4f0_100%)] dark:bg-[radial-gradient(circle_at_83%_40%,rgba(98,114,128,0.22),transparent_32%),linear-gradient(135deg,#121e2b_0%,#0d1824_56%,#09121c_100%)]" />
      <div className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full border border-[#b99354]/20 md:h-[34rem] md:w-[34rem]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-7 sm:px-7 md:px-10 md:pb-16 md:pt-9 lg:px-12">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#52685f] dark:text-[#b9c5cf]">
          <LocalizedLink to="/" className="transition-colors hover:text-primary dark:hover:text-white">{t('breadcrumb.home')}</LocalizedLink>
          <ChevronRight size={13} aria-hidden="true" />
          <LocalizedLink to="/brands" className="transition-colors hover:text-primary dark:hover:text-white">{t('breadcrumb.brands')}</LocalizedLink>
          <ChevronRight size={13} aria-hidden="true" />
          <span className="text-[#173c31] dark:text-white">{brand}</span>
        </div>

        <div className="grid items-center gap-8 py-9 md:py-12 lg:min-h-[600px] lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.96fr)] lg:gap-10 lg:py-14">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative z-10 max-w-2xl">
            <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.2em] text-[#8a672e] dark:text-[#d9b56d]">{t('hero.boutique', { brand })}</span>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-primary dark:text-white">
              {t('hero.title', { brand })}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#496057] dark:text-[#d0d8df] sm:text-lg sm:leading-8">
              {t('hero.description', { brand })}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LocalizedLink to={shopTo} className="inline-flex min-h-12 items-center justify-center bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-[#174f3f] dark:hover:bg-[#dce8ef]">
                {t('hero.shopCTA', { brand: displayBrand })}
              </LocalizedLink>
              <a href={collectionsHref} className="inline-flex min-h-12 items-center justify-center border border-[#8fa89e] bg-white/70 px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-colors hover:border-primary hover:bg-white dark:border-[#687b8a] dark:bg-white/5 dark:text-white dark:hover:border-white dark:hover:bg-white/10">
                {t('hero.discoverCollections', { brand: displayBrand })}
              </a>
            </div>

            {links.length > 0 && (
              <nav aria-label={`${brand} page sections`} className="mt-8 flex flex-wrap gap-2.5">
                {links.map((link) => {
                  const className = 'inline-flex min-h-9 items-center rounded-full border border-[#cad8d1] bg-white/75 px-4 py-2 text-xs font-medium text-[#315247] transition-colors hover:border-primary hover:text-primary dark:border-[#526675] dark:bg-white/5 dark:text-[#d8dfe5] dark:hover:border-white dark:hover:text-white';
                  return link.to ? (
                    <LocalizedLink key={`${link.label}-${link.to}`} to={link.to} className={className}>{link.label}</LocalizedLink>
                  ) : (
                    <a key={`${link.label}-${link.href}`} href={link.href} className={className}>{link.label}</a>
                  );
                })}
              </nav>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.08 }} className="relative mx-auto flex min-h-[310px] w-full max-w-[500px] items-center justify-center sm:min-h-[400px] lg:min-h-[520px]">
            <div className="absolute inset-[7%] rounded-full bg-white/65 shadow-[0_35px_90px_rgba(19,66,52,0.12)] ring-1 ring-[#b99354]/15 dark:bg-white/8 dark:shadow-[0_35px_90px_rgba(0,0,0,0.26)] dark:ring-[#d9b56d]/20" />
            <MediaImage
              src={image}
              alt={imageAlt || `${brand} watch`}
              width={700}
              height={700}
              sizes="(max-width: 1023px) min(100vw, 500px), 46vw"
              quality={88}
              priority
              className={`relative z-10 h-[300px] w-full object-contain mix-blend-multiply drop-shadow-[0_30px_32px_rgba(20,45,37,0.24)] dark:mix-blend-normal dark:drop-shadow-[0_30px_34px_rgba(0,0,0,0.4)] sm:h-[390px] lg:h-[500px] ${imageClassName}`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
