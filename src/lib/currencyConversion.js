export const CNB_RATE_URL = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
const DAY = 86_400_000;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// CNB quotes CZK per Amount units (for example 100 JPY), not always per 1.
export function parseCnbRates(text, now = Date.now()) {
  const lines = String(text).trim().split(/\r?\n/);
  const date = lines[0]?.match(/^(\d{1,2}) ([A-Z][a-z]{2}) (\d{4}) #\d+$/);
  if (!date) throw new Error('Invalid CNB rate date');
  const month = MONTHS.indexOf(date[2]);
  const stamp = Date.UTC(Number(date[3]), month, Number(date[1]));
  const parsed = new Date(stamp);
  if (month < 0 || parsed.getUTCMonth() !== month || parsed.getUTCDate() !== Number(date[1])) throw new Error('Invalid CNB date');
  if (lines[1] !== 'Country|Currency|Amount|Code|Rate') throw new Error('Invalid CNB rate columns');
  const rates = { CZK: 1 };
  for (const line of lines.slice(2)) {
    if (!line.trim()) continue;
    const columns = line.split('|');
    const amount = Number(columns[2]);
    const rate = Number(columns[4]);
    const code = columns[3];
    if (columns.length !== 5 || !/^[A-Z]{3}$/.test(code) || !(amount > 0) || !(rate > 0) || !Number.isFinite(rate / amount)) throw new Error('Invalid CNB rate');
    rates[code] = rate / amount;
  }
  const snapshot = { date: parsed.toISOString().slice(0, 10), source: 'CNB', rates };
  if (!isUsableCnbSnapshot(snapshot, now) || !(rates.EUR > 0)) throw new Error('CNB rates unavailable or outdated');
  return snapshot;
}

export function isUsableCnbSnapshot(snapshot, now = Date.now()) {
  if (snapshot?.source !== 'CNB' || !/^\d{4}-\d{2}-\d{2}$/.test(snapshot.date || '')) return false;
  const stamp = Date.parse(`${snapshot.date}T00:00:00Z`);
  const age = now - stamp;
  // Weekends and public holidays do not have a new fixing. Never silently use
  // an indefinitely stale rate or a made-up 1:1 conversion during an outage.
  return Number.isFinite(age) && age >= -DAY && age <= 7 * DAY;
}

export function convertToCzk(amount, sourceCurrency, snapshot, now = Date.now()) {
  if (amount == null || amount === '' || !Number.isFinite(Number(amount)) || Number(amount) < 0) return null;
  if (sourceCurrency === 'CZK') {
    const minorUnits = Math.round((Number(amount) + Number.EPSILON) * 100);
    return Number.isSafeInteger(minorUnits) ? minorUnits / 100 : null;
  }
  if (!isUsableCnbSnapshot(snapshot, now)) return null;
  const rate = snapshot.rates?.[sourceCurrency];
  if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) return null;
  const minorUnits = Math.round((Number(amount) * rate + Number.EPSILON) * 100);
  return Number.isSafeInteger(minorUnits) ? minorUnits / 100 : null;
}

export function convertPricing(pricing, { locale, exchangeRates, now } = {}) {
  if (locale !== 'cs') return pricing;
  const convertedPrice = convertToCzk(pricing.price, pricing.currency, exchangeRates, now);
  const price = convertedPrice > 0 ? convertedPrice : null;
  return {
    price,
    regularPrice: convertToCzk(pricing.regularPrice, pricing.currency, exchangeRates, now),
    salePrice: pricing.salePrice != null && price != null ? price : null,
    currency: 'CZK',
    ...(price != null ? { conversion: {
      source_price: pricing.price, source_currency: pricing.currency,
      rate: pricing.currency === 'CZK' ? 1 : exchangeRates.rates[pricing.currency],
      rate_date: pricing.currency === 'CZK' ? null : exchangeRates.date,
      source: pricing.currency === 'CZK' ? 'original' : 'CNB',
    } } : {}),
  };
}

export function matchesCheckoutPrice(pricing, expectedPrice, expectedCurrency) {
  return typeof expectedPrice === 'number' && Number.isFinite(expectedPrice) && expectedPrice > 0 &&
    expectedPrice === pricing.price && expectedCurrency === pricing.currency;
}
