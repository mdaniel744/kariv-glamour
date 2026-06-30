import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function JLCIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Refined Swiss Watchmaking and High Horology</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Jaeger-LeCoultre is celebrated for refined Swiss watchmaking, the iconic <LocalizedLink to="/jaeger-lecoultre/reverso" className="text-primary underline">Reverso</LocalizedLink> case, ultra-thin dress watches, and high horology complications since 1833. From the reversible <LocalizedLink to="/jaeger-lecoultre/reverso" className="text-primary underline">Reverso</LocalizedLink> and the slim <LocalizedLink to="/jaeger-lecoultre/master-ultra-thin" className="text-primary underline">Master Ultra Thin</LocalizedLink>, to the classic <LocalizedLink to="/jaeger-lecoultre/master-control" className="text-primary underline">Master Control</LocalizedLink>, the sport-focused <LocalizedLink to="/jaeger-lecoultre/polaris" className="text-primary underline">Polaris</LocalizedLink>, the feminine <LocalizedLink to="/jaeger-lecoultre/rendez-vous" className="text-primary underline">Rendez-Vous</LocalizedLink>, and the high-watchmaking <LocalizedLink to="/jaeger-lecoultre/duometre" className="text-primary underline">Duometre</LocalizedLink>, JLC combines technical mastery with timeless elegance. Explore our selection of <LocalizedLink to="/gebrauchte-jaeger-lecoultre" className="text-primary underline">pre-owned Jaeger-LeCoultre</LocalizedLink> watches alongside new models.
        </p>
      </div>
    </section>
  );
}