import React from 'react';
import { Link } from 'react-router-dom';

export default function BreitlingIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Aviation Heritage and Chronograph Expertise</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Breitling is known for aviation heritage, precision chronographs, robust dive watches and professional instrument timepieces. From the iconic <Link to="/breitling/navitimer" className="text-primary underline">Navitimer</Link> with its circular slide rule bezel, to the versatile <Link to="/breitling/chronomat" className="text-primary underline">Chronomat</Link>, the dive-ready <Link to="/breitling/superocean" className="text-primary underline">Superocean</Link>, the bold <Link to="/breitling/avenger" className="text-primary underline">Avenger</Link> and the elegant <Link to="/breitling/premier" className="text-primary underline">Premier</Link>, Breitling watches appeal to collectors who value technical character, precision and purpose-built design. Explore our selection of <Link to="/breitling-uhr-gebraucht" className="text-primary underline">pre-owned Breitling watches</Link> alongside new models.
        </p>
      </div>
    </section>
  );
}