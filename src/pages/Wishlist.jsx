import React from 'react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';
import { useCart } from '@/lib/cartContext';
import { useSEO } from '@/hooks/useSEO';
import { Heart, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';

export default function Wishlist() {
  const { t } = useTranslation();
  const { wishlistItems } = useCart();
  useSEO({ title: t('common:seo.wishlist.title'), description: t('common:seo.wishlist.description'), noindex: true });

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Heart size={48} className="text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="font-display text-3xl text-foreground font-light mb-3">{t('pages.wishlist.empty')}</h1>
        <p className="text-sm text-muted-foreground mb-8">{t('pages.wishlist.emptyDesc')}</p>
        <LocalizedLink to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-primary/90 transition-colors">
          {t('pages.wishlist.browseShop')}
        </LocalizedLink>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <LocalizedLink to="/" className="hover:text-foreground">{t('common:home')}</LocalizedLink>
        <ChevronRight size={10} />
        <span className="text-foreground">{t('pages.wishlist.title')}</span>
      </div>

      <div className="mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">{t('pages.wishlist.title')}</span>
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">{t('pages.wishlist.title')}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t('pages.wishlist.count', { count: wishlistItems.length })}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}