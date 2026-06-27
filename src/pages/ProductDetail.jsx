import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Award, ChevronRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/shared/ProductCard';
import TrustBar from '@/components/shared/TrustBar';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await base44.entities.Products.get(id);
        setProduct(data);
        const rel = await base44.entities.Products.filter({ brand: data.brand }, '-created_date', 4);
        setRelated(rel.filter(p => p.id !== data.id).slice(0, 4));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square bg-[#151515] animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 bg-[#151515] w-32" />
            <div className="h-8 bg-[#151515] w-full" />
            <div className="h-6 bg-[#151515] w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-[#E5E5E5]">Product Not Found</h1>
        <Link to="/shop" className="text-[#C5A367] text-sm mt-4 inline-block">Return to Shop</Link>
      </div>
    );
  }

  const images = product.productImages?.length > 0 ? product.productImages :
    product.featuredImage ? [product.featuredImage] : [];
  const inCart = isInCart(product.id);
  const wishlisted = isInWishlist(product.id);

  const specs = [
    { label: "Brand", value: product.brand },
    { label: "Collection", value: product.collection },
    { label: "Model", value: product.model },
    { label: "Reference", value: product.referenceNumber },
    { label: "Year", value: product.yearOfProduction },
    { label: "Condition", value: product.condition },
    { label: "Case Diameter", value: product.caseDiameter },
    { label: "Case Material", value: product.caseMaterial },
    { label: "Dial Color", value: product.dialColor },
    { label: "Bracelet", value: product.braceletMaterial },
    { label: "Movement", value: product.movementType },
    { label: "Functions", value: product.functions },
    { label: "Water Resistance", value: product.waterResistance },
    { label: "Crystal", value: product.crystalType },
    { label: "Power Reserve", value: product.powerReserve },
    { label: "Watch Shape", value: product.watchShape },
    { label: "Gender", value: product.gender }
  ].filter(s => s.value);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#8E8E93]">
          <Link to="/" className="hover:text-[#E5E5E5]">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-[#E5E5E5]">Shop</Link>
          {product.brand && (
            <>
              <ChevronRight size={10} />
              <Link to={`/brands/${product.brand?.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#E5E5E5]">{product.brand}</Link>
            </>
          )}
          <ChevronRight size={10} />
          <span className="text-[#E5E5E5] truncate max-w-[200px]">{product.productTitle}</span>
        </div>
      </div>

      {/* Main product */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Image gallery */}
          <div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-[#111] overflow-hidden mb-4"
            >
              {images.length > 0 ? (
                <img src={images[selectedImage]} alt={product.productTitle} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#333] text-sm">No Image Available</div>
              )}
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 border ${i === selectedImage ? 'border-[#C5A367]' : 'border-white/10'} overflow-hidden`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info — sticky */}
          <div className="md:sticky md:top-32 md:self-start space-y-6">
            <div>
              <Link
                to={`/brands/${product.brand?.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[10px] tracking-[0.2em] uppercase text-[#C5A367] hover:underline"
              >
                {product.brand}
              </Link>
              <h1 className="font-display text-2xl md:text-3xl font-light text-[#E5E5E5] mt-2 leading-tight">
                {product.productTitle}
              </h1>
              {product.referenceNumber && (
                <p className="text-xs text-[#8E8E93] mt-1">Ref. {product.referenceNumber}</p>
              )}
            </div>

            {/* Price */}
            <div className="border-y border-white/10 py-5">
              <div className="flex items-baseline gap-3">
                {product.salePrice && product.salePrice < product.price ? (
                  <>
                    <span className="font-display text-3xl text-[#C5A367]">{formatPrice(product.salePrice)}</span>
                    <span className="text-sm text-[#8E8E93] line-through">{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="font-display text-3xl text-[#E5E5E5]">{formatPrice(product.price)}</span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-3">
                <span className={`text-[10px] tracking-[0.1em] uppercase px-2 py-1 ${product.availability === 'In Stock' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-red-900/40 text-red-400'}`}>
                  {product.availability || 'In Stock'}
                </span>
                {product.condition && (
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93]">{product.condition}</span>
                )}
              </div>
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Box", value: product.boxIncluded ? "Included" : "Not included" },
                { label: "Papers", value: product.papersIncluded ? "Included" : "Not included" },
                { label: "Year", value: product.yearOfProduction || "N/A" },
                { label: "Size", value: product.caseDiameter || "N/A" }
              ].map(item => (
                <div key={item.label} className="bg-[#111] border border-white/5 p-3">
                  <p className="text-[9px] tracking-[0.15em] uppercase text-[#8E8E93]">{item.label}</p>
                  <p className="text-xs text-[#E5E5E5] mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => !inCart && addToCart(product)}
                disabled={inCart}
                className={`w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium py-4 transition-colors ${
                  inCart ? 'bg-[#333] text-[#8E8E93] cursor-not-allowed' : 'bg-[#C5A367] text-[#0A0A0B] hover:bg-[#B8944F]'
                }`}
              >
                <ShoppingBag size={16} />
                {inCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="flex-1 flex items-center justify-center gap-2 border border-white/15 text-[11px] tracking-[0.12em] uppercase text-[#E5E5E5] py-3 hover:border-[#C5A367] transition-colors"
                >
                  <Heart size={14} className={wishlisted ? 'fill-[#C5A367] text-[#C5A367]' : ''} />
                  {wishlisted ? 'Saved' : 'Wishlist'}
                </button>
                <Link
                  to="/customer-service"
                  className="flex-1 flex items-center justify-center gap-2 border border-white/15 text-[11px] tracking-[0.12em] uppercase text-[#E5E5E5] py-3 hover:border-[#C5A367] transition-colors"
                >
                  <MessageCircle size={14} />
                  Ask Expert
                </Link>
              </div>
            </div>

            {/* Trust cluster */}
            <div className="border border-white/10 p-5 space-y-3">
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#C5A367] font-medium">The Kariv Guarantee</h3>
              {[
                { icon: ShieldCheck, text: product.authenticationStatus === 'Authenticated' ? 'Authenticated by Kariv Glamour' : 'Authentication pending' },
                { icon: Truck, text: "Fully insured worldwide shipping" },
                { icon: RotateCcw, text: product.returnEligibility !== false ? "Returns accepted within 14 days" : "Final sale — no returns" },
                { icon: Award, text: "Transparent condition grading" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <item.icon size={14} className="text-[#C5A367] flex-shrink-0" />
                  <span className="text-xs text-[#8E8E93]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description & Specs */}
        <div className="mt-20 grid md:grid-cols-2 gap-16">
          {product.productDescription && (
            <div>
              <h2 className="font-display text-2xl text-[#E5E5E5] font-light mb-6">About This Timepiece</h2>
              <p className="text-sm text-[#8E8E93] leading-relaxed whitespace-pre-line">{product.productDescription}</p>
            </div>
          )}
          <div>
            <h2 className="font-display text-2xl text-[#E5E5E5] font-light mb-6">Technical Specifications</h2>
            <div className="space-y-0">
              {specs.map((spec, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[#8E8E93]">{spec.label}</span>
                  <span className="text-xs text-[#E5E5E5]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-white/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl text-[#E5E5E5] font-light mb-10">More from {product.brand}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}

      <TrustBar />
    </div>
  );
}