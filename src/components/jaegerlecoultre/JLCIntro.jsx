import React from 'react';
import { Link } from 'react-router-dom';

export default function JLCIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Refined Swiss Watchmaking and High Horology</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Jaeger-LeCoultre is celebrated for refined Swiss watchmaking, the iconic <Link to="/jaeger-lecoultre/reverso" className="text-primary underline">Reverso</Link> case, ultra-thin dress watches, and high horology complications since 1833. From the reversible <Link to="/jaeger-lecoultre/reverso" className="text-primary underline">Reverso</Link> and the slim <Link to="/jaeger-lecoultre/master-ultra-thin" className="text-primary underline">Master Ultra Thin</Link>, to the classic <Link to="/jaeger-lecoultre/master-control" className="text-primary underline">Master Control</Link>, the sport-focused <Link to="/jaeger-lecoultre/polaris" className="text-primary underline">Polaris</Link>, the feminine <Link to="/jaeger-lecoultre/rendez-vous" className="text-primary underline">Rendez-Vous</Link>, and the high-watchmaking <Link to="/jaeger-lecoultre/duometre" className="text-primary underline">Duometre</Link>, JLC combines technical mastery with timeless elegance. Explore our selection of <Link to="/gebrauchte-jaeger-lecoultre" className="text-primary underline">pre-owned Jaeger-LeCoultre</Link> watches alongside new models.
        </p>
      </div>
    </section>
  );
}