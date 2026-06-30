import React, { useState, useEffect, useCallback } from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    eyebrow: 'Authentifizierte Luxusuhren',
    title: ['Entdecken Sie', 'authentische Luxusuhren', 'von den ikonischsten', 'Manufakturen der Welt.'],
    description: 'Eine kuratierte Auswahl an neuen, gebrauchten, vintage und Sammler-Uhren von Rolex, Patek Philippe, Omega, Cartier, Audemars Piguet und mehr.',
    cta: 'Luxusuhren entdecken',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=2000&q=80',
  },
  {
    eyebrow: 'Ikonische Manufakturen',
    title: ['Marken von', 'Weltklasse —', 'jede mit ihrer', 'eigenen Geschichte.'],
    description: 'Von Rolex bis Patek Philippe — erkunden Sie die Geschichten, Kollektionen und Referenzen der bedeutendsten Uhrenmarken der Welt.',
    cta: 'Marken erkunden',
    link: '/brands',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=2000&q=80',
  },
  {
    eyebrow: 'Kariv Sicherheit',
    title: ['Jede Uhr', 'geprüft,', 'zertifiziert', 'und garantiert.'],
    description: 'Unsere mehrstufige Authentifizierung durch zertifizierte Uhrmacher sorgt dafür, dass jedes Zeitmesser genau das ist, was es sein soll — echt.',
    cta: 'Unser Prozess',
    link: '/authentication',
    image: 'https://images.unsplash.com/photo-1606293459337-0b8d8b9bfbe9?auto=format&fit=crop&w=2000&q=80',
  },
  {
    eyebrow: 'Verkaufen & Tauschen',
    title: ['Ihre Uhr', 'verkaufen oder', 'tauschen —', 'fair und transparent.'],
    description: 'Erhalten Sie eine professionelle Bewertung und den besten Preis für Ihre Luxusuhr. Unser Team begleitet Sie durch den gesamten Prozess.',
    cta: 'Jetzt verkaufen',
    link: '/sell-trade',
    image: 'https://images.unsplash.com/photo-1622434641406-a158ff6f4e91?auto=format&fit=crop&w=2000&q=80',
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full h-[68vh] md:h-[75vh] overflow-hidden bg-background">
      {/* Slides */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.eyebrow} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-[10px] tracking-[0.3em] uppercase text-primary mb-6 font-medium">
                {slide.eyebrow}
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight mb-6 font-bold [font-family:'Cormorant_Garamond',_serif]">
                {slide.title[0]}<br />
                {slide.title[1]}<br />
                {slide.title[2]}<br />
                <span className="text-primary italic">{slide.title[3]}</span>
              </h1>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-lg">
                {slide.description}
              </p>

              <LocalizedLink                 to={slide.link}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-primary/90 transition-colors group"
              >
                {slide.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </LocalizedLink>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Vorherige Folie"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-border bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/70 hover:border-primary transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Nächste Folie"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-border bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/70 hover:border-primary transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Folie ${i + 1}`}
            className={`h-1 transition-all duration-300 ${i === current ? 'w-10 bg-primary' : 'w-4 bg-foreground/30 hover:bg-foreground/50'}`}
          />
        ))}
      </div>
    </section>
  );
}