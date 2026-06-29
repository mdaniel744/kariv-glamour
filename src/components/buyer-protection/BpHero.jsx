import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, LockKeyhole, BadgeCheck, RotateCcw, Truck, Headset } from 'lucide-react';

const TRUST_BADGES = [
{ icon: LockKeyhole, label: 'Secure Escrow Payment' },
{ icon: BadgeCheck, label: 'Authenticity Commitment' },
{ icon: RotateCcw, label: '14-Day Money-Back Guarantee' },
{ icon: Truck, label: 'Insured Shipping' },
{ icon: ShieldCheck, label: 'Verified Dealers' },
{ icon: Headset, label: 'Buyer Support' }];


export default function BpHero() {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-6">
            <ShieldCheck size={14} /> Buyer Protection
          </span>
          <h1 className="text-4xl md:text-6xl text-foreground leading-tight mb-6 [font-family:'Cormorant_Garamond',_serif] font-bold">Kariv Buyer Protection

          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            Buy your next luxury watch with confidence. Kariv Buyer Protection helps secure your payment, protect your order, verify seller standards, and support you throughout the entire purchase journey.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link to="/shop" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">
              Shop Luxury Watches
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">
              How Buyer Protection Works
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TRUST_BADGES.map((b, i) =>
            <div key={i} className="flex items-center gap-2">
                <b.icon size={16} className="text-primary flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[11px] tracking-wide text-muted-foreground leading-tight">{b.label}</span>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded overflow-hidden border border-border bg-secondary">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80"
              alt="Luxury watch protected by Kariv Buyer Protection"
              className="w-full h-full object-cover" />
            
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded p-4 shadow-lg hidden md:block">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-primary" strokeWidth={1.5} />
              <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-foreground">Protected Purchase</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}