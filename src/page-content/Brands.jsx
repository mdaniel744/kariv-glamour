import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { BRAND_DATA, BRAND_TILE_IMAGES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function Brands({ initialBrands = [] }) {
  const { t } = useTranslation();
  const { localize } = useLocalizedField();
  const [brands, setBrands] = useState(initialBrands);

  useEffect(() => {
    if (initialBrands.length > 0) return;
    dataClient.entities.Brands.list('-created_date', 50).then(data => setBrands(asArray(data))).catch(console.error);
  }, [initialBrands]);

  const allBrands = BRAND_DATA.map(bd => {
    const dbBrand = brands.find(b => b.slug === bd.slug);
    return { ...bd, ...dbBrand };
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">{t('pages.brands.breadcrumb')}</span>
      </div>

      <div className="mb-14">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">{t('pages.brands.eyebrow')}</span>
        <h1 className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight">{t('pages.brands.title')}</h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-xl">
          {t('pages.brands.subtitle')}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allBrands.map((brand, i) => (
          <motion.div
            key={brand.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <LocalizedLink to={`/brands/${brand.slug}`} className="group block h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-foreground/5">
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary/80 via-card to-secondary">
                {(BRAND_TILE_IMAGES[brand.slug] || brand.heroImage) ? (
                  <img
                    src={BRAND_TILE_IMAGES[brand.slug] || brand.heroImage}
                    alt={`${brand.name} watch`}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-contain p-5 drop-shadow-[0_22px_24px_rgba(0,0,0,0.18)] transition-transform duration-700 ease-out group-hover:scale-110 sm:p-7"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-3xl text-muted-foreground/30 font-light tracking-[0.1em]">{brand.name}</span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-10 bottom-4 h-8 rounded-full bg-foreground/10 blur-xl transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h2 className="font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">{brand.name}</h2>
                {brand.shortDescription && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{localize(brand, 'shortDescription')}</p>
                )}
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase text-primary mt-4 group-hover:gap-3 transition-all">
                  {t('pages.brands.exploreCollection')} <ArrowRight size={12} />
                </span>
              </div>
            </LocalizedLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
