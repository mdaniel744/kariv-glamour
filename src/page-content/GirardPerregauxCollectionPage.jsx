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
import { GP_COLLECTIONS, GP_QUICK_FILTERS } from '@/lib/girardPerregauxData';
import TrustBar from '@/components/shared/TrustBar';
import { productSlug } from '@/lib/slug';

const BRAND = 'Girard-Perregaux';

export default function GirardPerregauxCollectionPage({ slug: slugProp }) {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const slug = slugProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const collection = GP_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isInWishlist } = useCart();

  useSEO({
    title: collection ? `${BRAND} ${collection.name}` : '',
    description: collection ? localize(collection, 'shortDescription') : ''
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (collection) {
          const data = asArray(await base44.entities.Products.filter({ brand: BRAND, collection: collection.name }, '-created_date', 50));
          setProducts(data);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!collection) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-bold mb-4 text-foreground">{t('collectionPage.notFound')}</h1><LocalizedLink to="/brands/girard-perregaux" className="text-sm underline text-primary">{t('collectionPage.returnToBrand', { brand: BRAND })}</LocalizedLink></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('breadcrumb.home')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands" className="hover:text-foreground">{t('breadcrumb.brands')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands/girard-perregaux" className="hover:text-foreground">{BRAND}</LocalizedLink><ChevronRight size={10} />
          <span className="text-foreground">{collection.name}</span>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 md:py-32 bg-foreground">
        {collection.image && (
          <div className="absolute inset-0">
            <img src={collection.image} alt={`${BRAND} ${collection.name}`} className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/30" />
          </div>
        )}
        {!collection.image && <div className="absolute inset-0 bg-secondary opacity-30" />}
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('collectionPage.collectionLabel', { brand: BRAND })}</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 text-background">{BRAND} {collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl text-background/70">{localize(collection, 'shortDescription')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {GP_QUICK_FILTERS.map((chip, i) => <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors">{localize(chip, 'label')}</LocalizedLink>)}
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">{BRAND} {collection.name}</h2>
              <p className="text-xs mt-1 text-muted-foreground">{t('collectionPage.watchesAvailable', { count: products.length })}</p>
            </div>
            <LocalizedLink to="/brands/girard-perregaux" className="text-[10px] tracking-[0.12em] uppercase text-primary hover:opacity-70">{t('collectionPage.allBrand', { brand: BRAND })} &rarr;</LocalizedLink>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(p => {
                const w = isInWishlist(p.id);
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
                    <LocalizedLink to={`/product/${productSlug(p)}`}>
                      <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
                        {p.featuredImage ? <img src={p.featuredImage} alt={localize(p, 'productTitle')} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground/40"><span className="text-xs tracking-[0.3em] uppercase">{BRAND}</span></div>}
                        <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Heart size={14} className={w ? 'fill-primary text-primary' : 'text-white'} /></button>
                      </div>
                      <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{p.brand}</p>
                      <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{localize(p, 'productTitle')}</h3>
                      <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">{p.referenceNumber && <span>{t('product.ref')} {p.referenceNumber}</span>}{p.yearOfProduction && <span>· {p.yearOfProduction}</span>}</div>
                      <p className="text-sm font-medium text-foreground">{formatPrice(p.price, p.currency)}</p>
                    </LocalizedLink>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4 text-muted-foreground">{t('collectionPage.noWatches', { brand: BRAND, collection: collection.name })}</p>
              <LocalizedLink to="/brands/girard-perregaux" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{t('collectionPage.viewAll', { brand: BRAND })}</LocalizedLink>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}
