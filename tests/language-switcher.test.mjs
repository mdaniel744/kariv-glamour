import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const source = readFileSync(new URL('../src/components/LanguageSwitcher.jsx', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  fileName: 'LanguageSwitcher.jsx',
});

function renderSwitcher(locale, open) {
  const imports = {
    react: { ...React, useState: () => [open, () => {}], useEffect: () => {} },
    'react/jsx-runtime': jsxRuntime,
    'lucide-react': { Check: () => null, ChevronDown: () => null },
    '@/lib/languageContext': { useLanguage: () => ({ locale, supportedLocales: ['de', 'en', 'cs'], setLocale() {} }) },
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((specifier) => {
    assert.ok(specifier in imports, `Unexpected dependency: ${specifier}`);
    return imports[specifier];
  }, module, module.exports);
  return renderToStaticMarkup(React.createElement(module.exports.default));
}

test('language menu opens inward from the mobile flag and keeps desktop right alignment', () => {
  const html = renderSwitcher('en', true);
  const classes = html.match(/role="menu"[^>]*class="([^"]+)"/)[1].split(/\s+/);
  assert.ok(classes.includes('left-0'), 'Mobile dropdown must align with the left-side flag');
  assert.ok(!classes.includes('right-0'), 'Unconditional right alignment clips the mobile dropdown');
  assert.ok(classes.includes('md:left-auto'));
  assert.ok(classes.includes('md:right-0'));
});

test('all three language choices remain available with the current language selected', () => {
  for (const locale of ['en', 'de', 'cs']) {
    const html = renderSwitcher(locale, true);
    assert.equal((html.match(/role="menuitemradio"/g) || []).length, 3);
    assert.equal((html.match(/aria-checked="true"/g) || []).length, 1);
    for (const label of ['English', 'Deutsch', 'Čeština']) assert.ok(html.includes(label));
  }
  assert.ok(!renderSwitcher('en', false).includes('role="menu"'));
});
