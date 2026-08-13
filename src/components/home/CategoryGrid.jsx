import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';
import { useTranslation } from 'react-i18next';

const WATCH_IMAGES = {
  men: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b346ef9ce_generated_77e08c04.png',
  women: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/3615c809c_generated_76b5ac75.png',
  vintage: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/99e2654b4_generated_582b8b21.png',
  newArrivals: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/01b715f36_generated_902f4c1f.png',
  certified: '/brand-assets/rolex/collections/rolex-datejust.png',
  automatic: '/brand-assets/omega/collections/omega-speedmaster-collection.png',
  gold: '/brand-assets/rolex/collections/rolex-day-date.png',
  underTen: '/brand-assets/iwc-schaffhausen/page/iwc-schaffhausen-portugieser-guide.jpg',
};

export default function CategoryGrid() {
  const { t } = useTranslation();
  const categories = [
    { key: 'mens', to: '/shop?gender=Men', image: WATCH_IMAGES.men },
    { key: 'womens', to: '/shop?gender=Women', image: WATCH_IMAGES.women },
    { key: 'certified', to: '/shop?isCertifiedPreOwned=true', image: WATCH_IMAGES.certified },
    { key: 'vintage', to: '/shop?isVintage=true', image: WATCH_IMAGES.vintage },
    { key: 'automatic', to: '/shop?movementType=Automatic', image: WATCH_IMAGES.automatic },
    { key: 'gold', to: '/shop?caseMaterial=Yellow%20Gold', image: WATCH_IMAGES.gold },
    { key: 'newArrivals', to: '/shop?isNewArrival=true', image: WATCH_IMAGES.newArrivals },
    { key: 'underTen', to: '/shop?priceMax=10000', image: WATCH_IMAGES.underTen },
  ];

  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title={t('components.categoryGrid.title')} subtitle={t('components.categoryGrid.subtitle')} linkTo="/shop" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <LocalizedLink
              key={category.key}
              to={category.to}
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
