// Patek Philippe theme colors
export const PATEK_THEME = {
  navy: '#1A2B4A',
  navyDark: '#0F1D33',
  navyLight: '#2A3F6B',
  champagne: '#C5A069',
  champagneLight: '#D4BC8E',
  roseGold: '#C9A87C',
  ivory: '#F8F5EF',
  cream: '#FDFBF6',
  graphite: '#2D2926',
  silver: '#BCC6CC',
};

// Uploaded reference images
const UP = {
  goldenEllipse: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/8ddd693a6_PatekPhilippeGoldenEllipse.png',
  nautilus: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/066fee3d9_PatekPhilippeNautilusKaufen.png',
  threeWatchesGrey: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/f13bd47e5_PatekPhilippekaufen.jpg',
  pocketWatch: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/efe687a14_PatekPhilippepocketwatch.jpg',
  threeWatches2: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/abb6efa87_Patekphilippe.jpg',
  brownDress: 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/11d4ce6fa_PatekPhilippeBrown.png',
};

// Unsplash supplementary images
const UNSPLASH = {
  watch1: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  watch2: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=800&q=80',
  watch3: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80',
  watch4: 'https://images.unsplash.com/photo-1524592094714-0f06555e7420?auto=format&fit=crop&w=800&q=80',
  watch5: 'https://images.unsplash.com/photo-1495856458515-0637183dbd1e?auto=format&fit=crop&w=800&q=80',
  watch6: 'https://images.unsplash.com/photo-1606293459339-aaa4e5e9b1f4?auto=format&fit=crop&w=800&q=80',
  watch7: 'https://images.unsplash.com/photo-1612817159949-195b6119e6d5?auto=format&fit=crop&w=800&q=80',
  watch8: 'https://images.unsplash.com/photo-1639024471283-0350c0f7a7e6?auto=format&fit=crop&w=800&q=80',
};

export const PATEK_HERO_IMAGE = UP.threeWatchesGrey;

// Patek Philippe Collections
export const PATEK_COLLECTIONS = [
  { id: 'nautilus', name: 'Nautilus', slug: 'nautilus', description: 'A modern luxury sports icon known for its distinctive case shape, integrated bracelet, and strong collector demand.', image: UP.nautilus, displayOrder: 1 },
  { id: 'aquanaut', name: 'Aquanaut', slug: 'aquanaut', description: 'A contemporary and sporty Patek Philippe collection with a relaxed character, modern proportions, and everyday versatility.', image: UNSPLASH.watch1, displayOrder: 2 },
  { id: 'cubitus', name: 'Cubitus', slug: 'cubitus', description: 'A bold modern Patek Philippe collection with a distinctive square-inspired design and elegant contemporary appeal.', image: UNSPLASH.watch2, displayOrder: 3 },
  { id: 'calatrava', name: 'Calatrava', slug: 'calatrava', description: 'A timeless dress watch collection known for purity, elegance, refined proportions, and classic round case design.', image: UP.brownDress, displayOrder: 4 },
  { id: 'complications', name: 'Complications', slug: 'complications', description: 'A sophisticated collection for collectors who appreciate useful and poetic watch functions such as calendars, travel time, and moon phases.', image: UNSPLASH.watch3, displayOrder: 5 },
  { id: 'grand-complications', name: 'Grand Complications', slug: 'grand-complications', description: 'The highest expression of Patek Philippe watchmaking, created for collectors drawn to perpetual calendars, minute repeaters, chronographs, and advanced mechanical artistry.', image: UP.threeWatches2, displayOrder: 6 },
  { id: 'twenty-4', name: 'Twenty~4', slug: 'twenty-4', description: 'A refined collection created for elegant daily wear, with feminine proportions and modern versatility.', image: UNSPLASH.watch5, displayOrder: 7 },
  { id: 'golden-ellipse', name: 'Golden Ellipse', slug: 'golden-ellipse', description: 'A distinctive Patek Philippe design icon recognized for its harmonious elliptical case and refined elegance.', image: UP.goldenEllipse, displayOrder: 8 },
  { id: 'gondolo', name: 'Gondolo', slug: 'gondolo', description: 'A shaped-watch collection inspired by Art Deco design, geometric lines, and classic elegance.', image: UNSPLASH.watch6, displayOrder: 9 },
  { id: 'grandmaster-chime', name: 'Grandmaster Chime', slug: 'grandmaster-chime', description: 'One of the most complicated and prestigious Patek Philippe creations, associated with exceptional mechanical mastery and collector significance.', image: UNSPLASH.watch7, displayOrder: 10 },
  { id: 'pocket-watches', name: 'Pocket Watches', slug: 'pocket-watches', description: 'A heritage-focused category for collectors interested in traditional timekeeping and historical watchmaking.', image: UP.pocketWatch, displayOrder: 11 },
  { id: 'rare-handcrafts', name: 'Rare Handcrafts', slug: 'rare-handcrafts', description: 'A highly artistic category for rare collectible pieces that showcase decorative crafts such as engraving, enameling, and gem-setting.', image: UNSPLASH.watch8, displayOrder: 12 },
];

// Quick filter chips for product grid
export const PATEK_QUICK_FILTERS = [
  { label: 'Patek Philippe Nautilus', link: '/patek-philippe-nautilus-kaufen' },
  { label: 'Patek Philippe Aquanaut', link: '/patek-philippe-aquanaut-kaufen' },
  { label: 'Patek Philippe Calatrava', link: '/patek-philippe-calatrava-kaufen' },
  { label: 'Patek Philippe Cubitus', link: '/patek-philippe-cubitus-kaufen' },
  { label: 'Patek Philippe Grand Complications', link: '/patek-philippe-grand-complications-kaufen' },
  { label: 'Patek Philippe Complications', link: '/patek-philippe-complications-kaufen' },
  { label: 'Patek Philippe Twenty~4', link: '/patek-philippe-twenty-4-kaufen' },
  { label: 'Pre-Owned Patek Philippe', link: '/patek-philippe-gebraucht-kaufen' },
  { label: 'Patek Philippe with Box and Papers', link: '/watch-guides/box-and-papers' },
  { label: 'Patek Philippe with Archives Extract', link: '/patek-philippe-archives-extract-guide' },
];

// Complication filter options
export const PATEK_COMPLICATIONS = [
  'Time only', 'Date', 'Moon phase', 'Annual calendar', 'Perpetual calendar',
  'Chronograph', 'Split-seconds chronograph', 'Travel Time', 'World Time',
  'Minute repeater', 'Tourbillon', 'Grand complication',
];

// SEO Cards
export const PATEK_SEO_CARDS = [
  { title: 'Patek Philippe kaufen', description: 'Explore Patek Philippe watches through Kariv Glamour with refined product presentation, transparent details, and a premium shopping experience.', link: '/patek-philippe-kaufen', image: UP.threeWatchesGrey },
  { title: 'Patek Philippe gebraucht kaufen', description: 'Discover pre-owned Patek Philippe watches with clear condition grading, box and papers information, service history details, and collector-focused product data.', link: '/patek-philippe-gebraucht-kaufen', image: UNSPLASH.watch1 },
  { title: 'Patek Philippe Nautilus kaufen', description: 'Browse Patek Philippe Nautilus watches, one of the most recognizable luxury sports watch families in modern collecting.', link: '/patek-philippe-nautilus-kaufen', image: UP.nautilus },
  { title: 'Patek Philippe Aquanaut kaufen', description: 'Explore Patek Philippe Aquanaut watches, known for their modern sporty character and strong collector interest.', link: '/patek-philippe-aquanaut-kaufen', image: UNSPLASH.watch2 },
  { title: 'Patek Philippe Calatrava kaufen', description: 'Shop Patek Philippe Calatrava watches, admired for classic elegance, pure lines, and dress-watch refinement.', link: '/patek-philippe-calatrava-kaufen', image: UP.brownDress },
  { title: 'Patek Philippe Cubitus kaufen', description: 'Discover the Patek Philippe Cubitus collection, a contemporary expression of shaped-case design and modern elegance.', link: '/patek-philippe-cubitus-kaufen', image: UNSPLASH.watch3 },
  { title: 'Patek Philippe Grand Complications kaufen', description: 'Explore Patek Philippe Grand Complications for collectors drawn to advanced mechanical watchmaking and rare horological artistry.', link: '/patek-philippe-grand-complications-kaufen', image: UP.threeWatches2 },
  { title: 'Welche Patek Philippe kaufen?', description: 'Read the Patek Philippe buying guide to compare collections, references, materials, complications, and ownership considerations.', link: '/welche-patek-philippe-kaufen', image: UNSPLASH.watch4 },
];

// Editorial sections data (Story, Watchmaking, Maintenance)
export const PATEK_EDITORIAL_SECTIONS = [
  {
    id: 'patek-story',
    eyebrow: 'Heritage',
    title: 'The Patek Philippe Story',
    description: 'Patek Philippe stands as one of the most revered names in haute horlogerie, with a heritage rooted in Geneva watchmaking and a legacy shaped by family ownership across generations. From the earliest pocket watches to the iconic Nautilus and the extraordinary Grand Complications, the Patek Philippe story is one of rare craftsmanship, collector prestige, and an unwavering commitment to fine watchmaking. At Kariv Glamour, we celebrate this heritage by offering carefully selected Patek Philippe timepieces, each presented with full transparency and expert insight.',
    cta: 'Read the Patek Philippe Story',
    link: '/patek-philippe/story',
    image: UP.brownDress,
    internalLinks: [
      { text: 'Patek Philippe heritage', link: '/patek-philippe/story' },
      { text: 'Geneva watchmaking', link: '/patek-philippe/watchmaking' },
      { text: 'collector prestige', link: '/welche-patek-philippe-kaufen' },
      { text: 'rare craftsmanship', link: '/patek-philippe/rare-handcrafts' },
      { text: 'Grand Complications', link: '/patek-philippe-grand-complications-kaufen' },
    ],
  },
  {
    id: 'patek-watchmaking',
    eyebrow: 'Craftsmanship',
    title: 'Patek Philippe Watchmaking',
    description: 'Patek Philippe watchmaking represents the pinnacle of fine mechanical artistry, combining hand-finished movements, exquisite case design, and an extraordinary range of complications. From simple time-only Calatrava watches to perpetual calendars, minute repeaters, and tourbillons, each timepiece reflects a deep commitment to precision and tradition. Collectors value Patek Philippe for its reference numbers, movement types, case materials, and production periods, all of which contribute to the story behind every watch. At Kariv Glamour, we help you understand the craftsmanship behind each Patek Philippe, so you can make an informed and confident decision.',
    cta: 'Explore Patek Philippe Watchmaking',
    link: '/patek-philippe/watchmaking',
    image: UP.pocketWatch,
    internalLinks: [
      { text: 'complications', link: '/patek-philippe/complications' },
      { text: 'Grand Complications', link: '/patek-philippe/grand-complications' },
      { text: 'manual-winding and self-winding movements', link: '/watch-guides/mechanical-vs-quartz-watches' },
      { text: 'case materials', link: '/watch-guides/watch-case-materials' },
      { text: 'reference numbers', link: '/watch-guides/watch-reference-number-guide' },
    ],
  },
  {
    id: 'patek-maintenance',
    eyebrow: 'Care',
    title: 'Patek Philippe Maintenance',
    description: 'Proper care preserves the beauty, reliability, and value of a Patek Philippe watch. Regular servicing by qualified professionals, water resistance checks, safe storage, and avoiding shocks and magnetic exposure are all essential. Leather straps should be protected from moisture and perspiration, while complicated watches require special attention. For pre-owned and collectible Patek Philippe watches, preserving the box, papers, archives extract, service documents, and original invoices is especially important for long-term value. Kariv Glamour provides guidance to help you maintain your timepiece with confidence.',
    cta: 'Learn About Patek Philippe Maintenance',
    link: '/patek-philippe/maintenance',
    image: UP.threeWatches2,
    internalLinks: [
      { text: 'service history', link: '/watch-guides/service-history' },
      { text: 'box and papers', link: '/watch-guides/box-and-papers' },
      { text: 'archives extract', link: '/patek-philippe-archives-extract-guide' },
      { text: 'condition grading', link: '/condition-grading' },
      { text: 'pre-owned Patek Philippe', link: '/patek-philippe-gebraucht-kaufen' },
    ],
  },
];

// Read More carousel cards
export const PATEK_READ_MORE = [
  { title: 'Patek Philippe Story', description: 'Explore the heritage, family legacy, and collector appeal behind one of the most respected names in fine watchmaking.', link: '/patek-philippe/story', image: UP.brownDress },
  { title: 'Patek Philippe Watchmaking', description: 'Learn about movements, complications, finishing, materials, and the details that define Patek Philippe watchmaking.', link: '/patek-philippe/watchmaking', image: UP.pocketWatch },
  { title: 'Patek Philippe Maintenance', description: 'Understand how to care for a Patek Philippe watch and preserve its condition, documentation, and long-term appeal.', link: '/patek-philippe/maintenance', image: UP.threeWatches2 },
  { title: 'Patek Philippe Buying Guide', description: 'Compare popular Patek Philippe collections and learn what to check before buying new, pre-owned, or vintage models.', link: '/welche-patek-philippe-kaufen', image: UNSPLASH.watch4 },
  { title: 'Box, Papers and Archives Extract', description: 'Learn why original documentation, archives extract, service history, and purchase records matter when buying Patek Philippe.', link: '/patek-philippe-archives-extract-guide', image: UNSPLASH.watch5 },
  { title: 'Patek Philippe Nautilus Guide', description: 'Explore the design, demand, and buying considerations behind the Patek Philippe Nautilus collection.', link: '/patek-philippe-nautilus-kaufen', image: UP.nautilus },
  { title: 'Patek Philippe Grand Complications Guide', description: 'Learn why Grand Complications represent the highest level of mechanical artistry and collector interest.', link: '/patek-philippe-grand-complications-kaufen', image: UP.threeWatchesGrey },
];

// Internal linking hub
export const PATEK_INTERNAL_LINKS = {
  popularSearches: [
    { text: 'Patek Philippe kaufen', link: '/patek-philippe-kaufen' },
    { text: 'Patek Philippe gebraucht kaufen', link: '/patek-philippe-gebraucht-kaufen' },
    { text: 'Patek Philippe Uhr kaufen', link: '/patek-philippe-uhr-kaufen' },
    { text: 'Patek Philippe für Herren', link: '/patek-philippe-herren' },
    { text: 'Patek Philippe für Damen', link: '/patek-philippe-damen' },
    { text: 'Patek Philippe mit Box und Papieren', link: '/watch-guides/box-and-papers' },
    { text: 'Patek Philippe Archives Extract Guide', link: '/patek-philippe-archives-extract-guide' },
  ],
  iconicCollections: [
    { text: 'Patek Philippe Nautilus kaufen', link: '/patek-philippe-nautilus-kaufen' },
    { text: 'Patek Philippe Aquanaut kaufen', link: '/patek-philippe-aquanaut-kaufen' },
    { text: 'Patek Philippe Calatrava kaufen', link: '/patek-philippe-calatrava-kaufen' },
    { text: 'Patek Philippe Cubitus kaufen', link: '/patek-philippe-cubitus-kaufen' },
    { text: 'Patek Philippe Twenty~4 kaufen', link: '/patek-philippe-twenty-4-kaufen' },
    { text: 'Patek Philippe Golden Ellipse kaufen', link: '/patek-philippe-golden-ellipse-kaufen' },
    { text: 'Patek Philippe Gondolo kaufen', link: '/patek-philippe-gondolo-kaufen' },
  ],
  complicationsGuides: [
    { text: 'Patek Philippe Complications', link: '/patek-philippe/complications' },
    { text: 'Patek Philippe Grand Complications', link: '/patek-philippe-grand-complications-kaufen' },
    { text: 'Perpetual Calendar Watches', link: '/collections/perpetual-calendar-watches' },
    { text: 'Annual Calendar Watches', link: '/collections/annual-calendar-watches' },
    { text: 'Moon Phase Watches', link: '/collections/moon-phase-watches' },
    { text: 'World Time Watches', link: '/collections/world-time-watches' },
    { text: 'Minute Repeater Watches', link: '/collections/minute-repeater-watches' },
    { text: 'Chronograph Watches', link: '/collections/chronograph-watches' },
  ],
  learningGuides: [
    { text: 'Welche Patek Philippe kaufen?', link: '/welche-patek-philippe-kaufen' },
    { text: 'Patek Philippe neu oder gebraucht kaufen?', link: '/patek-philippe-neu-oder-gebraucht' },
    { text: 'Patek Philippe Archives Extract Guide', link: '/patek-philippe-archives-extract-guide' },
    { text: 'Patek Philippe Wartung und Pflege', link: '/patek-philippe/maintenance' },
    { text: 'Patek Philippe Story', link: '/patek-philippe/story' },
    { text: 'Patek Philippe Watchmaking', link: '/patek-philippe/watchmaking' },
  ],
  relatedBrands: [
    { text: 'Rolex watches', link: '/brands/rolex' },
    { text: 'Audemars Piguet watches', link: '/brands/audemars-piguet' },
    { text: 'Vacheron Constantin watches', link: '/brands/vacheron-constantin' },
    { text: 'A. Lange & Söhne watches', link: '/brands/a-lange-soehne' },
    { text: 'Breguet watches', link: '/brands/breguet' },
    { text: 'Jaeger-LeCoultre watches', link: '/brands/jaeger-lecoultre' },
    { text: 'Cartier watches', link: '/brands/cartier' },
    { text: 'Omega watches', link: '/brands/omega' },
  ],
  relatedCategories: [
    { text: 'Certified Pre-Owned Watches', link: '/certified-pre-owned' },
    { text: 'Vintage Watches', link: '/vintage-watches' },
    { text: 'Men\u2019s Luxury Watches', link: '/mens-watches' },
    { text: 'Women\u2019s Luxury Watches', link: '/womens-watches' },
    { text: 'Dress Watches', link: '/collections/dress-watches' },
    { text: 'Luxury Sports Watches', link: '/collections/luxury-sports-watches' },
    { text: 'Complication Watches', link: '/collections/complication-watches' },
    { text: 'Investment-Conscious Watches', link: '/collections/collectible-watches' },
  ],
};

// FAQ
export const PATEK_FAQS = [
  {
    question: 'Where can I buy a Patek Philippe watch online?',
    answer: 'You can explore and buy Patek Philippe watches online through Kariv Glamour, where each timepiece is presented with transparent product details, clear condition grading, and reference number visibility. Browse our Patek Philippe collection to discover available models, or visit our pre-owned Patek Philippe page for previously owned timepieces.',
  },
  {
    question: 'Is it safe to buy a pre-owned Patek Philippe?',
    answer: 'Yes. When you buy a pre-owned Patek Philippe from Kariv Glamour, each watch is carefully reviewed and presented with clear condition grading, box and papers information, and service history where available. We do not sell replica or counterfeit watches, and every product page provides the details you need to make a confident decision.',
  },
  {
    question: 'What does "box and papers" mean when buying a Patek Philippe?',
    answer: 'Box and papers refers to the original presentation box and warranty documents that accompany a Patek Philippe watch. Having the original box and papers can enhance collectability and resale value. Learn more in our box and papers guide.',
  },
  {
    question: 'What is a Patek Philippe Archives Extract?',
    answer: 'A Patek Philippe Archives Extract is an official document from the manufacturer that provides details about a specific watch, such as its production date, reference, and original configuration. It can add significant value and confidence for collectors. Learn more in our Patek Philippe Archives Extract Guide.',
  },
  {
    question: 'Which Patek Philippe should I buy first?',
    answer: 'The right first Patek Philippe depends on your lifestyle, taste, and budget. The Calatrava is a timeless dress watch, while the Nautilus is an iconic sports model. Read our Patek Philippe buying guide for a detailed comparison of popular collections and references.',
  },
  {
    question: 'What is the difference between Nautilus and Aquanaut?',
    answer: 'The Nautilus is a luxury sports watch with an integrated bracelet and a distinctive porthole-inspired case, while the Aquanaut has a more contemporary, sporty character with a composite strap and a relaxed design. Both are highly sought after by collectors. Explore Nautilus and Aquanaut collections to compare.',
  },
  {
    question: 'What is the difference between Calatrava and Grand Complications?',
    answer: 'The Calatrava is a pure dress watch collection focused on elegance and simplicity, while Grand Complications represent the highest level of Patek Philippe watchmaking, featuring advanced functions such as perpetual calendars, minute repeaters, and tourbillons. Explore Calatrava and Grand Complications to find the right model for you.',
  },
  {
    question: 'Why are some Patek Philippe models difficult to find?',
    answer: 'Certain Patek Philippe models are produced in limited quantities or experience exceptionally high demand, making them difficult to find. At Kariv Glamour, we curate a selection of available Patek Philippe watches, including sought-after references in the pre-owned market.',
  },
  {
    question: 'Does Kariv Glamour sell Patek Philippe watches?',
    answer: 'Yes. Kariv Glamour offers a curated selection of Patek Philippe watches, including new, pre-owned, and vintage models. Each watch is presented with transparent product information, condition grading, and reference number visibility. Kariv Glamour is an independent retailer and is not an official Patek Philippe authorized dealer.',
  },
  {
    question: 'What should I check before buying a used Patek Philippe?',
    answer: 'Before buying a used Patek Philippe, check the condition grading, reference number, year of production, box and papers status, archives extract availability, service history, and authenticity. Our condition grading guide provides detailed information to help you evaluate each timepiece.',
  },
  {
    question: 'Are Patek Philippe watches good for collectors?',
    answer: 'Yes. Patek Philippe is widely regarded as one of the most collectible watch brands in the world, admired for its rarity, craftsmanship, and long-standing heritage. Reference numbers, complications, materials, and documentation all play a role in collector value. Read our Patek Philippe buying guide to learn more.',
  },
  {
    question: 'Can I return a Patek Philippe watch purchased online?',
    answer: 'Yes. Kariv Glamour offers a return policy for eligible purchases. Please review our returns and refunds page for full details on return conditions and process.',
  },
];

// Trust points
export const PATEK_TRUST_POINTS = [
  'Transparent product descriptions',
  'Clear condition grading',
  'Box and papers information',
  'Reference number visibility',
  'Archives extract information where available',
  'Service history visibility where available',
  'Secure checkout',
  'Insured shipping',
  'Customer support before purchase',
  'No replica or counterfeit watches',
];

export const PATEK_TRUST_LINKS = [
  { text: 'Authentication Process', link: '/authentication-process' },
  { text: 'Condition Grading', link: '/condition-grading' },
  { text: 'Box and Papers Guide', link: '/watch-guides/box-and-papers' },
  { text: 'Archives Extract Guide', link: '/patek-philippe-archives-extract-guide' },
  { text: 'Returns and Refunds', link: '/returns-and-refunds' },
  { text: 'Shipping Policy', link: '/shipping-policy' },
  { text: 'Contact Customer Service', link: '/contact' },
];

// SEO Landing pages content
export const PATEK_SEO_PAGES = {
  'patek-philippe-kaufen': {
    title: 'Patek Philippe kaufen | Neue & gebrauchte Patek Philippe Uhren | Kariv Glamour',
    description: 'Entdecken Sie Patek Philippe Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Patek Philippe Modelle wie Nautilus, Aquanaut, Calatrava, Cubitus, Twenty~4 und Grand Complications mit transparenter Produktinformation.',
    h1: 'Patek Philippe kaufen bei Kariv Glamour',
    intro: 'Bei Kariv Glamour können Sie Patek Philippe Uhren online kaufen — mit transparenter Produktinformation, klarer Zustandsbewertung und einem verfeinerten Einkaufserlebnis. Entdecken Sie neue, gebrauchte und vintage Patek Philippe Modelle von den bedeutendsten Kollektionen der Manufaktur.',
    collectionFilter: null,
  },
  'patek-philippe-gebraucht-kaufen': {
    title: 'Patek Philippe gebraucht kaufen | Pre-Owned Patek Philippe | Kariv Glamour',
    description: 'Patek Philippe gebraucht kaufen bei Kariv Glamour. Entdecken Sie geprüfte pre-owned Patek Philippe Uhren mit klarer Zustandsbewertung, Box und Papiere Informationen und detaillierter Produktpräsentation.',
    h1: 'Patek Philippe gebraucht kaufen',
    intro: 'Wenn Sie eine Patek Philippe gebraucht kaufen möchten, bietet Kariv Glamour eine kuratierte Auswahl an pre-owned Zeitmessern. Jede Uhr wird mit klarer Zustandsbewertung, Box und Papiere Informationen, Archives Extract Verfügbarkeit und Referenznummern-Sichtbarkeit präsentiert.',
    collectionFilter: { isCertifiedPreOwned: true },
  },
  'patek-philippe-uhr-kaufen': {
    title: 'Patek Philippe Uhr kaufen | Patek Philippe Uhren online | Kariv Glamour',
    description: 'Patek Philippe Uhr kaufen bei Kariv Glamour. Entdecken Sie Patek Philippe Uhren — von der Nautilus bis zur Calatrava — mit transparenter Produktinformation und klarer Zustandsbewertung.',
    h1: 'Patek Philippe Uhr kaufen',
    intro: 'Entdecken Sie Patek Philippe Uhren bei Kariv Glamour. Von der ikonischen Nautilus über die elegante Calatrava bis zu den Grand Complications — jede Uhr wird mit transparenter Produktinformation und klarer Zustandsbewertung präsentiert.',
    collectionFilter: null,
  },
  'patek-philippe-nautilus-kaufen': {
    title: 'Patek Philippe Nautilus kaufen | Neue & gebrauchte Nautilus | Kariv Glamour',
    description: 'Patek Philippe Nautilus kaufen bei Kariv Glamour. Entdecken Sie eine der begehrtesten Luxus-Sportuhren der Welt, bekannt für ihre markante Gehäuseform und integriertes Armband.',
    h1: 'Patek Philippe Nautilus kaufen',
    intro: 'Die Patek Philippe Nautilus ist eine der begehrtesten Luxus-Sportuhren der Welt. Bei Kariv Glamour können Sie die Nautilus kaufen — mit transparenter Produktinformation, klarer Zustandsbewertung und Referenznummern-Sichtbarkeit.',
    collectionFilter: { collection: 'Nautilus' },
  },
  'patek-philippe-aquanaut-kaufen': {
    title: 'Patek Philippe Aquanaut kaufen | Neue & gebrauchte Aquanaut | Kariv Glamour',
    description: 'Patek Philippe Aquanaut kaufen bei Kariv Glamour. Entdecken Sie die moderne, sportliche Patek Philippe Kollektion mit entspanntem Charakter und starker Sammlernachfrage.',
    h1: 'Patek Philippe Aquanaut kaufen',
    intro: 'Die Patek Philippe Aquanaut ist eine moderne, sportliche Kollektion mit entspanntem Charakter und starker Sammlernachfrage. Bei Kariv Glamour können Sie die Aquanaut kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Aquanaut' },
  },
  'patek-philippe-calatrava-kaufen': {
    title: 'Patek Philippe Calatrava kaufen | Neue & gebrauchte Calatrava | Kariv Glamour',
    description: 'Patek Philippe Calatrava kaufen bei Kariv Glamour. Shoppen Sie die Calatrava — bewundert für klassische Eleganz, reine Linien und Dress-Watch-Raffinesse.',
    h1: 'Patek Philippe Calatrava kaufen',
    intro: 'Die Patek Philippe Calatrava ist die reinste Ausdrucksform der Dress-Watch-Eleganz. Bei Kariv Glamour können Sie die Calatrava kaufen — mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Calatrava' },
  },
  'patek-philippe-cubitus-kaufen': {
    title: 'Patek Philippe Cubitus kaufen | Neue & gebrauchte Cubitus | Kariv Glamour',
    description: 'Patek Philippe Cubitus kaufen bei Kariv Glamour. Entdecken Sie die Cubitus Kollektion — ein zeitgenössischer Ausdruck von Shaped-Case-Design und moderner Eleganz.',
    h1: 'Patek Philippe Cubitus kaufen',
    intro: 'Die Patek Philippe Cubitus ist ein zeitgenössischer Ausdruck von Shaped-Case-Design und moderner Eleganz. Bei Kariv Glamour können Sie die Cubitus kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Cubitus' },
  },
  'patek-philippe-grand-complications-kaufen': {
    title: 'Patek Philippe Grand Complications kaufen | Kariv Glamour',
    description: 'Patek Philippe Grand Complications kaufen bei Kariv Glamour. Entdecken Sie die höchste Ausdrucksform der Patek Philippe Uhrmacherei für Sammler, die von fortgeschrittener mechanischer Kunstfertigkeit fasziniert sind.',
    h1: 'Patek Philippe Grand Complications kaufen',
    intro: 'Patek Philippe Grand Complications repräsentieren die höchste Ausdrucksform der Uhrmacherei. Bei Kariv Glamour können Sie Grand Complications kaufen — mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Grand Complications' },
  },
  'patek-philippe-complications-kaufen': {
    title: 'Patek Philippe Complications kaufen | Kariv Glamour',
    description: 'Patek Philippe Complications kaufen bei Kariv Glamour. Entdecken Sie eine anspruchsvolle Kollektion für Sammler, die nützliche und poetische Uhrfunktionen schätzen.',
    h1: 'Patek Philippe Complications kaufen',
    intro: 'Die Patek Philippe Complications Kollektion vereint nützliche und poetische Funktionen wie Kalender, Travel Time und Mondphasen. Bei Kariv Glamour können Sie Complications kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Complications' },
  },
  'patek-philippe-twenty-4-kaufen': {
    title: 'Patek Philippe Twenty~4 kaufen | Kariv Glamour',
    description: 'Patek Philippe Twenty~4 kaufen bei Kariv Glamour. Entdecken Sie eine verfeinerte Kollektion für eleganten täglichen Gebrauch mit femininen Proportionen und moderner Vielseitigkeit.',
    h1: 'Patek Philippe Twenty~4 kaufen',
    intro: 'Die Patek Philippe Twenty~4 ist eine verfeinerte Kollektion für eleganten täglichen Gebrauch. Bei Kariv Glamour können Sie die Twenty~4 kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Twenty~4' },
  },
  'patek-philippe-golden-ellipse-kaufen': {
    title: 'Patek Philippe Golden Ellipse kaufen | Kariv Glamour',
    description: 'Patek Philippe Golden Ellipse kaufen bei Kariv Glamour. Entdecken Sie ein markantes Patek Philippe Design-Icon, bekannt für sein harmonisches elliptisches Gehäuse und verfeinerte Eleganz.',
    h1: 'Patek Philippe Golden Ellipse kaufen',
    intro: 'Die Patek Philippe Golden Ellipse ist ein Design-Icon, bekannt für ihr harmonisches elliptisches Gehäuse. Bei Kariv Glamour können Sie die Golden Ellipse kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Golden Ellipse' },
  },
  'patek-philippe-gondolo-kaufen': {
    title: 'Patek Philippe Gondolo kaufen | Kariv Glamour',
    description: 'Patek Philippe Gondolo kaufen bei Kariv Glamour. Entdecken Sie eine Shaped-Watch-Kollektion, inspiriert von Art-Deco-Design, geometrischen Linien und klassischer Eleganz.',
    h1: 'Patek Philippe Gondolo kaufen',
    intro: 'Die Patek Philippe Gondolo ist eine Shaped-Watch-Kollektion, inspiriert von Art-Deco-Design. Bei Kariv Glamour können Sie die Gondolo kaufen — mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Gondolo' },
  },
  'patek-philippe-herren': {
    title: 'Patek Philippe für Herren kaufen | Herren Patek Philippe Uhren | Kariv Glamour',
    description: 'Patek Philippe für Herren kaufen bei Kariv Glamour. Entdecken Sie Patek Philippe Herrenuhren — von der Nautilus bis zur Calatrava — mit transparenter Produktinformation.',
    h1: 'Patek Philippe für Herren',
    intro: 'Entdecken Sie Patek Philippe Uhren für Herren bei Kariv Glamour. Von der sportlichen Nautilus bis zur eleganten Calatrava — jede Uhr wird mit transparenter Produktinformation präsentiert.',
    collectionFilter: { gender: 'Men' },
  },
  'patek-philippe-damen': {
    title: 'Patek Philippe für Damen kaufen | Damen Patek Philippe Uhren | Kariv Glamour',
    description: 'Patek Philippe für Damen kaufen bei Kariv Glamour. Entdecken Sie Patek Philippe Damenuhren — von der Twenty~4 bis zur Golden Ellipse — mit transparenter Produktinformation.',
    h1: 'Patek Philippe für Damen',
    intro: 'Entdecken Sie Patek Philippe Uhren für Damen bei Kariv Glamour. Von der Twenty~4 bis zur Golden Ellipse — jede Uhr wird mit transparenter Produktinformation präsentiert.',
    collectionFilter: { gender: 'Women' },
  },
  'welche-patek-philippe-kaufen': {
    title: 'Welche Patek Philippe kaufen? | Patek Philippe Kaufberatung | Kariv Glamour',
    description: 'Welche Patek Philippe kaufen? Lesen Sie die Patek Philippe Kaufberatung bei Kariv Glamour, um Kollektionen, Referenzen, Materialien, Komplikationen und Besitzüberlegungen zu vergleichen.',
    h1: 'Welche Patek Philippe kaufen?',
    intro: 'Die Wahl der richtigen Patek Philippe hängt von Ihrem Lebensstil, Geschmack und Budget ab. Die Calatrava ist ein zeitloser Dress-Watch, die Nautilus eine ikonische Sportuhr. Dieser Guide hilft Ihnen, die richtige Entscheidung zu treffen.',
    collectionFilter: null,
    isGuide: true,
  },
  'patek-philippe-neu-oder-gebraucht': {
    title: 'Patek Philippe neu oder gebraucht kaufen? | Kariv Glamour',
    description: 'Patek Philippe neu oder gebraucht kaufen? Vergleichen Sie die Vor- und Nachteile beider Optionen bei Kariv Glamour, um die richtige Entscheidung zu treffen.',
    h1: 'Patek Philippe neu oder gebraucht kaufen?',
    intro: 'Sollten Sie eine Patek Philippe neu oder gebraucht kaufen? Beide Optionen haben Vor- und Nachteile. Eine neue Patek Philippe bietet volle Garantie und unbenutzten Zustand, während eine gebrauchte Patek Philippe oft Zugang zu diskontinuierten Referenzen und einem anderen Preis-Leistungs-Verhältnis bietet.',
    collectionFilter: null,
    isGuide: true,
  },
  'patek-philippe-archives-extract-guide': {
    title: 'Patek Philippe Archives Extract Guide | Kariv Glamour',
    description: 'Patek Philippe Archives Extract Guide bei Kariv Glamour. Erfahren Sie, warum das Archives Extract, Originaldokumente, Service-Historie und Kaufaufzeichnungen beim Patek Philippe Kauf wichtig sind.',
    h1: 'Patek Philippe Archives Extract Guide',
    intro: 'Ein Patek Philippe Archives Extract ist ein offizielles Dokument der Manufaktur, das Details über eine bestimmte Uhr liefert, wie Produktionsdatum, Referenz und Originalkonfiguration. Es kann erheblichen Wert und Vertrauen für Sammler schaffen.',
    collectionFilter: null,
    isGuide: true,
  },
  'patek-philippe-story': {
    title: 'The Patek Philippe Story | Heritage & History | Kariv Glamour',
    description: 'Entdecken Sie die Patek Philippe Story bei Kariv Glamour. Erfahren Sie über das Erbe, die Familienlegacy und die Sammleranziehungskraft hinter einem der respektiertesten Namen der feinen Uhrmacherei.',
    h1: 'The Patek Philippe Story',
    intro: 'Patek Philippe ist einer der respektiertesten Namen der Haute Horlogerie, mit einem Erbe, das in der Genfer Uhrmacherei verwurzelt ist. Von den frühesten Taschenuhren bis zur ikonischen Nautilus und den außergewöhnlichen Grand Complications — die Patek Philippe Story ist eine von seltener Handwerkskunst, Sammlerprestige und unerschütterlichem Engagement für feine Uhrmacherei.',
    collectionFilter: null,
    isGuide: true,
  },
  'patek-philippe-watchmaking': {
    title: 'Patek Philippe Watchmaking | Craftsmanship & Precision | Kariv Glamour',
    description: 'Erfahren Sie über Patek Philippe Uhrmacherei bei Kariv Glamour. Werke, Komplikationen, Finissierung, Materialien und die Details, die Patek Philippe Uhren definieren.',
    h1: 'Patek Philippe Watchmaking',
    intro: 'Patek Philippe Uhrmacherei repräsentiert den Höhepunkt feiner mechanischer Kunstfertigkeit, mit hand-finierten Werken, exquisitem Gehäusedesign und einer außergewöhnlichen Vielfalt an Komplikationen. Von einfachen Time-Only-Calatrava-Uhren bis zu ewigen Kalendern, Minutenrepetierern und Tourbillons.',
    collectionFilter: null,
    isGuide: true,
  },
  'patek-philippe-maintenance': {
    title: 'Patek Philippe Maintenance | Care & Servicing | Kariv Glamour',
    description: 'Patek Philippe Wartung und Pflege bei Kariv Glamour. Erfahren Sie, wie Sie eine Patek Philippe Uhr pflegen und ihren Zustand, ihre Dokumentation und ihren langfristigen Wert erhalten.',
    h1: 'Patek Philippe Maintenance',
    intro: 'Die richtige Pflege erhält die Schönheit, Zuverlässigkeit und den Wert einer Patek Philippe Uhr. Regelmäßige Wartung, Wasserdichtigkeitsprüfungen, sichere Aufbewahrung und das Vermeiden von Stößen und magnetischer Exposition sind wesentlich. Für prä-owed und sammelbare Uhren ist die Erhaltung von Box, Papieren, Archives Extract und Service-Dokumenten besonders wichtig.',
    collectionFilter: null,
    isGuide: true,
  },
};