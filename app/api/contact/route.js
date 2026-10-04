import { createHash } from 'node:crypto';
import { validateContactForm } from '../../../src/lib/contactForm.js';
import { DEFAULT_CONTACT_FROM, sendContactEmail } from '../../../src/lib/contactEmail.js';

export const runtime = 'nodejs';

const MAX_BODY_LENGTH = 12_000;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map();

function rateLimitKey(request, email) {
  const address = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return createHash('sha256').update(address || email.toLowerCase()).digest('hex');
}

function overLimit(key) {
  const now = Date.now();
  if (attempts.size > 5000) {
    for (const [entryKey, entry] of attempts) {
      if (entry.expiresAt <= now) attempts.delete(entryKey);
    }
    if (attempts.size > 5000) attempts.clear();
  }
  const current = attempts.get(key);
  if (!current || current.expiresAt <= now) {
    attempts.set(key, { count: 1, expiresAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

function result(body, status) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

async function readLimitedBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let raw = '';
  let length = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_LENGTH) {
      await reader.cancel();
      return null;
    }
    raw += decoder.decode(value, { stream: true });
  }

  return JSON.parse(raw + decoder.decode());
}

export async function POST(request) {
  const host = process.env.SMTP_HOST?.trim();
  const port = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_CONTACT_FROM;
  if (!host || !port || !user || !password) return result({ ok: false, error: 'CONTACT_UNAVAILABLE' }, 503);

  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return result({ ok: false, error: 'FORBIDDEN' }, 403);
  }

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > MAX_BODY_LENGTH) return result({ ok: false, error: 'INVALID_INPUT' }, 413);

  let input;
  try {
    input = await readLimitedBody(request);
  } catch {
    return result({ ok: false, error: 'INVALID_INPUT' }, 400);
  }
  if (!input) return result({ ok: false, error: 'INVALID_INPUT' }, 413);

  // Hidden field absorbs ordinary automated submissions without mailing the inbox.
  if (input?.companyWebsite) return result({ ok: true }, 200);

  const contact = validateContactForm(input);
  if (!contact) return result({ ok: false, error: 'INVALID_INPUT' }, 400);
  if (overLimit(rateLimitKey(request, contact.email))) return result({ ok: false, error: 'RATE_LIMITED' }, 429);

  try {
    const accepted = await sendContactEmail(contact, { host, port, user, password, from });
    if (!accepted) {
      console.error('Contact email provider rejected request');
      return result({ ok: false, error: 'DELIVERY_FAILED' }, 502);
    }

    return result({ ok: true }, 200);
  } catch (error) {
    console.error('Contact email provider unavailable:', error?.name || 'network error');
    return result({ ok: false, error: 'DELIVERY_FAILED' }, 502);
  }
}
