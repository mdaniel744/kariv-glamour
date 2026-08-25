import React, { useState, useEffect } from 'react';
import ProductCardImage from '@/components/shared/ProductCardImage';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { ROLEX_COLLECTIONS, ROLEX_QUICK_FILTERS } from '@/lib/rolexData';
import TrustBar from '@/components/shared/TrustBar';
import { productSlug } from '@/lib/slug';

const BRAND = 'Rolex';

export default function RolexCollectionPage({ slug: slugProp }) {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const slug = slugProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const collection = ROLEX_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useCart();

  useSEO({
    title: collection ? localize(collection, 'description').slice(0, 60) : '',
    description: collection ? localize(collection, 'description') : ''
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (collection) {
          const data = asArray(await dataClient.entities.Products.filter({ brand: BRAND, collection: collection.name }, '-created_date', 50));
          setProducts(data);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!collection) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-light mb-4 text-foreground">{t('collectionPage.notFound')}</h1><LocalizedLink to="/brands/rolex" className="text-sm underline text-primary">{t('collectionPage.returnToBrand', { brand: BRAND })}</LocalizedLink></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-8">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('breadcrumb.home')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands" className="hover:text-foreground">{t('breadcrumb.brands')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands/rolex" className="hover:text-foreground">{BRAND}</LocalizedLink><ChevronRight size={10} />
          <span className="text-foreground">{collection.name}</span>
        </div>
      </div>

      <section className="relative overflow-hidden py-14 md:py-32 bg-secondary border-b border-border">
        <div className="absolute inset-0">
          <img src={collection.image} alt={`${BRAND} ${collection.name}`} className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('collectionPage.collectionLabel', { brand: BRAND })}</span>
            <h1 className="font-display text-3xl md:text-5xl font-light mb-5 text-foreground">{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl text-muted-foreground">{localize(collection, 'description')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 md:mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {ROLEX_QUICK_FILTERS.map((chip, i) => (
            <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground transition-colors hover:border-primary hover:text-primary">{localize(chip, 'label')}</LocalizedLink>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-light text-foreground">{t('collectionPage.watchesTitle', { brand: BRAND, collection: collection.name })}</h2>
              <p className="text-xs mt-1 text-muted-foreground">{t('collectionPage.watchesAvailable', { count: products.length })}</p>
            </div>
            <LocalizedLink to="/brands/rolex" className="text-[10px] tracking-[0.12em] uppercase text-primary hover:opacity-70">{t('collectionPage.allBrand', { brand: BRAND })} →</LocalizedLink>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {products.map(p => {
                const wishlisted = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-card md:mb-4">
                      {p.featuredImage ? (
                        <ProductCardImage src={p.featuredImage} alt={localize(p, 'productTitle')} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.2em] uppercase">{BRAND}</span></div>
                      )}
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-100 transition-opacity bg-black/40 backdrop-blur-sm md:opacity-0 md:group-hover:opacity-100"
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
                        <Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} />
                      </button>
                    </div>
                    <LocalizedLink to={`/product/${productSlug(p)}`}>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{localize(p, 'productTitle')}</h3>
                      <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-muted-foreground">
                        {p.referenceNumber && <span>{t('product.ref')} {p.referenceNumber}</span>}
                        {p.yearOfProduction && <span>· {p.yearOfProduction}</span>}
                      </div>
                      <p className="text-sm font-medium text-foreground">{formatPrice(p.price, p.currency)}</p>
                    </LocalizedLink>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4 text-muted-foreground">{t('collectionPage.noWatches', { brand: BRAND, collection: collection.name })}</p>
              <LocalizedLink to="/brands/rolex" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{t('collectionPage.viewAll', { brand: BRAND })}</LocalizedLink>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}
