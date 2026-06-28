import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';

const WATCH_IMAGES = {
  dive: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b346ef9ce_generated_77e08c04.png",
  dress: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/01b715f36_generated_902f4c1f.png",
  vintage: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/99e2654b4_generated_582b8b21.png",
  women: "https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/3615c809c_generated_76b5ac75.png"
};

const categories = [
  { title: "Herrenuhren", subtitle: "Kollektion entdecken", to: "/shop?gender=Men", image: WATCH_IMAGES.dive, span: "md:col-span-2 md:row-span-2" },
  { title: "Damenuhren", subtitle: "Eleganz neu definiert", to: "/shop?gender=Women", image: WATCH_IMAGES.women, span: "" },
  { title: "Vintage & Sammlerstücke", subtitle: "Zeitlose Schätze", to: "/shop?isVintage=true", image: WATCH_IMAGES.vintage, span: "" },
  { title: "Neuheiten", subtitle: "Frisch eingetroffen", to: "/shop?isNewArrival=true", image: WATCH_IMAGES.dress, span: "md:col-span-2" }
];

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading index="04" title="Nach Kategorie einkaufen" subtitle="Finden Sie die perfekte Uhr für jeden Anlass" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[200px] md:auto-rows-[250px]">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cat.span}
            >
              <Link to={cat.to} className="block relative h-full overflow-hidden group">
                <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-7">
                  <h3 className="font-display text-lg md:text-xl text-white font-normal tracking-wide">{cat.title}</h3>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-white/60 mt-1">{cat.subtitle}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}