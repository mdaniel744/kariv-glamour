// Omega theme colors
export const OMEGA_THEME = {
  red: '#C8102E',
  redDark: '#9B0C22',
  black: '#0A0A0A',
  white: '#FFFFFF',
  steel: '#C0C0C0',
  steelLight: '#E8E8E8',
  oceanBlue: '#1B3A5C',
  oceanBlueLight: '#2C5282',
  moonGrey: '#9B9B9B',
  moonGreyLight: '#C0C0C0',
  lightBg: '#F5F5F5',
  warmWhite: '#FAFAFA',
  charcoal: '#1C1C1C',
  greyText: '#4A4A4A',
};

// Uploaded Omega reference images
const UP = {
  seamaster: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/1ec68cd81_Omega3watch.jpg',
  deville: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/1f699156c_Omega-DeVille-Prestige-blue-2_670a661e-540a-4921-8aa8-b1eb6b737cb1.webp',
  speedmaster: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/83c7b0bb5_omega-watches-hero-1.jpg',
};

// Unsplash watch images
const IMG = {
  watch1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  watch2: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
  watch3: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80',
  watch4: 'https://images.unsplash.com/photo-1524592094714-0f06555e7420?auto=format&fit=crop&w=800&q=80',
  watch5: 'https://images.unsplash.com/photo-1495856458515-0637183dbd1e?auto=format&fit=crop&w=800&q=80',
  watch6: 'https://images.unsplash.com/photo-1606293459339-aaa4e5e9b1f4?auto=format&fit=crop&w=800&q=80',
  watch7: 'https://images.unsplash.com/photo-1612817159949-195b6119e6d5?auto=format&fit=crop&w=800&q=80',
  watch8: 'https://images.unsplash.com/photo-1639024471283-0350c0f7a7e6?auto=format&fit=crop&w=800&q=80',
};

export const OMEGA_HERO_IMAGE = UP.speedmaster;

// Omega Collections (flat list with parentCollection)
export const OMEGA_COLLECTIONS = [
  // Main collections
  { id: 'seamaster', name: 'Seamaster', slug: 'seamaster', parentCollection: null, description: "Omega's ocean-inspired collection, created for those drawn to dive watches, maritime design and robust everyday performance.", image: UP.seamaster, displayOrder: 1 },
  { id: 'speedmaster', name: 'Speedmaster', slug: 'speedmaster', parentCollection: null, description: "Omega's legendary chronograph family, strongly associated with racing, space exploration and the Moonwatch legacy.", image: UP.speedmaster, displayOrder: 2 },
  { id: 'constellation', name: 'Constellation', slug: 'constellation', parentCollection: null, description: 'An elegant Omega collection recognized for distinctive case details, integrated bracelet styling and refined daily luxury.', image: IMG.watch3, displayOrder: 3 },
  { id: 'de-ville', name: 'De Ville', slug: 'de-ville', parentCollection: null, description: "A refined Omega dress-watch family focused on elegance, classic styling and sophisticated watchmaking.", image: UP.deville, displayOrder: 4 },

  // Seamaster subcollections
  { id: 'seamaster-aqua-terra', name: 'Seamaster Aqua Terra 150M', slug: 'seamaster-aqua-terra', parentCollection: 'Seamaster', description: 'A versatile Seamaster model blending sport, elegance and everyday wearability with a refined nautical character.', image: IMG.watch4, displayOrder: 5 },
  { id: 'seamaster-diver-300m', name: 'Seamaster Diver 300M', slug: 'seamaster-diver-300m', parentCollection: 'Seamaster', description: 'An iconic Omega dive watch known for its distinctive design, professional diving spirit and strong modern appeal.', image: UP.seamaster, displayOrder: 6 },
  { id: 'seamaster-planet-ocean', name: 'Seamaster Planet Ocean', slug: 'seamaster-planet-ocean', parentCollection: 'Seamaster', description: 'A powerful dive-watch collection inspired by Omega\u2019s maritime heritage, with strong water resistance, robust construction and modern materials.', image: IMG.watch5, displayOrder: 7 },
  { id: 'seamaster-planet-ocean-gmt', name: 'Seamaster Planet Ocean GMT', slug: 'seamaster-planet-ocean-gmt', parentCollection: 'Seamaster', description: 'A travel-ready Planet Ocean model combining dive-watch performance with dual-time-zone functionality.', image: IMG.watch6, displayOrder: 8 },
  { id: 'seamaster-planet-ocean-worldtimer', name: 'Seamaster Planet Ocean Worldtimer', slug: 'seamaster-planet-ocean-worldtimer', parentCollection: 'Seamaster', description: 'A world-time Planet Ocean model designed for global travellers who value both dive capability and multi-zone legibility.', image: IMG.watch7, displayOrder: 9 },
  { id: 'seamaster-ultra-deep', name: 'Seamaster Planet Ocean Ultra Deep', slug: 'seamaster-ultra-deep', parentCollection: 'Seamaster', description: 'A serious depth-focused Seamaster line built for extreme underwater performance and technical presence.', image: IMG.watch8, displayOrder: 10 },
  { id: 'seamaster-heritage', name: 'Seamaster Heritage Models', slug: 'seamaster-heritage', parentCollection: 'Seamaster', description: 'Heritage-inspired Seamaster references that pay tribute to Omega\u2019s rich maritime and diving history.', image: IMG.watch1, displayOrder: 11 },

  // Speedmaster subcollections
  { id: 'speedmaster-moonwatch', name: 'Speedmaster Moonwatch Professional', slug: 'speedmaster-moonwatch', parentCollection: 'Speedmaster', description: 'The iconic chronograph known for its historic connection to space exploration and timeless tool-watch design.', image: UP.speedmaster, displayOrder: 12 },
  { id: 'speedmaster-dark-side-of-the-moon', name: 'Speedmaster Dark Side of the Moon', slug: 'speedmaster-dark-side-of-the-moon', parentCollection: 'Speedmaster', description: 'A bold Speedmaster line with ceramic construction, darker tones and a modern technical personality.', image: IMG.watch2, displayOrder: 13 },
  { id: 'speedmaster-38', name: 'Speedmaster 38 mm', slug: 'speedmaster-38', parentCollection: 'Speedmaster', description: 'A refined Speedmaster interpretation with smaller proportions and versatile everyday appeal.', image: IMG.watch3, displayOrder: 14 },
  { id: 'speedmaster-two-counters', name: 'Speedmaster Two Counters', slug: 'speedmaster-two-counters', parentCollection: 'Speedmaster', description: 'A Speedmaster design family with balanced chronograph styling and a clean two-register layout.', image: IMG.watch4, displayOrder: 15 },
  { id: 'speedmaster-calibre-321', name: 'Speedmaster Calibre 321', slug: 'speedmaster-calibre-321', parentCollection: 'Speedmaster', description: 'A collector-focused Speedmaster line reviving the historic Calibre 321 movement with period-correct detailing.', image: IMG.watch5, displayOrder: 16 },

  // Constellation subcollections
  { id: 'globemaster', name: 'Globemaster', slug: 'globemaster', parentCollection: 'Constellation', description: 'A sophisticated Omega collection with classic design cues, strong precision identity and elegant finishing.', image: IMG.watch6, displayOrder: 17 },

  // De Ville subcollections
  { id: 'de-ville-ladymatic', name: 'De Ville Ladymatic', slug: 'de-ville-ladymatic', parentCollection: 'De Ville', description: 'A feminine Omega collection combining elegance, detail and graceful luxury.', image: IMG.watch7, displayOrder: 18 },
  { id: 'de-ville-tresor', name: 'De Ville Tr\u00e9sor', slug: 'de-ville-tresor', parentCollection: 'De Ville', description: 'A slim and elegant De Ville collection with dress-watch character and refined proportions.', image: UP.deville, displayOrder: 19 },
  { id: 'de-ville-prestige', name: 'De Ville Prestige', slug: 'de-ville-prestige', parentCollection: 'De Ville', description: 'A classic Omega dress-watch line designed for timeless daily elegance.', image: UP.deville, displayOrder: 20 },
  { id: 'de-ville-tourbillon', name: 'De Ville Tourbillon', slug: 'de-ville-tourbillon', parentCollection: 'De Ville', description: 'A high-watchmaking expression within Omega\u2019s De Ville family, suitable for collector-focused product discovery.', image: IMG.watch8, displayOrder: 21 },
];

// Quick filter chips for product grid
export const OMEGA_QUICK_FILTERS = [
  { label: 'Omega Speedmaster', link: '/omega-speedmaster-kaufen' },
  { label: 'Omega Moonwatch', link: '/omega-moonwatch-kaufen' },
  { label: 'Omega Seamaster', link: '/omega-seamaster-kaufen' },
  { label: 'Omega Seamaster Diver 300M', link: '/omega-seamaster-diver-300m-kaufen' },
  { label: 'Omega Planet Ocean', link: '/omega-seamaster-planet-ocean-kaufen' },
  { label: 'Omega Aqua Terra', link: '/omega-seamaster-aqua-terra-kaufen' },
  { label: 'Omega Constellation', link: '/omega-constellation-kaufen' },
  { label: 'Omega De Ville', link: '/omega-de-ville-kaufen' },
  { label: 'Pre-Owned Omega', link: '/omega-gebraucht-kaufen' },
  { label: 'Omega with Box and Papers', link: '/watch-guides/box-and-papers' },
  { label: 'Omega Master Chronometer', link: '/omega/master-chronometer-guide' },
];

// SEO Cards
export const OMEGA_SEO_CARDS = [
  { title: 'Omega kaufen', description: 'Explore Omega watches through Kariv Glamour with refined product presentation, transparent product details and a smooth luxury shopping experience.', link: '/omega-kaufen', image: IMG.watch1 },
  { title: 'Omega gebraucht kaufen', description: 'Discover pre-owned Omega watches with clear condition grading, box and papers information, service history details and collector-friendly product data.', link: '/omega-gebraucht-kaufen', image: IMG.watch2 },
  { title: 'Omega Speedmaster kaufen', description: 'Browse Omega Speedmaster watches, including Moonwatch-inspired chronographs and modern Speedmaster references.', link: '/omega-speedmaster-kaufen', image: UP.speedmaster },
  { title: 'Omega Seamaster kaufen', description: 'Explore Omega Seamaster watches, from Aqua Terra and Diver 300M models to Planet Ocean and Ultra Deep references.', link: '/omega-seamaster-kaufen', image: UP.seamaster },
  { title: 'Omega Moonwatch kaufen', description: 'Discover the Omega Speedmaster Moonwatch, one of the most recognized chronographs in watch history.', link: '/omega-moonwatch-kaufen', image: IMG.watch3 },
  { title: 'Omega Seamaster Diver 300M kaufen', description: 'Shop Omega Seamaster Diver 300M watches with distinctive styling, professional dive-watch character and strong everyday appeal.', link: '/omega-seamaster-diver-300m-kaufen', image: IMG.watch4 },
  { title: 'Omega Planet Ocean kaufen', description: 'Explore Omega Seamaster Planet Ocean watches, designed for depth, durability and powerful dive-watch presence.', link: '/omega-seamaster-planet-ocean-kaufen', image: IMG.watch5 },
  { title: 'Welche Omega kaufen?', description: 'Read the Omega buying guide to compare Speedmaster, Seamaster, Constellation and De Ville collections.', link: '/welche-omega-kaufen', image: IMG.watch6 },
];

// Editorial sections data (Story, Watchmaking, Maintenance)
export const OMEGA_EDITORIAL_SECTIONS = [
  {
    id: 'omega-story',
    eyebrow: 'Heritage',
    title: 'The Omega Story',
    description: 'Omega has built a legacy of precision, innovation and adventure. From timing the Olympic Games to accompanying astronauts on the Moon, and from equipping divers with the Seamaster to defining the modern chronograph with the Speedmaster, the Omega story spans over a century of horological achievement. At Kariv Glamour, we celebrate this heritage by offering carefully selected Omega timepieces, each presented with full transparency and expert insight.',
    cta: 'Read the Omega Story',
    link: '/omega/story',
    image: UP.speedmaster,
    internalLinks: [
      { text: 'Omega heritage', link: '/omega/story' },
      { text: 'space exploration', link: '/omega-speedmaster-kaufen' },
      { text: 'ocean performance', link: '/omega-seamaster-kaufen' },
      { text: 'precision timing', link: '/omega/watchmaking' },
      { text: 'Moonwatch', link: '/omega-moonwatch-kaufen' },
    ],
  },
  {
    id: 'omega-watchmaking',
    eyebrow: 'Craftsmanship',
    title: 'Omega Watchmaking',
    description: 'Omega watchmaking stands for precision, innovation and reliability. From the revolutionary Co-Axial escapement to Master Chronometer certification, anti-magnetic performance and carefully engineered dive-watch construction, every Omega is built to exacting standards. At Kariv Glamour, we help you understand the craftsmanship behind each Omega, including calibre numbers, movement types, water resistance and the difference between dress watches, sports watches and chronographs.',
    cta: 'Explore Omega Watchmaking',
    link: '/omega/watchmaking',
    image: IMG.watch6,
    internalLinks: [
      { text: 'Co-Axial movements', link: '/omega/co-axial-guide' },
      { text: 'Master Chronometer', link: '/omega/master-chronometer-guide' },
      { text: 'calibre numbers', link: '/watch-guides/watch-reference-number-guide' },
      { text: 'watch case materials', link: '/watch-guides/watch-case-materials' },
      { text: 'chronograph watches', link: '/collections/chronograph-watches' },
      { text: 'dive watches', link: '/collections/dive-watches' },
    ],
  },
  {
    id: 'omega-maintenance',
    eyebrow: 'Care',
    title: 'Omega Maintenance',
    description: 'Proper care preserves the beauty, reliability and value of an Omega watch. Regular servicing, water resistance checks, bracelet and strap care, leather and rubber strap protection, and post-salt-water rinsing for dive watches all contribute to long-term performance. For pre-owned and collectible Omega watches, preserving box, papers, warranty cards, service documents and invoices is especially important. Kariv Glamour provides guidance to help you maintain your timepiece with confidence.',
    cta: 'Learn About Omega Maintenance',
    link: '/omega/maintenance',
    image: UP.seamaster,
    internalLinks: [
      { text: 'service history', link: '/watch-guides/service-history' },
      { text: 'box and papers', link: '/watch-guides/box-and-papers' },
      { text: 'condition grading', link: '/condition-grading' },
      { text: 'pre-owned Omega', link: '/omega-gebraucht-kaufen' },
      { text: 'water resistance', link: '/watch-guides/watch-water-resistance' },
      { text: 'dive watch care', link: '/watch-guides/dive-watch-care' },
    ],
  },
];

// Read More carousel cards
export const OMEGA_READ_MORE = [
  { title: 'Omega Story', description: 'Explore Omega\u2019s heritage, precision identity, sport timing, space history and ocean-focused watchmaking.', link: '/omega/story', image: UP.speedmaster },
  { title: 'Omega Watchmaking', description: 'Learn about Co-Axial movements, Master Chronometer performance, calibres, materials and technical details.', link: '/omega/watchmaking', image: IMG.watch6 },
  { title: 'Omega Maintenance', description: 'Understand how to care for an Omega watch and preserve its condition, reliability, documentation and long-term appeal.', link: '/omega/maintenance', image: UP.seamaster },
  { title: 'Omega Buying Guide', description: 'Compare Speedmaster, Seamaster, Constellation and De Ville to find the Omega model that fits your lifestyle.', link: '/welche-omega-kaufen', image: IMG.watch3 },
  { title: 'Omega Speedmaster Guide', description: 'Learn why the Speedmaster remains one of the most recognized chronographs in luxury watch collecting.', link: '/omega-speedmaster-kaufen', image: IMG.watch4 },
  { title: 'Omega Seamaster Guide', description: 'Explore the Seamaster family, including Aqua Terra, Diver 300M, Planet Ocean and Ultra Deep models.', link: '/omega-seamaster-kaufen', image: IMG.watch5 },
  { title: 'Omega Box and Papers', description: 'Learn why original documentation, warranty cards, service records and purchase history matter when buying Omega.', link: '/watch-guides/box-and-papers', image: IMG.watch7 },
];

// Internal linking hub
export const OMEGA_INTERNAL_LINKS = {
  popularSearches: [
    { text: 'Omega kaufen', link: '/omega-kaufen' },
    { text: 'Omega Uhr kaufen', link: '/omega-uhr-kaufen' },
    { text: 'Omega gebraucht kaufen', link: '/omega-gebraucht-kaufen' },
    { text: 'Gebrauchte Omega Uhren', link: '/gebrauchte-omega-uhren' },
    { text: 'Omega f\u00fcr Herren', link: '/omega-herren' },
    { text: 'Omega f\u00fcr Damen', link: '/omega-damen' },
    { text: 'Omega mit Box und Papieren', link: '/watch-guides/box-and-papers' },
  ],
  iconicModels: [
    { text: 'Omega Speedmaster kaufen', link: '/omega-speedmaster-kaufen' },
    { text: 'Omega Moonwatch kaufen', link: '/omega-moonwatch-kaufen' },
    { text: 'Omega Seamaster kaufen', link: '/omega-seamaster-kaufen' },
    { text: 'Omega Seamaster Diver 300M kaufen', link: '/omega-seamaster-diver-300m-kaufen' },
    { text: 'Omega Planet Ocean kaufen', link: '/omega-seamaster-planet-ocean-kaufen' },
    { text: 'Omega Aqua Terra kaufen', link: '/omega-seamaster-aqua-terra-kaufen' },
    { text: 'Omega Constellation kaufen', link: '/omega-constellation-kaufen' },
    { text: 'Omega De Ville kaufen', link: '/omega-de-ville-kaufen' },
  ],
  learningGuides: [
    { text: 'Welche Omega kaufen?', link: '/welche-omega-kaufen' },
    { text: 'Omega Speedmaster oder Seamaster?', link: '/omega-speedmaster-oder-seamaster' },
    { text: 'Omega neu oder gebraucht kaufen?', link: '/omega-neu-oder-gebraucht' },
    { text: 'Omega Box und Papiere Guide', link: '/watch-guides/box-and-papers' },
    { text: 'Omega Wartung und Pflege', link: '/omega/maintenance' },
    { text: 'Omega Story', link: '/omega/story' },
    { text: 'Omega Watchmaking', link: '/omega/watchmaking' },
    { text: 'Omega Master Chronometer Guide', link: '/omega/master-chronometer-guide' },
  ],
  relatedBrands: [
    { text: 'Rolex watches', link: '/brands/rolex' },
    { text: 'Breitling watches', link: '/brands/breitling' },
    { text: 'TAG Heuer watches', link: '/brands/tag-heuer' },
    { text: 'Tudor watches', link: '/brands/tudor' },
    { text: 'IWC Schaffhausen watches', link: '/brands/iwc' },
    { text: 'Cartier watches', link: '/brands/cartier' },
    { text: 'Grand Seiko watches', link: '/brands/grand-seiko' },
    { text: 'Patek Philippe watches', link: '/brands/patek-philippe' },
  ],
  relatedCategories: [
    { text: 'Certified Pre-Owned Watches', link: '/certified-pre-owned' },
    { text: 'Vintage Watches', link: '/vintage-watches' },
    { text: 'Men\u2019s Luxury Watches', link: '/mens-watches' },
    { text: 'Women\u2019s Luxury Watches', link: '/womens-watches' },
    { text: 'Dive Watches', link: '/collections/dive-watches' },
    { text: 'Chronograph Watches', link: '/collections/chronograph-watches' },
    { text: 'GMT Watches', link: '/collections/gmt-watches' },
    { text: 'Dress Watches', link: '/collections/dress-watches' },
    { text: 'Sports Watches', link: '/collections/sports-watches' },
  ],
};

// FAQ with segment-based answers for internal links
export const OMEGA_FAQS = [
  {
    question: 'Where can I buy an Omega watch online?',
    answer: [
      { text: 'You can buy an Omega watch online through Kariv Glamour, where each timepiece is presented with transparent product details, clear condition grading, and reference number visibility. Browse our ' },
      { text: 'Omega collection', link: '/brands/omega' },
      { text: ' to explore available models, or visit our ' },
      { text: 'pre-owned Omega', link: '/omega-gebraucht-kaufen' },
      { text: ' page for previously owned timepieces.' },
    ],
  },
  {
    question: 'Is it safe to buy a pre-owned Omega?',
    answer: [
      { text: 'Yes. When you buy a ' },
      { text: 'pre-owned Omega', link: '/omega-gebraucht-kaufen' },
      { text: ' from Kariv Glamour, each watch is carefully reviewed and presented with clear ' },
      { text: 'condition grading', link: '/condition-grading' },
      { text: ', ' },
      { text: 'box and papers', link: '/watch-guides/box-and-papers' },
      { text: ' information, and service history where available. We do not sell replica or counterfeit watches.' },
    ],
  },
  {
    question: 'What does "box and papers" mean when buying an Omega?',
    answer: [
      { text: 'Box and papers refers to the original presentation box and warranty documents that accompany an Omega watch. Having the original ' },
      { text: 'box and papers', link: '/watch-guides/box-and-papers' },
      { text: ' can enhance collectability and resale value. Learn more in our dedicated guide.' },
    ],
  },
  {
    question: 'Which Omega should I buy first?',
    answer: [
      { text: 'The right first Omega depends on your lifestyle, taste, and budget. The Seamaster is an iconic sports watch, while the De Ville offers elegant dress-watch appeal. Read our ' },
      { text: 'Which Omega should I buy first?', link: '/welche-omega-kaufen' },
      { text: ' guide for a detailed comparison of popular models.' },
    ],
  },
  {
    question: 'What is the difference between Omega Speedmaster and Seamaster?',
    answer: [
      { text: 'The ' },
      { text: 'Speedmaster', link: '/omega-speedmaster-kaufen' },
      { text: ' is Omega\u2019s legendary chronograph family associated with racing and space exploration, while the ' },
      { text: 'Seamaster', link: '/omega-seamaster-kaufen' },
      { text: ' is Omega\u2019s ocean-inspired dive-watch collection. The Speedmaster is a tool chronograph, while the Seamaster is built for water performance. Read our ' },
      { text: 'Speedmaster or Seamaster', link: '/omega-speedmaster-oder-seamaster' },
      { text: ' comparison for more detail.' },
    ],
  },
  {
    question: 'What is the difference between Seamaster Diver 300M and Planet Ocean?',
    answer: [
      { text: 'The ' },
      { text: 'Diver 300M', link: '/omega-seamaster-diver-300m-kaufen' },
      { text: ' is rated to 300 metres and is known for its distinctive design and everyday wearability, while the ' },
      { text: 'Planet Ocean', link: '/omega-seamaster-planet-ocean-kaufen' },
      { text: ' offers greater depth ratings, more robust construction and a more technical dive-watch personality.' },
    ],
  },
  {
    question: 'What is the Omega Moonwatch?',
    answer: [
      { text: 'The Omega ' },
      { text: 'Moonwatch', link: '/omega-moonwatch-kaufen' },
      { text: ' is the Speedmaster Professional chronograph famously associated with NASA\u2019s lunar missions. It remains one of the most recognized chronographs in watch history. Explore our ' },
      { text: 'Speedmaster', link: '/omega-speedmaster-kaufen' },
      { text: ' collection to browse available references.' },
    ],
  },
  {
    question: 'What is an Omega Master Chronometer?',
    answer: [
      { text: 'A ' },
      { text: 'Master Chronometer', link: '/omega/master-chronometer-guide' },
      { text: ' is an Omega watch that has passed rigorous testing for precision, magnetic resistance and water resistance, certified by an independent institute. This certification represents one of the highest standards in the Swiss watch industry.' },
    ],
  },
  {
    question: 'What is a Co-Axial movement?',
    answer: [
      { text: 'A ' },
      { text: 'Co-Axial movement', link: '/omega/co-axial-guide' },
      { text: ' is an Omega-developed escapement technology designed to reduce friction and improve long-term precision and service intervals. It is one of the key innovations in modern Omega watchmaking.' },
    ],
  },
  {
    question: 'Are Omega watches good for daily wear?',
    answer: [
      { text: 'Yes. Omega watches are engineered for durability and reliability. Models like the Seamaster and Speedmaster are particularly well-suited for daily wear, combining robust construction with versatile design. Explore our ' },
      { text: 'Seamaster', link: '/omega-seamaster-kaufen' },
      { text: ' and ' },
      { text: 'Speedmaster', link: '/omega-speedmaster-kaufen' },
      { text: ' collections for everyday options.' },
    ],
  },
  {
    question: 'What should I check before buying a used Omega?',
    answer: [
      { text: 'Before buying a used Omega, check the ' },
      { text: 'condition grading', link: '/condition-grading' },
      { text: ', reference number, year of production, ' },
      { text: 'box and papers', link: '/watch-guides/box-and-papers' },
      { text: ' status, ' },
      { text: 'service history', link: '/watch-guides/service-history' },
      { text: ', and authenticity. Our guides provide detailed information to help you evaluate each timepiece.' },
    ],
  },
  {
    question: 'Can I return an Omega watch purchased online?',
    answer: [
      { text: 'Yes. Kariv Glamour offers a return policy for eligible purchases. Please review our ' },
      { text: 'returns', link: '/returns-and-refunds' },
      { text: ' page for full details on return conditions and process.' },
    ],
  },
];

// Trust points
export const OMEGA_TRUST_POINTS = [
  'Transparent product descriptions',
  'Clear condition grading',
  'Box and papers information',
  'Reference number visibility',
  'Calibre information where available',
  'Service history visibility where available',
  'Secure checkout',
  'Insured shipping',
  'Customer support before purchase',
  'No replica or counterfeit watches',
];

export const OMEGA_TRUST_LINKS = [
  { text: 'Authentication Process', link: '/authentication' },
  { text: 'Condition Grading', link: '/condition-grading' },
  { text: 'Box and Papers Guide', link: '/watch-guides/box-and-papers' },
  { text: 'Service History Guide', link: '/watch-guides/service-history' },
  { text: 'Returns and Refunds', link: '/returns-and-refunds' },
  { text: 'Shipping Policy', link: '/shipping-policy' },
  { text: 'Contact Customer Service', link: '/customer-service' },
];

// SEO Landing pages content
export const OMEGA_SEO_PAGES = {
  'omega-kaufen': {
    title: 'Omega kaufen | Neue & gebrauchte Omega Uhren | Kariv Glamour',
    description: 'Entdecken Sie Omega Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Omega Modelle wie Speedmaster, Moonwatch, Seamaster, Diver 300M, Planet Ocean, Constellation und De Ville mit transparenter Produktinformation.',
    h1: 'Omega kaufen bei Kariv Glamour',
    intro: 'Bei Kariv Glamour k\u00f6nnen Sie Omega Uhren online kaufen \u2014 mit transparenter Produktinformation, klarer Zustandsbewertung und einem verfeinerten Einkaufserlebnis. Entdecken Sie neue, gebrauchte und vintage Omega Modelle von den ikonischsten Kollektionen der Manufaktur.',
    collectionFilter: null,
  },
  'omega-uhr-kaufen': {
    title: 'Omega Uhr kaufen | Omega Uhren online | Kariv Glamour',
    description: 'Omega Uhr kaufen bei Kariv Glamour. Entdecken Sie Omega Uhren wie Speedmaster, Seamaster, Constellation und De Ville mit transparenter Produktinformation und Referenznummern.',
    h1: 'Omega Uhr kaufen',
    intro: 'Wenn Sie eine Omega Uhr kaufen m\u00f6chten, bietet Kariv Glamour eine kuratierte Auswahl an Zeitmessern. Jede Uhr wird mit transparenter Produktinformation, Referenznummern-Sichtbarkeit und klarer Zustandsbewertung pr\u00e4sentiert.',
    collectionFilter: null,
  },
  'omega-gebraucht-kaufen': {
    title: 'Omega gebraucht kaufen | Pre-Owned Omega Uhren | Kariv Glamour',
    description: 'Omega gebraucht kaufen bei Kariv Glamour. Entdecken Sie gepr\u00fcfte pre-owned Omega Uhren mit klarer Zustandsbewertung, Box und Papiere Informationen und detaillierter Produktpr\u00e4sentation.',
    h1: 'Omega gebraucht kaufen',
    intro: 'Wenn Sie eine Omega gebraucht kaufen m\u00f6chten, bietet Kariv Glamour eine kuratierte Auswahl an pre-owned Zeitmessern. Jede Uhr wird mit klarer Zustandsbewertung, Box und Papiere Informationen und Referenznummern-Sichtbarkeit pr\u00e4sentiert.',
    collectionFilter: { isCertifiedPreOwned: true },
  },
  'gebrauchte-omega-uhren': {
    title: 'Gebrauchte Omega Uhren | Used Omega Watches | Kariv Glamour',
    description: 'Browse gebrauchte Omega Uhren bei Kariv Glamour. Speedmaster, Seamaster, Constellation und De Ville \u2014 mit transparenter Zustandsbewertung und Referenznummern.',
    h1: 'Gebrauchte Omega Uhren',
    intro: 'St\u00f6bern Sie durch gebrauchte Omega Uhren bei Kariv Glamour. Von der Speedmaster \u00fcber die Seamaster bis zur Constellation \u2014 jede Uhr wird mit transparenter Zustandsbewertung und vollst\u00e4ndigen Produktinformationen pr\u00e4sentiert.',
    collectionFilter: { isCertifiedPreOwned: true },
  },
  'omega-speedmaster-kaufen': {
    title: 'Omega Speedmaster kaufen | Moonwatch & Chronographen | Kariv Glamour',
    description: 'Omega Speedmaster kaufen bei Kariv Glamour. Entdecken Sie den legend\u00e4ren Omega Chronographen, assoziiert mit Motorsport, Weltraumforschung und der Moonwatch-Tradition.',
    h1: 'Omega Speedmaster kaufen',
    intro: 'Die Omega Speedmaster ist einer der bekanntesten Chronographen der Welt. Bei Kariv Glamour k\u00f6nnen Sie die Speedmaster kaufen \u2014 mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Speedmaster' },
  },
  'omega-moonwatch-kaufen': {
    title: 'Omega Moonwatch kaufen | Speedmaster Moonwatch | Kariv Glamour',
    description: 'Omega Moonwatch kaufen bei Kariv Glamour. Entdecken Sie die Omega Speedmaster Moonwatch, eine der bekanntesten Chronographen der Uhrengeschichte.',
    h1: 'Omega Moonwatch kaufen',
    intro: 'Die Omega Speedmaster Moonwatch ist einer der ikonischsten Chronographen der Uhrengeschichte. Bei Kariv Glamour k\u00f6nnen Sie die Moonwatch kaufen \u2014 mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Speedmaster' },
  },
  'omega-seamaster-kaufen': {
    title: 'Omega Seamaster kaufen | Aqua Terra, Diver 300M & Planet Ocean | Kariv Glamour',
    description: 'Omega Seamaster kaufen bei Kariv Glamour. Entdecken Sie Omega Seamaster Uhren von Aqua Terra und Diver 300M bis Planet Ocean und Ultra Deep.',
    h1: 'Omega Seamaster kaufen',
    intro: 'Die Omega Seamaster ist eine ozean-inspirierte Kollektion, die f\u00fcr Taucheruhren, maritimes Design und robuste Alltagsleistung steht. Bei Kariv Glamour k\u00f6nnen Sie die Seamaster kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-seamaster-diver-300m-kaufen': {
    title: 'Omega Seamaster Diver 300M kaufen | Kariv Glamour',
    description: 'Omega Seamaster Diver 300M kaufen bei Kariv Glamour. Shoppen Sie die Diver 300M mit markantem Design, professionellem Taucheruhren-Charakter und starkem modernem Appeal.',
    h1: 'Omega Seamaster Diver 300M kaufen',
    intro: 'Die Omega Seamaster Diver 300M ist eine ikonische Taucheruhr, bekannt f\u00fcr ihr markantes Design und ihren professionellen Tauchgeist. Bei Kariv Glamour k\u00f6nnen Sie die Diver 300M kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-seamaster-planet-ocean-kaufen': {
    title: 'Omega Seamaster Planet Ocean kaufen | Kariv Glamour',
    description: 'Omega Seamaster Planet Ocean kaufen bei Kariv Glamour. Entdecken Sie Planet Ocean Uhren, konzipiert f\u00fcr Tiefe, Haltbarkeit und kraftvolle Taucheruhren-Pr\u00e4senz.',
    h1: 'Omega Seamaster Planet Ocean kaufen',
    intro: 'Die Omega Seamaster Planet Ocean ist eine kraftvolle Taucheruhren-Kollektion, inspiriert von Omega\u2019s maritimer Tradition. Bei Kariv Glamour k\u00f6nnen Sie die Planet Ocean kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-seamaster-aqua-terra-kaufen': {
    title: 'Omega Seamaster Aqua Terra kaufen | Kariv Glamour',
    description: 'Omega Seamaster Aqua Terra kaufen bei Kariv Glamour. Eine vielseitige Seamaster-Modellreihe, die Sport, Eleganz und allt\u00e4gliche Tragbarkeit vereint.',
    h1: 'Omega Seamaster Aqua Terra kaufen',
    intro: 'Die Omega Seamaster Aqua Terra 150M vereint Sport, Eleganz und allt\u00e4gliche Tragbarkeit mit einem nautischen Charakter. Bei Kariv Glamour k\u00f6nnen Sie die Aqua Terra kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Seamaster' },
  },
  'omega-constellation-kaufen': {
    title: 'Omega Constellation kaufen | Kariv Glamour',
    description: 'Omega Constellation kaufen bei Kariv Glamour. Entdecken Sie eine elegante Omega Kollektion mit markanten Geh\u00e4usedetails, integriertem Armband-Styling und verfeinertem Luxus.',
    h1: 'Omega Constellation kaufen',
    intro: 'Die Omega Constellation ist eine elegante Kollektion, die f\u00fcr markante Geh\u00e4usedetails und integriertes Armband-Styling steht. Bei Kariv Glamour k\u00f6nnen Sie die Constellation kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Constellation' },
  },
  'omega-de-ville-kaufen': {
    title: 'Omega De Ville kaufen | Dress Watches | Kariv Glamour',
    description: 'Omega De Ville kaufen bei Kariv Glamour. Entdecken Sie eine verfeinerte Omega Dress-Watch-Familie mit Fokus auf Eleganz, klassisches Styling und anspruchsvolle Uhrmacherei.',
    h1: 'Omega De Ville kaufen',
    intro: 'Die Omega De Ville ist eine verfeinerte Dress-Watch-Familie, die f\u00fcr Eleganz und anspruchsvolle Uhrmacherei steht. Bei Kariv Glamour k\u00f6nnen Sie die De Ville kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'De Ville' },
  },
  'omega-herren': {
    title: 'Omega f\u00fcr Herren kaufen | Herren Omega Uhren | Kariv Glamour',
    description: 'Omega f\u00fcr Herren kaufen bei Kariv Glamour. Entdecken Sie Omega Herrenuhren \u2014 von der Speedmaster bis zur Seamaster \u2014 mit transparenter Produktinformation.',
    h1: 'Omega f\u00fcr Herren',
    intro: 'Entdecken Sie Omega Uhren f\u00fcr Herren bei Kariv Glamour. Von professionellen Taucheruhren bis zu eleganten Chronographen \u2014 jede Uhr wird mit transparenter Produktinformation pr\u00e4sentiert.',
    collectionFilter: { gender: 'Men' },
  },
  'omega-damen': {
    title: 'Omega f\u00fcr Damen kaufen | Damen Omega Uhren | Kariv Glamour',
    description: 'Omega f\u00fcr Damen kaufen bei Kariv Glamour. Entdecken Sie Omega Damenuhren \u2014 von der Constellation bis zur De Ville \u2014 mit transparenter Produktinformation.',
    h1: 'Omega f\u00fcr Damen',
    intro: 'Entdecken Sie Omega Uhren f\u00fcr Damen bei Kariv Glamour. Von der Constellation bis zur De Ville Ladymatic \u2014 jede Uhr wird mit transparenter Produktinformation pr\u00e4sentiert.',
    collectionFilter: { gender: 'Women' },
  },
  'welche-omega-kaufen': {
    title: 'Welche Omega kaufen? | Omega Kaufberatung | Kariv Glamour',
    description: 'Welche Omega kaufen? Lesen Sie die Omega Kaufberatung bei Kariv Glamour, um Speedmaster, Seamaster, Constellation und De Ville zu vergleichen und das richtige Modell zu finden.',
    h1: 'Welche Omega kaufen?',
    intro: 'Die Wahl der richtigen Omega h\u00e4ngt von Ihrem Lebensstil, Geschmack und Budget ab. Die Speedmaster ist ein ikonischer Chronograph, die Seamaster eine professionelle Taucheruhr. Dieser Guide hilft Ihnen, die richtige Entscheidung zu treffen.',
    collectionFilter: null,
    isGuide: true,
  },
  'omega-speedmaster-oder-seamaster': {
    title: 'Omega Speedmaster oder Seamaster? | Kariv Glamour',
    description: 'Omega Speedmaster oder Seamaster? Vergleichen Sie beide Kollektionen bei Kariv Glamour, um die richtige Omega f\u00fcr Ihre Bed\u00fcrfnisse zu finden.',
    h1: 'Omega Speedmaster oder Seamaster?',
    intro: 'Sollten Sie eine Omega Speedmaster oder Seamaster kaufen? Die Speedmaster ist ein legend\u00e4rer Chronograph f\u00fcr Weltraum und Motorsport, w\u00e4hrend die Seamaster eine ozean-inspirierte Taucheruhr ist. Beide haben einzigartige Vorteile.',
    collectionFilter: null,
    isGuide: true,
  },
  'omega-neu-oder-gebraucht': {
    title: 'Omega neu oder gebraucht kaufen? | Kariv Glamour',
    description: 'Omega neu oder gebraucht kaufen? Vergleichen Sie die Vor- und Nachteile beider Optionen bei Kariv Glamour, um die richtige Entscheidung zu treffen.',
    h1: 'Omega neu oder gebraucht kaufen?',
    intro: 'Sollten Sie eine Omega neu oder gebraucht kaufen? Eine neue Omega bietet volle Garantie und unbenutzten Zustand, w\u00e4hrend eine gebrauchte Omega oft ein besseres Preis-Leistungs-Verh\u00e4ltnis und Zugang zu diskontinuierten Modellen bietet.',
    collectionFilter: null,
    isGuide: true,
  },
  'omega-story': {
    title: 'The Omega Story | Heritage & History | Kariv Glamour',
    description: 'Entdecken Sie die Omega Story bei Kariv Glamour. Erfahren Sie \u00fcber das Erbe, Pr\u00e4zision, Weltraumforschung, Ozeanleistung und die bleibende Anziehungskraft hinter Omega.',
    h1: 'The Omega Story',
    intro: 'Omega hat eine Geschichte von \u00fcber einem Jahrhundert gepr\u00e4gt. Von olympischer Zeitmessung \u00fcber die Mondlandung bis zur ozean-inspirierten Seamaster \u2014 die Omega Story ist eine von Pr\u00e4zision, Innovation und Abenteuer.',
    collectionFilter: null,
    isGuide: true,
  },
  'omega-watchmaking': {
    title: 'Omega Watchmaking | Co-Axial & Master Chronometer | Kariv Glamour',
    description: 'Erfahren Sie \u00fcber Omega Uhrmacherei bei Kariv Glamour. Co-Axial Werke, Master Chronometer Zertifizierung, Kaliber, Materialien und Designprinzipien.',
    h1: 'Omega Watchmaking',
    intro: 'Omega Uhrmacherei steht f\u00fcr Pr\u00e4zision, Innovation und Zuverl\u00e4ssigkeit. Vom revolution\u00e4ren Co-Axial-Hemmungssystem bis zur Master Chronometer Zertifizierung \u2014 jede Komponente ist f\u00fcr h\u00f6chste Standards konstruiert.',
    collectionFilter: null,
    isGuide: true,
  },
  'omega-maintenance': {
    title: 'Omega Maintenance | Care & Servicing | Kariv Glamour',
    description: 'Omega Wartung und Pflege bei Kariv Glamour. Erfahren Sie, wie Sie eine Omega Uhr pflegen und ihren Zustand, ihre Zuverl\u00e4ssigkeit und langfristigen Wert erhalten.',
    h1: 'Omega Maintenance',
    intro: 'Die richtige Pflege erh\u00e4lt die Sch\u00f6nheit, Zuverl\u00e4ssigkeit und den Wert einer Omega Uhr. Regelm\u00e4\u00dfige Wartung, Wasserdichtigkeitspr\u00fcfungen, Armbandpflege und das Erhalten von Box, Papieren und Servicedokumenten tragen zur langfristigen Leistung bei.',
    collectionFilter: null,
    isGuide: true,
  },
  'omega-master-chronometer-guide': {
    title: 'Omega Master Chronometer Guide | Kariv Glamour',
    description: 'Erfahren Sie alles \u00fcber die Omega Master Chronometer Zertifizierung bei Kariv Glamour. Pr\u00e4zision, Magnetresistenz und Wasserdichtigkeit auf h\u00f6chstem Standard.',
    h1: 'Omega Master Chronometer Guide',
    intro: 'Die Master Chronometer Zertifizierung ist einer der h\u00f6chsten Standards in der Schweizer Uhrmacherei. Sie garantiert Pr\u00e4zision, Magnetresistenz und Wasserdichtigkeit durch unabh\u00e4ngige Pr\u00fcfung.',
    collectionFilter: null,
    isGuide: true,
  },
  'omega-co-axial-guide': {
    title: 'Omega Co-Axial Guide | Kariv Glamour',
    description: 'Erfahren Sie alles \u00fcber die Omega Co-Axial Hemmung bei Kariv Glamour. Reduzierte Reibung, verbesserte Pr\u00e4zision und l\u00e4ngere Serviceintervalle.',
    h1: 'Omega Co-Axial Guide',
    intro: 'Die Co-Axial Hemmung ist eine von Omega entwickelte Innovation, die Reibung reduziert und die langfristige Pr\u00e4zision sowie Serviceintervalle verbessert. Sie ist eine der wichtigsten Innovationen der modernen Omega Uhrmacherei.',
    collectionFilter: null,
    isGuide: true,
  },
};