import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useTranslation } from 'react-i18next';
import { buildHomeShopHref, HOME_CATEGORY_LINKS } from '@/lib/homeShopLinks';
import MediaImage from '@/components/shared/MediaImage';
import { useStorefrontPricing } from '@/lib/currencyContext';

export default function CategoryGrid() {
  const { t } = useTranslation();
  const { locale, fromEuro, formatMoney } = useStorefrontPricing();
  const budget = fromEuro(10000);
  const categoryTitle = (category) => category.key === 'underTen' && locale === 'cs' ? `Do ${formatMoney(budget)}` : t(`components.categoryGrid.${category.key}.title`);

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title={t('components.categoryGrid.title')} subtitle={t('components.categoryGrid.subtitle')} linkTo="/shop" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {HOME_CATEGORY_LINKS.filter((category) => category.key !== 'underTen' || budget != null).map((category) => (
            <LocalizedLink
              key={category.key}
              to={buildHomeShopHref(category.key === 'underTen' ? { priceMax: budget } : category.query)}
              className="group relative aspect-[4/3] overflow-hidden border border-border bg-card sm:aspect-[5/4]"
            >
              <MediaImage
                src={category.image}
                alt={categoryTitle(category)}
                fill
                sizes="(max-width: 639px) calc(50vw - 1.5rem), (max-width: 1023px) calc(25vw - 1.5rem), 280px"
                quality={82}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                <div>
                  <h3 className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">{categoryTitle(category)}</h3>
                  <p className="mt-1 hidden text-xs font-medium tracking-wide text-white/80 sm:block">{t(`components.categoryGrid.${category.key}.subtitle`)}</p>
                </div>
                <ArrowUpRight size={15} className="flex-shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
