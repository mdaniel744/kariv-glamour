import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/shared/SectionHeading';

const POPULAR_MODELS = [
  { brand: 'Rolex', model: 'Datejust', collection: 'Datejust', image: '/brand-assets/rolex/collections/rolex-datejust.png' },
  { brand: 'Rolex', model: 'Submariner', collection: 'Submariner', image: '/brand-assets/rolex/collections/rolex-submariner.png' },
  { brand: 'Rolex', model: 'Cosmograph Daytona', collection: 'Cosmograph Daytona', image: '/brand-assets/rolex/collections/rolex-cosmograph-daytona.png' },
  { brand: 'Omega', model: 'Speedmaster', collection: 'Speedmaster', image: '/brand-assets/omega/collections/omega-speedmaster-collection.png' },
  { brand: 'Audemars Piguet', model: 'Royal Oak', collection: 'Royal Oak', image: '/brand-assets/audemars-piguet/collections/audemars-piguet-royal-oak-collection.png' },
  { brand: 'Patek Philippe', model: 'Nautilus', collection: 'Nautilus', image: '/brand-assets/patek-philippe/collections/patek-philippe-nautilus-collection.png' },
  { brand: 'Cartier', model: 'Santos de Cartier', collection: 'Santos de Cartier', image: '/brand-assets/cartier/collections/cartier-santos-de-cartier.png' },
  { brand: 'Tudor', model: 'Black Bay', collection: 'Black Bay', image: '/brand-assets/tudor/collections/tudor-black-bay-collection.png' },
];

export default function PopularModels() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border bg-secondary/55 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          title={t('components.popularModels.title')}
          subtitle={t('components.popularModels.subtitle')}
          linkTo="/shop"
        />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {POPULAR_MODELS.map((item) => (
            <LocalizedLink
              key={`${item.brand}-${item.model}`}
              to={`/shop?brand=${encodeURIComponent(item.brand)}&collection=${encodeURIComponent(item.collection)}`}
              className="group relative overflow-hidden border border-border bg-background transition-colors hover:border-primary/50"
            >
              <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_center,hsl(var(--muted))_0%,hsl(var(--background))_68%)]">
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.model}`}
                  className="h-full w-full scale-[1.12] object-contain transition-transform duration-700 group-hover:scale-[1.18]"
                />
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-border bg-background/75 text-muted-foreground opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 group-hover:text-primary">
                  <ArrowUpRight size={14} />
                </span>
              </div>
              <div className="border-t border-border px-4 py-4 sm:px-5 sm:py-5">
                <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-primary sm:text-[10px]">{item.brand}</p>
                <h3 className="font-display text-base text-foreground transition-colors group-hover:text-primary sm:text-xl">{item.model}</h3>
                <p className="mt-2 hidden text-[9px] uppercase tracking-[0.15em] text-muted-foreground sm:block">{t('components.popularModels.discover')}</p>
              </div>
            </LocalizedLink>
          ))}
        </div>
      </div>
    </section>
  );
}
