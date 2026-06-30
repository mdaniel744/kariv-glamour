import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function GrandSeikoIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">The Pure Essentials of Watchmaking</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Grand Seiko raises the pure essentials of watchmaking to the level of art. Each timepiece embodies Japanese craftsmanship, precision, and a deep connection to nature. From the <LocalizedLink to="/grand-seiko-snowflake" className="text-primary underline">Snowflake</LocalizedLink> with its snowfield-inspired dial, to the <LocalizedLink to="/grand-seiko-shunbun" className="text-primary underline">Shunbun</LocalizedLink> capturing a fleeting spring moment, Grand Seiko dials reflect the beauty of Japan's four seasons. The brand's <LocalizedLink to="/grand-seiko-spring-drive" className="text-primary underline">Spring Drive</LocalizedLink> movement combines mechanical precision with quartz accuracy, while Zaratsu polishing creates distortion-free mirror finishes. Explore the <LocalizedLink to="/grand-seiko/heritage" className="text-primary underline">Heritage</LocalizedLink>, <LocalizedLink to="/grand-seiko/elegance" className="text-primary underline">Elegance</LocalizedLink>, <LocalizedLink to="/grand-seiko/sport" className="text-primary underline">Sport</LocalizedLink>, <LocalizedLink to="/grand-seiko/evolution-9" className="text-primary underline">Evolution 9</LocalizedLink>, and <LocalizedLink to="/grand-seiko/masterpiece" className="text-primary underline">Masterpiece</LocalizedLink> collections, or browse our selection of <LocalizedLink to="/grand-seiko-gebraucht" className="text-primary underline">pre-owned Grand Seiko</LocalizedLink> watches.
        </p>
      </div>
    </section>
  );
}