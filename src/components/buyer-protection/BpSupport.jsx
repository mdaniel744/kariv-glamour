import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { Headset, ArrowRight, FileText, Truck, RotateCcw, ShieldCheck, Award, ClipboardList, Wrench, BookOpen, MessageCircle } from 'lucide-react';
import BpSection from './BpSection';

const RESOURCES = [
  { icon: ShieldCheck, title: 'Authentication Process', to: '/authentication' },
  { icon: Award, title: 'Condition Grading', to: '/guides' },
  { icon: RotateCcw, title: 'Returns and Refunds', to: '/legal/returns-and-refunds' },
  { icon: Truck, title: 'Shipping Policy', to: '/legal/shipping-and-delivery' },
  { icon: FileText, title: 'Terms and Conditions of Purchase', to: '/legal/terms-and-conditions' },
  { icon: BookOpen, title: 'Watch Box and Papers Guide', to: '/guides' },
  { icon: Wrench, title: 'Service History Guide', to: '/guides' },
  { icon: ClipboardList, title: 'How to Buy a Pre-Owned Luxury Watch Safely', to: '/guides' },
  { icon: MessageCircle, title: 'Contact Customer Service', to: '/customer-service' },
];

export default function BpSupport() {
  return (
    <>
      <section className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
          <Headset size={32} className="mx-auto mb-5" strokeWidth={1.5} />
          <h2 className="font-display text-3xl md:text-4xl font-light mb-4">Need help with a purchase?</h2>
          <p className="text-base text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto mb-8">
            Our support team is here to guide you before, during, and after your luxury watch purchase.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LocalizedLink to="/customer-service" className="inline-flex items-center justify-center px-6 py-3 bg-primary-foreground text-primary text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">Contact Support</LocalizedLink>
            <LocalizedLink to="/customer-service" className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground/40 text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-primary-foreground/10 transition-colors">Browse FAQ</LocalizedLink>
            <LocalizedLink to="/legal/returns-and-refunds" className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground/40 text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-primary-foreground/10 transition-colors">View Returns Policy</LocalizedLink>
            <LocalizedLink to="/legal/shipping-and-delivery" className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground/40 text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-primary-foreground/10 transition-colors">View Shipping Policy</LocalizedLink>
          </div>
        </div>
      </section>

      <BpSection title="Useful Buyer Resources" className="bg-secondary">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESOURCES.map((r, i) => (
            <LocalizedLink key={i} to={r.to} className="group flex items-center gap-4 bg-card border border-border rounded p-5 hover:border-primary/40 transition-colors">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-secondary border border-border flex-shrink-0">
                <r.icon size={20} className="text-primary" strokeWidth={1.5} />
              </span>
              <span className="text-sm text-foreground font-medium flex-1">{r.title}</span>
              <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </LocalizedLink>
          ))}
        </div>
      </BpSection>
    </>
  );
}