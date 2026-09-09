'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import ProductCard from '@/components/shared/ProductCard';

export default function RelatedProducts({ product, products = [] }) {
  const { t } = useTranslation();
  if (!products.length) return null;
  const brandSlug = product.brand?.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="border-t border-border py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-2xl text-foreground font-light">{t('pages.productDetail.moreFrom')} {product.brand}</h2>
          <LocalizedLink to={`/brands/${brandSlug}`} className="text-[11px] tracking-[0.15em] uppercase text-primary hover:text-foreground transition-colors">
            {t('pages.productDetail.viewAll')} {product.brand} →
          </LocalizedLink>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((item) => <ProductCard key={item.id} product={item} />)}
        </div>
      </div>
    </div>
  );
}
