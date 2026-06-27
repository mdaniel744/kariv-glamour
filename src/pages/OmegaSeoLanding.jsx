import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { OMEGA_SEO_PAGES, OMEGA_QUICK_FILTERS, OMEGA_THEME } from '@/lib/omegaData';
import TrustBar from '@/components/shared/TrustBar';

function SeoProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: OMEGA_THEME.warmWhite }}>
        {product.featuredImage ? (
          <img src={product.featuredImage} alt={product.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: OMEGA_THEME.red }}>
            <span className="text-xs tracking-[0.2em] uppercase">Omega</span>
          </div>
        )}
        <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(10,10,10,0.6)' }}>
          <Heart size={14} className={wishlisted ? 'fill-current' : ''} style={{ color: wishlisted ? OMEGA_THEME.red : OMEGA_THEME.white }} />
        </button>
      </div>
      <Link to={`/product/${product.id}`}>
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1" style={{ color: OMEGA_THEME.red }}>{product.brand}</p>
        <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5" style={{ color: OMEGA_THEME.charcoal }}>{product.productTitle}</h3>
        <div className="flex items-center gap-2 text-[10px] mb-2" style={{ color: OMEGA_THEME.greyText }}>
          {product.referenceNumber && <span>Ref. {product.referenceNumber}</span>}
          {product.yearOfProduction && <span>· {product.yearOfProduction}</span>}
        </div>
        <p className="text-sm font-medium" style={{ color: OMEGA_THEME.charcoal }}>{formatPrice(product.price, product.currency)}</p>
      </Link>
    </motion.div>
  );
}

export default function OmegaSeoLanding({ slug }) {
  const pageData = OMEGA_SEO_PAGES[slug];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { brand: 'Omega', ...(pageData?.collectionFilter || {}) };
        let data = await base44.entities.Products.filter(query, '-created_date', 50);
        setProducts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (pageData) load();
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (pageData) {
      document.title = pageData.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', pageData.description);
    }
  }, [slug]);

  if (!pageData) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center" style={{ backgroundColor: OMEGA_THEME.white }}>
        <h1 className="font-display text-3xl font-light mb-4" style={{ color: OMEGA_THEME.charcoal }}>Page Not Found</h1>
        <Link to="/brands/omega" className="text-sm underline" style={{ color: OMEGA_THEME.red }}>Return to Omega</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: OMEGA_THEME.white }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase" style={{ color: OMEGA_THEME.greyText }}>
          <Link to="/" className="hover:opacity-70">Start</Link>
          <ChevronRight size={10} />
          <Link to="/brands" className="hover:opacity-70">Marken</Link>
          <ChevronRight size={10} />
          <Link to="/brands/omega" className="hover:opacity-70">Omega</Link>
          <ChevronRight size={10} />
          <span style={{ color: OMEGA_THEME.charcoal }}>{pageData.h1}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: OMEGA_THEME.red }}>Omega Boutique</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: OMEGA_THEME.charcoal }}>{pageData.h1}</h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: OMEGA_THEME.greyText }}>{pageData.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick filters */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {OMEGA_QUICK_FILTERS.map((chip, i) => (
            <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors hover:bg-black/5" style={{ borderColor: 'rgba(200,16,46,0.2)', color: OMEGA_THEME.red }}>
              {chip.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      {!pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-light mb-8 text-center" style={{ color: OMEGA_THEME.charcoal }}>Available Omega Watches</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse" style={{ backgroundColor: OMEGA_THEME.lightBg }} />)}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map(p => <SeoProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-sm mb-4" style={{ color: OMEGA_THEME.greyText }}>No Omega watches currently available in this category.</p>
                <Link to="/brands/omega" className="text-[11px] tracking-[0.12em] uppercase underline" style={{ color: OMEGA_THEME.red }}>View All Omega Watches</Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Guide content for guide pages */}
      {pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: OMEGA_THEME.greyText }}>
              <p>At Kariv Glamour, we believe that buying an Omega should be an informed and confident experience. Whether you are considering your first Omega or adding to an established collection, understanding the nuances of each collection, condition, and reference is essential.</p>
              <p>Our team of horological experts carefully reviews each timepiece, presenting it with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches, and every product page provides the information you need to make a confident decision.</p>
              <p>Explore our full Omega collection, browse by model family, or read our educational guides to deepen your understanding of Omega watchmaking, maintenance, and heritage.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/brands/omega" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90" style={{ backgroundColor: OMEGA_THEME.red, color: OMEGA_THEME.white }}>
                Shop Omega Watches
              </Link>
              <Link to="/omega-gebraucht-kaufen" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-black/5" style={{ borderColor: OMEGA_THEME.red, color: OMEGA_THEME.red }}>
                Pre-Owned Omega
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Back to Omega */}
      <section className="py-16" style={{ backgroundColor: OMEGA_THEME.black }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light mb-6" style={{ color: OMEGA_THEME.white }}>Explore the Full Omega Collection</h2>
          <Link to="/brands/omega" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90" style={{ backgroundColor: OMEGA_THEME.red, color: OMEGA_THEME.white }}>
            Visit Omega Boutique
          </Link>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}