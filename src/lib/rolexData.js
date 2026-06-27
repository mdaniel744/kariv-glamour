// Rolex theme colors
export const ROLEX_THEME = {
  emerald: '#0B4D3C',
  emeraldDark: '#063528',
  emeraldLight: '#1A6B54',
  gold: '#C5A572',
  goldLight: '#D4BC8E',
  ivory: '#FAF7F2',
  warmWhite: '#FDFBF7',
  charcoal: '#1C1C1C',
  brownCharcoal: '#2A2018',
};

// Watch images from Unsplash
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

export const ROLEX_HERO_IMAGE = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80';

// Rolex Collections
export const ROLEX_COLLECTIONS = [
  { id: 'land-dweller', name: 'Land-Dweller', slug: 'land-dweller', description: 'A modern Rolex collection with integrated bracelet design and forward-looking watchmaking character.', image: IMG.watch1, displayOrder: 1 },
  { id: 'air-king', name: 'Air-King', slug: 'air-king', description: 'A distinctive aviation-inspired Rolex made for those drawn to precision, legibility, and exploration.', image: IMG.watch2, displayOrder: 2 },
  { id: 'daytona', name: 'Cosmograph Daytona', slug: 'daytona', description: 'The legendary Rolex chronograph associated with motorsport, speed, and high collectability.', image: IMG.watch3, displayOrder: 3 },
  { id: 'datejust', name: 'Datejust', slug: 'datejust', description: 'A timeless Rolex classic known for everyday elegance, versatility, and enduring design.', image: IMG.watch4, displayOrder: 4 },
  { id: 'lady-datejust', name: 'Lady-Datejust', slug: 'lady-datejust', description: 'A refined Rolex collection designed with elegant proportions and feminine sophistication.', image: IMG.watch5, displayOrder: 5 },
  { id: 'day-date', name: 'Day-Date', slug: 'day-date', description: 'A prestigious Rolex icon, often associated with precious metals, status, and timeless authority.', image: IMG.watch6, displayOrder: 6 },
  { id: 'deepsea', name: 'Deepsea', slug: 'deepsea', description: 'A professional Rolex diving watch built for extreme underwater performance.', image: IMG.watch7, displayOrder: 7 },
  { id: 'explorer', name: 'Explorer', slug: 'explorer', description: 'A robust Rolex tool watch inspired by adventure, endurance, and mountain exploration.', image: IMG.watch8, displayOrder: 8 },
  { id: 'explorer-ii', name: 'Explorer II', slug: 'explorer-ii', description: 'A practical Rolex watch designed for exploration, legibility, and second-time-zone functionality.', image: IMG.watch1, displayOrder: 9 },
  { id: 'gmt-master-ii', name: 'GMT-Master II', slug: 'gmt-master-ii', description: 'A cosmopolitan Rolex travel watch designed to display multiple time zones with ease.', image: IMG.watch2, displayOrder: 10 },
  { id: 'oyster-perpetual', name: 'Oyster Perpetual', slug: 'oyster-perpetual', description: 'The purest expression of Rolex watchmaking, combining clean design and everyday durability.', image: IMG.watch3, displayOrder: 11 },
  { id: 'sea-dweller', name: 'Sea-Dweller', slug: 'sea-dweller', description: 'A professional diver\u2019s Rolex built for serious depth, strength, and performance.', image: IMG.watch4, displayOrder: 12 },
  { id: 'sky-dweller', name: 'Sky-Dweller', slug: 'sky-dweller', description: 'A sophisticated Rolex travel watch combining annual calendar functionality with dual-time display.', image: IMG.watch5, displayOrder: 13 },
  { id: 'submariner', name: 'Submariner', slug: 'submariner', description: 'One of the world\u2019s most recognized luxury dive watches, admired for its strength and timeless design.', image: IMG.watch6, displayOrder: 14 },
  { id: 'yacht-master', name: 'Yacht-Master', slug: 'yacht-master', description: 'A nautical-inspired Rolex sports watch blending elegance, functionality, and luxury.', image: IMG.watch7, displayOrder: 15 },
  { id: 'yacht-master-ii', name: 'Yacht-Master II', slug: 'yacht-master-ii', description: 'A highly technical Rolex regatta chronograph created for competitive sailing.', image: IMG.watch8, displayOrder: 16 },
  { id: '1908', name: '1908', slug: '1908', description: 'A refined dress watch collection that reflects Rolex elegance, heritage, and modern watchmaking.', image: IMG.watch1, displayOrder: 17 },
  { id: 'milgauss', name: 'Milgauss', slug: 'milgauss', description: 'A distinctive discontinued Rolex model with strong collector interest in the pre-owned market.', image: IMG.watch2, displayOrder: 18 },
];

// Quick filter chips for product grid
export const ROLEX_QUICK_FILTERS = [
  { label: 'Rolex Submariner', link: '/rolex-submariner-kaufen' },
  { label: 'Rolex Daytona', link: '/rolex-daytona-kaufen' },
  { label: 'Rolex Datejust', link: '/rolex-datejust-kaufen' },
  { label: 'Rolex GMT-Master II', link: '/rolex-gmt-master-ii-kaufen' },
  { label: 'Rolex Day-Date', link: '/rolex-day-date-kaufen' },
  { label: 'Rolex Oyster Perpetual', link: '/rolex-oyster-perpetual-kaufen' },
  { label: 'Pre-Owned Rolex', link: '/rolex-gebraucht-kaufen' },
  { label: 'Rolex mit Box und Papieren', link: '/rolex-box-papers-guide' },
];

// SEO Cards
export const ROLEX_SEO_CARDS = [
  { title: 'Rolex kaufen', description: 'Explore Rolex watches available through Kariv Glamour, with transparent product details and a refined online shopping experience.', link: '/rolex-kaufen', image: IMG.watch1 },
  { title: 'Rolex gebraucht kaufen', description: 'Discover pre-owned Rolex watches with clear condition grading, box and papers information, and detailed product presentation.', link: '/rolex-gebraucht-kaufen', image: IMG.watch2 },
  { title: 'Gebrauchte Rolex Uhren', description: 'Browse used Rolex watches across popular collections such as Datejust, Submariner, Daytona, GMT-Master II and Oyster Perpetual.', link: '/gebrauchte-rolex-uhren', image: IMG.watch3 },
  { title: 'Rolex Submariner kaufen', description: 'Explore one of the most iconic Rolex dive watches, known for its robust design and timeless appeal.', link: '/rolex-submariner-kaufen', image: IMG.watch4 },
  { title: 'Rolex Daytona kaufen', description: 'Discover Rolex Daytona watches, the legendary chronograph associated with motorsport and collectability.', link: '/rolex-daytona-kaufen', image: IMG.watch5 },
  { title: 'Rolex Datejust kaufen', description: 'Shop Rolex Datejust watches, a versatile classic suitable for daily wear, formal style, and long-term ownership.', link: '/rolex-datejust-kaufen', image: IMG.watch6 },
  { title: 'Rolex GMT-Master II kaufen', description: 'Explore Rolex GMT-Master II watches, designed for travelers and collectors who appreciate multi-time-zone functionality.', link: '/rolex-gmt-master-ii-kaufen', image: IMG.watch7 },
  { title: 'Welche Rolex kaufen?', description: 'Read the Rolex buying guide to understand which Rolex model may suit your lifestyle, taste, and collecting goals.', link: '/welche-rolex-kaufen', image: IMG.watch8 },
];

// Editorial sections data (Story, Watchmaking, Maintenance)
export const ROLEX_EDITORIAL_SECTIONS = [
  {
    id: 'rolex-story',
    eyebrow: 'Heritage',
    title: 'The Rolex Story',
    description: 'Rolex has shaped the world of fine watchmaking for over a century, combining relentless innovation with an unmistakable design language. From the first waterproof Oyster case to the professional tool watches that accompanied explorers, divers, and aviators, the Rolex story is one of precision, prestige, and cultural recognition. At Kariv Glamour, we celebrate this heritage by offering carefully selected Rolex timepieces, each presented with full transparency and expert insight.',
    cta: 'Read the Rolex Story',
    link: '/rolex/story',
    image: IMG.watch5,
    internalLinks: [
      { text: 'Rolex heritage', link: '/rolex/story' },
      { text: 'professional watches', link: '/rolex/submariner' },
      { text: 'classic Rolex design', link: '/rolex/datejust' },
    ],
  },
  {
    id: 'rolex-watchmaking',
    eyebrow: 'Craftsmanship',
    title: 'Rolex Watchmaking',
    description: 'Rolex watchmaking stands for precision, robust case construction, and reliable automatic movements. From the legendary Oyster case to carefully selected materials, bracelets, and bezels, every component is engineered for longevity and performance. At Kariv Glamour, we help you understand the craftsmanship behind each Rolex, so you can make an informed and confident decision.',
    cta: 'Explore Rolex Watchmaking',
    link: '/rolex/watchmaking',
    image: IMG.watch6,
    internalLinks: [
      { text: 'Oyster case', link: '/rolex/oyster-case-guide' },
      { text: 'automatic movements', link: '/watch-guides/mechanical-vs-quartz-watches' },
      { text: 'materials', link: '/watch-guides/watch-case-materials' },
      { text: 'bracelets', link: '/watch-guides/watch-bracelet-guide' },
    ],
  },
  {
    id: 'rolex-maintenance',
    eyebrow: 'Care',
    title: 'Rolex Maintenance',
    description: 'Proper care preserves the beauty, reliability, and value of a Rolex watch. Regular servicing, water resistance checks, bracelet and case care, careful storage, and avoiding shocks, magnets, and unauthorized modifications all contribute to long-term performance. For pre-owned Rolex watches, documentation and service history are especially important. Kariv Glamour provides guidance to help you maintain your timepiece with confidence.',
    cta: 'Learn About Rolex Maintenance',
    link: '/rolex/maintenance',
    image: IMG.watch7,
    internalLinks: [
      { text: 'service history', link: '/watch-guides/service-history' },
      { text: 'box and papers', link: '/rolex-box-papers-guide' },
      { text: 'condition grading', link: '/condition-grading' },
      { text: 'pre-owned Rolex', link: '/rolex-gebraucht-kaufen' },
    ],
  },
];

// Read More carousel cards
export const ROLEX_READ_MORE = [
  { title: 'Rolex Story', description: 'Explore the heritage, milestones, and enduring appeal behind one of the world\u2019s most recognized watchmakers.', link: '/rolex/story', image: IMG.watch1 },
  { title: 'Rolex Watchmaking', description: 'Learn about the precision, materials, movements, and design principles that shape Rolex watches.', link: '/rolex/watchmaking', image: IMG.watch2 },
  { title: 'Rolex Maintenance', description: 'Understand how to care for a Rolex watch and preserve its condition, reliability, and long-term value.', link: '/rolex/maintenance', image: IMG.watch3 },
  { title: 'Rolex Buying Guide', description: 'Compare popular Rolex collections and learn what to check before buying a new or pre-owned Rolex.', link: '/welche-rolex-kaufen', image: IMG.watch4 },
  { title: 'Box and Papers', description: 'Learn why original box, warranty card, service documents, and purchase history matter when buying a Rolex.', link: '/rolex-box-papers-guide', image: IMG.watch5 },
  { title: 'Rolex Submariner Guide', description: 'Explore the design, appeal, and buying considerations behind the Rolex Submariner.', link: '/rolex-submariner-kaufen', image: IMG.watch6 },
  { title: 'Rolex Daytona Guide', description: 'Learn why the Rolex Daytona remains one of the most desired chronographs in luxury watch collecting.', link: '/rolex-daytona-kaufen', image: IMG.watch7 },
];

// Internal linking hub
export const ROLEX_INTERNAL_LINKS = {
  popularSearches: [
    { text: 'Rolex kaufen', link: '/rolex-kaufen' },
    { text: 'Rolex gebraucht kaufen', link: '/rolex-gebraucht-kaufen' },
    { text: 'Gebrauchte Rolex Uhren', link: '/gebrauchte-rolex-uhren' },
    { text: 'Rolex f\u00fcr Herren', link: '/rolex-herren' },
    { text: 'Rolex f\u00fcr Damen', link: '/rolex-damen' },
    { text: 'Rolex mit Box und Papieren', link: '/rolex-box-papers-guide' },
  ],
  iconicModels: [
    { text: 'Rolex Submariner kaufen', link: '/rolex-submariner-kaufen' },
    { text: 'Rolex Daytona kaufen', link: '/rolex-daytona-kaufen' },
    { text: 'Rolex Datejust kaufen', link: '/rolex-datejust-kaufen' },
    { text: 'Rolex GMT-Master II kaufen', link: '/rolex-gmt-master-ii-kaufen' },
    { text: 'Rolex Day-Date kaufen', link: '/rolex-day-date-kaufen' },
    { text: 'Rolex Oyster Perpetual kaufen', link: '/rolex-oyster-perpetual-kaufen' },
  ],
  learningGuides: [
    { text: 'Welche Rolex kaufen?', link: '/welche-rolex-kaufen' },
    { text: 'Rolex neu oder gebraucht kaufen?', link: '/rolex-neu-oder-gebraucht' },
    { text: 'Rolex Box und Papiere Guide', link: '/rolex-box-papers-guide' },
    { text: 'Rolex Wartung und Pflege', link: '/rolex/maintenance' },
    { text: 'Rolex Story', link: '/rolex/story' },
    { text: 'Rolex Watchmaking', link: '/rolex/watchmaking' },
  ],
  relatedBrands: [
    { text: 'Patek Philippe watches', link: '/brands/patek-philippe' },
    { text: 'Omega watches', link: '/brands/omega' },
    { text: 'Cartier watches', link: '/brands/cartier' },
    { text: 'Audemars Piguet watches', link: '/brands/audemars-piguet' },
    { text: 'Breitling watches', link: '/brands/breitling' },
    { text: 'Tudor watches', link: '/brands/tudor' },
  ],
  relatedCategories: [
    { text: 'Certified Pre-Owned Watches', link: '/certified-pre-owned' },
    { text: 'Vintage Watches', link: '/vintage-watches' },
    { text: 'Men\u2019s Luxury Watches', link: '/mens-watches' },
    { text: 'Women\u2019s Luxury Watches', link: '/womens-watches' },
    { text: 'Dive Watches', link: '/collections/dive-watches' },
    { text: 'Chronograph Watches', link: '/collections/chronograph-watches' },
    { text: 'Travel / GMT Watches', link: '/collections/gmt-watches' },
    { text: 'Dress Watches', link: '/collections/dress-watches' },
  ],
};

// FAQ
export const ROLEX_FAQS = [
  {
    question: 'Where can I buy a Rolex online?',
    answer: 'You can buy a Rolex online through Kariv Glamour, where each timepiece is presented with transparent product details, clear condition grading, and reference number visibility. Browse our Rolex collection to explore available models, or visit our pre-owned Rolex page for previously owned timepieces.',
  },
  {
    question: 'Is it safe to buy a pre-owned Rolex?',
    answer: 'Yes. When you buy a pre-owned Rolex from Kariv Glamour, each watch is carefully reviewed and presented with clear condition grading, box and papers information, and service history where available. We do not sell replica or counterfeit watches, and every product page provides the details you need to make a confident decision.',
  },
  {
    question: 'What does "box and papers" mean when buying a Rolex?',
    answer: 'Box and papers refers to the original presentation box and warranty documents that accompany a Rolex watch. Having the original box and papers can enhance collectability and resale value. Learn more in our Rolex Box and Papers Guide.',
  },
  {
    question: 'Which Rolex should I buy first?',
    answer: 'The right first Rolex depends on your lifestyle, taste, and budget. The Datejust is a versatile classic, while the Submariner is an iconic sports watch. Read our Rolex buying guide for a detailed comparison of popular models.',
  },
  {
    question: 'What is the difference between Rolex Datejust and Day-Date?',
    answer: 'The Rolex Datejust displays the date, while the Day-Date displays both the day and the date. The Day-Date is traditionally crafted in precious metals and is often considered the more prestigious model. Explore Datejust and Day-Date collections to compare.',
  },
  {
    question: 'What is the difference between Rolex Submariner and Sea-Dweller?',
    answer: 'Both are professional diving watches, but the Sea-Dweller is built for greater depth ratings and more extreme underwater use. The Submariner is more versatile for everyday wear. Compare the Submariner and Sea-Dweller to find the right model for you.',
  },
  {
    question: 'Why are some Rolex models difficult to find?',
    answer: 'Certain Rolex models are produced in limited quantities or experience high demand, making them harder to find at retail. At Kariv Glamour, we curate a selection of available Rolex watches, including sought-after references in the pre-owned market.',
  },
  {
    question: 'Does Kariv Glamour sell Rolex watches?',
    answer: 'Yes. Kariv Glamour offers a curated selection of Rolex watches, including new, pre-owned, and vintage models. Each watch is presented with transparent product information, condition grading, and reference number visibility.',
  },
  {
    question: 'Can I return a Rolex purchased online?',
    answer: 'Yes. Kariv Glamour offers a return policy for eligible purchases. Please review our Returns and Refunds page for full details on return conditions and process.',
  },
  {
    question: 'What should I check before buying a used Rolex?',
    answer: 'Before buying a used Rolex, check the condition grading, reference number, year of production, box and papers status, service history, and authenticity. Our condition grading guide provides detailed information to help you evaluate each timepiece.',
  },
];

// Trust points
export const ROLEX_TRUST_POINTS = [
  'Transparent product descriptions',
  'Clear condition grading',
  'Box and papers information',
  'Reference number visibility',
  'Secure checkout',
  'Insured shipping',
  'Customer support before purchase',
  'No replica or counterfeit watches',
];

export const ROLEX_TRUST_LINKS = [
  { text: 'Authentication Process', link: '/authentication' },
  { text: 'Condition Grading', link: '/condition-grading' },
  { text: 'Returns and Refunds', link: '/returns-and-refunds' },
  { text: 'Shipping Policy', link: '/shipping-policy' },
  { text: 'Contact Customer Service', link: '/customer-service' },
];

// SEO Landing pages content
export const ROLEX_SEO_PAGES = {
  'rolex-kaufen': {
    title: 'Rolex kaufen | Neue & gebrauchte Rolex Uhren | Kariv Glamour',
    description: 'Entdecken Sie Rolex Uhren bei Kariv Glamour. Kaufen Sie neue, gebrauchte und vintage Rolex Modelle wie Submariner, Daytona, Datejust, GMT-Master II, Day-Date und Oyster Perpetual mit transparenter Produktinformation.',
    h1: 'Rolex kaufen bei Kariv Glamour',
    intro: 'Bei Kariv Glamour k\u00f6nnen Sie Rolex Uhren online kaufen \u2014 mit transparenter Produktinformation, klarer Zustandsbewertung und einem verfeinerten Einkaufserlebnis. Entdecken Sie neue, gebrauchte und vintage Rolex Modelle von den ikonischsten Kollektionen der Manufaktur.',
    collectionFilter: null,
  },
  'rolex-gebraucht-kaufen': {
    title: 'Rolex gebraucht kaufen | Pre-Owned Rolex Uhren | Kariv Glamour',
    description: 'Rolex gebraucht kaufen bei Kariv Glamour. Entdecken Sie gepr\u00fcfte pre-owned Rolex Uhren mit klarer Zustandsbewertung, Box und Papiere Informationen und detaillierter Produktpr\u00e4sentation.',
    h1: 'Rolex gebraucht kaufen',
    intro: 'Wenn Sie eine Rolex gebraucht kaufen m\u00f6chten, bietet Kariv Glamour eine kuratierte Auswahl an pre-owned Zeitmessern. Jede Uhr wird mit klarer Zustandsbewertung, Box und Papiere Informationen und Referenznummern-Sichtbarkeit pr\u00e4sentiert.',
    collectionFilter: { isCertifiedPreOwned: true },
  },
  'gebrauchte-rolex-uhren': {
    title: 'Gebrauchte Rolex Uhren | Used Rolex Watches | Kariv Glamour',
    description: 'Browse gebrauchte Rolex Uhren bei Kariv Glamour. Datejust, Submariner, Daytona, GMT-Master II und Oyster Perpetual \u2014 mit transparenter Zustandsbewertung und Referenznummern.',
    h1: 'Gebrauchte Rolex Uhren',
    intro: 'St\u00f6bern Sie durch gebrauchte Rolex Uhren bei Kariv Glamour. Von der Datejust \u00fcber die Submariner bis zur Daytona \u2014 jede Uhr wird mit transparenter Zustandsbewertung und vollst\u00e4ndigen Produktinformationen pr\u00e4sentiert.',
    collectionFilter: { isCertifiedPreOwned: true },
  },
  'rolex-submariner-kaufen': {
    title: 'Rolex Submariner kaufen | Neue & gebrauchte Submariner | Kariv Glamour',
    description: 'Rolex Submariner kaufen bei Kariv Glamour. Entdecken Sie eine der ikonischsten Rolex Taucheruhren, bekannt f\u00fcr robustes Design und zeitlose Anziehungskraft.',
    h1: 'Rolex Submariner kaufen',
    intro: 'Die Rolex Submariner ist eine der bekanntesten Luxus-Taucheruhren der Welt. Bei Kariv Glamour k\u00f6nnen Sie die Submariner kaufen \u2014 mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Submariner' },
  },
  'rolex-daytona-kaufen': {
    title: 'Rolex Daytona kaufen | Cosmograph Daytona | Kariv Glamour',
    description: 'Rolex Daytona kaufen bei Kariv Glamour. Entdecken Sie den legend\u00e4ren Rolex Chronographen, assoziiert mit Motorsport, Geschwindigkeit und hoher Sammlerbegehrlichkeit.',
    h1: 'Rolex Daytona kaufen',
    intro: 'Die Rolex Cosmograph Daytona ist einer der begehrtesten Chronographen der Welt. Bei Kariv Glamour k\u00f6nnen Sie die Daytona kaufen \u2014 mit transparenter Produktinformation und klarer Zustandsbewertung.',
    collectionFilter: { collection: 'Daytona' },
  },
  'rolex-datejust-kaufen': {
    title: 'Rolex Datejust kaufen | Neue & gebrauchte Datejust | Kariv Glamour',
    description: 'Rolex Datejust kaufen bei Kariv Glamour. Shoppen Sie die Datejust \u2014 ein vielseitiger Klassiker f\u00fcr t\u00e4glichen Gebrauch, formellen Stil und langfristigen Besitz.',
    h1: 'Rolex Datejust kaufen',
    intro: 'Die Rolex Datejust ist ein zeitloser Klassiker, der sich f\u00fcr t\u00e4glichen Gebrauch, formellen Stil und langfristigen Besitz eignet. Bei Kariv Glamour k\u00f6nnen Sie die Datejust kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Datejust' },
  },
  'rolex-gmt-master-ii-kaufen': {
    title: 'Rolex GMT-Master II kaufen | Travel GMT Watches | Kariv Glamour',
    description: 'Rolex GMT-Master II kaufen bei Kariv Glamour. Entdecken Sie Rolex GMT-Master II Uhren, konzipiert f\u00fcr Reisende und Sammler, die Multizeitzone-Funktionalit\u00e4t sch\u00e4tzen.',
    h1: 'Rolex GMT-Master II kaufen',
    intro: 'Die Rolex GMT-Master II ist ein kosmopolitisches Reisewerkzeug, das mehrere Zeitzonen anzeigt. Bei Kariv Glamour k\u00f6nnen Sie die GMT-Master II kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'GMT-Master II' },
  },
  'rolex-day-date-kaufen': {
    title: 'Rolex Day-Date kaufen | Pr\u00e4sidenten-Uhr | Kariv Glamour',
    description: 'Rolex Day-Date kaufen bei Kariv Glamour. Entdecken Sie die prestigetr\u00e4chtige Rolex Ikone, oft assoziiert mit Edelmetallen, Status und zeitloser Autorit\u00e4t.',
    h1: 'Rolex Day-Date kaufen',
    intro: 'Die Rolex Day-Date ist eine prestigetr\u00e4chtige Ikone, traditionell in Edelmetallen gefertigt. Bei Kariv Glamour k\u00f6nnen Sie die Day-Date kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Day-Date' },
  },
  'rolex-oyster-perpetual-kaufen': {
    title: 'Rolex Oyster Perpetual kaufen | Kariv Glamour',
    description: 'Rolex Oyster Perpetual kaufen bei Kariv Glamour. Die reinste Ausdrucksform der Rolex Uhrmacherei \u2014 sauberes Design und allt\u00e4gliche Zuverl\u00e4ssigkeit.',
    h1: 'Rolex Oyster Perpetual kaufen',
    intro: 'Die Rolex Oyster Perpetual ist die reinste Ausdrucksform der Rolex Uhrmacherei. Bei Kariv Glamour k\u00f6nnen Sie die Oyster Perpetual kaufen \u2014 mit transparenter Produktinformation.',
    collectionFilter: { collection: 'Oyster Perpetual' },
  },
  'rolex-herren': {
    title: 'Rolex f\u00fcr Herren kaufen | Herren Rolex Uhren | Kariv Glamour',
    description: 'Rolex f\u00fcr Herren kaufen bei Kariv Glamour. Entdecken Sie Rolex Herrenuhren \u2014 von der Submariner bis zur Datejust \u2014 mit transparenter Produktinformation.',
    h1: 'Rolex f\u00fcr Herren',
    intro: 'Entdecken Sie Rolex Uhren f\u00fcr Herren bei Kariv Glamour. Von professionellen Tool-Watches bis zu eleganten Klassikern \u2014 jede Uhr wird mit transparenter Produktinformation pr\u00e4sentiert.',
    collectionFilter: { gender: 'Men' },
  },
  'rolex-damen': {
    title: 'Rolex f\u00fcr Damen kaufen | Damen Rolex Uhren | Kariv Glamour',
    description: 'Rolex f\u00fcr Damen kaufen bei Kariv Glamour. Entdecken Sie Rolex Damenuhren \u2014 von der Lady-Datejust bis zur Oyster Perpetual \u2014 mit transparenter Produktinformation.',
    h1: 'Rolex f\u00fcr Damen',
    intro: 'Entdecken Sie Rolex Uhren f\u00fcr Damen bei Kariv Glamour. Von der Lady-Datejust bis zur Oyster Perpetual \u2014 jede Uhr wird mit transparenter Produktinformation pr\u00e4sentiert.',
    collectionFilter: { gender: 'Women' },
  },
  'welche-rolex-kaufen': {
    title: 'Welche Rolex kaufen? | Rolex Kaufberatung | Kariv Glamour',
    description: 'Welche Rolex kaufen? Lesen Sie den Rolex Kaufberatung bei Kariv Glamour, um zu verstehen, welches Rolex Modell zu Ihrem Lebensstil, Geschmack und Sammlerzielen passt.',
    h1: 'Welche Rolex kaufen?',
    intro: 'Die Wahl der richtigen Rolex h\u00e4ngt von Ihrem Lebensstil, Geschmack und Budget ab. Die Datejust ist ein vielseitiger Klassiker, die Submariner eine ikonische Sportuhr. Dieser Guide hilft Ihnen, die richtige Entscheidung zu treffen.',
    collectionFilter: null,
    isGuide: true,
  },
  'rolex-neu-oder-gebraucht': {
    title: 'Rolex neu oder gebraucht kaufen? | Kariv Glamour',
    description: 'Rolex neu oder gebraucht kaufen? Vergleichen Sie die Vor- und Nachteile beider Optionen bei Kariv Glamour, um die richtige Entscheidung f\u00fcr Ihre Bed\u00fcrfnisse zu treffen.',
    h1: 'Rolex neu oder gebraucht kaufen?',
    intro: 'Sollten Sie eine Rolex neu oder gebraucht kaufen? Beide Optionen haben Vor- und Nachteile. Eine neue Rolex bietet volle Garantie und unbenutzten Zustand, w\u00e4hrend eine gebrauchte Rolex oft ein besseres Preis-Leistungs-Verh\u00e4ltnis und Zugang zu diskontinuierten Modellen bietet.',
    collectionFilter: null,
    isGuide: true,
  },
  'rolex-box-papers-guide': {
    title: 'Rolex Box und Papiere Guide | Kariv Glamour',
    description: 'Rolex Box und Papiere Guide bei Kariv Glamour. Erfahren Sie, warum Originalbox, Garantiekarte, Servicedokumente und Kaufhistorie beim Rolex Kauf wichtig sind.',
    h1: 'Rolex Box und Papiere Guide',
    intro: 'Box und Papiere bezieht sich auf die Original-Pr\u00e4sentationsbox und Garantiedokumente, die eine Rolex Uhr begleiten. Der Besitz der Originalbox und Papiere kann die Sammlerbegehrlichkeit und den Wiederverkaufswert steigern.',
    collectionFilter: null,
    isGuide: true,
  },
  'rolex-story': {
    title: 'The Rolex Story | Heritage & History | Kariv Glamour',
    description: 'Entdecken Sie die Rolex Story bei Kariv Glamour. Erfahren Sie \u00fcber das Erbe, Meilensteine und die bleibende Anziehungskraft hinter einem der bekanntesten Uhrmacher der Welt.',
    h1: 'The Rolex Story',
    intro: 'Rolex hat die Welt der feinen Uhrmacherei f\u00fcr \u00fcber ein Jahrhundert gepr\u00e4gt. Von der ersten wasserdichten Oyster-Geh\u00e4use bis zu den professionellen Tool-Watches, die Entdecker, Taucher und Piloten begleiteten \u2014 die Rolex Story ist eine von Pr\u00e4zision, Prestige und kultureller Anerkennung.',
    collectionFilter: null,
    isGuide: true,
  },
  'rolex-watchmaking': {
    title: 'Rolex Watchmaking | Craftsmanship & Precision | Kariv Glamour',
    description: 'Erfahren Sie \u00fcber Rolex Uhrmacherei bei Kariv Glamour. Pr\u00e4zision, Materialien, Werke und Designprinzipien, die Rolex Uhren formen.',
    h1: 'Rolex Watchmaking',
    intro: 'Rolex Uhrmacherei steht f\u00fcr Pr\u00e4zision, robuste Geh\u00e4usekonstruktion und zuverl\u00e4ssige automatische Werke. Vom legend\u00e4ren Oyster-Geh\u00e4use bis zu sorgf\u00e4ltig ausgew\u00e4hlten Materialien, Armb\u00e4ndern und L\u00fcnetten \u2014 jede Komponente ist f\u00fcr Langlebigkeit und Leistung konstruiert.',
    collectionFilter: null,
    isGuide: true,
  },
  'rolex-maintenance': {
    title: 'Rolex Maintenance | Care & Servicing | Kariv Glamour',
    description: 'Rolex Wartung und Pflege bei Kariv Glamour. Erfahren Sie, wie Sie eine Rolex Uhr pflegen und ihren Zustand, ihre Zuverl\u00e4ssigkeit und langfristigen Wert erhalten.',
    h1: 'Rolex Maintenance',
    intro: 'Die richtige Pflege erh\u00e4lt die Sch\u00f6nheit, Zuverl\u00e4ssigkeit und den Wert einer Rolex Uhr. Regelm\u00e4\u00dfige Wartung, Wasserdichtigkeitspr\u00fcfungen, Armband- und Geh\u00e4usepflege, sorgf\u00e4ltige Aufbewahrung und das Vermeiden von St\u00f6\u00dfen, Magneten und unbefugten Modifikationen tragen zur langfristigen Leistung bei.',
    collectionFilter: null,
    isGuide: true,
  },
};