import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/shared/ProductCard';
import LocalizedLink from '@/components/LocalizedLink';
import { dataClient } from '@/lib/dataClient';
import { asArray } from '@/lib/base44Data';
import { useTranslation } from 'react-i18next';
import { useLocalizedField } from '@/lib/localize';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { CARTIER_COLLECTIONS, CARTIER_QUICK_FILTERS } from '@/lib/cartierData';
import TrustBar from '@/components/shared/TrustBar';

const BRAND = 'Cartier';

export default function CartierCollectionPage({ slug: slugProp }) {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const slug = slugProp || (typeof window !== 'undefined' ? window.location.pathname.split('/').filter(Boolean).pop() : '');
  const collection = CARTIER_COLLECTIONS.find(c => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: collection ? localize(collection, 'shortDescription').slice(0, 60) : '',
    description: collection ? localize(collection, 'shortDescription') : ''
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
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-light mb-4 text-foreground">{t('collectionPage.notFound')}</h1><LocalizedLink to="/brands/cartier" className="text-sm underline text-primary">{t('collectionPage.returnToBrand', { brand: BRAND })}</LocalizedLink></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('breadcrumb.home')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands" className="hover:text-foreground">{t('breadcrumb.brands')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands/cartier" className="hover:text-foreground">{BRAND}</LocalizedLink><ChevronRight size={10} />
          <span className="text-foreground">{collection.name}</span>
        </div>
      </div>

      <section className="relative overflow-hidden py-20 md:py-32 bg-foreground">
        <div className="absolute inset-0">
          {collection.image && <img src={collection.image} alt={`${BRAND} ${collection.name}`} className="w-full h-full object-cover opacity-25" />}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground to-foreground/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">{t('collectionPage.collectionLabel', { brand: BRAND })}</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-5 text-background">{collection.name}</h1>
            <p className="text-sm leading-relaxed max-w-xl text-background/70">{localize(collection, 'shortDescription')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {CARTIER_QUICK_FILTERS.map((chip, i) => <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground transition-colors hover:border-primary hover:text-primary">{localize(chip, 'label')}</LocalizedLink>)}
        </div>
      </div>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl font-light text-foreground">{t('collectionPage.watchesTitle', { brand: BRAND, collection: collection.name })}</h2>
              <p className="text-xs mt-1 text-muted-foreground">{t('collectionPage.watchesAvailable', { count: products.length })}</p>
            </div>
            <LocalizedLink to="/brands/cartier" className="text-[10px] tracking-[0.12em] uppercase text-primary hover:opacity-70">{t('collectionPage.allBrand', { brand: BRAND })} →</LocalizedLink>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm mb-4 text-muted-foreground">{t('collectionPage.noWatches', { brand: BRAND, collection: collection.name })}</p>
              <LocalizedLink to="/brands/cartier" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{t('collectionPage.viewAll', { brand: BRAND })}</LocalizedLink>
            </div>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}
