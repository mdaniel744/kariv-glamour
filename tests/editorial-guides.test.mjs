import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { EDITORIAL_GUIDES } from '../src/lib/editorialGuides.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('home editorial cards have complete dedicated English, German and Czech articles', () => {
  assert.equal(EDITORIAL_GUIDES.length, 3);
  assert.equal(new Set(EDITORIAL_GUIDES.map((guide) => guide.slug)).size, EDITORIAL_GUIDES.length);

  EDITORIAL_GUIDES.forEach((guide) => {
    assert.match(guide.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.match(guide.image, /^\//);
    assert.ok(guide.datePublished);
    assert.ok(guide.dateModified);

    for (const locale of ['en', 'de', 'cs']) {
      const article = guide.translations[locale];
      assert.ok(article.title.length > 20, `${guide.slug} needs a qualified ${locale} title`);
      assert.ok(article.excerpt.length > 60, `${guide.slug} needs a useful ${locale} excerpt`);
      assert.ok(article.intro.length >= 2, `${guide.slug} needs a ${locale} introduction`);
      assert.ok(article.keyPoints.length >= 5, `${guide.slug} needs ${locale} takeaways`);
      assert.ok(article.sections.length >= 6, `${guide.slug} needs substantial ${locale} sections`);
      assert.ok(article.sections.every((section) => section.paragraphs.length >= 2), `${guide.slug} sections need developed ${locale} copy`);
      assert.ok(article.faq.length >= 3, `${guide.slug} needs a ${locale} FAQ`);
    }
  });
});

test('editorial cards link to the article represented by their title', () => {
  const source = read('src/components/home/EditorialSection.jsx');

  EDITORIAL_GUIDES.forEach((guide) => {
    assert.match(source, new RegExp(guide.slug));
  });
  assert.match(source, /to=\{`\/guides\/\$\{guide\.slug\}`\}/);
  assert.doesNotMatch(source, /<LocalizedLink key=\{[^}]+\} to="\/guides"/);
});

test('dedicated guide route exposes article, breadcrumb, and FAQ metadata', () => {
  const route = read('app/[locale]/(public)/guides/[slug]/page.jsx');
  const article = read('src/components/guides/GuideArticle.jsx');
  const sitemap = read('app/sitemap.js');

  assert.match(route, /getEditorialGuide\(slug\)/);
  assert.match(route, /'@type': 'Article'/);
  assert.match(route, /'@type': 'BreadcrumbList'/);
  assert.match(route, /'@type': 'FAQPage'/);
  assert.match(article, /article\.sections\.map/);
  assert.match(article, /article\.faq\.map/);
  assert.match(article, /href=\{`\/\$\{locale\}\/shop`\}/);
  assert.match(sitemap, /EDITORIAL_GUIDES/);
  assert.match(sitemap, /guides\/\$\{guide\.slug\}/);
});
