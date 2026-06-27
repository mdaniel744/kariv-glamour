import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useCart();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] bg-[#111] overflow-hidden mb-4">
          {product.featuredImage ? (
            <img
              src={product.featuredImage}
              alt={product.productTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#333]">
              <span className="text-xs tracking-[0.2em] uppercase">No Image</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNewArrival && (
              <span className="text-[9px] tracking-[0.15em] uppercase bg-[#C5A367] text-[#0A0A0B] px-2 py-1 font-medium">New</span>
            )}
            {product.condition === 'Vintage' && (
              <span className="text-[9px] tracking-[0.15em] uppercase bg-white/10 text-[#E5E5E5] px-2 py-1 backdrop-blur-sm">Vintage</span>
            )}
            {product.authenticationStatus === 'Authenticated' && (
              <span className="text-[9px] tracking-[0.15em] uppercase bg-emerald-900/60 text-emerald-300 px-2 py-1 backdrop-blur-sm flex items-center gap-1">
                <ShieldCheck size={10} /> Verified
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); toggleWishlist(product); }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart size={14} className={wishlisted ? 'fill-[#C5A367] text-[#C5A367]' : 'text-white'} />
          </button>

          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] tracking-[0.15em] uppercase text-white">View Details</span>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[#C5A367] font-medium">{product.brand}</p>
          <h3 className="text-sm text-[#E5E5E5] font-body leading-tight line-clamp-2">{product.productTitle}</h3>
          <div className="flex items-center gap-2">
            {product.salePrice && product.salePrice < product.price ? (
              <>
                <span className="text-sm text-[#C5A367] font-medium">{formatPrice(product.salePrice)}</span>
                <span className="text-xs text-[#8E8E93] line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-sm text-[#E5E5E5] font-medium">{formatPrice(product.price)}</span>
            )}
          </div>
          {product.condition && (
            <p className="text-[10px] text-[#8E8E93] tracking-wide">{product.condition} · {product.yearOfProduction || 'N/A'}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}