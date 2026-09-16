import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const layout = readFileSync(new URL('../app/[locale]/layout.jsx', import.meta.url), 'utf8');

test('root locale layout publishes the Google Merchant site-verification token', () => {
  assert.match(
    layout,
    /verification:\s*{\s*google:\s*['"]4OzTksrDE0TTdalip4DhOPFHOiphvlyRu5-3QyOUf_c['"]\s*,?\s*}/,
  );
});
