// IWC Schaffhausen collections, filters, and SEO data
// Positioned around engineering precision, aviation heritage,
// Portugieser elegance, Portofino dress watches, and Ingenieur sports watches.

const PILOT_HERO = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/526fd775c_Hoerl-Juwelier-und-Uhrmacher-Augsburg-IWC-PilotHero.jpg';
const PILOT_CHRONO = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4ff0b727a_IWCSchaffhausenPilotsuhrChronograph.jpg';
const PORTUGIESER = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/d888043cf_IWCSchaffhausenPortugieserAutomatic42IW501705.jpg';
const UHREN = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/3af78f396_IWCSchaffhausenUhren.png';
const ZEIGT_PILOTS = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/30110783d_IWCSchaffhausenzeigtPilots.jpg';
const SCHAFFHAUSEN = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/3cb3296b1_IWCSchaffhausen.webp';

export const IWC_HERO_IMAGE = PILOT_HERO;
export const IWC_STORY_IMAGE = SCHAFFHAUSEN;

export const IWC_COLLECTIONS = [
  { id: 1, name: "Pilot's Watches", slug: 'pilots-watches', image: UHREN, shortDescription: "Aviation-inspired IWC watches known for legibility, technical design, chronographs, and professional pilot-watch character." },
  { id: 2, name: 'Portugieser', slug: 'portugieser', image: PORTUGIESER, shortDescription: 'A refined IWC collection with elegant proportions, clean dials, chronographs, annual calendars, and high complications.' },
  { id: 3, name: 'Portofino', slug: 'portofino', image: ZEIGT_PILOTS, shortDescription: 'A classic IWC dress-watch family focused on simplicity, slim elegance, and versatile automatic models.' },
  { id: 4, name: 'Ingenieur', slug: 'ingenieur', image: SCHAFFHAUSEN, shortDescription: 'A modern IWC sports-watch collection with engineering character, integrated bracelet design, and strong everyday wearability.' },
  { id: 5, name: 'Aquatimer', slug: 'aquatimer', image: PILOT_CHRONO, shortDescription: "IWC's dive-watch family, created for underwater performance, sport use, and robust technical presence." },
];

export const IWC_CASE_MATERIALS = ['Stainless Steel', 'Titanium', 'Bronze', 'Ceramic', 'Black Ceramic', 'Gold', 'Rose Gold', 'White Gold', 'Platinum'];
export const IWC_DIAL_COLORS = ['Black', 'Blue', 'Silver', 'White', 'Green', 'Grey', 'Brown', 'Champagne', 'Burgundy', 'Dune / beige', 'Salmon', 'Gold'];
export const IWC_MOVEMENTS = ['Automatic', 'Manual-winding', 'Chronograph', 'In-house calibre'];
export const IWC_FEATURES = ['Automatic', 'Chronograph', 'Perpetual calendar', 'Annual calendar', 'Moonphase', 'Big Pilot', 'Pilot watch', 'Dress watch', 'Dive watch', 'GMT / Timezoner', 'Power reserve', 'Small seconds', 'Integrated bracelet', 'Limited edition', 'Exhibition caseback', 'In-house calibre', 'Soft-iron inner case', 'Bronze case', 'Ceramic case', 'Titanium case'];
export const IWC_BRACELETS = ['Steel', 'Titanium', 'Integrated bracelet', 'Leather', 'Alligator Leather', 'Rubber', 'Textile'];
export const IWC_CASE_SIZES = ['34 mm', '36 mm', '39 mm', '40 mm', '41 mm', '42 mm', '43 mm', '44 mm', '46 mm'];
export const IWC_TYPES = ['New', 'Pre-Owned', 'Vintage'];
export const IWC_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const IWC_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];

export const IWC_QUICK_FILTERS = [
  { label: "Pilot's Watches", link: '/iwc-schaffhausen/pilots-watches' },
  { label: 'Portugieser', link: '/iwc-schaffhausen/portugieser' },
  { label: 'Portofino', link: '/iwc-schaffhausen/portofino' },
  { label: 'Ingenieur', link: '/iwc-schaffhausen/ingenieur' },
  { label: 'Aquatimer', link: '/iwc-schaffhausen/aquatimer' },
  { label: 'Automatic', link: '/iwc-schaffhausen-automatic' },
  { label: 'Pre-Owned', link: '/iwc-schaffhausen-gebraucht' },
];

export const IWC_SEO_CARDS = [
  { title: 'IWC Schaffhausen Uhr', description: 'Explore IWC Schaffhausen watches at Kariv Glamour — engineering precision, aviation heritage, and iconic collections with transparent product details.', link: '/iwc-schaffhausen-uhr' },
  { title: 'IWC Schaffhausen Uhren', description: "Browse the full IWC Schaffhausen collection including Pilot's Watches, Portugieser, Portofino, Ingenieur and Aquatimer.", link: '/iwc-schaffhausen-uhren' },
  { title: 'IWC Schaffhausen Automatic', description: 'Discover IWC Schaffhausen automatic watches — in-house calibres, power reserve indicators, and refined everyday wearability.', link: '/iwc-schaffhausen-automatic' },
  { title: 'IWC Schaffhausen Ingenieur', description: 'Explore the IWC Ingenieur — a modern sports-watch collection with engineering character and integrated bracelet design.', link: '/iwc-schaffhausen/ingenieur' },
  { title: 'IWC Schaffhausen Portofino', description: 'Browse IWC Portofino — classic dress watches focused on simplicity, slim elegance, and versatile automatic models.', link: '/iwc-schaffhausen/portofino' },
  { title: 'IWC Schaffhausen gebraucht', description: 'Explore pre-owned IWC Schaffhausen watches with transparent condition grading, box and papers information and product-specific details.', link: '/iwc-schaffhausen-gebraucht' },
];

export const IWC_READ_MORE = [
  { title: 'IWC Story', description: "Explore IWC Schaffhausen's heritage of engineering precision, aviation, and classic Swiss watchmaking since 1868.", link: '/iwc-schaffhausen/story' },
  { title: "IWC Pilot's Watches Guide", description: "Learn what makes IWC Pilot's Watches iconic — legibility, Big Pilot design, and professional aviation character.", link: '/iwc-schaffhausen/pilots-watches' },
  { title: 'IWC Portugieser Guide', description: 'Discover the IWC Portugieser — elegant proportions, clean dials, chronographs, and high complications.', link: '/iwc-schaffhausen/portugieser' },
  { title: 'IWC Ingenieur Guide', description: 'Explore the IWC Ingenieur — a modern sports watch with engineering identity and integrated bracelet design.', link: '/iwc-schaffhausen/ingenieur' },
  { title: 'IWC Automatic Guide', description: 'Understand IWC in-house automatic calibres, power reserve, and what makes them ideal for daily wear.', link: '/iwc-schaffhausen-automatic-guide' },
  { title: 'Buying Pre-Owned IWC', description: 'What to check before buying a used IWC Schaffhausen — condition, box and papers, calibre, and service history.', link: '/iwc-schaffhausen-gebraucht' },
];

export const IWC_INTERNAL_LINKS = [
  {
    title: 'Beliebte IWC Suchen',
    links: [
      { label: 'IWC Schaffhausen Uhr', to: '/iwc-schaffhausen-uhr' },
      { label: 'IWC Schaffhausen Uhren', to: '/iwc-schaffhausen-uhren' },
      { label: 'IWC Schaffhausen Automatic', to: '/iwc-schaffhausen-automatic' },
      { label: 'IWC Schaffhausen gebraucht', to: '/iwc-schaffhausen-gebraucht' },
      { label: 'IWC Schaffhausen Uhr Herren', to: '/iwc-schaffhausen-uhr-herren' },
      { label: 'IWC Schaffhausen Uhr Damen', to: '/iwc-schaffhausen-uhr-damen' },
    ],
  },
  {
    title: 'IWC Kollektionen',
    links: [
      { label: "Pilot's Watches", to: '/iwc-schaffhausen/pilots-watches' },
      { label: 'Portugieser', to: '/iwc-schaffhausen/portugieser' },
      { label: 'Portofino', to: '/iwc-schaffhausen/portofino' },
      { label: 'Ingenieur', to: '/iwc-schaffhausen/ingenieur' },
      { label: 'Aquatimer', to: '/iwc-schaffhausen/aquatimer' },
    ],
  },
  {
    title: 'Kaufen & Gebraucht',
    links: [
      { label: 'IWC Schaffhausen kaufen', to: '/iwc-schaffhausen-kaufen' },
      { label: 'IWC Schaffhausen Uhr kaufen', to: '/iwc-schaffhausen-uhr-kaufen' },
      { label: 'IWC Schaffhausen gebraucht kaufen', to: '/iwc-schaffhausen-gebraucht-kaufen' },
      { label: "IWC Pilot's Watches kaufen", to: '/iwc-schaffhausen-pilot-watches-kaufen' },
      { label: 'IWC Portugieser kaufen', to: '/iwc-schaffhausen-portugieser-kaufen' },
      { label: 'IWC Ingenieur kaufen', to: '/iwc-schaffhausen-ingenieur-kaufen' },
    ],
  },
  {
    title: 'Ratgeber & Guides',
    links: [
      { label: 'Welche IWC Schaffhausen kaufen?', to: '/welche-iwc-schaffhausen-kaufen' },
      { label: 'IWC Automatic Guide', to: '/iwc-schaffhausen-automatic-guide' },
      { label: 'IWC Pilot Watch Guide', to: '/iwc-schaffhausen-pilot-watch-guide' },
      { label: 'IWC Ingenieur Guide', to: '/iwc-schaffhausen-ingenieur-guide' },
      { label: 'IWC Story', to: '/iwc-schaffhausen/story' },
    ],
  },
  {
    title: 'Verwandte Luxusuhren-Marken',
    links: [
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Patek Philippe watches', to: '/brands/patek-philippe' },
      { label: 'Audemars Piguet watches', to: '/brands/audemars-piguet' },
      { label: 'Omega watches', to: '/brands/omega' },
      { label: 'Breitling watches', to: '/brands/breitling' },
      { label: 'Grand Seiko watches', to: '/brands/grand-seiko' },
    ],
  },
];

export const IWC_FAQS = [
  { q: 'Where can I buy an IWC Schaffhausen watch online?', a: "You can buy IWC Schaffhausen watches online at Kariv Glamour. Browse new and <a href='/iwc-schaffhausen-gebraucht'>pre-owned IWC watches</a> with transparent product details, reference numbers and condition grading." },
  { q: 'What are the most popular IWC Schaffhausen collections?', a: "The main IWC collections are <a href='/iwc-schaffhausen/pilots-watches'>Pilot's Watches</a>, <a href='/iwc-schaffhausen/portugieser'>Portugieser</a>, <a href='/iwc-schaffhausen/portofino'>Portofino</a>, <a href='/iwc-schaffhausen/ingenieur'>Ingenieur</a>, and <a href='/iwc-schaffhausen/aquatimer'>Aquatimer</a>." },
  { q: 'What is the difference between IWC Portugieser and Portofino?', a: "The <a href='/iwc-schaffhausen/portugieser'>Portugieser</a> is a refined collection with elegant proportions, chronographs, and high complications, while the <a href='/iwc-schaffhausen/portofino'>Portofino</a> is focused on simplicity, slim elegance, and versatile dress-watch character." },
  { q: 'What is the IWC Ingenieur?', a: "The <a href='/iwc-schaffhausen/ingenieur'>IWC Ingenieur</a> is a modern sports-watch collection with engineering character, integrated bracelet design, and strong everyday wearability." },
  { q: 'Are IWC Schaffhausen automatic watches good for daily wear?', a: "Yes. <a href='/iwc-schaffhausen-automatic'>IWC automatic watches</a> feature in-house calibres with power reserve indicators and are designed for reliable, everyday wear." },
  { q: 'Is it safe to buy a pre-owned IWC Schaffhausen watch?', a: "Yes. Buying <a href='/iwc-schaffhausen-gebraucht'>pre-owned IWC</a> from Kariv Glamour includes clear condition grading, box and papers information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases." },
  { q: 'What should I check before buying a used IWC?', a: "Check the condition of the case and bracelet, verify the calibre type, confirm box and papers, and review the service history. Visit our <a href='/iwc-schaffhausen-gebraucht'>pre-owned IWC page</a> for transparent listings." },
  { q: 'What does box and papers mean when buying IWC?', a: "Box and papers refers to the original presentation box and the official warranty/documentation papers that accompanied the watch when new. A 'full set' includes both, which can add value and confidence when buying pre-owned." },
];

export const IWC_SEO_PAGES = {
  'iwc-schaffhausen-uhr': {
    h1: 'IWC Schaffhausen Uhr',
    title: 'IWC Schaffhausen Uhr | Kariv Glamour',
    description: 'Entdecken Sie IWC Schaffhausen Uhren bei Kariv Glamour — Engineering, Aviation und ikonische Kollektionen mit transparenter Produktinformation.',
    intro: 'Erkunden Sie IWC Schaffhausen Uhren bei Kariv Glamour — mit engineering precision, aviation heritage, und ikonischen Kollektionen wie Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer.',
    filter: {},
  },
  'iwc-schaffhausen-uhren': {
    h1: 'IWC Schaffhausen Uhren',
    title: 'IWC Schaffhausen Uhren | Kariv Glamour',
    description: 'IWC Schaffhausen Uhren bei Kariv Glamour — Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer.',
    intro: 'St\u00f6bern Sie durch IWC Schaffhausen Uhren nach Kollektion, Material, Uhrwerk, Geh\u00e4usegr\u00f6\u00dfe, Zustand und Preis.',
    filter: {},
  },
  'iwc-schaffhausen-uhr-herren': {
    h1: 'IWC Schaffhausen Uhr Herren',
    title: 'IWC Schaffhausen Uhr Herren | Kariv Glamour',
    description: 'IWC Schaffhausen Uhr Herren bei Kariv Glamour — Pilot\u2019s Watches, Portugieser und Ingenieur f\u00fcr M\u00e4nner.',
    intro: 'Entdecken Sie IWC Schaffhausen Uhren f\u00fcr Herren — von den Pilot\u2019s Watches \u00fcber den Portugieser bis zum Ingenieur.',
    filter: { gender: 'Men' },
  },
  'iwc-schaffhausen-uhr-damen': {
    h1: 'IWC Schaffhausen Uhr Damen',
    title: 'IWC Schaffhausen Uhr Damen | Kariv Glamour',
    description: 'IWC Schaffhausen Uhr Damen bei Kariv Glamour — elegante GS Modelle in kleineren Geh\u00e4usegr\u00f6\u00dfen.',
    intro: 'Entdecken Sie IWC Schaffhausen Uhren f\u00fcr Damen, darunter kleinere Portofino und Portugieser Modelle.',
    filter: { gender: 'Women' },
  },
  'iwc-schaffhausen-automatic': {
    h1: 'IWC Schaffhausen Automatic',
    title: 'IWC Schaffhausen Automatic | Kariv Glamour',
    description: 'IWC Schaffhausen Automatic Uhren — in-house Kaliber, Gangreserve und Alltagskomfort.',
    intro: 'Entdecken Sie IWC Schaffhausen Automatic Uhren mit in-house Kalibern, Gangreserve-Anzeigen und refined everyday wearability.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
      return f.includes('automatic') || f.includes('self-winding') || f.includes('in-house');
    },
  },
  'iwc-schaffhausen-gebraucht': {
    h1: 'IWC Schaffhausen gebraucht',
    title: 'IWC Schaffhausen gebraucht | Kariv Glamour',
    description: 'Gebrauchte IWC Schaffhausen Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro: 'Entdecken Sie gebrauchte IWC Schaffhausen Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.',
    filter: {},
  },
  'iwc-schaffhausen-kaufen': {
    h1: 'IWC Schaffhausen kaufen',
    title: 'IWC Schaffhausen kaufen | Kariv Glamour',
    description: 'IWC Schaffhausen kaufen bei Kariv Glamour — neue und gebrauchte IWC Modelle.',
    intro: 'IWC Schaffhausen kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    filter: {},
  },
  'iwc-schaffhausen-uhr-kaufen': {
    h1: 'IWC Schaffhausen Uhr kaufen',
    title: 'IWC Schaffhausen Uhr kaufen | Kariv Glamour',
    description: 'IWC Schaffhausen Uhr kaufen bei Kariv Glamour — Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer.',
    intro: 'IWC Schaffhausen Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer.',
    filter: {},
  },
  'iwc-schaffhausen-gebraucht-kaufen': {
    h1: 'IWC Schaffhausen gebraucht kaufen',
    title: 'IWC Schaffhausen gebraucht kaufen | Kariv Glamour',
    description: 'IWC Schaffhausen gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.',
    intro: 'IWC Schaffhausen gebraucht kaufen bei Kariv Glamour — mit Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'iwc-schaffhausen-pilot-watches-kaufen': {
    h1: "IWC Pilot's Watches kaufen",
    title: "IWC Pilot's Watches kaufen | Kariv Glamour",
    description: "IWC Pilot's Watches kaufen bei Kariv Glamour — Aviation Heritage und professionelle Fliegeruhren.",
    intro: "IWC Pilot's Watches kaufen bei Kariv Glamour — ikonische Fliegeruhren mit hervorragender Ablesbarkeit, technischem Design und professionellem Aviation-Charakter.",
    filter: { collection: "Pilot's Watches" },
  },
  'iwc-schaffhausen-portugieser-kaufen': {
    h1: 'IWC Portugieser kaufen',
    title: 'IWC Portugieser kaufen | Kariv Glamour',
    description: 'IWC Portugieser kaufen bei Kariv Glamour — elegante Proportionen, Chronographen und hohe Komplikationen.',
    intro: 'IWC Portugieser kaufen bei Kariv Glamour — eine refined Kollektion mit eleganten Proportionen, klaren Zifferbl\u00e4ttern, Chronographen und hohen Komplikationen.',
    filter: { collection: 'Portugieser' },
  },
  'iwc-schaffhausen-ingenieur-kaufen': {
    h1: 'IWC Ingenieur kaufen',
    title: 'IWC Ingenieur kaufen | Kariv Glamour',
    description: 'IWC Ingenieur kaufen bei Kariv Glamour — moderne Sportuhr mit Engineering-Identit\u00e4t und integriertem Armband.',
    intro: 'IWC Ingenieur kaufen bei Kariv Glamour — eine moderne Sportuhr-Kollektion mit Engineering-Charakter, integriertem Armband und starker Alltagstauglichkeit.',
    filter: { collection: 'Ingenieur' },
  },
  'welche-iwc-schaffhausen-kaufen': {
    h1: 'Welche IWC Schaffhausen kaufen?',
    title: 'Welche IWC Schaffhausen kaufen | Kariv Glamour',
    description: 'IWC Kaufberatung — vergleichen Sie Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur und Aquatimer.',
    intro: 'Welche IWC Schaffhausen Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Komplikationen und Geh\u00e4usegr\u00f6\u00dfen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
  },
  'iwc-schaffhausen-automatic-guide': {
    h1: 'IWC Schaffhausen Automatic Guide',
    title: 'IWC Schaffhausen Automatic Guide | Kariv Glamour',
    description: 'Verstehen Sie IWC in-house Automatik-Kaliber, Gangreserve und Alltagstauglichkeit.',
    intro: 'IWC Schaffhausen Automatic Uhren verf\u00fcgen \u00fcber in-house Kaliber mit Gangreserve-Anzeigen und sind f\u00fcr zuverl\u00e4ssiges, t\u00e4gliches Tragen konzipiert.',
    isGuide: true,
  },
  'iwc-schaffhausen-pilot-watch-guide': {
    h1: "IWC Pilot's Watch Guide",
    title: "IWC Pilot's Watch Guide | Kariv Glamour",
    description: "Was IWC Pilot's Watches ikonisch macht — Ablesbarkeit, Big Pilot Design und Aviation-Charakter.",
    intro: "IWC Pilot's Watches sind bekannt f\u00fcr hervorragende Ablesbarkeit, technisches Design, den Big Pilot und professionellen Aviation-Charakter.",
    isGuide: true,
  },
  'iwc-schaffhausen-ingenieur-guide': {
    h1: 'IWC Ingenieur Guide',
    title: 'IWC Ingenieur Guide | Kariv Glamour',
    description: 'Der IWC Ingenieur — moderne Sportuhr mit Engineering-Identit\u00e4t und integriertem Armband.',
    intro: 'Der IWC Ingenieur ist eine moderne Sportuhr-Kollektion mit Engineering-Charakter, integriertem Armband-Design und starker Alltagstauglichkeit.',
    isGuide: true,
  },
  'iwc-schaffhausen-story': {
    h1: 'IWC Schaffhausen Story',
    title: 'IWC Schaffhausen Story | Kariv Glamour',
    description: 'Die IWC Schaffhausen Story — Engineering, Aviation und klassische Schweizer Uhrmacherei seit 1868.',
    intro: 'IWC Schaffhausen steht f\u00fcr engineering precision, aviation heritage, refined dress-watch design und klassische Schweizer Uhrmacherei seit 1868 — von den Pilot\u2019s Watches \u00fcber den Portugieser und Portofino bis zum Ingenieur.',
    isGuide: true,
  },
};