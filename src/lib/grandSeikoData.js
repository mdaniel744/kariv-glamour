// Grand Seiko collections, filters, and SEO data
// Grand Seiko is positioned around Japanese craftsmanship, precision,
// nature-inspired dials, Spring Drive, and the Grammar of Design.

const EVOLUTION9_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4a6c12570_GrandSeikoEvolution9.jpg';
const HERITAGE_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b9cc089d5_GrandSeikoHeritage.webp';
const MENS_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/a0b5ed446_GrandSeikoMenUhr.jpg';
const LADIES_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/dafceffa4_Grand_Seiko_Ladies_Automatic.webp';

export const GS_HERO_IMAGE = EVOLUTION9_IMG;
export const GS_STORY_IMAGE = MENS_IMG;

export const GS_COLLECTIONS = [
  { id: 1, name: 'Heritage', slug: 'heritage', image: HERITAGE_IMG, shortDescription: 'The heart of Grand Seiko — balanced design and the pure essentials of watchmaking, home to iconic models like the Snowflake and Shunbun.' },
  { id: 2, name: 'Elegance', slug: 'elegance', image: MENS_IMG, shortDescription: 'Dress watches with refined design, slim profiles and formal character — Grand Seiko at its most restrained and graceful.' },
  { id: 3, name: 'Sport', slug: 'sport', image: '', shortDescription: 'GMT, diver and chronograph models with higher water resistance and robust construction for active wear.' },
  { id: 4, name: 'Evolution 9', slug: 'evolution-9', image: EVOLUTION9_IMG, shortDescription: 'A modern design language with advanced movements, enhanced legibility and refined Zaratsu finishing.' },
  { id: 5, name: 'Masterpiece', slug: 'masterpiece', image: LADIES_IMG, shortDescription: 'High-end, rare and artisan timepieces in precious metals — collector-focused Grand Seiko at its finest.' },
];

export const GS_CASE_MATERIALS = ['Stainless Steel', 'High-Intensity Titanium', 'Titanium', 'Platinum', 'Rose Gold', 'Yellow Gold', 'White Gold'];
export const GS_MOVEMENTS = ['Spring Drive', 'Hi-Beat', 'Automatic', 'Manual-winding', 'Quartz'];
export const GS_DIAL_COLORS = ['Black', 'Blue', 'Green', 'Silver', 'White', 'Pink', 'Champagne', 'Ice Blue', 'Cream', 'Grey', 'Brown'];
export const GS_DIAL_THEMES = ['Snowflake', 'Shunbun', 'White Birch', 'Lake Suwa', 'Mt. Iwate', 'Sakura', 'Textured', 'Sunburst', 'Nature-inspired'];
export const GS_FEATURES = ['Spring Drive', 'Hi-Beat 36000', 'GMT', 'Chronograph', 'Diver', 'Power reserve indicator', 'Date', 'Exhibition caseback', 'Zaratsu polishing', 'Nature-inspired dial', 'Textured dial', 'Limited edition', '44GS case', '62GS case', 'High-intensity titanium'];
export const GS_BRACELETS = ['Steel', 'Titanium', 'Leather', 'Alligator Leather', 'Rubber', 'Textile'];
export const GS_CASE_SIZES = ['37 mm', '38 mm', '39 mm', '40 mm', '40.5 mm', '41 mm', '42 mm', '44 mm', '45 mm'];
export const GS_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const GS_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const GS_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const GS_QUICK_FILTERS = [
  { label: 'Heritage', link: '/grand-seiko/heritage' },
  { label: 'Elegance', link: '/grand-seiko/elegance' },
  { label: 'Sport', link: '/grand-seiko/sport' },
  { label: 'Evolution 9', link: '/grand-seiko/evolution-9' },
  { label: 'Masterpiece', link: '/grand-seiko/masterpiece' },
  { label: 'Snowflake', link: '/grand-seiko-snowflake' },
  { label: 'Spring Drive', link: '/grand-seiko-spring-drive' },
  { label: 'Pre-Owned', link: '/grand-seiko-gebraucht' },
];

export const GS_SEO_CARDS = [
  { title: 'Grand Seiko Uhr', description: 'Explore Grand Seiko watches at Kariv Glamour — Japanese craftsmanship, Spring Drive technology and nature-inspired dials with transparent product details.', link: '/grand-seiko-uhr' },
  { title: 'Grand Seiko Uhren', description: 'Browse the full Grand Seiko collection including Heritage, Elegance, Sport, Evolution 9 and Masterpiece.', link: '/grand-seiko-uhren' },
  { title: 'Grand Seiko Snowflake', description: 'Discover the Grand Seiko Snowflake (SBGA211) — a Heritage Collection Spring Drive model with a textured white dial inspired by Japanese snow.', link: '/grand-seiko-snowflake' },
  { title: 'Grand Seiko Shunbun', description: 'Explore the Grand Seiko Shunbun (SBGA413) — a 62GS-inspired case with a dial expressing a brief spring scene, powered by Spring Drive.', link: '/grand-seiko-shunbun' },
  { title: 'Grand Seiko Spring Drive', description: 'Learn about Grand Seiko Spring Drive — the unique movement combining mechanical precision with quartz accuracy for one-second-a-day precision.', link: '/grand-seiko-spring-drive' },
  { title: 'Grand Seiko GMT', description: 'Browse Grand Seiko GMT watches for travel — dual-time functionality with Spring Drive or mechanical movements.', link: '/grand-seiko-gmt' },
];

export const GS_READ_MORE = [
  { title: 'Grand Seiko Story', description: 'Explore Grand Seiko\'s heritage of Japanese craftsmanship, the Grammar of Design, and the pursuit of the pure essentials of watchmaking.', link: '/grand-seiko/story' },
  { title: 'Snowflake Guide', description: 'Learn what makes the Grand Seiko Snowflake one of the most beloved nature-inspired dials in watchmaking.', link: '/grand-seiko-snowflake' },
  { title: 'Shunbun Guide', description: 'Discover the Grand Seiko Shunbun — a 62GS-inspired case design with a dial capturing a fleeting spring moment.', link: '/grand-seiko-shunbun' },
  { title: 'Spring Drive Guide', description: 'Understand Grand Seiko Spring Drive technology — the movement that unites mechanical and electronic precision.', link: '/grand-seiko-spring-drive-guide' },
  { title: 'Snowflake vs Shunbun', description: 'Compare the Grand Seiko Snowflake and Shunbun — two iconic nature-inspired Spring Drive models.', link: '/grand-seiko-snowflake-vs-shunbun' },
  { title: 'Buying Pre-Owned Grand Seiko', description: 'What to check before buying a used Grand Seiko — condition, Zaratsu polishing, box and papers, and movement verification.', link: '/grand-seiko-gebraucht' },
];

export const GS_INTERNAL_LINKS = [
  {
    title: 'Beliebte Grand Seiko Suchen',
    links: [
      { label: 'Grand Seiko Uhr', to: '/grand-seiko-uhr' },
      { label: 'Grand Seiko Uhren', to: '/grand-seiko-uhren' },
      { label: 'Grand Seiko Snowflake', to: '/grand-seiko-snowflake' },
      { label: 'Grand Seiko Shunbun', to: '/grand-seiko-shunbun' },
      { label: 'Grand Seiko Spring Drive', to: '/grand-seiko-spring-drive' },
      { label: 'Grand Seiko GMT', to: '/grand-seiko-gmt' },
    ],
  },
  {
    title: 'Grand Seiko Kollektionen',
    links: [
      { label: 'Heritage', to: '/grand-seiko/heritage' },
      { label: 'Elegance', to: '/grand-seiko/elegance' },
      { label: 'Sport', to: '/grand-seiko/sport' },
      { label: 'Evolution 9', to: '/grand-seiko/evolution-9' },
      { label: 'Masterpiece', to: '/grand-seiko/masterpiece' },
    ],
  },
  {
    title: 'Kaufen & Gebraucht',
    links: [
      { label: 'Grand Seiko kaufen', to: '/grand-seiko-kaufen' },
      { label: 'Grand Seiko Uhr kaufen', to: '/grand-seiko-uhr-kaufen' },
      { label: 'Grand Seiko gebraucht', to: '/grand-seiko-gebraucht' },
      { label: 'Grand Seiko gebraucht kaufen', to: '/grand-seiko-gebraucht-kaufen' },
      { label: 'Grand Seiko Uhr Herren', to: '/grand-seiko-uhr-herren' },
      { label: 'Grand Seiko Uhr Damen', to: '/grand-seiko-uhr-damen' },
    ],
  },
  {
    title: 'Ratgeber & Guides',
    links: [
      { label: 'Welche Grand Seiko kaufen?', to: '/welche-grand-seiko-kaufen' },
      { label: 'Snowflake vs Shunbun', to: '/grand-seiko-snowflake-vs-shunbun' },
      { label: 'Spring Drive Guide', to: '/grand-seiko-spring-drive-guide' },
      { label: 'Grand Seiko Story', to: '/grand-seiko/story' },
    ],
  },
  {
    title: 'Verwandte Luxusuhren-Marken',
    links: [
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Patek Philippe watches', to: '/brands/patek-philippe' },
      { label: 'Audemars Piguet watches', to: '/brands/audemars-piguet' },
      { label: 'Omega watches', to: '/brands/omega' },
      { label: 'Cartier watches', to: '/brands/cartier' },
      { label: 'Breitling watches', to: '/brands/breitling' },
    ],
  },
];

export const GS_FAQS = [
  { q: 'Where can I buy a Grand Seiko watch online?', a: "You can buy Grand Seiko watches online at Kariv Glamour. Browse new and <a href='/grand-seiko-gebraucht'>pre-owned Grand Seiko</a> watches with transparent product details, reference numbers and condition grading." },
  { q: 'What is Grand Seiko Spring Drive?', a: "Grand Seiko Spring Drive is a unique movement that combines the beauty of a mechanical watch with the precision of electronic regulation. It achieves an accuracy of approximately one second per day and offers a smooth gliding seconds hand. Read more in our <a href='/grand-seiko-spring-drive-guide'>Spring Drive Guide</a>." },
  { q: 'What is the Grand Seiko Snowflake?', a: "The <a href='/grand-seiko-snowflake'>Grand Seiko Snowflake</a> (SBGA211) is a Heritage Collection Spring Drive 3-Day model powered by Caliber 9R65 with 72 hours of power reserve. Its textured white dial is inspired by the snowfields of the Shinshu region." },
  { q: 'What is the Grand Seiko Shunbun?', a: "The <a href='/grand-seiko-shunbun'>Grand Seiko Shunbun</a> (SBGA413) features a 62GS-inspired case design with a dial expressing a brief spring scene, powered by Spring Drive Caliber 9R65 with about 72 hours of power reserve." },
  { q: 'Is it safe to buy a pre-owned Grand Seiko?', a: "Yes. Buying <a href='/grand-seiko-gebraucht'>pre-owned Grand Seiko</a> from Kariv Glamour includes clear condition grading, box and papers information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases." },
  { q: 'What is the difference between Grand Seiko Heritage and Elegance?', a: "The <a href='/grand-seiko/heritage'>Heritage</a> collection is the heart of Grand Seiko, focused on balanced design and the pure essentials of watchmaking, while <a href='/grand-seiko/elegance'>Elegance</a> focuses on dress watches with slim profiles, refined design and formal character." },
  { q: 'Are Grand Seiko GMT watches good for travel?', a: "Yes. <a href='/grand-seiko-gmt'>Grand Seiko GMT</a> watches offer dual-time functionality with Spring Drive or mechanical movements, making them excellent travel companions with high precision and legibility." },
  { q: 'What should I check before buying a used Grand Seiko?', a: "Check the condition of the Zaratsu-polished surfaces, verify the movement type (Spring Drive, Hi-Beat, or Quartz), confirm box and papers, and review the service history. Visit our <a href='/grand-seiko-gebraucht'>pre-owned Grand Seiko page</a> for transparent listings." },
];

export const GS_SEO_PAGES = {
  'grand-seiko-uhr': {
    h1: 'Grand Seiko Uhr',
    title: 'Grand Seiko Uhr | Kariv Glamour',
    description: 'Entdecken Sie Grand Seiko Uhren bei Kariv Glamour — japanische Handwerkskunst, Spring Drive und naturinspirierte Zifferblätter.',
    intro: 'Erkunden Sie Grand Seiko Uhren bei Kariv Glamour — mit japanischer Handwerkskunst, Präzision, Zaratsu-Politur, Spring Drive Technologie und naturinspirierten Zifferblättern.',
    filter: {},
  },
  'grand-seiko-uhren': {
    h1: 'Grand Seiko Uhren',
    title: 'Grand Seiko Uhren | Kariv Glamour',
    description: 'Grand Seiko Uhren bei Kariv Glamour — Heritage, Elegance, Sport, Evolution 9 und Masterpiece Kollektionen.',
    intro: 'Stöbern Sie durch Grand Seiko Uhren nach Kollektion, Material, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    filter: {},
  },
  'grand-seiko-uhr-herren': {
    h1: 'Grand Seiko Uhr Herren',
    title: 'Grand Seiko Uhr Herren | Kariv Glamour',
    description: 'Grand Seiko Uhr Herren bei Kariv Glamour — Heritage, Evolution 9 und Sport Modelle für Männer.',
    intro: 'Entdecken Sie Grand Seiko Uhren für Herren — von der Heritage Kollektion bis zur Evolution 9 und Sport.',
    filter: { gender: 'Men' },
  },
  'grand-seiko-uhr-damen': {
    h1: 'Grand Seiko Uhr Damen',
    title: 'Grand Seiko Uhr Damen | Kariv Glamour',
    description: 'Grand Seiko Uhr Damen bei Kariv Glamour — elegante GS Modelle in kleineren Gehäusegrößen.',
    intro: 'Entdecken Sie Grand Seiko Uhren für Damen, darunter kleinere Heritage und Elegance Modelle mit feinen Details.',
    filter: { gender: 'Women' },
  },
  'grand-seiko-snowflake': {
    h1: 'Grand Seiko Snowflake',
    title: 'Grand Seiko Snowflake (SBGA211) | Kariv Glamour',
    description: 'Grand Seiko Snowflake SBGA211 — Heritage Kollektion Spring Drive 3-Day mit Caliber 9R65 und 72 Stunden Gangreserve.',
    intro: 'Der Grand Seiko Snowflake (SBGA211) ist ein Heritage Collection Spring Drive 3-Day Modell, angetrieben von Caliber 9R65 mit 72 Stunden Gangreserve. Das strukturierte weiße Zifferblatt ist von den Schneefeldern der Region Shinshu inspiriert.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.model, p.productTitle, p.dialColor, p.referenceNumber].filter(Boolean).join(' ').toLowerCase();
      return f.includes('snowflake') || f.includes('sbga211') || f.includes('sbga21');
    },
  },
  'grand-seiko-shunbun': {
    h1: 'Grand Seiko Shunbun',
    title: 'Grand Seiko Shunbun (SBGA413) | Kariv Glamour',
    description: 'Grand Seiko Shunbun SBGA413 — 62GS-inspiriertes Gehäuse mit Frühlings-dial, Spring Drive Caliber 9R65.',
    intro: 'Der Grand Seiko Shunbun (SBGA413) zeichnet sich durch ein 62GS-inspiriertes Gehäusedesign mit einem Zifferblatt aus, das eine kurze Frühlingssszene ausdrückt, angetrieben von Spring Drive Caliber 9R65 mit ca. 72 Stunden Gangreserve.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.model, p.productTitle, p.dialColor, p.referenceNumber].filter(Boolean).join(' ').toLowerCase();
      return f.includes('shunbun') || f.includes('sbga413') || f.includes('sbga41');
    },
  },
  'grand-seiko-spring-drive': {
    h1: 'Grand Seiko Spring Drive',
    title: 'Grand Seiko Spring Drive | Kariv Glamour',
    description: 'Grand Seiko Spring Drive — einzigartige Bewegung mit mechanischer und Quarz-Präzision, ca. eine Sekunde pro Tag.',
    intro: 'Grand Seiko Spring Drive vereint die Schönheit eines mechanischen Uhrwerks mit der Präzision elektronischer Regelung. Die Bewegung erreicht eine Genauigkeit von etwa einer Sekunde pro Tag und bietet einen sanft gleitenden Sekundenzeiger.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
      return f.includes('spring drive');
    },
  },
  'grand-seiko-gmt': {
    h1: 'Grand Seiko GMT',
    title: 'Grand Seiko GMT | Kariv Glamour',
    description: 'Grand Seiko GMT Uhren für Reisen — Dual-Zeit Funktion mit Spring Drive oder mechanischen Uhrwerken.',
    intro: 'Grand Seiko GMT Uhren bieten Dual-Zeit-Funktionalität mit Spring Drive oder mechanischen Uhrwerken — ideal für Reisen mit hoher Präzision und Ablesbarkeit.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
      return f.includes('gmt');
    },
  },
  'grand-seiko-gebraucht': {
    h1: 'Grand Seiko gebraucht',
    title: 'Grand Seiko gebraucht | Kariv Glamour',
    description: 'Gebrauchte Grand Seiko Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro: 'Entdecken Sie gebrauchte Grand Seiko Uhren mit klarer Zustandsbewertung, Zaratsu-Politur-Informationen, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'grand-seiko-kaufen': {
    h1: 'Grand Seiko kaufen',
    title: 'Grand Seiko kaufen | Kariv Glamour',
    description: 'Grand Seiko kaufen bei Kariv Glamour — neue und gebrauchte GS Modelle.',
    intro: 'Grand Seiko kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    filter: {},
  },
  'grand-seiko-uhr-kaufen': {
    h1: 'Grand Seiko Uhr kaufen',
    title: 'Grand Seiko Uhr kaufen | Kariv Glamour',
    description: 'Grand Seiko Uhr kaufen bei Kariv Glamour — Heritage, Elegance, Sport, Evolution 9 und Masterpiece.',
    intro: 'Grand Seiko Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Heritage, Elegance, Sport, Evolution 9 und Masterpiece.',
    filter: {},
  },
  'grand-seiko-gebraucht-kaufen': {
    h1: 'Grand Seiko gebraucht kaufen',
    title: 'Grand Seiko gebraucht kaufen | Kariv Glamour',
    description: 'Grand Seiko gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.',
    intro: 'Grand Seiko gebraucht kaufen bei Kariv Glamour — mit Zustandsbewertung, Zaratsu-Politur-Informationen und detaillierten Produktdaten.',
    filter: {},
  },
  'welche-grand-seiko-kaufen': {
    h1: 'Welche Grand Seiko kaufen?',
    title: 'Welche Grand Seiko kaufen | Kariv Glamour',
    description: 'Grand Seiko Kaufberatung — vergleichen Sie Heritage, Elegance, Sport, Evolution 9 und Masterpiece.',
    intro: 'Welche Grand Seiko Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke (Spring Drive, Hi-Beat, Quartz), Gehäusegrößen und Zifferblatt-Designs, um die richtige Entscheidung zu treffen.',
    isGuide: true,
  },
  'grand-seiko-snowflake-vs-shunbun': {
    h1: 'Grand Seiko Snowflake vs Shunbun',
    title: 'Grand Seiko Snowflake vs Shunbun | Kariv Glamour',
    description: 'Vergleich der Grand Seiko Snowflake und Shunbun — zwei ikonische naturinspirierte Spring Drive Modelle.',
    intro: 'Der Vergleich zwischen Grand Seiko Snowflake (SBGA211) und Shunbun (SBGA413): Beide sind Heritage Collection Spring Drive Modelle mit naturinspirierten Zifferblättern, unterscheiden sich aber in Gehäusedesign und Farbgebung.',
    isGuide: true,
  },
  'grand-seiko-spring-drive-guide': {
    h1: 'Grand Seiko Spring Drive Guide',
    title: 'Grand Seiko Spring Drive Guide | Kariv Glamour',
    description: 'Verstehen Sie Grand Seiko Spring Drive Technologie — die Bewegung, die mechanische und elektronische Präzision vereint.',
    intro: 'Grand Seiko Spring Drive ist eine einzigartige Bewegung, die mechanische Energie mit elektronischer Regelung kombiniert und eine Genauigkeit von etwa einer Sekunde pro Tag erreicht.',
    isGuide: true,
  },
  'grand-seiko-story': {
    h1: 'Grand Seiko Story',
    title: 'Grand Seiko Story | Kariv Glamour',
    description: 'Die Grand Seiko Story — japanische Handwerkskunst, die Grammar of Design und die pure Essenz der Uhrmacherei.',
    intro: 'Grand Seiko steht für japanische Handwerkskunst, die Grammar of Design, Zaratsu-Politur, naturinspirierte Zifferblätter und die Verfolgung der reinen Essenz der Uhrmacherei — von der Heritage Kollektion bis zur Evolution 9.',
    isGuide: true,
  },
};