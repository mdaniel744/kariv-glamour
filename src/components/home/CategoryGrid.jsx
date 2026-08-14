import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useTranslation } from 'react-i18next';
import { buildHomeShopHref, HOME_CATEGORY_LINKS } from '@/lib/homeShopLinks';

export default function CategoryGrid() {
  const { t } = useTranslation();

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title={t('components.categoryGrid.title')} subtitle={t('components.categoryGrid.subtitle')} linkTo="/shop" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {HOME_CATEGORY_LINKS.map((category) => (
            <LocalizedLink
              key={category.key}
              to={buildHomeShopHref(category.query)}
              className="group relative aspect-[4/3] overflow-hidden border border-border bg-card sm:aspect-[5/4]"
            >
              <img
                src={category.image}
                alt={t(`components.categoryGrid.${category.key}.title`)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 sm:p-5">
                <div>
                  <h3 className="font-display text-base leading-tight text-white sm:text-xl">{t(`components.categoryGrid.${category.key}.title`)}</h3>
                  <p className="mt-1 hidden text-[9px] uppercase tracking-[0.14em] text-white/60 sm:block">{t(`components.categoryGrid.${category.key}.subtitle`)}</p>
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
