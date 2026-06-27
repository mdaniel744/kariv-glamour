import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cartContext';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/shared/ProductCard';

export default function Wishlist() {
  const { wishlistItems } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Heart size={48} className="text-[#333] mx-auto mb-6" />
        <h1 className="font-display text-3xl text-[#E5E5E5] font-light mb-3">Your Wishlist is Empty</h1>
        <p className="text-sm text-[#8E8E93] mb-8">Save your favourite timepieces for later.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-[#B8944F] transition-colors">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-2 block">Saved</span>
        <h1 className="font-display text-3xl md:text-4xl font-light text-[#E5E5E5]">Your Wishlist</h1>
        <p className="text-sm text-[#8E8E93] mt-1">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistItems.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}