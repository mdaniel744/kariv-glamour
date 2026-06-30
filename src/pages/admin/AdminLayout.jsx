import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LocalizedLink from '@/components/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { Package, Tag, Layers, ShoppingCart, Users, FileText, BookOpen, HelpCircle, LayoutDashboard } from 'lucide-react';

function AdminDarkMode() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      if (localStorage.getItem('kariv-theme') !== 'dark') {
        document.documentElement.classList.remove('dark');
      }
    };
  }, []);
  return null;
}

export default function AdminLayout() {
  const { t } = useTranslation('admin');
  const { pathname } = useLocation();

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: t('dashboard'), exact: true },
    { to: '/admin/products', icon: Package, label: t('products') },
    { to: '/admin/brands', icon: Tag, label: t('brands') },
    { to: '/admin/collections', icon: Layers, label: t('collections') },
    { to: '/admin/orders', icon: ShoppingCart, label: t('orders') },
    { to: '/admin/customers', icon: Users, label: t('customers') },
    { to: '/admin/guides', icon: BookOpen, label: t('guides') },
    { to: '/admin/legal', icon: FileText, label: t('legal') },
    { to: '/admin/faq', icon: HelpCircle, label: t('faq') }
  ];

  return (
    <>
    <AdminDarkMode />
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 border-r border-border flex-shrink-0 hidden md:block">
        <div className="p-5 border-b border-border">
          <LocalizedLink to="/">
            <span className="font-display text-sm tracking-[0.08em] text-foreground">
              <span className="font-light">KARIV</span> <span className="text-primary">GLAMOUR</span>
            </span>
          </LocalizedLink>
          <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground mt-1">Admin Console</p>
        </div>
        <nav className="p-3 space-y-0.5">
          {navItems.map(item => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <LocalizedLink                 key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs transition-colors ${
                  active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </LocalizedLink>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
    </>
  );
}