'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Package, Tag, Layers, ShoppingCart, Users, FileText, BookOpen, HelpCircle, LayoutDashboard, Store, Languages, BookMarked, Type, Settings, ScrollText, Star, HandCoins } from 'lucide-react';
import LocalizedLink from '@/components/LocalizedLink';
import { useLanguage } from '@/lib/languageContext';
import KarivLogo from '@/components/shared/KarivLogo';

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

export default function AdminLayout({ children }) {
  const { t } = useTranslation('admin');
  const pathname = usePathname();
  const { localePath, locale } = useLanguage();
  const copy = ({
    cs: { applications: 'Žádosti prodejců', offers: 'Cenové nabídky', translations: 'Překlady', glossary: 'Slovníček', strings: 'Texty rozhraní', settings: 'Nastavení překladů', logs: 'Protokol překladů' },
    de: { applications: 'Händleranträge', offers: 'Preisangebote', translations: 'Übersetzungen', glossary: 'Glossar', strings: 'Oberflächentexte', settings: 'Übersetzungseinstellungen', logs: 'Übersetzungsprotokolle' },
    en: { applications: 'Dealer Applications', offers: 'Product Offers', translations: 'Translations', glossary: 'Glossary', strings: 'Strings', settings: 'Translation Settings', logs: 'Translation Logs' },
  })[locale] || { applications: 'Dealer Applications', offers: 'Product Offers', translations: 'Translations', glossary: 'Glossary', strings: 'Strings', settings: 'Translation Settings', logs: 'Translation Logs' };

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: t('dashboard'), exact: true },
    { to: '/admin/products', icon: Package, label: t('products') },
    { to: '/admin/brands', icon: Tag, label: t('brands') },
    { to: '/admin/collections', icon: Layers, label: t('collections') },
    { to: '/admin/orders', icon: ShoppingCart, label: t('orders') },
    { to: '/admin/dealer-applications', icon: Store, label: copy.applications },
    { to: '/admin/offers', icon: HandCoins, label: copy.offers },
    { to: '/admin/dealer-reviews', icon: Star, label: t('dealerReviews') },
    { to: '/admin/customers', icon: Users, label: t('customers') },
    { to: '/admin/guides', icon: BookOpen, label: t('guides') },
    { to: '/admin/legal', icon: FileText, label: t('legal') },
    { to: '/admin/faq', icon: HelpCircle, label: t('faq') },
    { to: '/admin/translations', icon: Languages, label: copy.translations },
    { to: '/admin/glossary', icon: BookMarked, label: copy.glossary },
    { to: '/admin/strings', icon: Type, label: copy.strings },
    { to: '/admin/translation-settings', icon: Settings, label: copy.settings },
    { to: '/admin/translation-logs', icon: ScrollText, label: copy.logs }
  ];

  return (
    <>
    <AdminDarkMode />
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 border-r border-border flex-shrink-0 hidden md:block">
        <div className="p-5 border-b border-border">
          <LocalizedLink to="/" className="inline-flex">
            <KarivLogo className="h-20 w-20" loading="eager" />
          </LocalizedLink>
          <p className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground mt-1">{t('common:pages.portal.adminConsole')}</p>
        </div>
        <nav className="p-3 space-y-0.5">
           {navItems.map(item => {
             const target = localePath(item.to);
             const active = item.exact ? pathname === target : pathname.startsWith(target);
             return (
               <LocalizedLink
                 key={item.to}
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
          {children}
        </div>
      </main>
    </div>
    </>
  );
}
