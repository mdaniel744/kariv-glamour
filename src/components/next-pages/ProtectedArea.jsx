'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { isAdmin, isDealer } from '@/lib/escrowConstants';

export default function ProtectedArea({ children, requireDealer = false, requireAdmin = false }) {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoadingAuth, authChecked } = useAuth();
  const { localePath } = useLanguage();

  // Real enforcement happens in middleware.js (clerkMiddleware + role check)
  // before this component ever renders — this is just the loading-state UI
  // and a client-side fallback in case of a stale/cached page.
  useEffect(() => {
    if (authChecked && !isLoadingAuth && !isAuthenticated) {
      const returnTo = `${pathname}${window.location.search}`;
      window.location.replace(`${localePath('/login')}?returnTo=${encodeURIComponent(returnTo)}`);
    }
  }, [authChecked, isAuthenticated, isLoadingAuth, localePath, pathname]);

  if (isLoadingAuth || !authChecked || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (requireDealer && !isDealer(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl text-foreground mb-3">Dealer Access Required</h1>
          <p className="text-sm text-muted-foreground mb-6">
            This area is restricted to approved dealers.
          </p>
          <a href={localePath('/portal')} className="inline-block bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase px-6 py-3">
            Go to Portal
          </a>
        </div>
      </div>
    );
  }

  if (requireAdmin && !isAdmin(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl text-foreground mb-3">Admin Access Required</h1>
          <p className="text-sm text-muted-foreground mb-6">
            This area is restricted to authorized administrators.
          </p>
          <a href={localePath('/portal')} className="inline-block bg-primary text-primary-foreground text-xs tracking-[0.15em] uppercase px-6 py-3">
            Go to Portal
          </a>
        </div>
      </div>
    );
  }

  return children;
}
