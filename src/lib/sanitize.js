// Shared HTML sanitizer for browser-side rendering of translated/rich content.
// Uses DOMPurify with an explicit allowlist to prevent XSS from LLM output.
//
// Covers the rich-text editor's full output set: bold/italic/underline,
// headings, lists, blockquotes, alignment, highlight, links, tables, and
// inline images. Content only ever originates from the admin dashboard's
// own editor (a trusted source, not public user input), but sanitizing
// before dangerouslySetInnerHTML is kept as a baseline regardless.
import createDOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'a', 'p', 'br', 'strong', 'em', 'b', 'i', 'u', 'mark', 'ul', 'ol', 'li',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'sup', 'sub',
  'blockquote', 'img',
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
];

// `style` is allowed only on these tags, and only to carry alignment —
// see the sanitize-time hook below, which strips it down to nothing else.
const ALIGNABLE_TAGS = new Set(['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'td', 'th']);
const SAFE_TEXT_ALIGN = /^text-align:\s*(left|right|center|justify)\s*;?\s*$/i;

const ALLOWED_ATTR = ['href', 'title', 'src', 'alt', 'width', 'height', 'colspan', 'rowspan', 'style'];

const SANITIZE_CONFIG = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOW_DATA_ATTR: false,
  FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input', 'style', 'link', 'meta', 'base'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'onchange', 'onsubmit'],
  ALLOWED_URI_REGEXP: /^(?:(?:https?):|mailto:|\/(?!\/)|#)/i,
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

let hooksRegistered = false;
function registerDomPurifyHooks(purifier) {
  if (hooksRegistered) return;
  hooksRegistered = true;

  // `style` only ever carries `text-align` on a fixed set of block tags —
  // no Supabase Storage on this platform, so `src` still has to be a real
  // http(s) URL (same convention as every other image field in the app).
  purifier.addHook('uponSanitizeAttribute', (node, data) => {
    if (data.attrName === 'style') {
      const tag = node.tagName?.toLowerCase();
      if (!ALIGNABLE_TAGS.has(tag) || !SAFE_TEXT_ALIGN.test(data.attrValue.trim())) {
        data.keepAttr = false;
      }
    }
    if (data.attrName === 'src' && node.tagName?.toLowerCase() === 'img') {
      if (!isSafeUri(data.attrValue)) data.keepAttr = false;
    }
  });
}

// Hand-rolled allowlist parser for the server-render pass (no DOM available
// in Node). Coarser than DOMPurify but only needs to agree with it well
// enough that SSR output doesn't visibly differ from the client re-render.
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

      if (tag === 'img') {
        const src = attrs.match(/\bsrc\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        const alt = attrs.match(/\balt\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        const width = attrs.match(/\bwidth\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        const height = attrs.match(/\bheight\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        if (!src || !isSafeUri(src)) return ''; // no src, no image
        safeAttrs.push(`src="${escapeAttribute(src)}"`);
        if (alt) safeAttrs.push(`alt="${escapeAttribute(alt)}"`);
        if (/^\d+$/.test(width)) safeAttrs.push(`width="${width}"`);
        if (/^\d+$/.test(height)) safeAttrs.push(`height="${height}"`);
        return `<img${safeAttrs.length ? ` ${safeAttrs.join(' ')}` : ''} />`;
      }

      if ((tag === 'td' || tag === 'th')) {
        const colspan = attrs.match(/\bcolspan\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        const rowspan = attrs.match(/\browspan\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        if (/^\d+$/.test(colspan)) safeAttrs.push(`colspan="${colspan}"`);
        if (/^\d+$/.test(rowspan)) safeAttrs.push(`rowspan="${rowspan}"`);
      }

      if (ALIGNABLE_TAGS.has(tag)) {
        const style = attrs.match(/\bstyle\s*=\s*(['"])(.*?)\1/i)?.[2] || '';
        if (SAFE_TEXT_ALIGN.test(style.trim())) safeAttrs.push(`style="${escapeAttribute(style.trim())}"`);
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

  registerDomPurifyHooks(purifier);
  return purifier.sanitize(dirty, SANITIZE_CONFIG);
}

export default sanitizeHtml;
