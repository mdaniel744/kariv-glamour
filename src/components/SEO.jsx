import { useSEO } from '@/hooks/useSEO';

/**
 * Declarative SEO component. Renders nothing — just sets meta tags.
 *
 * @param {Object} props
 * @param {string} props.title - Page title (already localized)
 * @param {string} props.description - Meta description (already localized)
 * @param {string} [props.image] - OG image URL
 * @param {string} [props.type] - OG type (website, product, article)
 * @param {Object|Array} [props.jsonLd] - JSON-LD structured data
 * @param {boolean} [props.noindex] - If true, add noindex robots directive
 */
export default function SEO({ title, description, image, type, jsonLd, noindex }) {
  useSEO({ title, description, image, type, jsonLd, noindex });
  return null;
}