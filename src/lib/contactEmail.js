import { COMPANY_DETAILS } from './companyDetails.js';

export const DEFAULT_CONTACT_FROM = `Kariv Glamour <${COMPANY_DETAILS.email}>`;

export async function sendContactEmail(contact, { apiKey, from, fetcher = fetch }) {
  const body = [
    'New Kariv Glamour contact form message',
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Language: ${contact.locale}`,
    `Subject: ${contact.subject}`,
    '',
    contact.message,
  ].join('\n');

  const response = await fetcher('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [COMPANY_DETAILS.email],
      reply_to: contact.email,
      subject: `Kariv contact: ${contact.subject}`,
      text: body,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  return response.ok;
}
