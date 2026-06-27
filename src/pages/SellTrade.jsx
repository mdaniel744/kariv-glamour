import React, { useState } from 'react';
import { ArrowRight, Upload, Search, Banknote, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: Upload, title: "Submit Your Watch", desc: "Share details and photos of your timepiece through our submission form." },
  { icon: Search, title: "Expert Evaluation", desc: "Our horological team evaluates your watch and provides a competitive offer within 48 hours." },
  { icon: Banknote, title: "Receive Payment or Trade", desc: "Accept our offer and receive secure payment, or trade towards a new timepiece from our collection." }
];

export default function SellTrade() {
  const [formData, setFormData] = useState({ name: '', email: '', brand: '', model: '', reference: '', year: '', condition: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-4 block">Sell or Trade</span>
          <h1 className="font-display text-4xl md:text-6xl font-light text-[#E5E5E5] tracking-tight mb-6">
            Your Watch Deserves<br />a <span className="text-[#C5A367] italic">New Chapter</span>
          </h1>
          <p className="text-sm text-[#8E8E93] leading-relaxed max-w-xl mx-auto">
            Whether you're looking to sell outright or trade towards your next acquisition, 
            we offer a seamless, transparent process with competitive valuations.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center border border-white/5 p-8"
            >
              <span className="font-display text-3xl text-[#C5A367]/30 block mb-4">0{i + 1}</span>
              <step.icon size={28} className="text-[#C5A367] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-sm text-[#E5E5E5] font-medium mb-3">{step.title}</h3>
              <p className="text-xs text-[#8E8E93] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-white/5 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl text-[#E5E5E5] font-light mb-8 text-center">Submit Your Watch</h2>
          {submitted ? (
            <div className="text-center py-12 border border-[#C5A367]/30">
              <ShieldCheck size={32} className="text-[#C5A367] mx-auto mb-4" />
              <p className="text-[#C5A367] text-sm mb-2">Submission Received</p>
              <p className="text-xs text-[#8E8E93]">Our team will evaluate your watch and respond within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Your Email" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="Brand" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
                <input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="Model" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
                <input value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} placeholder="Ref. Number" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <input value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="Year" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
                <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 outline-none focus:border-[#C5A367] w-full">
                  <option value="" className="bg-[#111]">Condition</option>
                  {["New", "Unworn", "Excellent", "Very Good", "Good", "Vintage"].map(c => (
                    <option key={c} value={c} className="bg-[#111]">{c}</option>
                  ))}
                </select>
              </div>
              <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Additional details (box, papers, service history...)" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full resize-none" />
              <button type="submit" className="w-full bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-[#B8944F] transition-colors flex items-center justify-center gap-2">
                Submit for Evaluation <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}