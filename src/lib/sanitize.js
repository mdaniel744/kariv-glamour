// Shared HTML sanitizer for browser-side rendering of translated/rich content.
// Uses DOMPurify with an explicit allowlist to prevent XSS from LLM output.
import DOMPurify from 'dompurify';

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
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):)/i,
};

/**
 * Sanitize HTML for safe rendering with dangerouslySetInnerHTML.
 * Strips scripts, event handlers, iframes, javascript: URLs, and unsafe styles.
 */
export function sanitizeHtml(dirty) {
  if (!dirty || typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, SANITIZE_CONFIG);
}

export default sanitizeHtml;