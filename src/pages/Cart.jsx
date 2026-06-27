import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Lock } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <ShoppingBag size={48} className="text-[#333] mx-auto mb-6" />
        <h1 className="font-display text-3xl text-[#E5E5E5] font-light mb-3">Your Cart is Empty</h1>
        <p className="text-sm text-[#8E8E93] mb-8">Discover our collection of authenticated luxury timepieces.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-[#B8944F] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-2 block">Shopping Cart</span>
          <h1 className="font-display text-3xl md:text-4xl font-light text-[#E5E5E5]">Your Selection</h1>
        </div>
        <button onClick={clearCart} className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] hover:text-destructive transition-colors">
          Clear All
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-5 border-b border-white/5 pb-6">
              <Link to={`/product/${item.id}`} className="w-24 h-24 md:w-32 md:h-32 bg-[#111] flex-shrink-0 overflow-hidden">
                {item.featuredImage ? (
                  <img src={item.featuredImage} alt={item.productTitle} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#333] text-[10px]">No Image</div>
                )}
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#C5A367]">{item.brand}</p>
                  <Link to={`/product/${item.id}`} className="text-sm text-[#E5E5E5] hover:text-[#C5A367] transition-colors line-clamp-2">{item.productTitle}</Link>
                  {item.referenceNumber && <p className="text-[10px] text-[#8E8E93] mt-1">Ref. {item.referenceNumber}</p>}
                </div>
                <div className="flex items-end justify-between mt-3">
                  <span className="text-sm text-[#E5E5E5] font-medium">{formatPrice(item.salePrice || item.price)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-[#8E8E93] hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="border border-white/10 p-6 space-y-5">
            <h2 className="text-[11px] tracking-[0.15em] uppercase text-[#E5E5E5] font-medium">Order Summary</h2>

            <div className="space-y-3 border-b border-white/5 pb-5">
              <div className="flex justify-between text-xs">
                <span className="text-[#8E8E93]">Subtotal ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</span>
                <span className="text-[#E5E5E5]">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#8E8E93]">Shipping</span>
                <span className="text-[#C5A367]">Complimentary</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-[#E5E5E5] font-medium">Total</span>
              <span className="font-display text-2xl text-[#E5E5E5]">{formatPrice(cartTotal)}</span>
            </div>

            <button className="w-full bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-[#B8944F] transition-colors">
              Proceed to Checkout
            </button>

            <Link to="/shop" className="flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] hover:text-[#E5E5E5] transition-colors pt-2">
              <ArrowLeft size={12} /> Continue Shopping
            </Link>

            {/* Trust */}
            <div className="border-t border-white/5 pt-5 space-y-3">
              {[
                { icon: Lock, text: "Secure encrypted checkout" },
                { icon: Truck, text: "Insured worldwide shipping" },
                { icon: ShieldCheck, text: "All watches authenticated" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon size={12} className="text-[#C5A367]" />
                  <span className="text-[10px] text-[#8E8E93]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}