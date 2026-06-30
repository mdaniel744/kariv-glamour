import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useLanguage } from '@/lib/languageContext';
import { isDealer } from '@/lib/escrowConstants';

export default function RoleGuard({ children, requireDealer = false }) {
  const { user, isAuthenticated, isLoadingAuth } = useAuth();
  const { localePath } = useLanguage();

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireDealer && !isDealer(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-2xl text-foreground mb-3">Dealer Access Required</h1>
          <p className="text-sm text-muted-foreground mb-6">
            This area is restricted to approved dealers. If you'd like to list watches on Kariv Glamour, you can apply for dealer status from your portal.
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