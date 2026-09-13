import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { SEO_LANDING_ROUTES as routes } from '../src/lib/brandSeoRegistry.js';
import { getResearchArticle, canonicalSeoSlug } from '../src/lib/watchResearch/articles.js';
import { SOURCES, REVIEW_DATE } from '../src/lib/watchResearch/sources.js';
import { COMPARISONS } from '../src/lib/watchResearch/comparisons.js';
import { BRAND_RESEARCH } from '../src/lib/watchResearch/brands.js';
import { CZECH_BRAND_PROFILES } from '../src/lib/watchResearch/czech.js';
import { EDITORIAL_GUIDES } from '../src/lib/editorialGuides.js';
import { getGuideMedia } from '../src/lib/watchResearch/media.js';
import { getSiteUrl, localizedMetadata, localeAlternates } from '../src/lib/seo.js';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
function loadSource(path, imports) {
  const { outputText } = ts.transpileModule(read(path), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }, fileName: path,
  });
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((name) => {
    assert.ok(name in imports, 'Unexpected dependency: ' + name);
    return imports[name];
  }, module, module.exports);
  return module.exports;
}
test('all 261 existing SEO routes have bilingual researched content; all 71 guides have explicit topics', () => {
  assert.equal(routes.length, 261);
  assert.equal(routes.filter((route) => route.pageData.isGuide).length, 71);
  for (const route of routes) for (const locale of ['en', 'de']) {
    const article = getResearchArticle(route, locale);
    assert.ok(article, route.slug + ':' + locale);
    assert.ok(article.title.length > 5);
    assert.ok(article.excerpt.length > 60);
    assert.ok(article.sections.length >= 3);
    assert.ok(article.sections.every((section) => section.paragraphs.every((text) => typeof text === 'string' && text.length > 80)));
    assert.equal(new Set(article.sections.map((section) => section.id)).size, article.sections.length);
    assert.ok(article.sources.length);
    for (const id of article.sources) assert.ok(SOURCES[id], id);
    assert.equal(article.dateModified, REVIEW_DATE);
    if (locale === 'de') assert.notEqual(article.sections[0].paragraphs[0], getResearchArticle(route, 'en').sections[0].paragraphs[0]);
  }
});

test('canonical aliases have no chains, preserve brand and cannot cross different shopping filters', () => {
  for (const route of routes) {
    const slug = canonicalSeoSlug(route, routes);
    const target = routes.find((item) => item.slug === slug);
    assert.ok(target, route.slug);
    assert.equal(canonicalSeoSlug(target, routes), slug);
    assert.equal(target.pageKey, route.pageKey);
    assert.equal(!!target.pageData.isGuide, !!route.pageData.isGuide);
    if (!route.pageData.isGuide) {
      assert.deepEqual(target.pageData.collectionFilter || target.pageData.filter || {}, route.pageData.collectionFilter || route.pageData.filter || {});
      assert.equal(String(target.pageData.clientFilter || ''), String(route.pageData.clientFilter || ''));
    }
  }
  for (const locale of ['en', 'de']) {
    const titles = routes.filter((route) => canonicalSeoSlug(route, routes) === route.slug).map((route) => getResearchArticle(route, locale).title);
    assert.equal(new Set(titles).size, titles.length, locale + ' canonical titles must be unique');
  }
});

test('canonical identity stays on 24kariv despite old environment values and keeps reciprocal locales', () => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = 'https://karivglamour.com';
  try {
    assert.equal(getSiteUrl(), 'https://24kariv.com');
    for (const locale of ['en', 'de']) {
      const metadata = localizedMetadata({ locale, path: 'rolex-maintenance', title: 'Rolex care', description: 'Care guide' });
      assert.equal(metadata.alternates.canonical, '/' + locale + '/rolex-maintenance');
      assert.deepEqual(metadata.alternates.languages, localeAlternates('rolex-maintenance'));
      assert.equal(metadata.robots.index, true);
    }
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previous;
  }
  assert.match(read('app/[locale]/layout.jsx'), /metadataBase: new URL\(getSiteUrl\(\)\)/);
  assert.match(read('app/robots.js'), /sitemap:.*siteUrl/);
});

test('sitemap removes aliases and false freshness and no longer limits public products to 500', () => {
  const sitemap = read('app/sitemap.js');
  assert.match(sitemap, /canonicalSeoSlug\(route, SEO_LANDING_ROUTES\) !== route.slug/);
  assert.doesNotMatch(sitemap, /new Date\(/);
  assert.doesNotMatch(read('src/lib/base44Server.js'), /getPublishedProducts\(limit = 500\)/);
  assert.match(sitemap, /getPublishedGuides/);
});

test('guides render research on the server, preserve legacy aliases and avoid unnecessary product loading', () => {
  const route = read('app/[locale]/[slug]/page.jsx');
  assert.match(route, /!route.pageData.isGuide && <SeoLandingRouteClient/);
  assert.match(route, /<BrandResearchArticle/);
  assert.match(read('src/components/next-pages/BrandCollectionRoute.jsx'), /permanentRedirect/);
  const article = read('src/components/guides/BrandResearchArticle.jsx');
  assert.doesNotMatch(article, /use client|opacity: 0|dangerouslySetInnerHTML/);
  assert.match(article, /SourceLinks/);
  assert.match(article, /\/guides\//);
  assert.match(read('app/[locale]/(public)/guides/page.jsx'), /id="brand-guides"/);
  assert.match(read('app/[locale]/(public)/guides/[slug]/page.jsx'), /getPublishedGuide\(slug\)/);
});

test('primary citations, comparison tables and existing editorial guides are complete in both languages', () => {
  for (const source of Object.values(SOURCES)) {
    assert.equal(new URL(source.url).protocol, 'https:');
    assert.ok(source.publisher && source.title);
    assert.equal(source.accessed, REVIEW_DATE);
  }
  for (const comparison of Object.values(COMPARISONS)) {
    for (const row of comparison.rows) for (const key of ['label', 'left', 'right']) for (const locale of ['en', 'de']) assert.ok(row[key][locale]);
    for (const id of comparison.sources) assert.ok(SOURCES[id]);
  }
  for (const guide of EDITORIAL_GUIDES) {
    assert.equal(guide.dateModified, REVIEW_DATE);
    assert.ok(guide.sources.length);
    for (const locale of ['en', 'de']) assert.ok(guide.translations[locale].sections.find((section) => section.id === 'source-check'));
  }
});

test('every brand guide server-renders one heading, meaningful content and clickable local/source links', () => {
  const imports = {
    'react/jsx-runtime': jsxRuntime,
    'next/link': ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children),
    '@/lib/brandSeoRegistry': { SEO_LANDING_ROUTES: routes },
    '@/lib/watchResearch/articles': { getResearchArticle, canonicalSeoSlug },
    '@/lib/watchResearch/sources': { SOURCES, REVIEW_DATE },
    '@/lib/watchResearch/comparisons': { COMPARISONS },
    '@/lib/watchResearch/brands': { BRAND_RESEARCH },
    '@/lib/watchResearch/czech': { CZECH_BRAND_PROFILES },
    '@/lib/watchResearch/media': { getGuideMedia },
    '@/components/shared/MediaImage': ({ src, alt, className, sizes, priority }) => React.createElement('img', { src, alt, className, sizes, loading: priority ? 'eager' : 'lazy' }),
  };
  imports['./GuideFigure'] = loadSource('src/components/guides/GuideFigure.jsx', imports);
  imports['./ResearchSources'] = loadSource('src/components/guides/ResearchSources.jsx', imports);
  const Article = loadSource('src/components/guides/BrandResearchArticle.jsx', imports).default;
  const knownPaths = new Set([
    '/en', '/de', '/cs', '/en/guides', '/de/guides', '/cs/guides',
    ...routes.flatMap((route) => ['en', 'de', 'cs'].flatMap((locale) => ['/' + locale + '/' + route.slug, '/' + locale + '/brands/' + route.brandSlug])),
    ...EDITORIAL_GUIDES.flatMap((guide) => ['en', 'de', 'cs'].map((locale) => '/' + locale + '/guides/' + guide.slug)),
  ]);
  for (const route of routes.filter((item) => item.pageData.isGuide)) for (const locale of ['en', 'de', 'cs']) {
    const html = renderToStaticMarkup(React.createElement(Article, { route, locale }));
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route.slug);
    assert.doesNotMatch(html, /<time\b|min read|Min\. Lesezeit|Sources checked on/);
    assert.ok(html.includes(locale === 'cs' ? 'Zdroje a další čtení' : locale === 'de' ? 'Quellen zum Weiterlesen' : 'References and further reading'));
    assert.match(html, /<figure/);
    assert.match(html, /loading="eager"/);
    for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
      if (href.startsWith('/')) assert.ok(knownPaths.has(href), href);
      if (href.startsWith('#')) assert.ok(html.includes('id="' + href.slice(1) + '"'), href);
      if (href.startsWith('https:')) assert.ok(Object.values(SOURCES).some((source) => source.url === href), href);
    }
  }
});

test('all guide images are existing local assets with translated alt text and no unresolved paths', () => {
  for (const route of routes.filter((item) => item.pageData.isGuide)) for (const locale of ['en', 'de', 'cs']) {
    const media = getGuideMedia(route, locale);
    assert.ok(media?.hero, route.slug);
    for (const image of [media.hero, media.supporting].filter(Boolean)) {
      assert.ok(existsSync(new URL('../public' + image.src, import.meta.url)), image.src);
      assert.ok(image.alt.length > 5);
    }
  }
  assert.doesNotMatch(read('src/components/guides/GuideArticle.jsx'), /CalendarDays|Clock3|formatDate|article\.readTime/);
  assert.match(read('app/[locale]/[slug]/page.jsx'), /image:.*getGuideMedia/);
});
