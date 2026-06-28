import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const TEXTURE_BG = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4957f596d_generated_310565b9.png";

const guides = [
  {
    title: "Wie kauft man eine gebrauchte Luxusuhr sicher?",
    excerpt: "Ein umfassender Leitfaden für den sicheren Kauf von gebrauchten Luxusuhren.",
    tag: "Kaufleitfaden"
  },
  {
    title: "Was bedeuten Box und Papiere bei Luxusuhren?",
    excerpt: "Die Bedeutung von Originalbox und Papieren für Wert und Authentizität.",
    tag: "Authentifizierung"
  },
  {
    title: "Sind gebrauchte Luxusuhren eine gute Investition?",
    excerpt: "Das Investitionspotenzial von gebrauchten Luxusuhren auf dem heutigen Markt.",
    tag: "Investition"
  }
];

export default function EditorialSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 opacity-10">
        <img src={TEXTURE_BG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading index="06" title="Uhren-Guides & Editorial" subtitle="Experteneinblicke und Kaufleitfäden von unserem Team" linkTo="/guides" />
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <Link key={i} to="/guides" className="group block">
              <div className="border border-border p-8 hover:border-primary/30 transition-colors h-full flex flex-col">
                <span className="text-[9px] tracking-[0.2em] uppercase text-primary mb-4">{guide.tag}</span>
                <h3 className="font-display text-xl text-foreground font-normal mb-3 group-hover:text-primary transition-colors leading-tight">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-6">{guide.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-primary">
                  Weiterlesen <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}