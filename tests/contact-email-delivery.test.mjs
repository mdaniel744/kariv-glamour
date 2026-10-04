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

const smtpConfig = { host: 'smtp.hostinger.com', port: '465', user: 'info@24kariv.com', password: 'secret' };

function fakeTransport(sendMail, closeCalls) {
  return () => ({
    sendMail,
    close: () => { if (closeCalls) closeCalls.count += 1; },
  });
}

test('contact mail is addressed only to the company inbox and replies go to the shopper', async () => {
  let message;
  const accepted = await sendContactEmail(contact, {
    ...smtpConfig,
    from: 'Kariv Glamour <info@24kariv.com>',
    createTransport: fakeTransport(async (mail) => {
      message = mail;
      return { accepted: [COMPANY_DETAILS.email] };
    }),
  });

  assert.equal(accepted, true);
  assert.equal(message.to, COMPANY_DETAILS.email);
  assert.equal(message.replyTo, contact.email);
  assert.match(message.text, /When will this watch ship\?/);
});

test('contact mail is not reported sent when the provider rejects it', async () => {
  const accepted = await sendContactEmail(contact, {
    ...smtpConfig,
    from: 'Kariv Glamour <info@24kariv.com>',
    createTransport: fakeTransport(async () => ({ accepted: [] })),
  });
  assert.equal(accepted, false);
});

test('the SMTP transport is always closed, even when sending throws', async () => {
  const closeCalls = { count: 0 };
  await assert.rejects(sendContactEmail(contact, {
    ...smtpConfig,
    from: 'Kariv Glamour <info@24kariv.com>',
    createTransport: fakeTransport(async () => { throw new Error('connection refused'); }, closeCalls),
  }));
  assert.equal(closeCalls.count, 1);
});
