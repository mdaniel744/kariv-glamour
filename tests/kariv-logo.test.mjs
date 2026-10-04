import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { compileFunction } from 'node:vm';
import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import sharp from 'sharp';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Kariv branding switches with the root theme and keeps square artwork uncropped', () => {
  const { outputText } = ts.transpileModule(read('src/components/shared/KarivLogo.jsx'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  const imports = {
    react: React, 'react/jsx-runtime': jsxRuntime,
    '@/components/shared/MediaImage': ({ quality: _quality, ...props }) => React.createElement('img', props),
  };
  const module = { exports: {} };
  compileFunction(outputText, ['require', 'module', 'exports'])((name) => {
    assert.ok(name in imports);
    return imports[name];
  }, module, module.exports);
  const html = renderToStaticMarkup(React.createElement(module.exports.default, {
    className: 'h-14 w-14 md:h-20 md:w-20', sizes: '(min-width: 768px) 80px, 56px', loading: 'eager',
  }));
  assert.match(html, /kariv-emblem-light\.webp[^>]+class="block h-full w-full object-contain dark:hidden"/);
  assert.match(html, /kariv-emblem-dark\.webp[^>]+class="hidden h-full w-full object-contain dark:block"/);
  assert.doesNotMatch(html, /object-cover|scale-/);
  assert.equal((html.match(/alt="Kariv Glamour"/g) || []).length, 2);
  assert.equal((html.match(/loading="eager"/g) || []).length, 2);
});

test('both supplied logo assets retain their square dimensions and transparency', async () => {
  for (const variant of ['light', 'dark']) {
    const bytes = readFileSync(new URL(`../public/logos/kariv-emblem-${variant}.png`, import.meta.url));
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.format, 'png');
    assert.equal(metadata.width, 1254);
    assert.equal(metadata.height, 1254);
    assert.equal(metadata.hasAlpha, true);
  }
});

test('optimized logo variants stay transparent and small enough for navigation', async () => {
  for (const variant of ['light', 'dark']) {
    const bytes = readFileSync(new URL(`../public/logos/kariv-emblem-${variant}.webp`, import.meta.url));
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.format, 'webp');
    assert.equal(metadata.width, 256);
    assert.equal(metadata.height, 256);
    assert.equal(metadata.hasAlpha, true);
    assert.ok(bytes.length < 40_000);
  }
});

test('site branding surfaces share the new logo without changing fixed navbar heights', () => {
  for (const path of [
    'src/components/layout/Navbar.jsx', 'src/components/layout/Footer.jsx',
    'src/components/AuthLayout.jsx', 'src/page-content/portal/PortalLayout.jsx',
    'src/page-content/admin/AdminLayout.jsx',
  ]) {
    const source = read(path);
    assert.match(source, /import KarivLogo from/);
    assert.match(source, /<KarivLogo /);
    assert.doesNotMatch(source, /kariv-glamour-(desktop|mobile)-/);
  }
  assert.match(read('src/components/layout/Navbar.jsx'), /h-14 md:h-20 gap-2/);
  assert.match(read('src/components/layout/Navbar.jsx'), /top-\[102px\]/);
  assert.match(read('public/sw.js'), /icon: '\/logos\/kariv-emblem-light-icon\.png'/);
});
