'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/lib/AuthContext';
import { CartProvider } from '@/lib/cartContext';
import { LanguageProvider } from '@/lib/languageContext';
import { queryClientInstance } from '@/lib/query-client';
import { ThemeProvider } from '@/lib/themeContext';
import { CurrencyProvider } from '@/lib/currencyContext';
const Toaster = dynamic(
  () => import('@/components/ui/toaster').then((mod) => mod.Toaster),
  { ssr: false }
);

export default function Providers({ children, initialLocale = 'de', initialExchangeRates = null }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ThemeProvider>
          <CartProvider>
            <LanguageProvider initialLocale={initialLocale}>
              <CurrencyProvider exchangeRates={initialExchangeRates}>{children}</CurrencyProvider>
            </LanguageProvider>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
