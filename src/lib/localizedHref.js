// Keep contact and off-site destinations intact. Prefix only storefront paths.
export function localizedHref(path, locale) {
  if (!path || /^(?:https?:\/\/|mailto:|tel:)/i.test(path) || path.startsWith('#')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}
