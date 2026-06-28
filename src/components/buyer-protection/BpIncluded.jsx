import React from 'react';
import { LockKeyhole, BadgeCheck, RotateCcw, FileCheck, Truck, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import BpSection from './BpSection';

const ITEMS = [
  { icon: LockKeyhole, title: 'Payment via Escrow Service', text: 'Your payment is securely held until your watch is delivered and you have time to inspect it.' },
  { icon: BadgeCheck, title: 'Commitment to Authenticity', text: 'Every listed watch must be authentic. Dealers are required to list only original timepieces.' },
  { icon: RotateCcw, title: '14-Day Global Money-Back Guarantee', text: 'If the watch is defective, not as described, or does not meet the agreed listing details, you can start a return within 14 days after delivery.' },
  { icon: FileCheck, title: 'Strict Dealer Guidelines', text: 'Dealers must follow Kariv Glamour\u2019s marketplace rules and verification requirements before selling.' },
  { icon: Truck, title: 'Insured Shipments', text: 'Orders must be shipped with insurance and tracking to help protect both domestic and international purchases.' },
  { icon: ShieldCheck, title: 'Kariv Quality & Security Team', text: 'Our support and security team reviews issues, monitors suspicious activity, and assists buyers throughout the purchase process.' },
];

export default function BpIncluded() {
  return (
    <BpSection title="What\u2019s Included in Kariv Buyer Protection?" className="bg-secondary">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-card border border-border rounded p-8 hover:border-primary/40 transition-colors"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary border border-border mb-6">
              <item.icon size={26} className="text-primary" strokeWidth={1.5} />
            </span>
            <h3 className="font-display text-xl text-foreground mb-3">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </BpSection>
  );
}