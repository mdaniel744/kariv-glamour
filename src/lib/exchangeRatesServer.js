import 'server-only';
import { cache } from 'react';
import { CNB_RATE_URL, parseCnbRates } from './currencyConversion.js';

// Public official fixing, shared by rendered prices, structured data and
// order creation. No credentials, markup, schema changes or catalogue writes.
export const getCzkExchangeRates = cache(async () => {
  try {
    const response = await fetch(CNB_RATE_URL, {
      next: { revalidate: 3600, tags: ['kariv-cnb-rates'] },
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw new Error(`CNB status ${response.status}`);
    return parseCnbRates(await response.text());
  } catch (error) {
    console.warn('CZK pricing temporarily unavailable:', error.message);
    return null;
  }
});
