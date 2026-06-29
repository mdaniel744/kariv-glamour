import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { IWC_SEO_PAGES, IWC_QUICK_FILTERS } from '@/lib/iwcData';
import TrustBar from '@/components/shared/TrustBar';

function SeoProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-card">
          {product.featuredImage ? <img src={product.featuredImage} alt={product.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-muted-foreground/40"><span className="text-xs tracking-[0.3em] uppercase">IWC Schaffhausen</span></div>}
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Heart size={14} className={wishlisted ? 'fill-primary text-primary' : 'text-white'} /></button>
        </div>
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1 text-primary">{product.brand}</p>
        <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5 text-foreground">{product.productTitle}</h3>
        <div className="flex items-center gap-2 text-[10px] mb-2 text-muted-foreground">{product.referenceNumber && <span>Ref. {product.referenceNumber}</span>}{product.yearOfProduction && <span>· {product.yearOfProduction}</span>}</div>
        <p className="text-sm font-medium text-foreground">{formatPrice(product.price, product.currency)}</p>
      </Link>
    </motion.div>
  );
}

export default function IWCSeoLanding({ slug }) {
  const pageData = IWC_SEO_PAGES[slug];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { brand: 'IWC Schaffhausen', ...(pageData?.filter || {}) };
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
      document.title = pageData.title;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute('content', pageData.description);
    }
  }, [slug]);

  if (!pageData) {
    return (<div className="max-w-4xl mx-auto px-6 py-32 text-center bg-background"><h1 className="font-display text-3xl font-bold mb-4 text-foreground">Page Not Found</h1><Link to="/brands/iwc-schaffhausen" className="text-sm underline text-primary">Return to IWC Schaffhausen</Link></div>);
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Start</Link><ChevronRight size={10} />
          <Link to="/brands" className="hover:text-foreground">Marken</Link><ChevronRight size={10} />
          <Link to="/brands/iwc-schaffhausen" className="hover:text-foreground">IWC Schaffhausen</Link><ChevronRight size={10} />
          <span className="text-foreground">{pageData.h1}</span>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-5 text-primary">IWC Schaffhausen</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">{pageData.h1}</h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-muted-foreground">{pageData.intro}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {IWC_QUICK_FILTERS.map((chip, i) => <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border border-border text-foreground hover:border-primary hover:text-primary transition-colors">{chip.label}</Link>)}
        </div>
      </div>

      {!pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center text-foreground">Verfügbare IWC Schaffhausen Uhren</h2>
            {loading ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse bg-card" />)}</div> : products.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{products.map(p => <SeoProductCard key={p.id} product={p} />)}</div> : <div className="text-center py-16"><p className="text-sm mb-4 text-muted-foreground">Aktuell sind keine IWC Schaffhausen Uhren in dieser Kategorie verfügbar.</p><Link to="/brands/iwc-schaffhausen" className="text-[11px] tracking-[0.12em] uppercase underline text-primary">Alle IWC Uhren ansehen</Link></div>}
          </div>
        </section>
      )}

      {pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>IWC Schaffhausen is recognized for engineering precision, aviation heritage, refined dress-watch design, and classic Swiss watchmaking since 1868. Its collections range from the <Link to="/iwc-schaffhausen/pilots-watches" className="text-primary underline">Pilot&rsquo;s Watches</Link> to the elegant <Link to="/iwc-schaffhausen/portugieser" className="text-primary underline">Portugieser</Link>, the dress-focused <Link to="/iwc-schaffhausen/portofino" className="text-primary underline">Portofino</Link>, the engineering-driven <Link to="/iwc-schaffhausen/ingenieur" className="text-primary underline">Ingenieur</Link>, and the dive-focused <Link to="/iwc-schaffhausen/aquatimer" className="text-primary underline">Aquatimer</Link>.</p>
              <p>At Kariv Glamour, each IWC Schaffhausen timepiece is presented with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches, and every product page provides the information you need to make a confident decision.</p>
              <p>Explore our full IWC collection, browse by model family or movement type, or read our educational guides to deepen your understanding of IWC watchmaking, in-house calibres, and the stories behind iconic collections.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/brands/iwc-schaffhausen" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Shop IWC Watches</Link>
              <Link to="/iwc-schaffhausen-gebraucht" className="inline-flex items-center px-8 py-4 border border-primary text-primary text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-secondary transition-colors">Pre-Owned IWC</Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-foreground">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-background">Explore the Full IWC Schaffhausen Collection</h2>
          <Link to="/brands/iwc-schaffhausen" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Visit IWC Boutique</Link>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}