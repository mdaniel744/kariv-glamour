import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { PATEK_SEO_PAGES, PATEK_QUICK_FILTERS } from '@/lib/patekData';
import TrustBar from '@/components/shared/TrustBar';
import { productSlug } from '@/lib/slug';

const BRAND = 'Patek Philippe';

function SeoProductCard({ product }) {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
        {product.featuredImage ? (
          <img src={product.featuredImage} alt={localize(product, 'productTitle')} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">{BRAND}</span></div>
        )}
        <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
          <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
        </button>
      </div>
      <LocalizedLink to={`/product/${productSlug(product)}`}>
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{product.brand}</p>
        <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{localize(product, 'productTitle')}</h3>
        <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">
          {product.referenceNumber && <span>{t('product.ref')} {product.referenceNumber}</span>}
          {product.yearOfProduction && <span>· {product.yearOfProduction}</span>}
        </div>
        <p className="text-sm font-medium text-foreground">{formatPrice(product.price, product.currency)}</p>
      </LocalizedLink>
    </motion.div>
  );
}

export default function PatekPhilippeSeoLanding({ slug }) {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const pageData = PATEK_SEO_PAGES[slug];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({ title: pageData ? localize(pageData, 'title') : '', description: pageData ? localize(pageData, 'description') : '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { brand: BRAND, ...(pageData?.collectionFilter || {}) };
        const data = asArray(await base44.entities.Products.filter(query, '-created_date', 50));
        setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    if (pageData) load();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!pageData) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-light mb-4 text-foreground">{t('seoLanding.pageNotFound')}</h1><LocalizedLink to="/brands/patek-philippe" className="text-sm underline text-primary">{t('seoLanding.returnToBrand', { brand: BRAND })}</LocalizedLink></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('breadcrumb.home')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands" className="hover:text-foreground">{t('breadcrumb.brands')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands/patek-philippe" className="hover:text-foreground">{BRAND}</LocalizedLink><ChevronRight size={10} />
          <span className="text-foreground">{localize(pageData, 'h1')}</span>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">{t('seoLanding.boutique', { brand: BRAND })}</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-6 text-foreground">{localize(pageData, 'h1')}</h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-muted-foreground">{localize(pageData, 'intro')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {PATEK_QUICK_FILTERS.map((chip, i) => (
            <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground transition-colors hover:border-primary hover:text-primary">{chip.label}</LocalizedLink>
          ))}
        </div>
      </div>

      {!pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-light mb-8 text-center text-foreground">{t('seoLanding.availableWatches', { brand: BRAND })}</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{products.map(p => <SeoProductCard key={p.id} product={p} />)}</div>
            ) : (
              <div className="text-center py-16"><p className="text-sm mb-4 text-muted-foreground">{t('seoLanding.noWatches', { brand: BRAND })}</p><LocalizedLink to="/brands/patek-philippe" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{t('seoLanding.viewAll', { brand: BRAND })}</LocalizedLink></div>
            )}
          </div>
        </section>
      )}

      {pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>{t('seoLanding.guideText1', { brand: BRAND })}</p>
              <p>{t('seoLanding.guideText2', { brand: BRAND })}</p>
              <p>{t('seoLanding.guideText3', { brand: BRAND })}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <LocalizedLink to="/brands/patek-philippe" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90 bg-primary text-primary-foreground">{t('seoLanding.shopWatches', { brand: BRAND })}</LocalizedLink>
              <LocalizedLink to="/patek-philippe-gebraucht-kaufen" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-secondary border-primary text-primary">{t('seoLanding.preOwned', { brand: BRAND })}</LocalizedLink>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-secondary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light mb-6 text-foreground">{t('seoLanding.exploreFullCollection', { brand: BRAND })}</h2>
          <LocalizedLink to="/brands/patek-philippe" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90 bg-primary text-primary-foreground">{t('seoLanding.visitBoutique', { brand: BRAND })}</LocalizedLink>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}