import React from 'react';
import { ShieldCheck, Search, Microscope, FileCheck, Award, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBar from '@/components/shared/TrustBar';

const steps = [
  { icon: Search, title: "Initial Assessment", desc: "Every timepiece begins with a thorough visual inspection of the case, dial, hands, bezel, and crown for signs of authenticity and condition." },
  { icon: Microscope, title: "Movement Inspection", desc: "Our certified watchmakers open and inspect the movement, verifying caliber, serial numbers, and confirming all components are genuine and original." },
  { icon: FileCheck, title: "Documentation Review", desc: "We verify all accompanying documentation including original papers, certificates, service records, and provenance history." },
  { icon: Award, title: "Condition Grading", desc: "Each watch receives a transparent condition grade — from New to Vintage — with detailed photography documenting every aspect." },
  { icon: BadgeCheck, title: "Certification", desc: "Watches that pass our inspection receive the Kariv Glamour authentication certification, your guarantee of authenticity." }
];

export default function Authentication() {
  return (
    <div>
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShieldCheck size={40} className="text-[#C5A367] mx-auto mb-6" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-4 block">Our Process</span>
            <h1 className="font-display text-4xl md:text-6xl font-light text-[#E5E5E5] tracking-tight mb-6">
              Authentication &<br />Inspection
            </h1>
            <p className="text-sm text-[#8E8E93] leading-relaxed max-w-xl mx-auto">
              Every timepiece at Kariv Glamour undergoes our rigorous multi-point authentication process. 
              We never compromise on authenticity — your confidence is our priority.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 items-start"
            >
              <div className="flex-shrink-0 w-16 text-right">
                <span className="font-display text-4xl text-[#C5A367]/30">0{i + 1}</span>
              </div>
              <div className="flex-1 border-l border-white/10 pl-8">
                <step.icon size={24} className="text-[#C5A367] mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-display text-[#E5E5E5] font-light mb-3">{step.title}</h3>
                <p className="text-sm text-[#8E8E93] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No counterfeits */}
      <section className="py-16 bg-[#070707]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl text-[#E5E5E5] font-light mb-4">Zero Tolerance for Counterfeits</h2>
          <p className="text-sm text-[#8E8E93] leading-relaxed">
            Kariv Glamour has a strict zero-tolerance policy for counterfeit, replica, or fake watches. 
            Every watch on our platform is guaranteed to be 100% authentic. We use brand names and model 
            names solely to identify genuine products.
          </p>
        </div>
      </section>

      <TrustBar />
    </div>
  );
}