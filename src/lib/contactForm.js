const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
const EMAIL_ADDRESS = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function singleLine(value, maxLength) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed && trimmed.length <= maxLength && !CONTROL_CHARACTERS.test(trimmed) ? trimmed : null;
}

export function validateContactForm(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;

  const name = singleLine(input.name, 100);
  const email = singleLine(input.email, 254);
  const subject = singleLine(input.subject, 160);
  const message = typeof input.message === 'string' ? input.message.trim() : '';

  if (!name || !email || !EMAIL_ADDRESS.test(email) || !subject || !message || message.length > 5000) {
    return null;
  }

  return {
    name,
    email,
    subject,
    message,
    locale: ['en', 'de', 'cs'].includes(input.locale) ? input.locale : 'en',
  };
}
