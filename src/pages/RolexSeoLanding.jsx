import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ChevronRight, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { ROLEX_SEO_PAGES, ROLEX_QUICK_FILTERS } from '@/lib/rolexData';
import TrustBar from '@/components/shared/TrustBar';

function SeoProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
      <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ backgroundColor: '#FAF7F2' }}>
        {product.featuredImage ? (
          <img src={product.featuredImage} alt={product.productTitle} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ color: '#C5A572' }}>
            <span className="text-xs tracking-[0.2em] uppercase">Rolex</span>
          </div>
        )}
        <button onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(6,53,40,0.6)' }}>
          <Heart size={14} className={wishlisted ? 'fill-current' : ''} style={{ color: wishlisted ? '#C5A572' : '#FAF7F2' }} />
        </button>
      </div>
      <Link to={`/product/${product.id}`}>
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium mb-1" style={{ color: '#0B4D3C' }}>{product.brand}</p>
        <h3 className="text-sm font-body leading-tight line-clamp-2 mb-1.5" style={{ color: '#1C1C1C' }}>{product.productTitle}</h3>
        <div className="flex items-center gap-2 text-[10px] mb-2" style={{ color: '#2A2018' }}>
          {product.referenceNumber && <span>Ref. {product.referenceNumber}</span>}
          {product.yearOfProduction && <span>· {product.yearOfProduction}</span>}
        </div>
        <p className="text-sm font-medium" style={{ color: '#0B4D3C' }}>{formatPrice(product.price, product.currency)}</p>
      </Link>
    </motion.div>
  );
}

export default function RolexSeoLanding({ slug }) {
  const pageData = ROLEX_SEO_PAGES[slug];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const query = { brand: 'Rolex', ...(pageData?.collectionFilter || {}) };
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
      <div className="max-w-4xl mx-auto px-6 py-32 text-center" style={{ backgroundColor: '#FAF7F2' }}>
        <h1 className="font-display text-3xl font-light mb-4" style={{ color: '#1C1C1C' }}>Page Not Found</h1>
        <Link to="/brands/rolex" className="text-sm underline" style={{ color: '#0B4D3C' }}>Return to Rolex</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase" style={{ color: '#2A2018' }}>
          <Link to="/" className="hover:opacity-70">Start</Link>
          <ChevronRight size={10} />
          <Link to="/brands" className="hover:opacity-70">Marken</Link>
          <ChevronRight size={10} />
          <Link to="/brands/rolex" className="hover:opacity-70">Rolex</Link>
          <ChevronRight size={10} />
          <span style={{ color: '#1C1C1C' }}>{pageData.h1}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: '#C5A572' }}>Rolex Boutique</span>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: '#1C1C1C' }}>{pageData.h1}</h1>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto" style={{ color: '#2A2018' }}>{pageData.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick filters */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {ROLEX_QUICK_FILTERS.map((chip, i) => (
            <Link key={i} to={chip.link} className="text-[10px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors hover:bg-black/5" style={{ borderColor: 'rgba(11,77,60,0.2)', color: '#0B4D3C' }}>
              {chip.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      {!pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-light mb-8 text-center" style={{ color: '#1C1C1C' }}>Available Rolex Watches</h2>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => <div key={i} className="aspect-[3/4] animate-pulse" style={{ backgroundColor: '#FDFBF7' }} />)}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map(p => <SeoProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-sm mb-4" style={{ color: '#2A2018' }}>No Rolex watches currently available in this category.</p>
                <Link to="/brands/rolex" className="text-[11px] tracking-[0.12em] uppercase underline" style={{ color: '#0B4D3C' }}>View All Rolex Watches</Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Guide content for guide pages */}
      {pageData.isGuide && (
        <section className="pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto px-6">
            <div className="space-y-6 text-sm leading-relaxed" style={{ color: '#2A2018' }}>
              <p>At Kariv Glamour, we believe that buying a Rolex should be an informed and confident experience. Whether you are considering your first Rolex or adding to an established collection, understanding the nuances of each collection, condition, and reference is essential.</p>
              <p>Our team of horological experts carefully reviews each timepiece, presenting it with transparent product details, clear condition grading, and reference number visibility. We do not sell replica or counterfeit watches, and every product page provides the information you need to make a confident decision.</p>
              <p>Explore our full Rolex collection, browse by model family, or read our educational guides to deepen your understanding of Rolex watchmaking, maintenance, and heritage.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/brands/rolex" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#0B4D3C', color: '#FAF7F2' }}>
                Shop Rolex Watches
              </Link>
              <Link to="/rolex-gebraucht-kaufen" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-black/5" style={{ borderColor: '#0B4D3C', color: '#0B4D3C' }}>
                Pre-Owned Rolex
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Back to Rolex */}
      <section className="py-16" style={{ backgroundColor: '#063528' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-light mb-6" style={{ color: '#FAF7F2' }}>Explore the Full Rolex Collection</h2>
          <Link to="/brands/rolex" className="inline-flex items-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90" style={{ backgroundColor: '#C5A572', color: '#063528' }}>
            Visit Rolex Boutique
          </Link>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}