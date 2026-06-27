import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Mail, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import TrustBar from '@/components/shared/TrustBar';

export default function CustomerService() {
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    base44.entities.FAQ.filter({}, 'sortOrder', 20).then(setFaqs).catch(console.error);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A367] mb-4 block">Support</span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-[#E5E5E5] tracking-tight mb-4">Customer Service</h1>
          <p className="text-sm text-[#8E8E93]">Our team of watch specialists is here to assist you.</p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            { icon: Mail, title: "Email", detail: "service@kariv-glamour.com", sub: "Response within 24 hours" },
            { icon: Phone, title: "Phone", detail: "+49 (0) 123 456 789", sub: "Mon–Fri, 9:00–18:00 CET" },
            { icon: MapPin, title: "Location", detail: "Germany", sub: "European headquarters" },
            { icon: Clock, title: "Hours", detail: "Mon–Fri 9–18 CET", sub: "Saturday by appointment" }
          ].map((item, i) => (
            <div key={i} className="border border-white/5 p-6 text-center">
              <item.icon size={24} className="text-[#C5A367] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-[11px] tracking-[0.12em] uppercase text-[#E5E5E5] font-medium mb-2">{item.title}</h3>
              <p className="text-xs text-[#E5E5E5]">{item.detail}</p>
              <p className="text-[10px] text-[#8E8E93] mt-1">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="border-t border-white/5 py-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-2xl text-[#E5E5E5] font-light mb-8 text-center">Send Us a Message</h2>
          {submitted ? (
            <div className="text-center py-12 border border-[#C5A367]/30">
              <p className="text-[#C5A367] text-sm">Thank you for your message. We'll respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Your Email" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
              </div>
              <input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="Subject" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full" />
              <textarea required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Your Message" className="bg-[#111] border border-white/10 text-sm text-[#E5E5E5] px-4 py-3 placeholder:text-[#555] outline-none focus:border-[#C5A367] w-full resize-none" />
              <button type="submit" className="w-full bg-[#C5A367] text-[#0A0A0B] text-[11px] tracking-[0.15em] uppercase font-medium py-4 hover:bg-[#B8944F] transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/5 py-16 bg-[#070707]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display text-2xl text-[#E5E5E5] font-light mb-10 text-center">Frequently Asked Questions</h2>
          {faqs.length > 0 ? (
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={faq.id} className="border border-white/5">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-sm text-[#E5E5E5] pr-4">{faq.question}</span>
                    <ChevronDown size={16} className={`text-[#C5A367] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5">
                      <p className="text-xs text-[#8E8E93] leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-[#8E8E93]">FAQ content is being prepared. Please contact us directly for any questions.</p>
          )}
        </div>
      </section>

      <TrustBar />
    </div>
  );
}