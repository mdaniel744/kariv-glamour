import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ROLEX_HERO_IMAGE } from '@/lib/rolexData';

const ANCHOR_LINKS = [
  { label: 'Collections', href: '#rolex-collections' },
  { label: 'New Arrivals', href: '#rolex-products' },
  { label: 'Pre-Owned Rolex', href: '/rolex-gebraucht-kaufen' },
  { label: 'Rolex Buying Guide', href: '/welche-rolex-kaufen' },
  { label: 'Rolex Maintenance', href: '#rolex-maintenance' },
];

export default function RolexHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: '#063528' }}>
      <div className="absolute inset-0">
        <img src={ROLEX_HERO_IMAGE} alt="Rolex watches at Kariv Glamour" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #063528 0%, rgba(6,53,40,0.85) 50%, rgba(6,53,40,0.4) 100%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: '#C5A572' }}>
            <Link to="/" className="hover:opacity-80" style={{ color: '#D4BC8E' }}>Start</Link>
            <ChevronRight size={10} />
            <Link to="/brands" className="hover:opacity-80" style={{ color: '#D4BC8E' }}>Marken</Link>
            <ChevronRight size={10} />
            <span style={{ color: '#FAF7F2' }}>Rolex</span>
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: '#C5A572' }}>
            Rolex Boutique
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ color: '#FAF7F2' }}>
            Rolex Watches at<br />
            <span className="italic" style={{ color: '#C5A572' }}>Kariv Glamour</span>
          </h1>

          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl" style={{ color: 'rgba(250,247,242,0.8)' }}>
            Discover a curated selection of Rolex watches, from timeless Datejust models to iconic professional watches such as the Submariner, Daytona, GMT-Master II and Explorer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#rolex-products"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#C5A572', color: '#063528' }}
            >
              Shop Rolex Watches
            </a>
            <a
              href="#rolex-collections"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: '#C5A572', color: '#FAF7F2' }}
            >
              Discover Rolex Collections
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {ANCHOR_LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[10px] tracking-[0.12em] uppercase transition-colors hover:opacity-80"
                style={{ color: '#D4BC8E' }}
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