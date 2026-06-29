import React from 'react';
import { Link } from 'react-router-dom';

export default function GrandSeikoIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">The Pure Essentials of Watchmaking</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Grand Seiko raises the pure essentials of watchmaking to the level of art. Each timepiece embodies Japanese craftsmanship, precision, and a deep connection to nature. From the <Link to="/grand-seiko-snowflake" className="text-primary underline">Snowflake</Link> with its snowfield-inspired dial, to the <Link to="/grand-seiko-shunbun" className="text-primary underline">Shunbun</Link> capturing a fleeting spring moment, Grand Seiko dials reflect the beauty of Japan's four seasons. The brand's <Link to="/grand-seiko-spring-drive" className="text-primary underline">Spring Drive</Link> movement combines mechanical precision with quartz accuracy, while Zaratsu polishing creates distortion-free mirror finishes. Explore the <Link to="/grand-seiko/heritage" className="text-primary underline">Heritage</Link>, <Link to="/grand-seiko/elegance" className="text-primary underline">Elegance</Link>, <Link to="/grand-seiko/sport" className="text-primary underline">Sport</Link>, <Link to="/grand-seiko/evolution-9" className="text-primary underline">Evolution 9</Link>, and <Link to="/grand-seiko/masterpiece" className="text-primary underline">Masterpiece</Link> collections, or browse our selection of <Link to="/grand-seiko-gebraucht" className="text-primary underline">pre-owned Grand Seiko</Link> watches.
        </p>
      </div>
    </section>
  );
}