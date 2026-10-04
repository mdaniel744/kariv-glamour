import test from 'node:test';
import assert from 'node:assert/strict';
import { POST } from '../app/api/contact/route.js';

const validMessage = {
  name: 'Alex Buyer',
  email: 'alex@example.com',
  subject: 'Order question',
  message: 'When will this watch ship?',
  locale: 'en',
};

function request(body, address) {
  return new Request('https://24kariv.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-real-ip': address },
    body: JSON.stringify(body),
  });
}

test('contact endpoint reports unavailable delivery without an email API key', async () => {
  const previousKey = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const response = await POST(request(validMessage, 'contact-test-no-key'));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, error: 'CONTACT_UNAVAILABLE' });
  } finally {
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});

test('contact endpoint sends through the backend and confirms provider acceptance', async () => {
  const previousKey = process.env.RESEND_API_KEY;
  const previousFrom = process.env.CONTACT_FROM_EMAIL;
  const previousFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = 're_test_only';
  delete process.env.CONTACT_FROM_EMAIL;
  let outbound;
  globalThis.fetch = async (url, options) => {
    outbound = { url, options };
    return { ok: true };
  };

  try {
    const response = await POST(request(validMessage, 'contact-test-success'));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(outbound.url, 'https://api.resend.com/emails');
    assert.equal(outbound.options.headers.Authorization, 'Bearer re_test_only');
    const email = JSON.parse(outbound.options.body);
    assert.equal(email.from, 'Kariv Glamour <info@24kariv.com>');
    assert.deepEqual(email.to, ['info@24kariv.com']);
    assert.equal(email.reply_to, validMessage.email);
    assert.match(email.text, /When will this watch ship\?/);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
    if (previousFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = previousFrom;
  }
});

test('contact endpoint does not claim delivery when the email provider rejects it', async () => {
  const previousKey = process.env.RESEND_API_KEY;
  const previousFetch = globalThis.fetch;
  process.env.RESEND_API_KEY = 're_test_only';
  globalThis.fetch = async () => ({ ok: false });

  try {
    const response = await POST(request(validMessage, 'contact-test-rejected'));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false, error: 'DELIVERY_FAILED' });
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previousKey;
  }
});
