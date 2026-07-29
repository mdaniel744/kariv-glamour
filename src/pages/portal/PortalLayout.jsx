'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Package, Heart, User, Store, LogOut, Mail } from 'lucide-react';
import { isDealer } from '@/lib/escrowConstants';
import LocalizedLink from '@/components/LocalizedLink';

export default function PortalLayout({ children }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { localePath } = useLanguage();

  const navItems = [
    { to: '/portal', icon: LayoutDashboard, label: t('pages.portal.dashboard'), exact: true },
    { to: '/portal/orders', icon: Package, label: t('pages.portal.orders') },
    { to: '/portal/mails', icon: Mail, label: 'Mails' },
    { to: '/portal/wishlist', icon: Heart, label: t('pages.portal.wishlist') },
    { to: '/portal/profile', icon: User, label: t('pages.portal.profile') },
  ];

  const handleLogout = () => logout();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border flex-shrink-0">
        <div className="p-5 border-b border-border">
          <LocalizedLink to="/" className="block">
            <span className="font-display text-sm tracking-[0.08em] text-foreground">
              <span className="font-light">KARIV</span> <span className="text-primary">GLAMOUR</span>
            </span>
          </LocalizedLink>
          <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground mt-1">{t('pages.portal.myPortal')}</p>
          {user && (
            <p className="text-xs text-foreground mt-3 truncate">{user.full_name || user.email}</p>
          )}
        </div>
        <nav className="p-3 space-y-0.5 flex md:flex-col overflow-x-auto">
          {navItems.map(item => {
            const active = item.exact ? pathname === localePath(item.to) : pathname.startsWith(localePath(item.to));
            return (
              <LocalizedLink key={item.to} to={item.to} className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs whitespace-nowrap transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                <item.icon size={15} />
                {item.label}
              </LocalizedLink>
            );
          })}

          {/* Dealer link — show if dealer, or "Become Dealer" if not */}
          {isDealer(user) ? (
            <LocalizedLink to="/dealer" className="flex items-center gap-3 px-3 py-2.5 rounded text-xs whitespace-nowrap transition-colors text-primary hover:bg-primary/10">
              <Store size={15} />
              Dealer Portal
            </LocalizedLink>
          ) : (
            <LocalizedLink to="/portal/become-dealer" className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs whitespace-nowrap transition-colors ${pathname.includes('become-dealer') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
              <Store size={15} />
              {t('pages.portal.becomeDealer')}
            </LocalizedLink>
          )}

          {['admin', 'super_admin'].includes(user?.role) && (
            <LocalizedLink to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded text-xs whitespace-nowrap transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
              <LayoutDashboard size={15} />
              Admin Console
            </LocalizedLink>
          )}
        </nav>

        <div className="p-3 md:mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded text-xs text-muted-foreground hover:text-destructive transition-colors w-full">
            <LogOut size={15} />
            {t('pages.portal.signOut')}
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
