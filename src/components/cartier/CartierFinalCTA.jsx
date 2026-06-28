import React from 'react';
import { Link } from 'react-router-dom';
import { CARTIER_COLORS } from '@/lib/cartierData';

export default function CartierFinalCTA() {
  return (
    <section className="py-20 md:py-28 text-center" style={{ backgroundColor: CARTIER_COLORS.redDark }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-light mb-5" style={{ color: CARTIER_COLORS.ivory }}>Find Your Cartier Watch</h2>
        <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(247,242,234,0.8)' }}>Browse Cartier watches by collection, shape, material, movement, condition and price in one refined shopping experience.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/cartier-uhr-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: CARTIER_COLORS.gold, color: CARTIER_COLORS.redDark }}>Shop Cartier Watches</Link>
          <Link to="/cartier-tank-kaufen" className="inline-flex items-center justify-center px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors hover:opacity-80" style={{ borderColor: CARTIER_COLORS.ivory, color: CARTIER_COLORS.ivory }}>Explore Cartier Tank</Link>
        </div>
      </div>
    </section>
  );
}