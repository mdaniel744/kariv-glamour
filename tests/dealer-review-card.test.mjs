import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { compileFunction } from 'node:vm';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as jsxRuntime from 'react/jsx-runtime';
import ts from 'typescript';

function compile(path, imports) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    fileName: path,
  });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency in ${path}: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return module.exports;
}

const translations = {
  'components.dealerReviews.verifiedBuyer': 'Verified Buyer',
  'components.dealerReviews.verifiedPurchase': 'Verified Purchase',
  'components.dealerReviews.dealerResponse': 'Dealer Response',
  'components.dealerReviews.reviewedWatches': 'Watches in this verified purchase',
};

function t(key, values = {}) {
  if (key === 'components.dealerReviews.ratingOutOfFive') return `${values.rating} out of 5 stars`;
  return translations[key] || key;
}

function buildComponents() {
  const Icon = (props) => React.createElement('i', props);
  const purchasesModule = compile('src/components/dealer/DealerReviewPurchases.jsx', {
    react: React,
    'react/jsx-runtime': jsxRuntime,
    'lucide-react': { Watch: Icon },
    'react-i18next': { useTranslation: () => ({ t }) },
    '@/components/shared/MediaImage': ({ src, alt, fill: _fill, ...props }) => React.createElement('img', { src, alt, ...props }),
    '@/lib/media': { getMediaVariant: (src, variant) => `${variant}:${src}` },
    '@/lib/localize': {
      useLocalizedField: () => ({
        localize: (record, field) => record?.[`${field}_de`] || record?.[field] || record?.[`${field}_en`] || '',
      }),
    },
  });
  const cardModule = compile('src/components/dealer/DealerReviewCard.jsx', {
    react: React,
    'react/jsx-runtime': jsxRuntime,
    'react-i18next': { useTranslation: () => ({ t }) },
    './StarRating': ({ rating }) => React.createElement('span', { 'data-rating': rating }),
    'lucide-react': { BadgeCheck: Icon, ShieldCheck: Icon },
    './DealerReviewPurchases': purchasesModule,
  });
  return { DealerReviewCard: cardModule.default, DealerReviewPurchases: purchasesModule.default };
}

test('purchased-watch summary uses localized titles, optimized thumbnails and responsive copy', () => {
  const { DealerReviewPurchases } = buildComponents();
  const html = renderToStaticMarkup(React.createElement(DealerReviewPurchases, {
    watches: [
      { title_en: 'Omega Speedmaster', title_de: 'Omega Speedmaster Deutsch', image: '/watch.webp', quantity: 2 },
      { title: 'Rolex Submariner' },
      { image: '/no-title.webp' },
    ],
  }));

  assert.match(html, /Watches in this verified purchase/);
  assert.match(html, /Omega Speedmaster Deutsch/);
  assert.doesNotMatch(html, />Omega Speedmaster</);
  assert.match(html, /src="thumb:\/watch.webp"/);
  assert.match(html, /alt="Omega Speedmaster Deutsch"/);
  assert.match(html, /×2/);
  assert.match(html, /Rolex Submariner/);
  assert.doesNotMatch(html, /no-title/);
  assert.match(html, /break-words text-sm/);
});

test('public review card is readable, shows its purchased watch and never renders an order reference', () => {
  const { DealerReviewCard } = buildComponents();
  const html = renderToStaticMarkup(React.createElement(DealerReviewCard, {
    review: {
      buyerName: 'Verified Collector',
      isVerifiedPurchase: true,
      rating: 5,
      title: 'Excellent dealer experience',
      reviewText: 'The watch arrived exactly as described and communication was clear.',
      orderReference: 'KG-PRIVATE-ORDER',
      purchasedWatches: [{ title_de: 'Cartier Santos Deutsch', title_en: 'Cartier Santos', image: '/cartier.webp' }],
      dealerResponse: 'Thank you for your purchase.',
    },
  }));

  assert.match(html, /Verified Collector/);
  assert.match(html, /Verified Purchase/);
  assert.match(html, /5 out of 5 stars/);
  assert.match(html, /text-sm leading-6[^>]*sm:text-base/);
  assert.match(html, /Cartier Santos Deutsch/);
  assert.match(html, /Dealer Response/);
  assert.doesNotMatch(html, /KG-PRIVATE-ORDER/);
});
