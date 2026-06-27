import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Package, Tag, Layers, ShoppingCart, Users, FileText, BookOpen, HelpCircle, LayoutDashboard } from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/brands', icon: Tag, label: 'Brands' },
  { to: '/admin/collections', icon: Layers, label: 'Collections' },
  { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/guides', icon: BookOpen, label: 'Guides' },
  { to: '/admin/legal', icon: FileText, label: 'Legal Pages' },
  { to: '/admin/faq', icon: HelpCircle, label: 'FAQ' }
];

export default function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0A0B] flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/5 flex-shrink-0 hidden md:block">
        <div className="p-5 border-b border-white/5">
          <Link to="/">
            <span className="font-display text-sm tracking-[0.08em] text-[#E5E5E5]">
              <span className="font-light">KARIV</span> <span className="text-[#C5A367]">GLAMOUR</span>
            </span>
          </Link>
          <p className="text-[9px] tracking-[0.15em] uppercase text-[#8E8E93] mt-1">Admin Console</p>
        </div>
        <nav className="p-3 space-y-0.5">
          {navItems.map(item => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs transition-colors ${
                  active ? 'bg-[#C5A367]/10 text-[#C5A367]' : 'text-[#8E8E93] hover:text-[#E5E5E5] hover:bg-white/5'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}