import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/languageContext';

/**
 * A drop-in replacement for <Link> that automatically prefixes
 * the current locale to the target path.
 *
 * Usage: <LocalizedLink to="/shop">Shop</LocalizedLink>
 * Renders: <Link to="/de/shop">Shop</Link>  (when locale is 'de')
 */
export default function LocalizedLink({ to, children, ...props }) {
  const { localePath } = useLanguage();
  return (
    <Link to={localePath(to)} {...props}>
      {children}
    </Link>
  );
}