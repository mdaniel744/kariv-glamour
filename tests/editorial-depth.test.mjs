import test from 'node:test';
import assert from 'node:assert/strict';
import { SEO_LANDING_ROUTES } from '../src/lib/brandSeoRegistry.js';
import { getResearchArticle } from '../src/lib/watchResearch/articles.js';
import { TOPICS, guideTopic } from '../src/lib/watchResearch/topics.js';
import { TOPIC_DEPTH } from '../src/lib/watchResearch/guideDepth.js';
import { BRAND_ESSAYS } from '../src/lib/watchResearch/brandEssays.js';
import { GUIDE_SUMMARIES } from '../src/lib/watchResearch/summaries.js';
import { SOURCES } from '../src/lib/watchResearch/sources.js';

const guides = SEO_LANDING_ROUTES.filter((route) => route.pageData.isGuide);
test('all guide topics have original supporting essays and fully bilingual copy', () => {
  for (const [key, topic] of Object.entries(TOPICS)) {
    for (const field of ['heading', 'answer', 'detail', 'action']) {
      assert.ok(topic[field].en && topic[field].de, key + ':' + field);
      assert.notEqual(topic[field].en, topic[field].de, key + ':' + field);
    }
  }
  for (const route of guides) {
    const key = guideTopic(route.slug);
    if (key === 'story' || key === 'choice') {
      assert.ok(BRAND_ESSAYS[route.pageKey], route.slug);
    } else {
      assert.ok(TOPIC_DEPTH[key]?.length, route.slug);
      assert.ok(GUIDE_SUMMARIES[key]?.en && GUIDE_SUMMARIES[key]?.de, route.slug);
    }
  }
  for (const section of Object.values(TOPIC_DEPTH).flat()) {
    assert.ok(section.paragraphs.length >= 2, section.id);
    for (const paragraph of section.paragraphs) {
      assert.ok(paragraph.en.length > 80 && paragraph.de.length > 80, section.id);
      assert.notEqual(paragraph.en, paragraph.de, section.id);
    }
    for (const source of section.sources) assert.ok(SOURCES[source], source);
  }
});

test('brand history and buying choice are separate essays across all 15 brands', () => {
  assert.equal(Object.keys(BRAND_ESSAYS).length, 15);
  for (const [key, essay] of Object.entries(BRAND_ESSAYS)) {
    assert.ok(essay.story.length >= 2, key);
    for (const locale of ['en', 'de']) {
      assert.ok(essay.heading[locale]);
      assert.ok(essay.choice[locale].length > 200);
      assert.ok(essay.story.every((paragraph) => paragraph[locale].length > 200));
    }
    for (const source of essay.sources) assert.ok(SOURCES[source], source);
  }
  const histories = Object.values(BRAND_ESSAYS).map((essay) => essay.story.map((paragraph) => paragraph.en).join(' '));
  assert.equal(new Set(histories).size, 15);
});

test('published guides include their deeper material, not just the old generic blocks', () => {
  for (const route of guides) for (const locale of ['en', 'de']) {
    const article = getResearchArticle(route, locale);
    const key = article.topic;
    const ids = article.sections.map((section) => section.id);
    assert.doesNotMatch(article.excerpt, /Practical guidance on reference differences|Praktische Hinweise zu Referenzunterschieden/);
    assert.ok(article.sections.every((section) => section.paragraphs.every((paragraph) => paragraph !== article.excerpt)), route.slug + ': repeated hero excerpt');
    if (key === 'story') assert.ok(ids.includes('history-in-context'), route.slug);
    else if (key === 'choice') assert.ok(ids.includes('your-shortlist') && ids.includes('compare-in-practice'), route.slug);
    else for (const section of TOPIC_DEPTH[key]) assert.ok(ids.includes(section.id), route.slug + ':' + section.id);
    const otherLocale = getResearchArticle(route, locale === 'en' ? 'de' : 'en');
    for (const section of article.sections) {
      const other = otherLocale.sections.find((item) => item.id === section.id);
      section.paragraphs.forEach((paragraph, index) => assert.notEqual(paragraph, other.paragraphs[index], route.slug + ':' + section.id));
    }
  }
});

test('technical guides contain the documented reference examples and linked primary sources', () => {
  for (const [slug, expression, source] of [
    ['iwc-schaffhausen-ingenieur-guide', /IW328902/, 'iwc328902'],
    ['jaeger-lecoultre-master-chronograph', /Q4138480/, 'jlcChronograph'],
    ['patek-philippe-watchmaking', /1996/, 'patekCalendars'],
  ]) {
    const route = guides.find((item) => item.slug === slug);
    for (const locale of ['en', 'de']) {
      const article = getResearchArticle(route, locale);
      assert.match(article.sections.flatMap((section) => section.paragraphs).join(' '), expression);
      assert.ok(article.sources.includes(source));
    }
  }
});
