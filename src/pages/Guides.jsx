import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.WatchGuides.filter({ published: true }, '-created_date', 50)
      .then(setGuides)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-14 text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-4 block">Knowledge</span>
        <h1 className="font-display text-4xl md:text-5xl font-light text-[#E5E5E5] tracking-tight mb-4">Watch Guides & Editorial</h1>
        <p className="text-sm text-[#8E8E93] max-w-xl mx-auto">
          Expert insights, buying guides, and horological knowledge from our team of watch specialists.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/10] bg-[#151515] mb-4" />
              <div className="h-3 bg-[#151515] w-20 mb-2" />
              <div className="h-4 bg-[#151515] w-full" />
            </div>
          ))}
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center py-20 border border-white/5">
          <BookOpen size={40} className="text-[#333] mx-auto mb-4" />
          <p className="text-[#8E8E93] text-sm mb-2">Our editorial team is preparing new content.</p>
          <p className="text-xs text-[#555]">Check back soon for buying guides, brand insights, and investment tips.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/guides/${guide.id}`} className="group block">
                <div className="aspect-[16/10] bg-[#111] overflow-hidden mb-4">
                  {guide.featuredImage && (
                    <img src={guide.featuredImage} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[#C5A367] mb-2 block">{guide.category}</span>
                <h2 className="text-sm text-[#E5E5E5] group-hover:text-[#C5A367] transition-colors leading-tight mb-2">{guide.title}</h2>
                {guide.excerpt && <p className="text-xs text-[#8E8E93] line-clamp-2 leading-relaxed">{guide.excerpt}</p>}
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}