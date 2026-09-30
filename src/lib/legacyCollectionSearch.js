// Legacy editorial category links must open a relevant product search rather
// than silently dropping shoppers onto the unfiltered shop homepage.
export const LEGACY_COLLECTION_SEARCH = Object.freeze({
  'dive-watches': 'diver',
  'chronograph-watches': 'chronograph',
  'gmt-watches': 'gmt',
  'dress-watches': 'dress',
  'sports-watches': 'sport',
  'perpetual-calendar-watches': 'perpetual calendar',
  'annual-calendar-watches': 'annual calendar',
  'moon-phase-watches': 'moon phase',
  'world-time-watches': 'world time',
  'minute-repeater-watches': 'minute repeater',
  'luxury-sports-watches': 'sport',
  'complication-watches': 'complication',
  'collectible-watches': 'collectible',
});

export function legacyCollectionDestination(locale, slug) {
  const search = LEGACY_COLLECTION_SEARCH[slug];
  if (!search) return null;
  return `/${locale}/shop?${new URLSearchParams({ search })}`;
}
