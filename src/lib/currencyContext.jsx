'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useLanguage } from './languageContext';
import { getProductPricing } from './productMerchant';
import { formatPrice } from './constants';
import { convertToCzk } from './currencyConversion';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children, exchangeRates = null }) {
  return <CurrencyContext.Provider value={exchangeRates}>{children}</CurrencyContext.Provider>;
}

export function useStorefrontPricing() {
  const { locale } = useLanguage();
  const exchangeRates = useContext(CurrencyContext);
  return useMemo(() => ({
    locale, exchangeRates,
    currency: locale === 'cs' ? 'CZK' : 'EUR',
    getPricing: (product) => getProductPricing(product, { locale, exchangeRates }),
    formatMoney: (amount, currency = locale === 'cs' ? 'CZK' : 'EUR') => formatPrice(amount, currency, locale),
    fromEuro: (amount) => locale === 'cs' ? convertToCzk(amount, 'EUR', exchangeRates) : amount,
  }), [locale, exchangeRates]);
}
