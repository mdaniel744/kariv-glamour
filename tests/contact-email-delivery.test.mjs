import test from 'node:test';
import assert from 'node:assert/strict';
import { sendContactEmail } from '../src/lib/contactEmail.js';
import { COMPANY_DETAILS } from '../src/lib/companyDetails.js';

const contact = {
  name: 'Alex Buyer',
  email: 'alex@example.com',
  subject: 'Order question',
  message: 'When will this watch ship?',
  locale: 'en',
};

test('contact mail is addressed only to the company inbox and replies go to the shopper', async () => {
  let request;
  const accepted = await sendContactEmail(contact, {
    apiKey: 'test-key',
    from: 'Kariv Glamour <info@24kariv.com>',
    fetcher: async (url, options) => {
      request = { url, options };
      return { ok: true };
    },
  });

  assert.equal(accepted, true);
  assert.equal(request.url, 'https://api.resend.com/emails');
  const payload = JSON.parse(request.options.body);
  assert.deepEqual(payload.to, [COMPANY_DETAILS.email]);
  assert.equal(payload.reply_to, contact.email);
  assert.match(payload.text, /When will this watch ship\?/);
});

test('contact mail is not reported sent when the provider rejects it', async () => {
  const accepted = await sendContactEmail(contact, {
    apiKey: 'test-key',
    from: 'Kariv Glamour <info@24kariv.com>',
    fetcher: async () => ({ ok: false }),
  });
  assert.equal(accepted, false);
});
