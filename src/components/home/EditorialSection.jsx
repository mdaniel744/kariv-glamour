import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/shared/SectionHeading';

const TEXTURE_BG = "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4957f596d_generated_310565b9.png";

const guides = [
  {
    title: "Wie kauft man eine gebrauchte Luxusuhr sicher?",
    excerpt: "A comprehensive guide to purchasing pre-owned luxury watches with confidence and security.",
    tag: "Buying Guide"
  },
  {
    title: "Was bedeuten Box und Papiere bei Luxusuhren?",
    excerpt: "Understanding the significance of original box and papers for luxury watch value and authenticity.",
    tag: "Authentication"
  },
  {
    title: "Sind gebrauchte Luxusuhren eine gute Investition?",
    excerpt: "Exploring the investment potential of pre-owned luxury timepieces in today's market.",
    tag: "Investment"
  }
];

export default function EditorialSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 opacity-10">
        <img src={TEXTURE_BG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading index="06" title="Watch Guides & Editorial" subtitle="Expert insights and buying guides from our horological team" linkTo="/guides" />
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <Link key={i} to="/guides" className="group block">
              <div className="border border-white/10 p-8 hover:border-[#C5A367]/30 transition-colors h-full flex flex-col">
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#C5A367] mb-4">{guide.tag}</span>
                <h3 className="font-display text-xl text-[#E5E5E5] font-light mb-3 group-hover:text-[#C5A367] transition-colors leading-tight">
                  {guide.title}
                </h3>
                <p className="text-xs text-[#8E8E93] leading-relaxed flex-1 mb-6">{guide.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#C5A367]">
                  Read More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}