import React from 'react';
import LocalizedLink from '@/components/LocalizedLink';
import KarivLogo from '@/components/shared/KarivLogo';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { COMPANY_DETAILS } from '@/lib/companyDetails';
import { useLanguage } from '@/lib/languageContext';
import { Facebook, Instagram } from 'lucide-react';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/karivglamour/', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Kariv-Glamour/100063754812707/', icon: Facebook },
];

export default function Footer() {
  const { t } = useTranslation('navigation');
  const { locale } = useLanguage();
  const cookieSettingsLabel = locale === 'cs' ? 'Nastavení cookies' : locale === 'de' ? 'Cookie-Einstellungen' : 'Cookie settings';

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
            <LocalizedLink to="/" aria-label={`Kariv Glamour — ${t('common:home')}`} className="mb-5 inline-flex max-w-full items-center">
              <KarivLogo className="h-28 w-28 md:h-32 md:w-32" sizes="(min-width: 768px) 128px, 112px" />
            </LocalizedLink>
            <p className="text-sm text-[#496057] dark:text-white/70 leading-relaxed mb-6 font-body">
              {t('footer.description')}
            </p>
            <address className="space-y-1 text-sm not-italic leading-relaxed text-[#213d34] dark:text-white/80">
              <p className="font-semibold">{COMPANY_DETAILS.legalName}</p>
              <p>{COMPANY_DETAILS.registeredAddress}</p>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="inline-block break-all text-primary underline underline-offset-4 dark:text-[#C5A367]">
                {COMPANY_DETAILS.email}
              </a>
            </address>
            <nav aria-label={t('footer.followUs')} className="mt-7">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary dark:text-white">
                {t('footer.followUs')}
              </p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} — Kariv Glamour`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#cbdad0] px-4 text-sm font-medium text-[#213d34] transition-colors hover:border-primary hover:text-primary dark:border-white/25 dark:text-white dark:hover:border-[#C5A367] dark:hover:text-[#C5A367]">
                    <Icon size={18} aria-hidden="true" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </nav>
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
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <p className="max-w-5xl text-sm leading-relaxed text-[#496057] dark:text-white/70 font-body">
            <span className="font-semibold text-[#213d34] dark:text-white">{t('footer.disclaimerLabel')}</span>{' '}
            {t('footer.independenceDisclaimer')}{' '}
            <LocalizedLink to="/legal/brand-disclaimer" className="text-primary underline underline-offset-4 dark:text-[#C5A367]">
              {t('footer.brandDisclaimer')}
            </LocalizedLink>
            {' '}{t('footer.authenticityStatement')}{' '}
            <LocalizedLink to="/authentication" className="text-primary underline underline-offset-4 dark:text-[#C5A367]">
              {t('footer.authenticityStandards')}
            </LocalizedLink>
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#60766c] dark:text-white/60 font-body">{t('common:copyright', { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <LocalizedLink to="/legal/privacy-policy" className="text-[11px] text-[#496057] hover:text-primary dark:text-white/60 dark:hover:text-[#C5A367] transition-colors">{t('footer.privacyPolicy')}</LocalizedLink>
            <LocalizedLink to="/legal/terms-and-conditions" className="text-[11px] text-[#496057] hover:text-primary dark:text-white/60 dark:hover:text-[#C5A367] transition-colors">{t('footer.termsConditions')}</LocalizedLink>
            <LocalizedLink to="/legal/cookie-policy" className="text-[11px] text-[#496057] hover:text-primary dark:text-white/60 dark:hover:text-[#C5A367] transition-colors">{t('footer.cookies')}</LocalizedLink>
            <button type="button" onClick={() => window.dispatchEvent(new Event('kariv:open-ads-consent'))} className="text-[11px] text-[#496057] hover:text-primary dark:text-white/60 dark:hover:text-[#C5A367] transition-colors">
              {cookieSettingsLabel}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
