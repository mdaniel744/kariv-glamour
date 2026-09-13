import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsx from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { localizedValue } from '../src/lib/locales.js';

const brands = [
  ['rolex', 'Rolex'], ['patek', 'PatekPhilippe'], ['omega', 'Omega'],
  ['audemarspiguet', 'AP'], ['breitling', 'Breitling'], ['cartier', 'Cartier'],
  ['grandseiko', 'GrandSeiko'], ['iwc', 'IWC'], ['jaegerlecoultre', 'JLC'],
  ['tagheuer', 'TAGHeuer'], ['tudor', 'Tudor'], ['panerai', 'Panerai'],
  ['bvlgari', 'Bvlgari'], ['girardperregaux', 'GirardPerregaux'], ['hublot', 'Hublot'],
];
const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const native = (tag) => ({ children, className }) => React.createElement(tag, { className }, children);
function component(path, locale, scripts = []) {
  const dictionaries = Object.fromEntries(['common', 'brandComponents'].map((ns) => [ns, JSON.parse(read(`src/locales/${locale}/${ns}.json`))]));
  const translate = (key, values = {}) => {
    const [namespace, path] = key.includes(':') ? key.split(':') : ['brandComponents', key];
    const value = path.split('.').reduce((current, part) => current?.[part], dictionaries[namespace]);
    assert.equal(typeof value, 'string', `${locale}:${key}`);
    return value.replace(/\{\{(\w+)\}\}/g, (_, name) => values[name] ?? name);
  };
  const imports = {
    react: path.endsWith('/OmegaFAQ.jsx') ? { ...React, useEffect: (effect) => { effect(); } } : React, 'react/jsx-runtime': jsx,
    'react-i18next': { useTranslation: () => ({ t: translate }) },
    'framer-motion': { motion: new Proxy({}, { get: (_target, name) => native(name) }) },
    '@/lib/localize': { useLocalizedField: () => ({ locale, localize: (record, field) => localizedValue(record, field, locale) }) },
    '@/lib/languageContext': { useLanguage: () => ({ locale }) },
    '@/components/LocalizedLink': { __esModule: true, default: ({ children, to, ...props }) => React.createElement('a', { ...props, href: `/${locale}${to}` }, children) },
    '@/components/shared/BrandHero': { __esModule: true, default: ({ image, imageAlt }) => React.createElement('img', { src: image, alt: imageAlt }) },
    '@/components/shared/MediaImage': { __esModule: true, default: () => null },
    'lucide-react': { ChevronLeft: () => null, ChevronRight: () => null, ChevronDown: () => null },
    '@/hooks/useBrandCollections': { useBrandCollections: () => ({ collections: [] }) },
    '@/lib/brandCollectionFilters': { handleBrandCollectionFilterClick() {} },
    '@/lib/rolexData': { ROLEX_COLLECTIONS: [], ROLEX_READ_MORE: [] },
    '@/lib/patekData': { PATEK_COLLECTIONS: [], PATEK_READ_MORE: [] },
    '@/lib/omegaData': { OMEGA_COLLECTIONS: [], OMEGA_READ_MORE: [], OMEGA_FAQS: [{
      question_en: 'Which Omega?', question_de: 'Welche Omega?', question_cs: 'Které hodinky Omega?',
      answer: [{ text_en: 'Explore ', text_de: 'Entdecken Sie ' }, { text_en: 'Speedmaster', text_de: 'Speedmaster', link: '/omega-speedmaster-kaufen' }],
      answer_cs: [{ text_cs: 'Objevte hodinky ' }, { text_cs: 'Speedmaster', link: '/omega-speedmaster-kaufen' }],
    }] },
  };
  const compiled = ts.transpileModule(read(path), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }, fileName: path }).outputText;
  const module = { exports: {} };
  compileFunction(compiled, ['require', 'module', 'exports', 'document'])((name) => {
    if (/^@\/lib\/\w+Data$/.test(name) && !(name in imports)) return new Proxy({}, { get: (_target, key) => /IMAGE/.test(String(key)) ? '/fixture-watch.jpg' : [] });
    assert.ok(name in imports, name); return imports[name];
  }, module, module.exports, { createElement: () => ({}), head: { appendChild: (script) => scripts.push(script), removeChild() {} } });
  return module.exports.default;
}

test('all inline bilingual copy across all fifteen brand component folders has explicit Czech equivalents', () => {
  let fields = 0;
  for (const [folder] of brands) for (const file of readdirSync(new URL(`../src/components/${folder}/`, import.meta.url))) {
    if (!file.endsWith('.jsx') || /ProductGrid|FilterSidebar/.test(file)) continue;
    const source = ts.createSourceFile(file, read(`src/components/${folder}/${file}`), ts.ScriptTarget.Latest, true, ts.ScriptKind.JSX);
    function visit(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const keys = node.properties.filter(ts.isPropertyAssignment).map((property) => property.name.getText(source));
        for (const key of keys.filter((key) => key.endsWith('_en'))) {
          assert.ok(keys.includes(key.replace(/_en$/, '_cs')), `${file}: ${key}`);
          fields++;
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.ok(fields >= 250, `Expected inline content coverage, got ${fields}`);
});

test('Czech brand introductions and stories keep every original shopping link and section', () => {
  for (const [folder, prefix] of brands) {
    const files = readdirSync(new URL(`../src/components/${folder}/`, import.meta.url)).filter((file) => /(?:Intro|StoryTeaser|StorySection)\.jsx$/.test(file));
    assert.ok(files.some((file) => file === prefix + 'Intro.jsx'));
    for (const file of files) {
    const markup = Object.fromEntries(['en', 'de', 'cs'].map((locale) => [locale, renderToStaticMarkup(React.createElement(component(`src/components/${folder}/${file}`, locale)))]));
    const links = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1].replace(/^\/(en|de|cs)/, ''));
    assert.deepEqual(links(markup.cs), links(markup.en));
    assert.deepEqual(links(markup.de), links(markup.en));
    assert.equal((markup.cs.match(/<section\b/g) || []).length, 1);
    assert.equal((markup.cs.match(/<h2\b/g) || []).length, 1);
    assert.match(markup.cs, /hodinek|Hodinky|hodinky/);
    assert.doesNotMatch(markup.cs, /An Icon of Swiss Watchmaking|Swiss Precision, Space Heritage|is one of the most respected|condition grading/);
    assert.notEqual(markup.cs, markup.en);
    }
  }
});

test('hero images and carousel controls have Czech accessible descriptions', () => {
  for (const [folder, prefix] of brands) {
    const hero = renderToStaticMarkup(React.createElement(component(`src/components/${folder}/${prefix}Hero.jsx`, 'cs')));
    assert.match(hero, /alt="Hodinky /);
    const files = readdirSync(new URL(`../src/components/${folder}/`, import.meta.url)).filter((file) => /(?:CollectionCarousel|CollectionGrid|ReadMoreCarousel)\.jsx$/.test(file));
    for (const file of files) {
      const path = `src/components/${folder}/${file}`;
      if (!read(path).includes('<button')) continue;
      const markup = renderToStaticMarkup(React.createElement(component(path, 'cs')));
      assert.match(markup, /aria-label="Předchozí"/);
      assert.match(markup, /aria-label="Další"/);
    }
  }
});

test('Omega FAQ chooses the same Czech answer segments for visible content and structured data', () => {
  for (const locale of ['en', 'de', 'cs']) {
    const scripts = [];
    const markup = renderToStaticMarkup(React.createElement(component('src/components/omega/OmegaFAQ.jsx', locale, scripts)));
    const schema = JSON.parse(scripts[0].text);
    const answer = { en: 'Explore Speedmaster', de: 'Entdecken Sie Speedmaster', cs: 'Objevte hodinky Speedmaster' }[locale];
    assert.equal(schema.mainEntity[0].acceptedAnswer.text, answer);
    assert.match(markup, new RegExp(answer.replace('Speedmaster', '')));
    assert.ok(markup.includes(`href="/${locale}/omega-speedmaster-kaufen"`));
  }
});
