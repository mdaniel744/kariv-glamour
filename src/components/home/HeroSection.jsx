import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGE = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/6923845b0_generated_73e41561.png";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] md:h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Luxusuhren Bewegung Makro" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block text-[10px] tracking-[0.3em] uppercase text-primary mb-6 font-medium">
            
            Authentifizierte Luxusuhren
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] tracking-tight mb-6 font-bold [font-family:'Cormorant_Garamond',_serif]">
            
            Entdecken Sie<br />
            authentische Luxusuhren<br />
            von den ikonischsten<br />
            <span className="text-primary italic">Manufakturen der Welt.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-lg">
            
            Eine kuratierte Auswahl an neuen, gebrauchten, vintage und Sammler-Uhren von Rolex, Patek Philippe, Omega, Cartier, Audemars Piguet und mehr.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4">
            
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:bg-primary/90 transition-colors group">
              
              Luxusuhren entdecken
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/brands"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium px-8 py-4 hover:border-primary hover:text-primary transition-colors">
              
              Marken erkunden
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-primary" />
      </motion.div>
    </section>);

}