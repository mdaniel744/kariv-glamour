import React from 'react';
import { ShieldCheck, Eye, Award, Users, Globe, Heart } from 'lucide-react';
import TrustBar from '@/components/shared/TrustBar';
import { BRAND_DISCLAIMER } from '@/lib/constants';
import { motion } from 'framer-motion';

const TEXTURE_BG = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4957f596d_generated_310565b9.png";

const values = [
  { icon: ShieldCheck, title: "Authenticity First", desc: "Every timepiece undergoes rigorous authentication by our team of certified horological experts before it reaches our collection." },
  { icon: Eye, title: "Transparency", desc: "Detailed condition grading, comprehensive photography, and honest descriptions ensure you know exactly what you're acquiring." },
  { icon: Award, title: "Excellence", desc: "We curate only the finest examples of each reference, maintaining the highest standards of quality and provenance." },
  { icon: Users, title: "Client Focus", desc: "Our dedicated team of watch specialists provides personalised guidance throughout your acquisition journey." },
  { icon: Globe, title: "Global Reach", desc: "Fully insured worldwide shipping with white-glove service, ensuring your timepiece arrives safely wherever you are." },
  { icon: Heart, title: "Passion", desc: "Founded by collectors for collectors, our passion for fine watchmaking drives every decision we make." }
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={TEXTURE_BG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-6 block"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-light text-[#E5E5E5] tracking-tight mb-8"
          >
            A Destination for<br />
            <span className="text-[#C5A367] italic">Discerning Collectors</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-[#8E8E93] leading-relaxed max-w-2xl mx-auto"
          >
            Kariv Glamour is an independent luxury watch ecommerce platform dedicated to connecting collectors 
            with authenticated timepieces from the world's most iconic maisons. We believe that acquiring a 
            luxury watch should be as extraordinary as the timepiece itself.
          </motion.p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-4 block">Our Story</span>
            <h2 className="font-display text-3xl text-[#E5E5E5] font-light mb-6">Built by Collectors,<br />for Collectors</h2>
            <div className="space-y-4 text-sm text-[#8E8E93] leading-relaxed">
              <p>
                Kariv Glamour was born from a simple observation: acquiring an authenticated luxury watch 
                should be straightforward, transparent, and enjoyable. Too often, collectors face uncertainty 
                about authenticity, opaque pricing, and impersonal service.
              </p>
              <p>
                Our platform brings together the finest new, pre-owned, vintage, and collectible timepieces, 
                each inspected and authenticated by our team of horological experts. From a first Omega 
                Speedmaster to a rare Patek Philippe Grand Complication, we curate watches that tell stories.
              </p>
              <p>
                Based in Germany and serving collectors worldwide, Kariv Glamour combines digital excellence 
                with the personalised attention of a traditional watch boutique.
              </p>
            </div>
          </div>
          <div className="aspect-square bg-[#111]">
            <img
              src="https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/01b715f36_generated_902f4c1f.png"
              alt="Luxury watch craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-20 border-t border-white/5 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-4 block">Our Principles</span>
            <h2 className="font-display text-3xl text-[#E5E5E5] font-light">What Guides Us</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/5 p-8"
              >
                <val.icon size={24} className="text-[#C5A367] mb-5" strokeWidth={1.5} />
                <h3 className="text-sm text-[#E5E5E5] font-medium mb-3">{val.title}</h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ShieldCheck size={24} className="text-[#C5A367] mx-auto mb-4" />
          <h3 className="text-[11px] tracking-[0.15em] uppercase text-[#E5E5E5] font-medium mb-4">Brand Disclaimer</h3>
          <p className="text-xs text-[#8E8E93] leading-relaxed">{BRAND_DISCLAIMER}</p>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}