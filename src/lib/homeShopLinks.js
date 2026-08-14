export const HOME_CATEGORY_LINKS = [
  {
    key: 'mens',
    query: { gender: 'Men' },
    image: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b346ef9ce_generated_77e08c04.png',
  },
  {
    key: 'womens',
    query: { gender: 'Women' },
    image: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/3615c809c_generated_76b5ac75.png',
  },
  {
    key: 'certified',
    query: { isCertifiedPreOwned: true },
    image: '/brand-assets/rolex/collections/rolex-datejust.png',
  },
  {
    key: 'vintage',
    query: { isVintage: true },
    image: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/99e2654b4_generated_582b8b21.png',
  },
  {
    key: 'automatic',
    query: { movementType: 'Automatic' },
    image: '/brand-assets/omega/collections/omega-speedmaster-collection.png',
  },
  {
    key: 'gold',
    query: {
      caseMaterial: ['Yellow Gold', 'Rose Gold', 'White Gold', 'Steel and Gold', 'Steel and Rose Gold'],
    },
    image: '/brand-assets/rolex/collections/rolex-day-date.png',
  },
  {
    key: 'newArrivals',
    query: { isNewArrival: true },
    image: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/01b715f36_generated_902f4c1f.png',
  },
  {
    key: 'underTen',
    query: { priceMax: 10000 },
    image: '/brand-assets/iwc-schaffhausen/page/iwc-schaffhausen-portugieser-guide.jpg',
  },
];

export const HOME_MODEL_LINKS = [
  { brand: 'Rolex', model: 'Datejust', image: '/brand-assets/rolex/collections/rolex-datejust.png' },
  { brand: 'Rolex', model: 'Submariner', image: '/brand-assets/rolex/collections/rolex-submariner.png' },
  { brand: 'Rolex', model: 'Cosmograph Daytona', image: '/brand-assets/rolex/collections/rolex-cosmograph-daytona.png' },
  { brand: 'Omega', model: 'Speedmaster', image: '/brand-assets/omega/collections/omega-speedmaster-collection.png' },
  { brand: 'Audemars Piguet', model: 'Royal Oak', image: '/brand-assets/audemars-piguet/collections/audemars-piguet-royal-oak-collection.png' },
  { brand: 'Patek Philippe', model: 'Nautilus', image: '/brand-assets/patek-philippe/collections/patek-philippe-nautilus-collection.png' },
  { brand: 'Cartier', model: 'Santos de Cartier', image: '/brand-assets/cartier/collections/cartier-santos-de-cartier.png' },
  { brand: 'Tudor', model: 'Black Bay', image: '/brand-assets/tudor/collections/tudor-black-bay-collection.png' },
];

export function buildHomeShopHref(query) {
  const pairs = [];

  Object.entries(query).forEach(([key, rawValue]) => {
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];
    values.forEach((value) => {
      if (value === null || value === undefined || value === '') return;
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    });
  });

  return pairs.length ? `/shop?${pairs.join('&')}` : '/shop';
}
