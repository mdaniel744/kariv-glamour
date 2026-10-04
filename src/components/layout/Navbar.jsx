import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/AuthContext';
import { BRAND_DATA } from '@/lib/constants';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import KarivLogo from '@/components/shared/KarivLogo';

// Notification actions are only useful after sign-in. Keep their code and
// animation dependency out of the first load for public visitors.
const NotificationBell = dynamic(() => import('@/components/shared/NotificationBell'), { ssr: false });

const NAVIGATION_COPY = {
  cs: { open: 'Otevřít navigaci', close: 'Zavřít navigaci', home: 'Kariv Glamour — úvod', account: 'Můj účet', signIn: 'Přihlásit se', signUp: 'Registrovat se', createAccount: 'Vytvořit účet', mobile: 'Mobilní navigace', clearSearch: 'Vymazat hledání' },
  de: { open: 'Navigation öffnen', close: 'Navigation schließen', home: 'Kariv Glamour — Startseite', account: 'Mein Konto', signIn: 'Anmelden', signUp: 'Registrieren', createAccount: 'Konto erstellen', mobile: 'Mobile Navigation', clearSearch: 'Suche löschen' },
  en: { open: 'Open navigation menu', close: 'Close navigation menu', home: 'Kariv Glamour home', account: 'Account', signIn: 'Sign In', signUp: 'Sign Up', createAccount: 'Create Account', mobile: 'Mobile navigation', clearSearch: 'Clear search' },
};

export default function Navbar() {
  const router = useRouter();
  const { cartCount, wishlistCount } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation('navigation');
  const { localePath, locale } = useLanguage();
  const copy = NAVIGATION_COPY[locale] || NAVIGATION_COPY.en;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [buyOpen, setBuyOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const buyRef = useRef(null);
  const securityRef = useRef(null);

  const WATCH_CATEGORIES = [
    { label: t('categories.newArrivals'), to: '/shop?condition=New&condition=Unworn' },
    { label: t('categories.certifiedPreOwned'), to: '/shop?isCertifiedPreOwned=true' },
    { label: t('categories.vintageWatches'), to: '/shop?isVintage=true' },
    { label: t('categories.mensWatches'), to: '/shop?gender=Men' },
    { label: t('categories.womensWatches'), to: '/shop?gender=Women' },
    { label: t('categories.unisexWatches'), to: '/shop?gender=Unisex' }
  ];

  const SECURITY_LINKS = [
    { label: t('security.buyerProtection'), to: '/buyer-protection' },
    { label: t('security.faqs'), to: '/customer-service' },
    { label: t('security.returnsRefunds'), to: '/legal/returns-refund-policy' },
    { label: t('security.shippingDelivery'), to: '/legal/shipping-policy' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${localePath('/shop')}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Close dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (buyOpen && buyRef.current && !buyRef.current.contains(e.target)) setBuyOpen(false);
      if (securityOpen && securityRef.current && !securityRef.current.contains(e.target)) setSecurityOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [buyOpen, securityOpen]);

  const toggleBuy = () => {setBuyOpen((prev) => !prev);setSecurityOpen(false);};
  const toggleSecurity = () => {setSecurityOpen((prev) => !prev);setBuyOpen(false);};
  const closeMobile = () => {setMobileOpen(false);setMobileExpanded(null);};

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMobile();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="site-navigation fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 font-body backdrop-blur-md">
        {/* Top bar */}
        <div className="hidden md:block border-b border-border">
          <div className="w-full mx-auto px-6 py-2 flex justify-between items-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              {t('topBar')}
            </p>
            <div className="flex gap-6 items-center">
              <LocalizedLink to="/about" className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary">{t('about')}</LocalizedLink>
              <LocalizedLink to="/customer-service" className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary">{t('customerService')}</LocalizedLink>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="w-full mx-auto px-4 md:px-6">
          {/* Row 1: logo + visible search + actions */}
          <div className="flex items-center justify-between h-14 md:h-20 gap-2 md:gap-6">
            <div className="flex min-w-0 items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="-ml-2 flex h-10 w-10 items-center justify-center text-foreground md:hidden"
                aria-label={mobileOpen ? copy.close : copy.open}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <LocalizedLink to="/" onClick={closeMobile} className="flex-shrink-0 flex items-center" aria-label={copy.home}>
                <KarivLogo className="h-14 w-14 md:h-20 md:w-20" sizes="(min-width: 768px) 80px, 56px" loading="eager" />
              </LocalizedLink>
            </div>

            {/* Visible search bar (desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md items-center gap-3 border border-border rounded-full px-4 py-2 bg-card">
              <Search size={16} className="text-muted-foreground flex-shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="flex-1 w-full bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none font-body" />
              
              {searchQuery &&
              <button type="button" aria-label={copy.clearSearch} onClick={() => setSearchQuery('')} className="text-muted-foreground hover:text-foreground">
                  <X size={14} />
                </button>
              }
            </form>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1 md:gap-4">
              <LocalizedLink to="/wishlist" className="relative flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-primary" aria-label={t('common:pages.wishlist.title')}>
                <Heart size={18} />
                {wishlistCount > 0 &&
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                }
              </LocalizedLink>
              <LocalizedLink to="/cart" className="relative flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-primary" aria-label={t('common:pages.cart.label')}>
                <ShoppingBag size={18} />
                {cartCount > 0 &&
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                }
              </LocalizedLink>
              {isAuthenticated && <NotificationBell />}
              {isAuthenticated ? (
                <LocalizedLink to="/portal" className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-primary" aria-label={copy.account}>
                  <User size={18} />
                </LocalizedLink>
              ) : (
                <>
                <LocalizedLink to="/login" className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-primary md:hidden" aria-label={copy.signIn}>
                  <User size={18} />
                </LocalizedLink>
                <div className="hidden items-center gap-3 md:flex">
                  <LocalizedLink to="/login" className="text-xs font-medium uppercase tracking-[0.06em] text-foreground transition-colors hover:text-primary">
                    {copy.signIn}
                  </LocalizedLink>
                  <LocalizedLink to="/register" className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-primary-foreground transition-colors hover:bg-primary/90">
                    {copy.signUp}
                  </LocalizedLink>
                </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile search bar */}
          <form onSubmit={handleSearch} className="md:hidden flex items-center gap-3 border border-border rounded-full px-3 py-2 mb-2 bg-card">
            <Search size={16} className="text-muted-foreground flex-shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholderMobile')}
              className="flex-1 w-full bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none font-body" />
            
          </form>

          {/* Row 2: menu items (desktop) */}
          <div className="hidden md:flex items-center gap-7 border-t border-border py-3">
            {/* Buy a watch — mega dropdown */}
            <div ref={buyRef} className="relative">
              <button onClick={toggleBuy} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary/70">
                {t('buyWatch')} <ChevronDown size={12} className={`transition-transform ${buyOpen ? 'rotate-180' : ''}`} />
              </button>
              {buyOpen &&
                <div className="absolute top-full left-0 pt-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-200">
                  
                    <div className="flex h-[70vh] w-[70vw] items-center gap-12 rounded-2xl border border-border bg-popover p-10 shadow-lg">
                      {/* Watch brands */}
                      <div className="flex-1">
                        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.08em] text-primary">{t('watchBrands')}</p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {BRAND_DATA.map((b) =>
                        <LocalizedLink key={b.slug} to={`/brands/${b.slug}`} onClick={() => setBuyOpen(false)} className="block whitespace-nowrap text-[17px] font-medium tracking-normal text-muted-foreground transition-colors hover:text-primary">
                              {b.name}
                            </LocalizedLink>
                        )}
                        </div>
                      </div>
                      {/* Watch categories */}
                      <div className="w-72 border-l border-border pl-10">
                        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.08em] text-primary">{t('watchCategories')}</p>
                        <div className="space-y-5">
                          {WATCH_CATEGORIES.map((c) =>
                        <LocalizedLink key={c.to} to={c.to} onClick={() => setBuyOpen(false)} className="block text-[17px] font-medium tracking-normal text-muted-foreground transition-colors hover:text-primary">
                              {c.label}
                            </LocalizedLink>
                        )}
                        </div>
                      </div>
                    </div>
                </div>
              }
            </div>

            <LocalizedLink to="/shop" className="text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary/70">{t('topDeals')}</LocalizedLink>
            <LocalizedLink to="/brands" className="text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary/70">{t('watchCollections')}</LocalizedLink>

            {/* Kariv Security — dropdown */}
            <div ref={securityRef} className="relative">
              <button onClick={toggleSecurity} className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary/70">
                {t('karivSecurity')} <ChevronDown size={12} className={`transition-transform ${securityOpen ? 'rotate-180' : ''}`} />
              </button>
              {securityOpen &&
                <div className="absolute top-full left-0 pt-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-200">
                  
                    <div className="bg-popover border border-border rounded p-6 shadow-lg min-w-[260px]">
                      <div className="space-y-3">
                        {SECURITY_LINKS.map((s) =>
                      <LocalizedLink key={s.to} to={s.to} onClick={() => setSecurityOpen(false)} className="block text-sm font-medium tracking-normal text-muted-foreground transition-colors hover:text-primary">
                            {s.label}
                          </LocalizedLink>
                      )}
                      </div>
                    </div>
                </div>
              }
            </div>

            <LocalizedLink to="/guides" className="text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:text-primary/70">{t('watchGuides')}</LocalizedLink>
          </div>
        </div>
      </nav>

      {/* Mobile off-canvas menu */}
      {mobileOpen &&
        <div
          className="site-navigation fixed bottom-0 left-0 right-0 top-[102px] z-40 overflow-y-auto overscroll-contain border-t border-border bg-background font-body motion-safe:animate-in motion-safe:slide-in-from-left motion-safe:duration-300"
          role="dialog"
          aria-modal="true"
          aria-label={copy.mobile}>
          
            <div className="px-6 py-5 pb-10 space-y-1">
              {/* Buy a watch — expandable */}
              <div>
                <button
                onClick={() => setMobileExpanded(mobileExpanded === 'buy' ? null : 'buy')}
                className="flex w-full items-center justify-between py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">
                
                  {t('buyWatch')}
                  <ChevronDown size={18} className={`transition-transform ${mobileExpanded === 'buy' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'buy' &&
                <div className="overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
                  
                      <div className="pl-4 pt-2 pb-4 space-y-5">
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t('watchBrands')}</p>
                          <div className="space-y-2">
                            {BRAND_DATA.map((b) =>
                        <LocalizedLink key={b.slug} to={`/brands/${b.slug}`} onClick={closeMobile} className="block py-1 text-[15px] font-medium text-muted-foreground transition-colors hover:text-primary">
                                {b.name}
                              </LocalizedLink>
                        )}
                          </div>
                        </div>
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{t('watchCategories')}</p>
                          <div className="space-y-2">
                            {WATCH_CATEGORIES.map((c) =>
                        <LocalizedLink key={c.to} to={c.to} onClick={closeMobile} className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                                {c.label}
                              </LocalizedLink>
                        )}
                          </div>
                        </div>
                      </div>
                </div>
                }
              </div>

              <LocalizedLink to="/shop" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{t('topDeals')}</LocalizedLink>
              <LocalizedLink to="/brands" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{t('watchCollections')}</LocalizedLink>

              {/* Kariv Security — expandable */}
              <div>
                <button
                onClick={() => setMobileExpanded(mobileExpanded === 'security' ? null : 'security')}
                className="flex w-full items-center justify-between py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">
                
                  {t('karivSecurity')}
                  <ChevronDown size={18} className={`transition-transform ${mobileExpanded === 'security' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpanded === 'security' &&
                <div className="overflow-hidden motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
                  
                      <div className="pl-4 pt-2 pb-4 space-y-2">
                        {SECURITY_LINKS.map((s) =>
                    <LocalizedLink key={s.to} to={s.to} onClick={closeMobile} className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            {s.label}
                          </LocalizedLink>
                    )}
                      </div>
                </div>
                }
              </div>

              <LocalizedLink to="/guides" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{t('watchGuides')}</LocalizedLink>
              <LocalizedLink to="/sell-trade" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{t('sellTrade')}</LocalizedLink>
              <LocalizedLink to="/about" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{t('about')}</LocalizedLink>
              <LocalizedLink to="/customer-service" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{t('customerService')}</LocalizedLink>
              <div className="mt-3 flex flex-wrap items-center gap-3 border-y border-border py-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              {!isAuthenticated && (
                <div className="pt-4 mt-2 border-t border-border space-y-1">
                  <LocalizedLink to="/login" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{copy.signIn}</LocalizedLink>
                  <LocalizedLink to="/register" onClick={closeMobile} className="block py-2 text-base font-semibold tracking-normal text-foreground transition-colors hover:text-primary">{copy.createAccount}</LocalizedLink>
                </div>
              )}
            </div>
        </div>
      }
    </>);

}
