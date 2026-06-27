import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { PATEK_HERO_IMAGE, PATEK_THEME } from '@/lib/patekData';

const ANCHOR_LINKS = [
  { label: 'Collections', href: '#patek-collections' },
  { label: 'New Arrivals', href: '#patek-products' },
  { label: 'Pre-Owned Patek Philippe', href: '/patek-philippe-gebraucht-kaufen' },
  { label: 'Patek Philippe Buying Guide', href: '/welche-patek-philippe-kaufen' },
  { label: 'Watchmaking', href: '#patek-watchmaking' },
  { label: 'Maintenance', href: '#patek-maintenance' },
];

export default function PatekPhilippeHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: PATEK_THEME.navyDark }}>
      <div className="absolute inset-0">
        <img src={PATEK_HERO_IMAGE} alt="Patek Philippe watches at Kariv Glamour" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${PATEK_THEME.navyDark} 0%, rgba(15,29,51,0.85) 50%, rgba(15,29,51,0.4) 100%)` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: PATEK_THEME.champagne }}>
            <Link to="/" className="hover:opacity-80" style={{ color: PATEK_THEME.champagneLight }}>Start</Link>
            <ChevronRight size={10} />
            <Link to="/brands" className="hover:opacity-80" style={{ color: PATEK_THEME.champagneLight }}>Marken</Link>
            <ChevronRight size={10} />
            <span style={{ color: PATEK_THEME.ivory }}>Patek Philippe</span>
          </div>

          <span className="text-[10px] tracking-[0.3em] uppercase block mb-5" style={{ color: PATEK_THEME.champagne }}>
            Patek Philippe Boutique
          </span>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ color: PATEK_THEME.ivory }}>
            Patek Philippe Watches at<br />
            <span className="italic" style={{ color: PATEK_THEME.champagne }}>Kariv Glamour</span>
          </h1>

          <p className="text-sm md:text-base leading-relaxed mb-10 max-w-xl" style={{ color: 'rgba(248,245,239,0.8)' }}>
            Discover a curated selection of Patek Philippe watches, from refined Calatrava dress watches to iconic collector models such as the Nautilus, Aquanaut, Cubitus and Grand Complications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#patek-products"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: PATEK_THEME.champagne, color: PATEK_THEME.navyDark }}
            >
              Shop Patek Philippe Watches
            </a>
            <a
              href="#patek-collections"
              className="inline-flex items-center justify-center px-8 py-4 text-[11px] tracking-[0.15em] uppercase font-medium border transition-all hover:bg-white/5"
              style={{ borderColor: PATEK_THEME.champagne, color: PATEK_THEME.ivory }}
            >
              Discover Patek Philippe Collections
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {ANCHOR_LINKS.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-[10px] tracking-[0.12em] uppercase transition-colors hover:opacity-80"
                style={{ color: PATEK_THEME.champagneLight }}
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