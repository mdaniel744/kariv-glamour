import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { OMEGA_TRUST_POINTS, OMEGA_TRUST_LINKS } from '@/lib/omegaData';

export default function OmegaTrustSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <ShieldCheck size={32} className="mx-auto mb-6 text-primary" strokeWidth={1.5} />
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4 text-primary">Trust</span>
          <h2 className="text-3xl md:text-4xl mb-10 [font-family:'Cormorant_Garamond',_serif] font-semibold text-[hsl(var(--primary))]">Buying Omega Watches with Confidence</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {OMEGA_TRUST_POINTS.map((point, i) =>
            <div key={i} className="border border-border bg-card p-4 text-left">
                <p className="text-xs leading-relaxed text-muted-foreground">{point}</p>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {OMEGA_TRUST_LINKS.map((link, i) =>
            <LocalizedLink key={i} to={link.link} className="text-[10px] tracking-[0.12em] uppercase underline decoration-dotted hover:opacity-70 text-primary">{link.text}</LocalizedLink>
            )}
          </div>
        </motion.div>
      </div>
    </section>);

}