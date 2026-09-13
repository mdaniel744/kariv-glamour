import test from 'node:test';
import assert from 'node:assert/strict';
import { SEO_LANDING_ROUTES } from '../src/lib/brandSeoRegistry.js';
import { getResearchArticle, canonicalSeoSlug } from '../src/lib/watchResearch/articles.js';
import { CZECH_BRAND_PROFILES, CZECH_TOPICS } from '../src/lib/watchResearch/czech.js';
import { CZECH_BRAND_FAQS } from '../src/lib/czechBrandFaqs.js';
import { getGuideMedia } from '../src/lib/watchResearch/media.js';
import { COMPARISONS } from '../src/lib/watchResearch/comparisons.js';
import { SOURCES } from '../src/lib/watchResearch/sources.js';
import { czechBrandLabel, czechShoppingHeading } from '../src/lib/czechBrandData.js';

const MODULES = [
  ['rolex', 'rolex'], ['patek', 'patekPhilippe'], ['omega', 'omega'], ['cartier', 'cartier'],
  ['hublot', 'hublot'], ['breitling', 'breitling'], ['audemarsPiguet', 'audemarsPiguet'],
  ['grandSeiko', 'grandSeiko'], ['iwc', 'iwc'], ['jaegerLeCoultre', 'jaegerLeCoultre'],
  ['tagHeuer', 'tagHeuer'], ['tudor', 'tudor'], ['panerai', 'panerai'], ['bvlgari', 'bvlgari'],
  ['girardPerregaux', 'girardPerregaux'],
];

test('every existing brand SEO route has Czech metadata and useful sourced Czech guide content', () => {
  assert.equal(SEO_LANDING_ROUTES.length, 261);
  assert.equal(Object.keys(CZECH_BRAND_PROFILES).length, 15);
  const preferredTitles = [];
  for (const route of SEO_LANDING_ROUTES) {
    for (const field of ['title', 'h1', 'description', 'intro']) assert.ok(route.pageData[`${field}_cs`]?.length > 5, `${route.slug}:${field}`);
    const article = getResearchArticle(route, 'cs');
    assert.ok(article?.title, route.slug);
    assert.ok(article.sections.length >= 3, route.slug);
    assert.ok(article.sections.every((section) => section.paragraphs.every((paragraph) => paragraph.length > 80)), route.slug);
    assert.notEqual(article.sections[0].paragraphs[0], getResearchArticle(route, 'en').sections[0].paragraphs[0]);
    for (const id of article.sources) assert.ok(SOURCES[id], id);
    if (route.pageData.isGuide) {
      assert.ok(CZECH_TOPICS[article.topic], route.slug);
      const media = getGuideMedia(route, 'cs');
      assert.ok(media.hero.alt.length > 3, route.slug);
      assert.doesNotMatch(media.hero.alt, /A selection|A watchmaker|watches|with a blue dial|presentation box/);
    }
    if (canonicalSeoSlug(route, SEO_LANDING_ROUTES) === route.slug) preferredTitles.push(article.title);
  }
  assert.equal(new Set(preferredTitles).size, preferredTitles.length, 'canonical Czech titles retain distinct intent');
});

test('all legacy brand data fields have Czech copy while preserving filter identifiers', async () => {
  let checked = 0;
  for (const [file, brandKey] of MODULES) {
    const data = await import(`../src/lib/${file}Data.js`);
    const faqs = Object.entries(data).find(([key]) => key.endsWith('_FAQS'))[1];
    assert.equal(faqs.length, CZECH_BRAND_FAQS[brandKey].length, `${file}: keep FAQ translation rows aligned`);
    function walk(value, path) {
      if (Array.isArray(value)) return value.forEach((entry, index) => walk(entry, `${path}[${index}]`));
      if (!value || typeof value !== 'object') return;
      for (const [key, entry] of Object.entries(value)) {
        if (key.endsWith('_en') && typeof entry === 'string') {
          const translated = value[key.replace(/_en$/, '_cs')];
          assert.ok(typeof translated === 'string' && translated.length > 0, `${file}:${path}.${key}`);
          assert.doesNotMatch(translated, /^(Buy |Buying |Which |Popular |Related |Read the |Explore |Learn About )/, `${file}:${path}.${key}`);
          checked++;
        } else if (key === 'answer' && Array.isArray(entry) && value.answer_cs) {
          assert.ok(value.answer_cs.every((segment) => typeof segment.text_cs === 'string'));
          assert.ok(value.answer_cs.map((segment) => segment.text_cs).join('').length > 50);
        } else if (entry && typeof entry === 'object') walk(entry, `${path}.${key}`);
      }
    }
    for (const [key, value] of Object.entries(data)) {
      if (/_(COLLECTIONS|QUICK_FILTERS|SEO_CARDS|READ_MORE|INTERNAL_LINKS|EDITORIAL_SECTIONS|TRUST_POINTS|TRUST_LINKS|FAQS|SEO_PAGES)$/.test(key)) walk(value, key);
    }
    const collections = Object.entries(data).find(([key]) => key.endsWith('_COLLECTIONS'))[1];
    for (const collection of collections) assert.ok(collection.name && (collection.shortDescription_cs || collection.description_cs), `${file}:${collection.name}`);
  }
  assert.ok(checked > 2500);
});

test('Czech shopping labels translate grammar but keep actual model names intact', () => {
  assert.equal(czechShoppingHeading('Buy Cartier Watch'), 'Hodinky Cartier');
  assert.equal(czechShoppingHeading('IWC Schaffhausen Automatic'), 'Automatické hodinky IWC Schaffhausen');
  assert.equal(czechShoppingHeading('Buy IWC Pilot\'s Watches'), 'Hodinky IWC Pilot’s Watches');
  assert.equal(czechShoppingHeading('Cartier Watches for Women'), 'Hodinky Cartier pro ženy');
  assert.equal(czechBrandLabel('Omega Box and Papers'), 'Omega: krabička a doklady');
  assert.equal(czechBrandLabel('Grand Complications'), 'Grand Complications');
});

test('reference comparison tables have complete Czech labels and values', () => {
  for (const comparison of Object.values(COMPARISONS)) {
    assert.ok(comparison.note.cs);
    for (const row of comparison.rows) for (const key of ['label', 'left', 'right']) assert.ok(row[key].cs);
  }
});
