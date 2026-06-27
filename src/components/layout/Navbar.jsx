import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useTheme } from '@/lib/themeContext';
import { BRAND_DATA } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [brandsOpen, setBrandsOpen] = useState(false);

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
            <div className="hidden md:flex items-center gap-8">
              <Link to="/shop" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium">Shop</Link>
              <div className="relative" onMouseEnter={() => setBrandsOpen(true)} onMouseLeave={() => setBrandsOpen(false)}>
                <Link to="/brands" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1">
                  Marken <ChevronDown size={12} />
                </Link>
                <AnimatePresence>
                  {brandsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-popover border border-border rounded p-6 grid grid-cols-3 gap-x-10 gap-y-3 min-w-[420px] shadow-lg">
                        {BRAND_DATA.map(b => (
                          <Link key={b.slug} to={`/brands/${b.slug}`} className="text-[11px] tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                            {b.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/shop?condition=New&condition=Unworn" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium">Neuheiten</Link>
              <Link to="/shop?isCertifiedPreOwned=true" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium">Pre-Owned</Link>
              <Link to="/guides" className="text-[11px] tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors font-medium">Guides</Link>
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
                { to: '/shop', label: 'Alle Uhren' },
                { to: '/brands', label: 'Marken' },
                { to: '/shop?condition=New&condition=Unworn', label: 'Neuheiten' },
                { to: '/shop?isCertifiedPreOwned=true', label: 'Certified Pre-Owned' },
                { to: '/shop?isVintage=true', label: 'Vintage' },
                { to: '/shop?gender=Men', label: 'Herrenuhren' },
                { to: '/shop?gender=Women', label: 'Damenuhren' },
                { to: '/sell-trade', label: 'Verkaufen & Tauschen' },
                { to: '/guides', label: 'Uhren-Guides' },
                { to: '/about', label: 'Über uns' },
                { to: '/customer-service', label: 'Kundenservice' },
              ].map(item => (
                <Link
                  key={item.to}
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