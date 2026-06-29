import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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
        <h1 className="font-display text-3xl text-foreground font-light mb-3">Ihre Wunschliste ist leer</h1>
        <p className="text-sm text-muted-foreground mb-8">Speichern Sie Ihre Lieblingsuhren für später.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-primary/90 transition-colors">
          Kollektion entdecken
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Start</Link>
        <ChevronRight size={10} />
        <span className="text-foreground">Wunschliste</span>
      </div>

      <div className="mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">Gespeichert</span>
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">Ihre Wunschliste</h1>
        <p className="text-sm text-muted-foreground mt-1">{wishlistItems.length} Artikel</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}