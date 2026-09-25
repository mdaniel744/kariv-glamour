'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import MetaPixelConsent from './MetaPixelConsent';

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAuthPage = /\/(login|register|forgot-password|reset-password)$/.test(pathname);
  const isProtectedWorkspace = /\/(portal|dealer|admin)(\/|$)/.test(pathname);

  if (isAuthPage || isProtectedWorkspace) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 md:pt-40">
        {children}
      </main>
      <Footer />
      <MetaPixelConsent />
    </div>
  );
}
