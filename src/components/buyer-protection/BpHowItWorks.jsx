import React from 'react';
import { motion } from 'framer-motion';
import BpSection from './BpSection';

const STEPS = [
  { title: 'Choose Your Watch', text: 'Browse luxury watches from trusted sellers and review important details such as brand, model, reference number, condition, year, box and papers, service history, price, and shipping information.' },
  { title: 'Pay Securely Through Kariv', text: 'When your order is eligible for Kariv Escrow, your payment is held securely instead of being released immediately to the seller.' },
  { title: 'Seller Ships the Watch', text: 'The seller ships the watch using an insured shipping method with tracking. Shipment details are added to your order so you can follow the delivery.' },
  { title: 'Inspect Your Watch', text: 'After delivery, you have time to inspect the watch, compare it with the product listing, and confirm that the condition, documents, and accessories match the description.' },
  { title: 'Seller Receives Payment', text: 'Only after the buyer protection period has passed, or after the order is confirmed, is the payment released to the seller.' },
  { title: 'Support Is Available', text: 'If something is wrong, Kariv Glamour support helps guide the next steps, including return, refund, or dispute review where applicable.' },
];

export default function BpHowItWorks() {
  return (
    <BpSection id="how-it-works" title="How Kariv Buyer Protection Works">
      {/* Desktop horizontal timeline */}
      <div className="hidden lg:block relative">
        <div className="absolute top-6 left-0 right-0 h-px bg-border" />
        <div className="grid grid-cols-6 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border border-primary text-primary font-display text-lg mb-5">
                {i + 1}
              </span>
              <h3 className="font-display text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile / tablet vertical timeline */}
      <div className="lg:hidden space-y-8">
        {STEPS.map((step, i) => (
          <div key={i} className="relative flex gap-5">
            <div className="flex flex-col items-center">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-primary text-primary font-display text-lg flex-shrink-0">
                {i + 1}
              </span>
              {i < STEPS.length - 1 && <span className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="pt-2 pb-2">
              <h3 className="font-display text-lg text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </BpSection>
  );
}