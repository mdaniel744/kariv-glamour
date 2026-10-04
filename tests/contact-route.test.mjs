import test, { mock } from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { POST } from '../app/api/contact/route.js';

const validMessage = {
  name: 'Alex Buyer',
  email: 'alex@example.com',
  subject: 'Order question',
  message: 'When will this watch ship?',
  locale: 'en',
};

const SMTP_ENV_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];

function withSmtpEnv(fn) {
  return async () => {
    const previous = Object.fromEntries(SMTP_ENV_KEYS.map((key) => [key, process.env[key]]));
    process.env.SMTP_HOST = 'smtp.hostinger.com';
    process.env.SMTP_PORT = '465';
    process.env.SMTP_USER = 'info@24kariv.com';
    process.env.SMTP_PASSWORD = 'secret';
    try {
      await fn();
    } finally {
      for (const key of SMTP_ENV_KEYS) {
        if (previous[key] === undefined) delete process.env[key];
        else process.env[key] = previous[key];
      }
    }
  };
}

function request(body, address) {
  return new Request('https://24kariv.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-real-ip': address },
    body: JSON.stringify(body),
  });
}

test('contact endpoint reports unavailable delivery without SMTP credentials configured', async () => {
  const previous = Object.fromEntries(SMTP_ENV_KEYS.map((key) => [key, process.env[key]]));
  for (const key of SMTP_ENV_KEYS) delete process.env[key];
  try {
    const response = await POST(request(validMessage, 'contact-test-no-key'));
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { ok: false, error: 'CONTACT_UNAVAILABLE' });
  } finally {
    for (const key of SMTP_ENV_KEYS) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});

test('contact endpoint sends through SMTP and confirms provider acceptance', withSmtpEnv(async () => {
  let message;
  const mockTransport = { sendMail: async (mail) => { message = mail; return { accepted: ['info@24kariv.com'] }; }, close: () => {} };
  const createTransport = mock.method(nodemailer, 'createTransport', () => mockTransport);
  try {
    const response = await POST(request(validMessage, 'contact-test-success'));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(createTransport.mock.calls.length, 1);
    const config = createTransport.mock.calls[0].arguments[0];
    assert.equal(config.host, 'smtp.hostinger.com');
    assert.equal(config.port, 465);
    assert.equal(config.secure, true);
    assert.equal(config.auth.user, 'info@24kariv.com');
    assert.equal(config.auth.pass, 'secret');
    assert.equal(message.from, 'Kariv Glamour <info@24kariv.com>');
    assert.equal(message.to, 'info@24kariv.com');
    assert.equal(message.replyTo, validMessage.email);
    assert.match(message.text, /When will this watch ship\?/);
  } finally {
    createTransport.mock.restore();
  }
}));

test('contact endpoint does not claim delivery when the email provider rejects it', withSmtpEnv(async () => {
  const mockTransport = { sendMail: async () => ({ accepted: [] }), close: () => {} };
  const createTransport = mock.method(nodemailer, 'createTransport', () => mockTransport);
  try {
    const response = await POST(request(validMessage, 'contact-test-rejected'));
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false, error: 'DELIVERY_FAILED' });
  } finally {
    createTransport.mock.restore();
  }
}));
