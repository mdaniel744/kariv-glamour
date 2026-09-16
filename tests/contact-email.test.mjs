import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { COMPANY_DETAILS } from '../src/lib/companyDetails.js';
import { getAllLegalPageFallbacks } from '../src/lib/legalPageFallbacks.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const previousEmail = ['info', 'karivglamour.com'].join('@');

test('every English, German and Czech policy uses the current email in its text and contact links', () => {
  assert.equal(COMPANY_DETAILS.email, 'info@24kariv.com');
  for (const page of getAllLegalPageFallbacks()) {
    for (const locale of ['en', 'de', 'cs']) {
      const content = page[`content_${locale}`];
      assert.ok(content.includes(COMPANY_DETAILS.email), `${page.slug}/${locale} needs the current address`);
      assert.ok(!content.toLowerCase().includes(previousEmail), `${page.slug}/${locale} has an old address`);
      const contactLinks = [...content.matchAll(/\[([^\]]+@[^\]]+)\]\(mailto:([^)]+)\)/g)];
      assert.ok(contactLinks.length, `${page.slug}/${locale} needs a contact link`);
      for (const [, label, target] of contactLinks) {
        assert.equal(label, COMPANY_DETAILS.email);
        assert.equal(target, COMPANY_DETAILS.email);
      }
    }
  }
});

test('application source and public text assets contain no old company email addresses', () => {
  const textExtensions = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.json', '.html', '.md', '.txt', '.css', '.svg', '.xml']);
  const outdatedFiles = [];
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) scan(path);
      else if (entry.isFile() && textExtensions.has(extname(path))) {
        if (readFileSync(path, 'utf8').toLowerCase().includes(previousEmail)) outdatedFiles.push(path);
      }
    }
  }
  for (const directory of ['app', 'src', 'public']) scan(join(root, directory));
  assert.deepEqual(outdatedFiles, []);
});

test('customer-service and legal contact links continue to use the shared company email', () => {
  for (const path of ['src/page-content/CustomerService.jsx', 'src/components/legal/CompanyDetails.jsx']) {
    const source = readFileSync(join(root, path), 'utf8');
    assert.match(source, /mailto:\$\{COMPANY_DETAILS\.email\}/);
  }
});
