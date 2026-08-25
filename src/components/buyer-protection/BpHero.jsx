import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import MediaImage from '@/components/shared/MediaImage';
import { ShieldCheck, LockKeyhole, BadgeCheck, RotateCcw, Truck, Headset } from 'lucide-react';

const TRUST_BADGE_ICONS = [LockKeyhole, BadgeCheck, RotateCcw, Truck, ShieldCheck, Headset];


export default function BpHero({ copy }) {
  return (
    <section className="relative overflow-hidden bg-background border-b border-border">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary font-medium mb-6">
            <ShieldCheck size={14} /> {copy.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl text-foreground leading-tight mb-6 [font-family:'Cormorant_Garamond',_serif] font-bold">{copy.title}</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">
            {copy.description}
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <LocalizedLink to="/shop" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:opacity-90 transition-opacity">
              {copy.primaryCta}
            </LocalizedLink>
            <a href="#how-it-works" className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground text-[11px] tracking-[0.15em] uppercase font-medium hover:border-primary hover:text-primary transition-colors">
              {copy.secondaryCta}
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {copy.badges.map((label, i) => {
              const Icon = TRUST_BADGE_ICONS[i];
              return (
            <div key={i} className="flex items-center gap-2">
                <Icon size={16} className="text-primary flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[11px] tracking-wide text-muted-foreground leading-tight">{label}</span>
              </div>
              );
            })}
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border bg-secondary shadow-xl shadow-foreground/10">
            <MediaImage
              src="/media/buyer-protection.jpg"
              alt={copy.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={88}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded p-4 shadow-lg hidden md:block">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-primary" strokeWidth={1.5} />
              <span className="text-[11px] tracking-[0.15em] uppercase font-medium text-foreground">{copy.protectedPurchase}</span>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
