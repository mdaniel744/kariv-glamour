import React from 'react';
import { BRAND_LOGOS } from '@/lib/constants';
import { useTheme } from '@/lib/themeContext';
import MediaImage from '@/components/shared/MediaImage';

/**
 * Theme-aware brand logo.
 * Renders the `light` variant (dark logo shape) on light backgrounds,
 * and the `dark` variant (white logo shape) on dark backgrounds.
 *
 * Logos can be supplied two ways (explicit props take priority):
 *   1. Via `light` / `dark` props — typically passed from the Brands
 *      database record (brandLogoLight / brandLogoDark).
 *   2. Via `slug` — falls back to the static BRAND_LOGOS map in constants.
 *
 * Falls back to the light variant if a dark variant is not yet uploaded.
 */
export default function BrandLogo({ slug, light, dark, alt = '', className = '', style, priority = false, fetchPriority = undefined }) {
  const { theme } = useTheme();

  const entry = slug ? BRAND_LOGOS[slug] || {} : {};
  const lightSrc = light || entry.light;
  const darkSrc = dark || entry.dark;

  const src = theme === 'dark' ? (darkSrc || lightSrc) : lightSrc;

  if (!src) return null;

  return <MediaImage src={src} alt={alt} width={240} height={96} sizes="190px" quality={82} priority={priority} fetchPriority={fetchPriority} className={className} style={style} />;
}
