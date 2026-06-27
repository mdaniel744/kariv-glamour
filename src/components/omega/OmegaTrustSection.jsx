import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { OMEGA_TRUST_POINTS, OMEGA_TRUST_LINKS, OMEGA_THEME } from '@/lib/omegaData';

export default function OmegaTrustSection() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: OMEGA_THEME.black }}>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ShieldCheck size={32} className="mx-auto mb-6" style={{ color: OMEGA_THEME.red }} strokeWidth={1.5} />
          <span className="text-[10px] tracking-[0.3em] uppercase block mb-4" style={{ color: OMEGA_THEME.red }}>Trust</span>
          <h2 className="font-display text-3xl md:text-4xl font-light mb-10" style={{ color: OMEGA_THEME.white }}>
            Buying Omega Watches with Confidence
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {OMEGA_TRUST_POINTS.map((point, i) => (
              <div key={i} className="border p-4 text-left" style={{ borderColor: 'rgba(200,16,46,0.3)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>{point}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {OMEGA_TRUST_LINKS.map((link, i) => (
              <Link key={i} to={link.link} className="text-[10px] tracking-[0.12em] uppercase underline decoration-dotted hover:opacity-70" style={{ color: OMEGA_THEME.steelLight }}>
                {link.text}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}