// Shared HTML sanitizer for browser-side rendering of translated/rich content.
// Uses DOMPurify with an explicit allowlist to prevent XSS from LLM output.
import createDOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'a', 'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'sup', 'sub'
];

const ALLOWED_ATTR = ['href', 'title'];

const SANITIZE_CONFIG = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'style', 'link', 'meta', 'base'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'onchange', 'onsubmit', 'style', 'src'],
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/(?!\/)|#)/i,
};

function isSafeUri(value) {
  return SANITIZE_CONFIG.ALLOWED_URI_REGEXP.test(value.trim());
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function sanitizeServerSide(dirty) {
  return dirty
    .replace(/<\s*(script|iframe|object|embed|form|input|style|link|meta|base)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    .replace(/<\s*(script|iframe|object|embed|form|input|style|link|meta|base)\b[^>]*\/?>/gi, '')
    .replace(/<\s*(\/?)\s*([a-z0-9-]+)\b([^>]*)>/gi, (match, closing, tagName, attrs = '') => {
      const tag = tagName.toLowerCase();
      if (!ALLOWED_TAGS.includes(tag)) return '';

      if (closing) return `</${tag}>`;
      if (tag === 'br') return '<br />';

      const safeAttrs = [];
      if (tag === 'a') {
        const href = attrs.match(/\bhref\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        const title = attrs.match(/\btitle\s*=\s*(['"])(.*?)\1/i)?.[2] || '';

        if (href && isSafeUri(href)) safeAttrs.push(`href="${escapeAttribute(href)}"`);
        if (title) safeAttrs.push(`title="${escapeAttribute(title)}"`);
      }

      return `<${tag}${safeAttrs.length ? ` ${safeAttrs.join(' ')}` : ''}>`;
    });
}

/**
 * Sanitize HTML for safe rendering with dangerouslySetInnerHTML.
 * Strips scripts, event handlers, iframes, javascript: URLs, and unsafe styles.
 */
export function sanitizeHtml(dirty) {
  if (!dirty || typeof dirty !== 'string') return '';

  if (typeof window === 'undefined') {
    return sanitizeServerSide(dirty);
  }

  const purifier = typeof createDOMPurify.sanitize === 'function'
    ? createDOMPurify
    : createDOMPurify(window);

  return purifier.sanitize(dirty, SANITIZE_CONFIG);
}

export default sanitizeHtml;
