import React from 'react';
import { motion } from 'framer-motion';
import BpSection from './BpSection';

export default function BpHowItWorks({ copy }) {
  return (
    <BpSection id="how-it-works" title={copy.title}>
      {/* Desktop horizontal timeline */}
      <div className="hidden lg:block relative">
        <div className="absolute top-6 left-0 right-0 h-px bg-border" />
        <div className="grid grid-cols-6 gap-6">
          {copy.steps.map((step, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}>
            
              <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border border-primary text-primary font-display text-lg mb-5">
                {i + 1}
              </span>
              <h3 className="text-lg mb-2 [font-family:'Cormorant_Garamond',_serif] font-bold text-[hsl(var(--primary))]">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile / tablet vertical timeline */}
      <div className="lg:hidden space-y-8">
        {copy.steps.map((step, i) =>
        <div key={i} className="relative flex gap-5">
            <div className="flex flex-col items-center">
              <span className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-primary text-primary font-display text-lg flex-shrink-0">
                {i + 1}
              </span>
              {i < copy.steps.length - 1 && <span className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="pt-2 pb-2">
              <h3 className="text-lg text-foreground mb-2 [font-family:'Cormorant_Garamond',_serif] font-bold">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          </div>
        )}
      </div>
    </BpSection>);

}
