import React from 'react';
import { LockKeyhole, BadgeCheck, RotateCcw, FileCheck, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import BpSection from './BpSection';

const ITEM_ICONS = [LockKeyhole, BadgeCheck, RotateCcw, FileCheck, Truck, ShieldCheck];

export default function BpIncluded({ copy }) {
  return (
    <BpSection title={copy.title} className="bg-secondary">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {copy.items.map((item, i) => {
          const Icon = ITEM_ICONS[i];
          return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-card border border-border rounded p-8 hover:border-primary/40 transition-colors"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary border border-border mb-6">
              <Icon size={26} className="text-primary" strokeWidth={1.5} />
            </span>
            <h3 className="font-display text-xl text-foreground mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
          );
        })}
      </div>
    </BpSection>
  );
}
