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
    image: '/media/home/rolex-datejust.webp',
  },
  {
    key: 'vintage',
    query: { isVintage: true },
    image: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/99e2654b4_generated_582b8b21.png',
  },
  {
    key: 'automatic',
    query: { movementType: 'Automatic' },
    image: '/media/home/omega-speedmaster.webp',
  },
  {
    key: 'gold',
    query: {
      caseMaterial: ['Yellow Gold', 'Rose Gold', 'White Gold', 'Steel and Gold', 'Steel and Rose Gold'],
    },
    image: '/media/home/rolex-day-date.webp',
  },
  {
    key: 'newArrivals',
    query: { isNewArrival: true },
    image: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/01b715f36_generated_902f4c1f.png',
  },
  {
    key: 'underTen',
    query: { priceMax: 10000 },
    image: '/media/home/iwc-portugieser.webp',
  },
];

export const HOME_MODEL_LINKS = [
  { brand: 'Rolex', model: 'Datejust', image: '/media/home/rolex-datejust.webp' },
  { brand: 'Rolex', model: 'Submariner', image: '/media/home/rolex-submariner.webp' },
  { brand: 'Rolex', model: 'Cosmograph Daytona', image: '/media/home/rolex-daytona.webp' },
  { brand: 'Omega', model: 'Speedmaster', image: '/media/home/omega-speedmaster.webp' },
  { brand: 'Audemars Piguet', model: 'Royal Oak', image: '/media/home/ap-royal-oak.webp' },
  { brand: 'Patek Philippe', model: 'Nautilus', image: '/media/home/patek-nautilus.webp' },
  { brand: 'Cartier', model: 'Santos de Cartier', image: '/media/home/cartier-santos.webp' },
  { brand: 'Tudor', model: 'Black Bay', image: '/media/home/tudor-black-bay.webp' },
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
