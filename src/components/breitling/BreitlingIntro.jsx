import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function BreitlingIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-[hsl(var(--primary))]">Aviation Heritage and Chronograph Expertise</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Breitling is known for aviation heritage, precision chronographs, robust dive watches and professional instrument timepieces. From the iconic <LocalizedLink to="/breitling/navitimer" className="text-primary underline">Navitimer</LocalizedLink> with its circular slide rule bezel, to the versatile <LocalizedLink to="/breitling/chronomat" className="text-primary underline">Chronomat</LocalizedLink>, the dive-ready <LocalizedLink to="/breitling/superocean" className="text-primary underline">Superocean</LocalizedLink>, the bold <LocalizedLink to="/breitling/avenger" className="text-primary underline">Avenger</LocalizedLink> and the elegant <LocalizedLink to="/breitling/premier" className="text-primary underline">Premier</LocalizedLink>, Breitling watches appeal to collectors who value technical character, precision and purpose-built design. Explore our selection of <LocalizedLink to="/breitling-uhr-gebraucht" className="text-primary underline">pre-owned Breitling watches</LocalizedLink> alongside new models.
        </p>
      </div>
    </section>);

}