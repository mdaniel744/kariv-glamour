import React, { useState, useEffect, useRef } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { base44 } from '@/api/base44Client';
import BrandLogo from '@/components/shared/BrandLogo';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BrandMarquee() {
  const [brands, setBrands] = useState([]);
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const halfWidth = useRef(0);
  const isDragging = useRef(false);
  const [pause, setPause] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await base44.entities.Brands.list();
        setBrands(data.filter(b => b.brandLogoLight));
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfWidth.current = trackRef.current.scrollWidth / 2;
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [brands]);

  // Native non-passive wheel listener so we can preventDefault for horizontal scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta !== 0) {
        e.preventDefault();
        x.set(wrapX(x.get() - delta));
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [x]);

  const wrapX = (nx) => {
    const hw = halfWidth.current;
    if (hw <= 0) return nx;
    while (nx <= -hw) nx += hw;
    while (nx > 0) nx -= hw;
    return nx;
  };

  useAnimationFrame((t, delta) => {
    if (pause || isDragging.current || halfWidth.current === 0) return;
    const moveBy = -(delta / 1000) * 40; // 40px/s, drifting left
    x.set(wrapX(x.get() + moveBy));
  });

  const nudge = (dir) => {
    x.set(wrapX(x.get() + dir * 280));
  };

  const items = [...brands, ...brands];

  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Ausgewählte Manufakturen</span>
        <div className="flex gap-2">
          <button onClick={() => nudge(1)} className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors" aria-label="Nach links scrollen">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => nudge(-1)} className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors" aria-label="Nach rechts scrollen">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="overflow-hidden"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-10 md:gap-16 whitespace-nowrap cursor-grab active:cursor-grabbing select-none"
          style={{ x }}
          drag="x"
          dragConstraints={false}
          dragElastic={0.2}
          dragMomentum={true}
          onDragStart={() => { isDragging.current = true; setPause(true); }}
          onDragEnd={() => {
            isDragging.current = false;
            x.set(wrapX(x.get()));
          }}
        >
          {items.map((brand, i) => (
            <LocalizedLink               key={`${brand.slug}-${i}`}
              to={`/brands/${brand.slug}`}
              className="flex-shrink-0 h-20 md:h-28 flex items-center justify-center group"
            >
              <BrandLogo
                slug={brand.slug}
                light={brand.brandLogoLight}
                dark={brand.brandLogoDark}
                alt={`${brand.brandName} watches at Kariv Glamour`}
                className="h-full w-auto object-contain opacity-75 group-hover:opacity-100 transition-all duration-500"
              />
            </LocalizedLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
}