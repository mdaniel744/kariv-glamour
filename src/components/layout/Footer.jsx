import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_DISCLAIMER, BRAND_DATA } from '@/lib/constants';

const footerLinks = {
  company: [
  { label: "Über Kariv Glamour", to: "/about" },
  { label: "Authentifizierungsprozess", to: "/authentication" },
  { label: "Unsere Werte", to: "/about#values" },
  { label: "Verkaufen & Tauschen", to: "/sell-trade" }],

  service: [
  { label: "Kontakt", to: "/customer-service" },
  { label: "FAQ", to: "/customer-service#faq" },
  { label: "Versandinformationen", to: "/legal/shipping-policy" },
  { label: "Rückgabe & Rückerstattung", to: "/legal/returns-refund-policy" },
  { label: "Garantie", to: "/legal/warranty-policy" }],

  legal: [
  { label: "AGB", to: "/legal/terms-and-conditions" },
  { label: "Datenschutz", to: "/legal/privacy-policy" },
  { label: "Cookie-Richtlinie", to: "/legal/cookie-policy" },
  { label: "Impressum", to: "/legal/impressum" },
  { label: "Authenticity Disclaimer", to: "/legal/authenticity-disclaimer" },
  { label: "Brand Disclaimer", to: "/legal/brand-disclaimer" }],

  brands: BRAND_DATA.slice(0, 6).map((b) => ({ label: b.name, to: `/brands/${b.slug}` })).concat([{ label: "Alle Marken", to: "/brands" }])
};

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#C5A367] bg-[hsl(var(--primary))]">
      {/* Brand disclaimer */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-white/10">
        <p className="text-[11px] tracking-[0.05em] leading-relaxed text-white/60 max-w-4xl font-body">
          {BRAND_DISCLAIMER}
        </p>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <h2 className="font-display text-2xl tracking-[0.08em] text-white mb-4">
                <span className="font-light">KARIV</span>{' '}
                <span className="text-[#C5A367] font-semibold">GLAMOUR</span>
              </h2>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6 font-body">
              Ihr Ziel für authentifizierte Luxusuhren von den ikonischsten Manufakturen der Welt.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map((social) =>
              <a key={social} href="#" className="text-[11px] tracking-[0.1em] uppercase text-white/70 hover:text-[#C5A367] transition-colors font-medium">
                  {social.slice(0, 2)}
                </a>
              )}
            </div>
          </div>

          {/* Link columns */}
          {[
          { title: "Unternehmen", links: footerLinks.company },
          { title: "Kundenservice", links: footerLinks.service },
          { title: "Rechtliches", links: footerLinks.legal },
          { title: "Marken", links: footerLinks.brands }].
          map((col) =>
          <div key={col.title}>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#C5A367] font-semibold mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) =>
              <li key={link.to}>
                    <Link to={link.to} className="text-sm text-white/80 hover:text-[#C5A367] transition-colors font-body">
                      {link.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/60 font-body">© {new Date().getFullYear()} Kariv Glamour. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link to="/legal/privacy-policy" className="text-[11px] text-white/60 hover:text-[#C5A367] transition-colors">Datenschutz</Link>
            <Link to="/legal/terms-and-conditions" className="text-[11px] text-white/60 hover:text-[#C5A367] transition-colors">AGB</Link>
            <Link to="/legal/cookie-policy" className="text-[11px] text-white/60 hover:text-[#C5A367] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>);

}