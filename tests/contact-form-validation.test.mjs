import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from '../src/lib/contactForm.js';

const valid = {
  name: 'Alex Buyer',
  email: 'alex@example.com',
  subject: 'Question about an order',
  message: 'Please tell me about the delivery status.',
  locale: 'de',
};

test('contact submission accepts a valid message and preserves the locale', () => {
  assert.deepEqual(validateContactForm(valid), valid);
});

test('contact submission rejects missing or malformed fields', () => {
  assert.equal(validateContactForm({ ...valid, email: 'not-an-email' }), null);
  assert.equal(validateContactForm({ ...valid, subject: 'Hello\nBcc: someone@example.com' }), null);
  assert.equal(validateContactForm({ ...valid, message: ' '.repeat(100) }), null);
  assert.equal(validateContactForm({ ...valid, message: 'x'.repeat(5001) }), null);
  assert.equal(validateContactForm([]), null);
});

test('contact submission defaults unknown locale to English', () => {
  assert.equal(validateContactForm({ ...valid, locale: 'fr' }).locale, 'en');
});
