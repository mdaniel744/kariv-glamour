'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Plus, LogOut, Store, UserCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '@/components/LocalizedLink';

export default function DealerLayout({ children }) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { localePath } = useLanguage();

  const navItems = [
    { to: '/dealer', icon: LayoutDashboard, label: t('pages.dealer.dashboard'), exact: true },
    { to: '/dealer/listings', icon: Package, label: t('pages.dealer.listings') },
    { to: '/dealer/sales', icon: ShoppingCart, label: t('pages.dealer.sales') },
    { to: '/dealer/profile', icon: UserCircle, label: 'Dealer Profile' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border flex-shrink-0">
        <div className="p-5 border-b border-border">
          <LocalizedLink to="/" className="block">
            <span className="font-display text-sm tracking-[0.08em] text-foreground">
              <span className="font-light">KARIV</span> <span className="text-primary">GLAMOUR</span>
            </span>
          </LocalizedLink>
          <div className="flex items-center gap-2 mt-1">
            <Store size={10} className="text-primary" />
            <p className="text-[9px] tracking-[0.15em] uppercase text-primary">{t('pages.dealer.dealerPortal')}</p>
          </div>
          {user && <p className="text-xs text-foreground mt-3 truncate">{user.full_name || user.email}</p>}
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
          <LocalizedLink to="/dealer/listings/new" className="flex items-center gap-3 px-3 py-2.5 rounded text-xs whitespace-nowrap transition-colors bg-primary/10 text-primary hover:bg-primary/20">
            <Plus size={15} />
            {t('pages.dealer.listNewWatch')}
          </LocalizedLink>
          <LocalizedLink to="/portal" className="flex items-center gap-3 px-3 py-2.5 rounded text-xs whitespace-nowrap transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
            <LayoutDashboard size={15} />
            {t('pages.dealer.buyerPortal')}
          </LocalizedLink>

        </nav>
        <div className="p-3 md:mt-auto">
          <button onClick={() => logout()} className="flex items-center gap-3 px-3 py-2.5 rounded text-xs text-muted-foreground hover:text-destructive transition-colors w-full">
            <LogOut size={15} />
            {t('pages.dealer.signOut')}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
