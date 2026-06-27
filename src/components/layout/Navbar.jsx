import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useTheme } from '@/lib/themeContext';
import { BRAND_DATA } from '@/lib/constants';
import BrandFavicon from '@/components/shared/BrandFavicon';
import { motion, AnimatePresence } from 'framer-motion';

const WATCH_CATEGORIES = [
  { label: 'New Arrivals', to: '/shop?condition=New&condition=Unworn' },
  { label: 'Certified Pre-Owned', to: '/shop?isCertifiedPreOwned=true' },
  { label: 'Vintage Watches', to: '/shop?isVintage=true' },
  { label: "Men's Watches", to: '/shop?gender=Men' },
  { label: "Women's Watches", to: '/shop?gender=Women' },
  { label: 'Unisex Watches', to: '/shop?gender=Unisex' },
];

const SECURITY_LINKS = [
  { label: 'Buyer Protection', to: '/authentication' },
  { label: 'FAQs', to: '/customer-service' },
  { label: 'Returns & Refunds', to: '/legal/returns-and-refunds' },
  { label: 'Shipping & Delivery', to: '/legal/shipping-and-delivery' },
];

export default function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [buyOpen, setBuyOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        {/* Top bar */}
        <div className="hidden md:block border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body">
              Authentifizierte Luxusuhren · Weltweit versichert
            </p>
            <div className="flex gap-6 items-center">
              <Link to="/about" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">Über uns</Link>
              <Link to="/customer-service" className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">Kundenservice</Link>
              <button onClick={toggleTheme} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Theme toggle">
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu button */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-display text-xl md:text-2xl tracking-[0.08em] text-foreground">
                <span className="font-light">KARIV</span>{' '}
                <span className="text-primary font-normal">GLAMOUR</span>
              </h1>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-7">
              {/* Buy a watch — mega dropdown */}
              <div className="relative" onMouseEnter={() => setBuyOpen(true)} onMouseLeave={() => setBuyOpen(false)}>
                <Link to="/shop" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                  Buy a watch <ChevronDown size={12} />
                </Link>
                <AnimatePresence>
                  {buyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-4"
                    >
                      <div className="bg-popover border border-border rounded p-8 shadow-lg flex gap-10 w-[720px]">
                        {/* Watch brands */}
                        <div className="flex-1">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium mb-4">Watch Brands</p>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                            {BRAND_DATA.map(b => (
                              <Link key={b.slug} to={`/brands/${b.slug}`} className="flex items-center gap-2 text-[11px] tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                                <BrandFavicon slug={b.slug} className="h-3.5 w-auto" alt="" />
                                {b.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                        {/* Watch categories */}
                        <div className="w-52 border-l border-border pl-8">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-primary font-medium mb-4">Watch Categories</p>
                          <div className="space-y-3">
                            {WATCH_CATEGORIES.map(c => (
                              <Link key={c.to} to={c.to} className="block text-[11px] tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors">
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/shop" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium">Top Deals</Link>
              <Link to="/brands" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium">Watch Collections</Link>

              {/* Kariv Security — dropdown */}
              <div className="relative" onMouseEnter={() => setSecurityOpen(true)} onMouseLeave={() => setSecurityOpen(false)}>
                <Link to="/authentication" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                  Kariv Security <ChevronDown size={12} />
                </Link>
                <AnimatePresence>
                  {securityOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 pt-4"
                    >
                      <div className="bg-popover border border-border rounded p-6 shadow-lg min-w-[260px]">
                        <div className="space-y-3">
                          {SECURITY_LINKS.map(s => (
                            <Link key={s.to} to={s.to} className="block text-[11px] tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors">
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/guides" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium">Watch Guides</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-foreground hover:text-primary transition-colors">
                <Search size={18} />
              </button>
              <button onClick={toggleTheme} className="md:hidden text-foreground hover:text-primary transition-colors" aria-label="Theme toggle">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <Link to="/wishlist" className="relative text-foreground hover:text-primary transition-colors">
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center gap-4">
                  <Search size={18} className="text-muted-foreground" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Suche nach Marke, Kollektion, Referenznummer..."
                    className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground outline-none font-body"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background pt-20"
          >
            <div className="p-6 space-y-6">
              {[
                { to: '/shop', label: 'Buy a watch' },
                { to: '/shop', label: 'Top Deals' },
                { to: '/brands', label: 'Watch Collections' },
                { to: '/authentication', label: 'Buyer Protection' },
                { to: '/customer-service', label: 'FAQs' },
                { to: '/legal/returns-and-refunds', label: 'Returns & Refunds' },
                { to: '/legal/shipping-and-delivery', label: 'Shipping & Delivery' },
                { to: '/guides', label: 'Watch Guides' },
                { to: '/sell-trade', label: 'Verkaufen & Tauschen' },
                { to: '/about', label: 'Über uns' },
                { to: '/customer-service', label: 'Kundenservice' },
              ].map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg font-display tracking-wide text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}