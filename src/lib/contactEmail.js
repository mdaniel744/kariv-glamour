import nodemailer from 'nodemailer';
import { COMPANY_DETAILS } from './companyDetails.js';

export const DEFAULT_CONTACT_FROM = `Kariv Glamour <${COMPANY_DETAILS.email}>`;

export async function sendContactEmail(contact, { host, port, user, password, from, createTransport = nodemailer.createTransport }) {
  const body = [
    'New Kariv Glamour contact form message',
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Language: ${contact.locale}`,
    `Subject: ${contact.subject}`,
    '',
    contact.message,
  ].join('\n');

  const transport = createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
  });

  try {
    const info = await transport.sendMail({
      from,
      to: COMPANY_DETAILS.email,
      replyTo: contact.email,
      subject: `Kariv contact: ${contact.subject}`,
      text: body,
    });
    return Boolean(info?.accepted?.length);
  } finally {
    transport.close?.();
  }
}
