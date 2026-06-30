import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EDITORIAL_IMAGE = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4957f596d_generated_310565b9.png";

export default function EditorialHero() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 border border-border overflow-hidden">
          
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] overflow-hidden">
            <img
              src={EDITORIAL_IMAGE}
              alt="Kariv Glamour Kuratierung"
              className="absolute inset-0 w-full h-full object-cover" />
            
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center p-10 md:p-16 bg-secondary">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary mb-5">Das Kariv Prinzip</span>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-foreground leading-tight tracking-tight mb-6">Jede Uhrs ein
Versprechen.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
              Wir kuratieren nicht nur Uhren — wir kuratieren Vertrauen. Jedes Zeitmesser durchläuft eine mehrstufige Authentifizierung durch zertifizierte Uhrmacher, bevor er Teil unserer Kollektion wird.
            </p>
            <LocalizedLink to="/authentication"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-medium text-foreground hover:text-primary transition-colors group w-fit">
              
              Unser Prozess
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </LocalizedLink>
          </div>
        </motion.div>
      </div>
    </section>);

}