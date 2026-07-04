import React from 'react';
import { sanitizeHtml } from '@/lib/sanitize';

/**
 * SafeHtml — Renders HTML content through DOMPurify sanitization.
 * Use this instead of dangerouslySetInnerHTML for any content
 * that originates from entity data, LLM output, or user input.
 *
 * Props:
 *  - html: the raw HTML string to sanitize and render
 *  - as: element type (default 'div')
 *  - className: passed through to the rendered element
 *  - ...rest: any additional props
 */
export default function SafeHtml({ html, as: Tag = 'div', className, ...rest }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} {...rest} />;
}