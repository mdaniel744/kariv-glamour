import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { CARTIER_SEO_PAGES, CARTIER_QUICK_FILTERS, CARTIER_LOGO } from '@/lib/cartierData';
import TrustBar from '@/components/shared/TrustBar';

function SeoProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
          {product.featuredImage ? <img src={product.featuredImage} alt={product.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-primary"><span className="text-xs tracking-[0.3em] uppercase">Cartier</span></div>}
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm"><Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} /></button>
        </div>
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{product.brand}</p>
        <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{product.productTitle}</h3>
        <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">{product.referenceNumber && <span>Ref. {product.referenceNumber}</span>}{product.yearOfProduction && <span>· {product.yearOfProduction}</span>}</div>
        <p className="text-sm font-medium text-foreground">{formatPrice(product.price, product.currency)}</p>
      </Link>
    </motion.div>
  );
}

export default function CartierSeoLanding({ slug }) {
  const pageData = CARTIER_SEO_PAGES[slug];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { brand: 'Cartier', ...(pageData?.filter || {}) };
        const data = await base44.entities.Products.filter(query, '-created_date', 50);
        setProducts(data);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    if (pageData) load();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (pageData) {
      document.title = pageData.title;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', pageData.description);
    }
  }, [slug]);

  if (!pageData) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-light mb-4 text-foreground">Page Not Found</h1><Link to="/brands/cartier" className="text-sm underline text-primary">Return to Cartier</Link></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Start</Link><ChevronRight size={10} />
          <Link to="/brands" className="hover:text-foreground">Marken</Link><ChevronRight size={10} />
          <Link to="/brands/cartier" className="hover:text-foreground">Cartier</Link><ChevronRight size={10} />
          <span className="text-foreground">{pageData.h1}</span>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={CARTIER_LOGO} alt="Cartier" className="h-9 w-auto mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-light mb-6 text-foreground">{pageData.h1}</h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-muted-foreground">{pageData.intro}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {CARTIER_QUICK_FILTERS.map((chip, i) => <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground transition-colors hover:border-primary hover:text-primary">{chip.label}</Link>)}
        </div>
      </div>

      {!pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-light mb-8 text-center text-foreground">Verfügbare Cartier Uhren</h2>
            {loading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div> : products.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{products.map(p => <SeoProductCard key={p.id} product={p} />)}</div> : <div className="text-center py-16"><p className="text-sm mb-4 text-muted-foreground">Aktuell sind keine Cartier Uhren in dieser Kategorie verfügbar.</p><Link to="/brands/cartier" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">Alle Cartier Uhren ansehen</Link></div>}
          </div>
        </section>
      )}

      {pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>Cartier has shaped luxury design through a unique combination of jewellery expertise, watchmaking creativity, and instantly recognizable forms. From the rectangular Tank to the pioneering Santos de Cartier, the Maison has created some of the most recognizable watches in luxury watchmaking.</p>
              <p>At Kariv Glamour, each Cartier timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches, and every product page provides the information you need to make a confident decision.</p>
              <p>Explore our full Cartier collection, browse by model family, or read our educational guides to deepen your understanding of Cartier watchmaking, maintenance, and heritage.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/brands/cartier" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">Shop Cartier Watches</Link>
              <Link to="/cartier-gebraucht-kaufen" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:bg-secondary border-primary text-primary">Pre-Owned Cartier</Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light mb-6 text-background">Explore the Full Cartier Collection</h2>
          <Link to="/brands/cartier" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90 bg-primary text-primary-foreground">Visit Cartier Boutique</Link>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}