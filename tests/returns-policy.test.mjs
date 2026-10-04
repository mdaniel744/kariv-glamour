import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getEscrowCopy } from '../src/lib/escrowCopy.js';
import { getLegalPageFallback, withCzechLegalFallback } from '../src/lib/legalPageFallbacks.js';

test('returns policy explains dealer returns, protected payout and legal rights in every language', () => {
  const policy = getLegalPageFallback('returns-refund-policy');
  assert.match(policy.content_en, /returned directly to the dealer/);
  assert.match(policy.content_en, /open an order case/);
  assert.match(policy.content_en, /No affirmative buyer confirmation is required/);
  assert.match(policy.content_en, /statutory withdrawal/);
  assert.match(policy.content_de, /direkt an diesen Händler/);
  assert.match(policy.content_de, /Bestellseite Ihres Kontos einen Fall/);
  assert.match(policy.content_de, /Eine ausdrückliche Bestätigung des Käufers ist dafür nicht erforderlich/);
  assert.match(policy.content_cs, /vracejí přímo tomuto dealerovi/);
  assert.match(policy.content_cs, /otevřete případ na stránce objednávky/);
  assert.match(policy.content_cs, /Výslovné potvrzení kupujícího se nevyžaduje/);
});

test('older dashboard text cannot replace the current returns instructions', () => {
  const staleRemote = {
    slug: 'returns-refund-policy',
    title: 'Returns',
    content: 'Dealer funds are released only when the buyer confirms authenticity.',
    content_en: 'Old English policy',
    content_de: 'Alte deutsche Richtlinie',
    content_cs: 'Staré české podmínky',
  };
  const policy = withCzechLegalFallback(staleRemote);
  const fallback = getLegalPageFallback('returns-refund-policy');
  assert.equal(policy.title, staleRemote.title);
  for (const field of ['content', 'content_en', 'content_de', 'content_cs']) {
    assert.equal(policy[field], fallback[field]);
  }
  assert.equal(staleRemote.content, 'Dealer funds are released only when the buyer confirms authenticity.');
});

test('protected-payment copy no longer requires explicit buyer authenticity confirmation', () => {
  for (const locale of ['en', 'de', 'cs']) {
    const copy = getEscrowCopy(locale);
    assert.match(copy.protectionDescription, /14/);
    assert.doesNotMatch(copy.protectionDescription, /confirm receipt and authenticity|Empfang und Echtheit|potvrzení převzetí a pravosti/i);
  }
});

test('buyer order form offers a return or refund case reason', () => {
  const source = readFileSync(new URL('../src/page-content/portal/PortalOrderDetail.jsx', import.meta.url), 'utf8');
  assert.match(source, /return_request: 'Request a return or refund'/);
  assert.match(source, /return_request: 'Rückgabe oder Erstattung beantragen'/);
  assert.match(source, /return_request: 'Žádost o vrácení nebo refundaci'/);
});
