// Cartier-inspired luxury palette
export const CARTIER_COLORS = {
  ivory: '#F7F2EA',
  ivoryLight: '#FBF8F2',
  red: '#8A2B2B',
  redDark: '#5E1A1A',
  gold: '#C5A572',
  roseGold: '#C9A07A',
  ink: '#1C1C1C',
  graphite: '#3A3A3A',
  muted: '#6B5F55',
};

export const CARTIER_LOGO = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/446c28c26_Cartier.svg';
export const CARTIER_LOGO_WHITE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/74d2ad8ac_Cartierwhitelogo.svg';

export const CARTIER_HERO_IMAGE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/c6cba41a9_CartierUhr.jpg';
export const CARTIER_STORY_IMAGE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/36831cb67_CartierUhrlovers.webp';
export const CARTIER_SANTOS_IMAGE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/5156b6def_CartierPanthere.webp';
export const CARTIER_SKELETON_IMAGE = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/8a7b031c3_Cartieruhrkaufen.jpg';

// Cartier-specific filter option lists
export const CARTIER_CASE_MATERIALS = ['Steel', 'Yellow Gold', 'Rose Gold', 'White Gold', 'Platinum', 'Titanium', 'Gold and Steel', 'Steel and Rose Gold', 'Steel and Yellow Gold', 'Black ADLC Steel', 'Gem-set'];
export const CARTIER_SHAPES = ['Rectangular', 'Square', 'Round', 'Oval', 'Tonneau', 'Cushion', 'Asymmetrical'];
export const CARTIER_MOVEMENTS = ['Quartz', 'Automatic', 'Manual-winding', 'High-autonomy quartz', 'Mechanical'];
export const CARTIER_DIAL_COLORS = ['White', 'Silver', 'Black', 'Blue', 'Champagne', 'Mother of Pearl', 'Grey', 'Anthracite', 'Beige', 'Skeleton', 'Pavé'];
export const CARTIER_BRACELETS = ['Leather', 'Alligator leather', 'Calf leather', 'Steel', 'Yellow gold', 'Rose gold', 'White gold', 'Gold and steel', 'Interchangeable bracelet', 'Interchangeable leather strap', 'Rubber'];
export const CARTIER_CASE_SIZES = ['Mini', 'Small', 'Medium', 'Large', 'Extra Large'];
export const CARTIER_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];
export const CARTIER_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];

export const CARTIER_COLLECTIONS = [
  { id: 1, name: 'Tank', slug: 'tank', image: CARTIER_HERO_IMAGE, shortDescription: 'A Cartier icon defined by rectangular lines, Roman numerals, refined proportions, and timeless elegance.' },
  { id: 2, name: 'Santos de Cartier', slug: 'santos-de-cartier', image: CARTIER_SANTOS_IMAGE, shortDescription: 'A pioneering Cartier watch with strong geometric design, visible screws, and everyday luxury character.' },
  { id: 3, name: 'Panthère de Cartier', slug: 'panthere-de-cartier', image: CARTIER_SANTOS_IMAGE, shortDescription: 'A graceful Cartier watch known for jewellery-like bracelet design, feminine elegance, and fluid wearability.' },
  { id: 4, name: 'Ballon Bleu de Cartier', slug: 'ballon-bleu-de-cartier', image: CARTIER_SKELETON_IMAGE, shortDescription: 'A rounded Cartier collection recognized for its curved case, refined crown detail, and soft elegant presence.' },
  { id: 5, name: 'Pasha de Cartier', slug: 'pasha-de-cartier', image: CARTIER_SKELETON_IMAGE, shortDescription: 'A distinctive Cartier collection with round case design, bold personality, and modern luxury character.' },
  { id: 6, name: 'Baignoire', slug: 'baignoire', image: CARTIER_HERO_IMAGE, shortDescription: 'An oval Cartier design with sculptural elegance, graceful proportions, and strong feminine appeal.' },
  { id: 7, name: 'Cartier Crash', slug: 'cartier-crash', image: CARTIER_SKELETON_IMAGE, shortDescription: 'A highly distinctive Cartier design with asymmetrical case form and strong collector interest.' },
  { id: 8, name: 'Santos-Dumont', slug: 'santos-dumont', image: null, shortDescription: 'A refined and elegant expression of the Santos story, with slim proportions and classic Cartier styling.' },
  { id: 9, name: 'Tank Française', slug: 'tank-francaise', image: null, shortDescription: 'A Tank interpretation with integrated bracelet design and refined everyday elegance.' },
  { id: 10, name: 'Tank Must', slug: 'tank-must', image: null, shortDescription: 'A clean and accessible expression of the Cartier Tank design language.' },
  { id: 11, name: 'Tank Louis Cartier', slug: 'tank-louis-cartier', image: null, shortDescription: 'A classic and refined Tank model strongly associated with Cartier elegance and dress-watch style.' },
  { id: 12, name: 'Tank Américaine', slug: 'tank-americaine', image: CARTIER_HERO_IMAGE, shortDescription: 'A curved rectangular Tank design with elongated proportions and sophisticated wrist presence.' },
  { id: 13, name: 'Tortue', slug: 'tortue', image: null, shortDescription: 'A shaped Cartier watch family known for elegant curved lines and vintage-inspired sophistication.' },
  { id: 14, name: 'La Panthère de Cartier', slug: 'la-panthere-de-cartier', image: null, shortDescription: 'A Cartier collection that connects watch design with the Maison\u2019s iconic panther-inspired elegance.' },
  { id: 15, name: 'Tressage', slug: 'tressage', image: null, shortDescription: 'A refined Cartier collection with jewellery-inspired design language and strong visual elegance.' },
  { id: 16, name: 'Reflection de Cartier', slug: 'reflection-de-cartier', image: null, shortDescription: 'A sculptural Cartier watch design with jewellery-like presence and contemporary elegance.' },
  { id: 17, name: 'Rotonde de Cartier', slug: 'rotonde-de-cartier', image: null, shortDescription: 'A refined round Cartier watch family associated with classic design and sophisticated watchmaking.' },
  { id: 18, name: 'Coussin de Cartier', slug: 'coussin-de-cartier', image: null, shortDescription: 'A soft-shaped Cartier design with cushion-like form, jewellery character, and elegant wrist presence.' },
];

export const CARTIER_QUICK_FILTERS = [
  { label: 'Cartier Tank', link: '/cartier-tank-kaufen' },
  { label: 'Cartier Santos', link: '/cartier-santos-kaufen' },
  { label: 'Cartier Panthère', link: '/cartier-panthere-kaufen' },
  { label: 'Cartier Ballon Bleu', link: '/cartier-ballon-bleu-kaufen' },
  { label: 'Cartier Baignoire', link: '/cartier-baignoire-kaufen' },
  { label: 'Cartier Pasha', link: '/cartier-pasha-kaufen' },
  { label: 'Pre-Owned Cartier', link: '/cartier-gebraucht-kaufen' },
  { label: 'Cartier for Women', link: '/cartier-damen' },
  { label: 'Cartier for Men', link: '/cartier-herren' },
  { label: 'Cartier with Box and Papers', link: '/guides' },
];

export const CARTIER_SEO_CARDS = [
  { title: 'Cartier Uhr kaufen', description: 'Explore Cartier watches through Kariv Glamour with refined product presentation, transparent details, and a premium shopping experience.', link: '/cartier-uhr-kaufen' },
  { title: 'Cartier gebraucht kaufen', description: 'Discover pre-owned Cartier watches with clear condition grading, box and papers information, and detailed product data.', link: '/cartier-gebraucht-kaufen' },
  { title: 'Cartier Tank kaufen', description: 'Browse Cartier Tank watches, one of the most recognizable rectangular watch designs in luxury watchmaking.', link: '/cartier-tank-kaufen' },
  { title: 'Cartier Santos kaufen', description: 'Explore Santos de Cartier watches, known for bold geometry, visible screws, and elegant everyday style.', link: '/cartier-santos-kaufen' },
  { title: 'Cartier Panthère kaufen', description: 'Discover Panthère de Cartier watches with graceful bracelet design and jewellery-like elegance.', link: '/cartier-panthere-kaufen' },
  { title: 'Cartier Ballon Bleu kaufen', description: 'Shop Ballon Bleu de Cartier watches, known for rounded case design and refined Cartier style.', link: '/cartier-ballon-bleu-kaufen' },
];

export const CARTIER_READ_MORE = [
  { title: 'Cartier Story', description: 'Explore Cartier\u2019s design heritage, watchmaking elegance, and most recognizable watch families.', link: '/cartier/story', image: CARTIER_STORY_IMAGE },
  { title: 'Cartier Tank Guide', description: 'Learn about the Tank collection and compare Tank Must, Tank Française, Tank Louis Cartier and Tank Américaine.', link: '/cartier-tank-kaufen', image: CARTIER_HERO_IMAGE },
  { title: 'Santos de Cartier Guide', description: 'Discover the design, history, and buying considerations behind Santos de Cartier watches.', link: '/cartier-santos-kaufen', image: CARTIER_SANTOS_IMAGE },
  { title: 'Cartier Watches for Women', description: 'Explore elegant Cartier watches such as Panthère, Baignoire, Tank and Ballon Bleu.', link: '/cartier-damen', image: CARTIER_SANTOS_IMAGE },
  { title: 'Cartier Watches for Men', description: 'Browse Cartier watches for men, including Santos, Tank, Pasha, Ballon Bleu and Drive-inspired designs.', link: '/cartier-herren', image: CARTIER_SKELETON_IMAGE },
  { title: 'Buying Pre-Owned Cartier Watches', description: 'Understand condition, box and papers, service history and what to check before buying a used Cartier watch.', link: '/cartier-gebraucht-kaufen', image: CARTIER_HERO_IMAGE },
];

export const CARTIER_INTERNAL_LINKS = [
  {
    title: 'Beliebte Cartier Suchen',
    links: [
      { label: 'Cartier Uhr kaufen', to: '/cartier-uhr-kaufen' },
      { label: 'Cartier gebraucht kaufen', to: '/cartier-gebraucht-kaufen' },
      { label: 'Gebrauchte Cartier Uhren', to: '/gebrauchte-cartier-uhren' },
      { label: 'Cartier für Damen', to: '/cartier-damen' },
      { label: 'Cartier für Herren', to: '/cartier-herren' },
      { label: 'Cartier mit Box und Papieren', to: '/guides' },
    ],
  },
  {
    title: 'Cartier Kollektionen',
    links: [
      { label: 'Cartier Tank kaufen', to: '/cartier-tank-kaufen' },
      { label: 'Cartier Santos kaufen', to: '/cartier-santos-kaufen' },
      { label: 'Cartier Panthère kaufen', to: '/cartier-panthere-kaufen' },
      { label: 'Cartier Ballon Bleu kaufen', to: '/cartier-ballon-bleu-kaufen' },
      { label: 'Cartier Baignoire kaufen', to: '/cartier-baignoire-kaufen' },
      { label: 'Cartier Pasha kaufen', to: '/cartier-pasha-kaufen' },
      { label: 'Cartier Crash kaufen', to: '/cartier-crash-kaufen' },
    ],
  },
  {
    title: 'Verwandte Uhrenkategorien',
    links: [
      { label: 'Certified Pre-Owned Watches', to: '/shop?isCertifiedPreOwned=true' },
      { label: 'Damenuhren', to: '/shop?gender=Women' },
      { label: 'Herrenuhren', to: '/shop?gender=Men' },
      { label: 'Dress Watches', to: '/shop' },
      { label: 'Quadratische & rechteckige Uhren', to: '/shop' },
      { label: 'Golduhren', to: '/shop' },
    ],
  },
  {
    title: 'Verwandte Luxusuhren-Marken',
    links: [
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Patek Philippe watches', to: '/brands/patek-philippe' },
      { label: 'Omega watches', to: '/brands/omega' },
      { label: 'Jaeger-LeCoultre watches', to: '/brands/jaeger-lecoultre' },
      { label: 'Bulgari watches', to: '/brands/bvlgari' },
      { label: 'Audemars Piguet watches', to: '/brands/audemars-piguet' },
    ],
  },
];

export const CARTIER_FAQS = [
  { q: 'Where can I buy a Cartier watch online?', a: "You can buy Cartier watches online at Kariv Glamour. Browse new and <a href='/cartier-gebraucht-kaufen'>pre-owned Cartier</a> watches with transparent product details, reference numbers, and condition grading." },
  { q: 'Is it safe to buy a pre-owned Cartier watch?', a: "Yes. Buying <a href='/cartier-gebraucht-kaufen'>pre-owned Cartier</a> from Kariv Glamour includes clear condition grading, <a href='/guides'>box and papers</a> information, and detailed product data so you can buy with confidence." },
  { q: 'Which Cartier watch is the most iconic?', a: "The <a href='/cartier-tank-kaufen'>Cartier Tank</a> and <a href='/cartier-santos-kaufen'>Santos de Cartier</a> are among the most iconic Cartier watches, recognised for their distinctive shapes and timeless design." },
  { q: 'What is the difference between Cartier Tank and Santos?', a: "The <a href='/cartier-tank-kaufen'>Cartier Tank</a> features a rectangular case with refined proportions, while <a href='/cartier-santos-kaufen'>Santos de Cartier</a> has a square case with visible screws and a bolder geometric character." },
  { q: 'Are Cartier watches good for women?', a: "Yes. <a href='/cartier-damen'>Cartier watches for women</a> include elegant designs such as Panthère, Baignoire, Tank and Ballon Bleu, known for jewellery-like refinement and graceful proportions." },
  { q: 'Are Cartier watches good for men?', a: "Yes. <a href='/cartier-herren'>Cartier watches for men</a> include Santos, Tank, Pasha, Ballon Bleu and other designs that combine strong shapes with elegant proportions." },
  { q: 'What does box and papers mean when buying Cartier?', a: "<a href='/guides'>Box and papers</a> refers to the original presentation box and warranty or certificate documents. Having both can support authenticity and resale value." },
  { q: 'What should I check before buying a used Cartier watch?', a: "Check the reference number, condition, <a href='/guides'>box and papers</a>, service history, and condition grading before buying a used Cartier watch." },
  { q: 'Can I return a Cartier watch purchased online?', a: "Yes, eligible purchases can be returned according to our <a href='/legal/returns-and-refunds'>returns policy</a>. Contact support within the return window if your watch is not as described." },
];

export const CARTIER_SEO_PAGES = {
  'cartier-uhr-kaufen': { h1: 'Cartier Uhr kaufen', title: 'Cartier Uhr kaufen | Kariv Glamour', description: 'Cartier Uhr kaufen bei Kariv Glamour – neue und gebrauchte Cartier Uhren wie Tank, Santos, Panthère und Ballon Bleu.', intro: 'Entdecken Sie eine kuratierte Auswahl eleganter Cartier Uhren bei Kariv Glamour. Von neuen Modellen bis zu gebrauchten Cartier Uhren – mit transparenter Produktinformation und Referenznummern.', filter: {} },
  'cartier-gebraucht-kaufen': { h1: 'Cartier gebraucht kaufen', title: 'Cartier gebraucht kaufen | Kariv Glamour', description: 'Gebrauchte Cartier Uhren kaufen bei Kariv Glamour mit transparenter Zustandsbewertung und Box & Papers Informationen.', intro: 'Entdecken Sie gebrauchte Cartier Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.', filter: {} },
  'gebrauchte-cartier-uhren': { h1: 'Gebrauchte Cartier Uhren', title: 'Gebrauchte Cartier Uhren | Kariv Glamour', description: 'Gebrauchte Cartier Uhren bei Kariv Glamour – geprüfte Modelle wie Tank, Santos und Panthère.', intro: 'Stöbern Sie durch gebrauchte Cartier Uhren und finden Sie geprüfte Modelle mit nachvollziehbarer Zustandsbeschreibung.', filter: {} },
  'cartier-tank-kaufen': { h1: 'Cartier Tank kaufen', title: 'Cartier Tank kaufen | Kariv Glamour', description: 'Cartier Tank kaufen bei Kariv Glamour – die ikonische rechteckige Cartier Uhr in verschiedenen Ausführungen.', intro: 'Die Cartier Tank ist eine der erkennbarsten rechteckigen Uhren der Welt. Entdecken Sie Cartier Tank Modelle mit eleganten Proportionen und römischen Ziffern.', filter: { collection: 'Tank' } },
  'cartier-santos-kaufen': { h1: 'Cartier Santos kaufen', title: 'Cartier Santos kaufen | Kariv Glamour', description: 'Santos de Cartier kaufen bei Kariv Glamour – markante Geometrie und sichtbare Schrauben.', intro: 'Santos de Cartier steht für markante Geometrie, sichtbare Schrauben und elegante Alltagsluxus. Entdecken Sie Santos Modelle bei Kariv Glamour.', filter: { collection: 'Santos de Cartier' } },
  'cartier-panthere-kaufen': { h1: 'Cartier Panthère kaufen', title: 'Cartier Panthère kaufen | Kariv Glamour', description: 'Panthère de Cartier kaufen bei Kariv Glamour – schmuckhaftes Armbanddesign und elegante Anmut.', intro: 'Panthère de Cartier besticht durch schmuckhaftes Armbanddesign und feminine Eleganz. Entdecken Sie Panthère Modelle bei Kariv Glamour.', filter: { collection: 'Panthère de Cartier' } },
  'cartier-ballon-bleu-kaufen': { h1: 'Cartier Ballon Bleu kaufen', title: 'Cartier Ballon Bleu kaufen | Kariv Glamour', description: 'Ballon Bleu de Cartier kaufen bei Kariv Glamour – gerundetes Gehäuse und feine Krone.', intro: 'Ballon Bleu de Cartier ist bekannt für sein gerundetes Gehäuse und die feine Kronendetail. Entdecken Sie Ballon Bleu Modelle bei Kariv Glamour.', filter: { collection: 'Ballon Bleu de Cartier' } },
  'cartier-baignoire-kaufen': { h1: 'Cartier Baignoire kaufen', title: 'Cartier Baignoire kaufen | Kariv Glamour', description: 'Cartier Baignoire kaufen bei Kariv Glamour – ovales Design mit skulpturaler Eleganz.', intro: 'Die Cartier Baignoire überzeugt durch ovales Design und skulpturale Eleganz. Entdecken Sie Baignoire Modelle bei Kariv Glamour.', filter: { collection: 'Baignoire' } },
  'cartier-pasha-kaufen': { h1: 'Cartier Pasha kaufen', title: 'Cartier Pasha kaufen | Kariv Glamour', description: 'Pasha de Cartier kaufen bei Kariv Glamour – rundes Gehäuse mit markanter Persönlichkeit.', intro: 'Pasha de Cartier vereint rundes Gehäusedesign mit markanter Persönlichkeit. Entdecken Sie Pasha Modelle bei Kariv Glamour.', filter: { collection: 'Pasha de Cartier' } },
  'cartier-crash-kaufen': { h1: 'Cartier Crash kaufen', title: 'Cartier Crash kaufen | Kariv Glamour', description: 'Cartier Crash kaufen bei Kariv Glamour – asymmetrisches Gehäuse mit starker Sammleranziehung.', intro: 'Die Cartier Crash ist ein unverkennbares Design mit asymmetrischem Gehäuse und starker Sammleranziehung. Entdecken Sie verfügbare Modelle bei Kariv Glamour.', filter: { collection: 'Cartier Crash' } },
  'cartier-herren': { h1: 'Cartier Uhren für Herren', title: 'Cartier Uhr Herren | Kariv Glamour', description: 'Cartier Uhren für Herren bei Kariv Glamour – Santos, Tank, Pasha und Ballon Bleu.', intro: 'Entdecken Sie Cartier Uhren für Herren, darunter Santos, Tank, Pasha und Ballon Bleu – starke Formen mit eleganten Proportionen.', filter: { gender: 'Men' } },
  'cartier-damen': { h1: 'Cartier Uhren für Damen', title: 'Cartier Uhr Damen | Kariv Glamour', description: 'Cartier Uhren für Damen bei Kariv Glamour – Panthère, Baignoire, Tank und Ballon Bleu.', intro: 'Entdecken Sie Cartier Uhren für Damen wie Panthère, Baignoire, Tank und Ballon Bleu – schmuckhafte Eleganz und anmutige Proportionen.', filter: { gender: 'Women' } },
  'cartier-story': { h1: 'Cartier Story', title: 'Cartier Story | Kariv Glamour', description: 'Die Cartier Story – Designheritage, Uhrmachereleganz und ikonische Uhrenfamilien.', intro: 'Cartier hat das Luxusdesign durch eine einzigartige Verbindung aus Schmuckexpertise, uhrmacherischer Kreativität und unverkennbaren Formen geprägt.', isGuide: true },
};