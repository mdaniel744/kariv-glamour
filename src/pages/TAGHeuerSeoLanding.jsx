import React, { useState, useEffect } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { TH_SEO_PAGES, TH_QUICK_FILTERS } from '@/lib/tagHeuerData';
import TrustBar from '@/components/shared/TrustBar';

function SeoProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <LocalizedLink to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
          {product.featuredImage ? <img src={product.featuredImage} alt={product.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground/40"><span className="text-xs tracking-[0.3em] uppercase">TAG Heuer</span></div>}
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} /></button>
        </div>
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{product.brand}</p>
        <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{product.productTitle}</h3>
        <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">{product.referenceNumber && <span>Ref. {product.referenceNumber}</span>}{product.yearOfProduction && <span>· {product.yearOfProduction}</span>}</div>
        <p className="text-sm font-medium text-foreground">{formatPrice(product.price, product.currency)}</p>
      </LocalizedLink>
    </motion.div>
  );
}

export default function TAGHeuerSeoLanding({ slug }) {
  const { locale } = useLanguage();
  const pageData = TH_SEO_PAGES[slug];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const L = (de, en) => locale === 'de' ? de : en;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { brand: 'TAG Heuer', ...(pageData?.filter || {}) };
        const data = await base44.entities.Products.filter(query, '-created_date', 50);
        if (pageData?.clientFilter) {
          const filtered = data.filter(pageData.clientFilter);
          setProducts(filtered.length > 0 ? filtered : data);
        } else {
          setProducts(data);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    if (pageData) load();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (pageData) {
      document.title = locale === 'de' ? pageData.title_de : pageData.title_en;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', locale === 'de' ? pageData.description_de : pageData.description_en);
    }
  }, [slug, locale]);

  if (!pageData) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-bold mb-4 text-foreground">{L('Seite nicht gefunden', 'Page Not Found')}</h1><LocalizedLink to="/brands/tag-heuer" className="text-sm underline text-primary">{L('Zurück zu TAG Heuer', 'Return to TAG Heuer')}</LocalizedLink></div>);
  }

  const h1 = locale === 'de' ? pageData.h1_de : pageData.h1_en;
  const intro = locale === 'de' ? pageData.intro_de : pageData.intro_en;
  const guideContent = pageData.isGuide ? (locale === 'de' ? pageData.guideContent_de : pageData.guideContent_en) : null;

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <LocalizedLink to="/" className="hover:text-foreground">{L('Start', 'Home')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands" className="hover:text-foreground">{L('Marken', 'Brands')}</LocalizedLink><ChevronRight size={10} />
          <LocalizedLink to="/brands/tag-heuer" className="hover:text-foreground">TAG Heuer</LocalizedLink><ChevronRight size={10} />
          <span className="text-foreground">{h1}</span>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">TAG Heuer</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">{h1}</h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-muted-foreground">{intro}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {TH_QUICK_FILTERS.map((chip, i) => <LocalizedLink key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors">{chip.label}</LocalizedLink>)}
        </div>
      </div>

      {!pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center text-foreground">{L('Verfügbare TAG Heuer Uhren', 'Available TAG Heuer Watches')}</h2>
            {loading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div> : products.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{products.map(p => <SeoProductCard key={p.id} product={p} />)}</div> : <div className="text-center py-16"><p className="text-sm mb-4 text-muted-foreground">{L('Aktuell sind keine TAG Heuer Uhren in dieser Kategorie verfügbar.', 'No TAG Heuer watches are currently available in this category.')}</p><LocalizedLink to="/brands/tag-heuer" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">{L('Alle TAG Heuer Uhren ansehen', 'View All TAG Heuer Watches')}</LocalizedLink></div>}
          </div>
        </section>
      )}

      {pageData.isGuide && guideContent && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground [&_a]:underline [&_a]:text-primary">
              {guideContent.map((para, i) => <p key={i} dangerouslySetInnerHTML={{ __html: para }} />)}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <LocalizedLink to="/brands/tag-heuer" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{L('TAG Heuer entdecken', 'Shop TAG Heuer')}</LocalizedLink>
              <LocalizedLink to="/tag-heuer-gebraucht" className="inline-flex items-center px-8 py-4 border border-primary text-primary text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-secondary transition-colors">{L('Gebrauchte TAG Heuer', 'Pre-Owned TAG Heuer')}</LocalizedLink>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-background">{L('Entdecken Sie die gesamte TAG Heuer Kollektion', 'Explore the Full TAG Heuer Collection')}</h2>
          <LocalizedLink to="/brands/tag-heuer" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">{L('TAG Heuer Boutique besuchen', 'Visit TAG Heuer Boutique')}</LocalizedLink>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}