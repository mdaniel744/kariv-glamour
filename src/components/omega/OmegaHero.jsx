import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { OMEGA_HERO_IMAGE, OMEGA_THEME } from '@/lib/omegaData';

const ANCHOR_LINKS = [
  { label: 'Collections', href: '#omega-collections' },
  { label: 'New Arrivals', href: '#omega-products' },
  { label: 'Pre-Owned Omega', href: '/omega-gebraucht-kaufen' },
  { label: 'Omega Speedmaster', href: '/omega-speedmaster-kaufen' },
  { label: 'Omega Seamaster', href: '/omega-seamaster-kaufen' },
  { label: 'Omega Buying Guide', href: '/welche-omega-kaufen' },
  { label: 'Maintenance', href: '#omega-maintenance' },
];

export default function OmegaHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: OMEGA_THEME.black }}>
      <div className="absolute inset-0">
        <img src={OMEGA_HERO_IMAGE} alt="Omega watches at Kariv Glamour" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${OMEGA_THEME.black} 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.4) 100%)` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: OMEGA_THEME.steel }}>
            <Link to="/" className="hover:opacity-80" style={{ color: OMEGA_THEME.steelLight }}>Start</Link>
            <ChevronRight size={10} />
            <Link to="/brands" className="hover:opacity-80" style={{ color: OMEGA_THEME.steelLight }}>Marken</Link>
            <ChevronRight size={10} />
            <span style={{ color: OMEGA_THEME.white }}>Omega</span>
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: OMEGA_THEME.red }}>
            Omega Boutique
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ color: OMEGA_THEME.white }}>
            Omega Watches at<br />
            <span className="italic" style={{ color: OMEGA_THEME.red }}>Kariv Glamour</span>
          </h1>

          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Discover a curated selection of Omega watches, from the legendary Speedmaster Moonwatch to iconic Seamaster divers, elegant Constellation models and refined De Ville timepieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#omega-products"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: OMEGA_THEME.red, color: OMEGA_THEME.white }}
            >
              Shop Omega Watches
            </a>
            <a
              href="#omega-collections"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: OMEGA_THEME.steel, color: OMEGA_THEME.white }}
            >
              Discover Omega Collections
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {ANCHOR_LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[10px] tracking-[0.12em] uppercase transition-colors hover:opacity-80"
                style={{ color: OMEGA_THEME.steelLight }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}