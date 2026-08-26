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
import { CARTIER_SEO_PAGES, CARTIER_QUICK_FILTERS, CARTIER_LOGO } from '@/lib/cartierData';
import TrustBar from '@/components/shared/TrustBar';
import SeoPillRail from '@/components/shared/SeoPillRail';

const BRAND = 'Cartier';

function SeoProductCard({ product }) {
  return <ProductCard product={product} />;
}

export default function CartierSeoLanding({ slug }) {
  const { t } = useTranslation('brandComponents');
  const { localize } = useLocalizedField();
  const pageData = CARTIER_SEO_PAGES[slug];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({ title: pageData ? localize(pageData, 'title') : '', description: pageData ? localize(pageData, 'description') : '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { brand: BRAND, ...(pageData?.filter || {}) };
        const data = asArray(await dataClient.entities.Products.filter(query, '-created_date', 50));
        setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    if (pageData) load();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!pageData) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-light mb-4 text-foreground">{t('seoLanding.pageNotFound')}</h1><LocalizedLink to="/brands/cartier" className="text-sm underline text-primary">{t('seoLanding.returnToBrand', { brand: BRAND })}</LocalizedLink></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{t('breadcrumb.home')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands" className="hover:text-foreground">{t('breadcrumb.brands')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands/cartier" className="hover:text-foreground">{BRAND}</LocalizedLink><ChevronRight size={10} />
          <span className="text-foreground">{localize(pageData, 'h1')}</span>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={CARTIER_LOGO} alt={BRAND} className="h-9 w-auto mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-light mb-6 text-foreground">{localize(pageData, 'h1')}</h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-muted-foreground">{localize(pageData, 'intro')}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <SeoPillRail items={CARTIER_QUICK_FILTERS} getLabel={(chip) => localize(chip, 'label')} />
      </div>

      {!pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-light mb-8 text-center text-foreground">{t('seoLanding.availableWatches', { brand: BRAND })}</h2>
            {loading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div> : products.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{products.map(p => <SeoProductCard key={p.id} product={p} />)}</div> : <div className="text-center py-16"><p className="text-sm mb-4 text-muted-foreground">{t('seoLanding.noWatches', { brand: BRAND })}</p><LocalizedLink to="/brands/cartier" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{t('seoLanding.viewAll', { brand: BRAND })}</LocalizedLink></div>}
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
              <LocalizedLink to="/brands/cartier" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">{t('seoLanding.shopWatches', { brand: BRAND })}</LocalizedLink>
              <LocalizedLink to="/cartier-gebraucht-kaufen" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-secondary border-primary text-primary">{t('seoLanding.preOwned', { brand: BRAND })}</LocalizedLink>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light mb-6 text-background">{t('seoLanding.exploreFullCollection', { brand: BRAND })}</h2>
          <LocalizedLink to="/brands/cartier" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">{t('seoLanding.visitBoutique', { brand: BRAND })}</LocalizedLink>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}
