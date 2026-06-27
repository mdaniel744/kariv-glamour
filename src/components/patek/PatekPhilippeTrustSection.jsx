import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { PATEK_TRUST_POINTS, PATEK_TRUST_LINKS, PATEK_THEME } from '@/lib/patekData';

export default function PatekPhilippeTrustSection() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: PATEK_THEME.ivory }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: PATEK_THEME.navy }}>Trust</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-5" style={{ color: PATEK_THEME.graphite }}>Buying Patek Philippe Watches with Confidence</h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto" style={{ color: PATEK_THEME.graphite }}>
            At Kariv Glamour, we are committed to transparency, authenticity, and a collector-focused shopping experience. Every Patek Philippe watch is presented with the details that matter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
          {PATEK_TRUST_POINTS.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <ShieldCheck size={16} className="flex-shrink-0 mt-0.5" style={{ color: PATEK_THEME.navy }} />
              <span className="text-xs leading-relaxed" style={{ color: PATEK_THEME.graphite }}>{point}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 pt-8 border-t" style={{ borderColor: 'rgba(26,43,74,0.15)' }}>
          {PATEK_TRUST_LINKS.map((link, i) => (
            <Link key={i} to={link.link} className="text-[11px] tracking-[0.12em] uppercase underline decoration-dotted hover:opacity-70" style={{ color: PATEK_THEME.navy }}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}