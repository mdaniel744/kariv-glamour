import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_DISCLAIMER } from '@/lib/constants';

const footerLinks = {
  company: [
    { label: "About Kariv Glamour", to: "/about" },
    { label: "Authentication Process", to: "/authentication" },
    { label: "Our Values", to: "/about#values" },
    { label: "Sell or Trade", to: "/sell-trade" }
  ],
  service: [
    { label: "Contact", to: "/customer-service" },
    { label: "FAQ", to: "/customer-service#faq" },
    { label: "Shipping Information", to: "/legal/shipping-policy" },
    { label: "Returns & Refunds", to: "/legal/returns-refund-policy" },
    { label: "Warranty", to: "/legal/warranty-policy" },
    { label: "Track Order", to: "/customer-service#track" }
  ],
  legal: [
    { label: "Terms & Conditions", to: "/legal/terms-and-conditions" },
    { label: "Privacy Policy", to: "/legal/privacy-policy" },
    { label: "Cookie Policy", to: "/legal/cookie-policy" },
    { label: "Impressum", to: "/legal/impressum" },
    { label: "Authenticity Disclaimer", to: "/legal/authenticity-disclaimer" },
    { label: "Brand Disclaimer", to: "/legal/brand-disclaimer" }
  ],
  brands: [
    { label: "Rolex", to: "/brands/rolex" },
    { label: "Patek Philippe", to: "/brands/patek-philippe" },
    { label: "Omega", to: "/brands/omega" },
    { label: "Cartier", to: "/brands/cartier" },
    { label: "Audemars Piguet", to: "/brands/audemars-piguet" },
    { label: "All Brands", to: "/brands" }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/5">
      {/* Brand disclaimer */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-white/5">
        <p className="text-[10px] tracking-[0.05em] leading-relaxed text-[#8E8E93] max-w-4xl">
          {BRAND_DISCLAIMER}
        </p>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <h2 className="font-display text-xl tracking-[0.08em] text-[#E5E5E5] mb-4">
                <span className="font-light">KARIV</span>{' '}
                <span className="text-[#C5A367]">GLAMOUR</span>
              </h2>
            </Link>
            <p className="text-xs text-[#8E8E93] leading-relaxed mb-6">
              Your destination for authenticated luxury timepieces from the world's most iconic maisons.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-[10px] tracking-[0.1em] uppercase text-[#8E8E93] hover:text-[#C5A367] transition-colors">
                  {social.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "Company", links: footerLinks.company },
            { title: "Customer Service", links: footerLinks.service },
            { title: "Legal", links: footerLinks.legal },
            { title: "Brands", links: footerLinks.brands }
          ].map(col => (
            <div key={col.title}>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#C5A367] font-medium mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-xs text-[#8E8E93] hover:text-[#E5E5E5] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-[#8E8E93]">© {new Date().getFullYear()} Kariv Glamour. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/legal/privacy-policy" className="text-[10px] text-[#8E8E93] hover:text-[#E5E5E5]">Privacy</Link>
            <Link to="/legal/terms-and-conditions" className="text-[10px] text-[#8E8E93] hover:text-[#E5E5E5]">Terms</Link>
            <Link to="/legal/cookie-policy" className="text-[10px] text-[#8E8E93] hover:text-[#E5E5E5]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}