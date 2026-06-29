import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { BRAND_DISCLAIMER, BRAND_DATA } from '@/lib/constants';

export default function Footer() {
  const { t } = useTranslation('navigation');

  const footerLinks = {
    company: [
      { label: t('footer.aboutKariv'), to: '/about' },
      { label: t('footer.authProcess'), to: '/authentication' },
      { label: t('footer.ourValues'), to: '/about#values' },
      { label: t('footer.sellTrade'), to: '/sell-trade' }
    ],
    service: [
      { label: t('footer.contact'), to: '/customer-service' },
      { label: t('footer.faq'), to: '/customer-service#faq' },
      { label: t('footer.shippingInfo'), to: '/legal/shipping-policy' },
      { label: t('footer.returnsRefund'), to: '/legal/returns-refund-policy' },
      { label: t('footer.warranty'), to: '/legal/warranty-policy' }
    ],
    legal: [
      { label: t('footer.termsConditions'), to: '/legal/terms-and-conditions' },
      { label: t('footer.privacyPolicy'), to: '/legal/privacy-policy' },
      { label: t('footer.cookiePolicy'), to: '/legal/cookie-policy' },
      { label: t('footer.impressum'), to: '/legal/impressum' },
      { label: t('footer.authenticityDisclaimer'), to: '/legal/authenticity-disclaimer' },
      { label: t('footer.brandDisclaimer'), to: '/legal/brand-disclaimer' }
    ],
    brands: BRAND_DATA.slice(0, 6).map((b) => ({ label: b.name, to: `/brands/${b.slug}` })).concat([{ label: t('footer.allBrands'), to: '/brands' }])
  };

  return (
    <footer className="border-t-2 border-[#C5A367] bg-[hsl(var(--primary))] dark:bg-[#060B14]">
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-white/10">
        <p className="text-[11px] tracking-[0.05em] leading-relaxed text-white/60 max-w-4xl font-body">
          {BRAND_DISCLAIMER}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <LocalizedLink to="/">
              <h2 className="font-display text-2xl tracking-[0.08em] text-white mb-4">
                <span className="font-light">KARIV</span>{' '}
                <span className="font-semibold text-[hsl(var(--popover))] dark:text-white">GLAMOUR</span>
              </h2>
            </LocalizedLink>
            <p className="text-sm text-white/70 leading-relaxed mb-6 font-body">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map((social) =>
              <a key={social} href="#" className="text-[11px] tracking-[0.1em] uppercase text-white/70 hover:text-[#C5A367] transition-colors font-medium">
                  {social.slice(0, 2)}
                </a>
              )}
            </div>
          </div>

          {[
            { title: t('footer.company'), links: footerLinks.company },
            { title: t('footer.service'), links: footerLinks.service },
            { title: t('footer.legal'), links: footerLinks.legal },
            { title: t('footer.brands'), links: footerLinks.brands }
          ].map((col) =>
          <div key={col.title}>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-[#C5A367] dark:text-white font-semibold mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) =>
              <li key={link.to}>
                    <LocalizedLink to={link.to} className="text-sm text-white/80 hover:text-[#C5A367] transition-colors font-body">
                      {link.label}
                    </LocalizedLink>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/60 font-body">© {new Date().getFullYear()} Kariv Glamour. {t('footer.allRightsReserved', { defaultValue: 'All rights reserved.' })}</p>
          <div className="flex gap-6">
            <LocalizedLink to="/legal/privacy-policy" className="text-[11px] text-white/60 hover:text-[#C5A367] transition-colors">{t('footer.privacyPolicy')}</LocalizedLink>
            <LocalizedLink to="/legal/terms-and-conditions" className="text-[11px] text-white/60 hover:text-[#C5A367] transition-colors">{t('footer.termsConditions')}</LocalizedLink>
            <LocalizedLink to="/legal/cookie-policy" className="text-[11px] text-white/60 hover:text-[#C5A367] transition-colors">{t('footer.cookies')}</LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}