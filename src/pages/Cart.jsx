import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/cartContext';
import { formatPrice } from '@/lib/constants';
import { Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck, Lock, ChevronRight } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <ShoppingBag size={48} className="text-muted-foreground/30 mx-auto mb-6" />
        <h1 className="font-display text-3xl text-foreground font-light mb-3">Ihr Warenkorb ist leer</h1>
        <p className="text-sm text-muted-foreground mb-8">Entdecken Sie unsere Kollektion authentifizierter Luxusuhren.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-primary/90 transition-colors">
          Weiter einkaufen
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Start</Link>
        <ChevronRight size={10} />
        <span className="text-foreground">Warenkorb</span>
      </div>

      <div className="flex items-center justify-between mb-10">
        <div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2 block">Warenkorb</span>
          <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">Ihre Auswahl</h1>
        </div>
        <button onClick={clearCart} className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-destructive transition-colors">
          Alle löschen
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex gap-5 border-b border-border pb-6">
              <Link to={`/product/${item.id}`} className="w-24 h-24 md:w-32 md:h-32 bg-card flex-shrink-0 overflow-hidden">
                {item.featuredImage ? (
                  <img src={item.featuredImage} alt={item.productTitle} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30 text-[10px]">Kein Bild</div>
                )}
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-primary">{item.brand}</p>
                  <Link to={`/product/${item.id}`} className="text-sm text-foreground hover:text-primary transition-colors line-clamp-2">{item.productTitle}</Link>
                  {item.referenceNumber && <p className="text-[10px] text-muted-foreground mt-1">Ref. {item.referenceNumber}</p>}
                </div>
                <div className="flex items-end justify-between mt-3">
                  <span className="text-sm text-foreground font-medium">{formatPrice(item.salePrice || item.price)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:sticky md:top-32 md:self-start">
          <div className="border border-border p-6 space-y-5">
            <h2 className="text-[11px] tracking-[0.15em] uppercase text-foreground font-medium">Bestellübersicht</h2>

            <div className="space-y-3 border-b border-border pb-5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Zwischensumme ({cartItems.length} Artikel)</span>
                <span className="text-foreground">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Versand</span>
                <span className="text-primary">Kostenlos</span>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-foreground font-medium">Gesamt</span>
              <span className="font-display text-2xl text-foreground">{formatPrice(cartTotal)}</span>
            </div>

            <button className="w-full bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-primary/90 transition-colors">
              Zur Kasse
            </button>

            <Link to="/shop" className="flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors pt-2">
              <ArrowLeft size={12} /> Weiter einkaufen
            </Link>

            {/* Trust */}
            <div className="border-t border-border pt-5 space-y-3">
              {[
                { icon: Lock, text: "Sicherer verschlüsselter Checkout" },
                { icon: Truck, text: "Weltweit versicherter Versand" },
                { icon: ShieldCheck, text: "Alle Uhren authentifiziert" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon size={12} className="text-primary" />
                  <span className="text-[10px] text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}