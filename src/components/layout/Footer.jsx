import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import MediaImage from '@/components/shared/MediaImage';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '@/components/ThemeSwitcher';

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
      { label: t('footer.cookiePolicy'), to: '/legal/cookie-policy' },
      { label: t('footer.impressum'), to: '/legal/impressum' },
      { label: t('footer.authenticityDisclaimer'), to: '/legal/authenticity-disclaimer' },
      { label: t('footer.brandDisclaimer'), to: '/legal/brand-disclaimer' }
    ]
  };

  return (
    <footer className="border-t border-[#dce5df] bg-[#fbfcfa] dark:border-[#263747] dark:bg-[#060B14]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <LocalizedLink to="/" aria-label="Kariv Glamour home" className="mb-5 inline-flex max-w-full items-center">
              <MediaImage
                src="/logos/kariv-glamour-desktop-green.webp"
                alt="Kariv Glamour"
                width={320}
                height={56}
                sizes="(min-width: 768px) 220px, 240px"
                quality={88}
                className="h-12 w-[240px] max-w-full object-cover object-center md:w-[220px] dark:hidden"
                draggable={false}
              />
              <MediaImage
                src="/logos/kariv-glamour-desktop-white.webp"
                alt="Kariv Glamour"
                width={320}
                height={56}
                sizes="(min-width: 768px) 220px, 240px"
                quality={88}
                className="hidden h-12 w-[240px] max-w-full object-cover object-center md:w-[220px] dark:block"
                draggable={false}
              />
            </LocalizedLink>
            <p className="text-sm text-[#496057] dark:text-white/70 leading-relaxed mb-6 font-body">
              {t('footer.description')}
            </p>
            <div className="mt-8">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary dark:text-white">
                {t('footer.appearance')}
              </p>
              <ThemeSwitcher />
            </div>
          </div>

          {[
            { title: t('footer.company'), links: footerLinks.company },
            { title: t('footer.service'), links: footerLinks.service },
            { title: t('footer.legal'), links: footerLinks.legal }
          ].map((col) =>
          <div key={col.title}>
              <h3 className="text-[11px] tracking-[0.2em] uppercase text-primary dark:text-white font-semibold mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) =>
              <li key={link.to}>
                    <LocalizedLink to={link.to} className="text-sm text-[#213d34] hover:text-primary dark:text-white/80 dark:hover:text-[#C5A367] transition-colors font-body">
                      {link.label}
                    </LocalizedLink>
                  </li>
              )}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#dce5df] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#60766c] dark:text-white/60 font-body">© {new Date().getFullYear()} Kariv Glamour. {t('footer.allRightsReserved', { defaultValue: 'All rights reserved.' })}</p>
          <div className="flex gap-6">
            <LocalizedLink to="/legal/privacy-policy" className="text-[11px] text-[#496057] hover:text-primary dark:text-white/60 dark:hover:text-[#C5A367] transition-colors">{t('footer.privacyPolicy')}</LocalizedLink>
            <LocalizedLink to="/legal/terms-and-conditions" className="text-[11px] text-[#496057] hover:text-primary dark:text-white/60 dark:hover:text-[#C5A367] transition-colors">{t('footer.termsConditions')}</LocalizedLink>
            <LocalizedLink to="/legal/cookie-policy" className="text-[11px] text-[#496057] hover:text-primary dark:text-white/60 dark:hover:text-[#C5A367] transition-colors">{t('footer.cookies')}</LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
