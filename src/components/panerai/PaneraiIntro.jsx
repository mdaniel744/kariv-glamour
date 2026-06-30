import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';

export default function PaneraiIntro() {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">Bold Italian Design & Diving Heritage</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Panerai stands for bold Italian design, Swiss watchmaking precision, and military diving heritage. From the iconic <LocalizedLink to="/panerai/luminor" className="text-primary underline">Luminor</LocalizedLink> with its crown-protecting bridge to the historic <LocalizedLink to="/panerai/radiomir" className="text-primary underline">Radiomir</LocalizedLink>, the technical <LocalizedLink to="/panerai/submersible" className="text-primary underline">Submersible</LocalizedLink> dive watch, and the slimmer <LocalizedLink to="/panerai/luminor-due" className="text-primary underline">Luminor Due</LocalizedLink> — Panerai delivers bold, masculine timepieces with strong wrist presence. Explore our full collection or browse <LocalizedLink to="/panerai-gebraucht" className="text-primary underline">pre-owned Panerai</LocalizedLink> watches.
        </p>
      </div>
    </section>
  );
}