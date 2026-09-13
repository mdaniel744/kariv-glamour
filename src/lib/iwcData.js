import { applyCzechSeoPages, applyCzechBrandContent } from './czechBrandData.js';
import { applyCzechBrandFaqs } from './czechBrandFaqs.js';

// IWC Schaffhausen collections, filters, and SEO data
// Positioned around engineering precision, aviation heritage,
// Portugieser elegance, Portofino dress watches, and Ingenieur sports watches.

const PILOT_HERO = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/526fd775c_Hoerl-Juwelier-und-Uhrmacher-Augsburg-IWC-PilotHero.jpg';
const PILOT_CHRONO = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4ff0b727a_IWCSchaffhausenPilotsuhrChronograph.jpg';
const PORTUGIESER = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/d888043cf_IWCSchaffhausenPortugieserAutomatic42IW501705.jpg';
const UHREN = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/3af78f396_IWCSchaffhausenUhren.png';
const ZEIGT_PILOTS = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/30110783d_IWCSchaffhausenzeigtPilots.jpg';
const SCHAFFHAUSEN = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/3cb3296b1_IWCSchaffhausen.webp';

const IWC_PAGE_ASSET_BASE = '/brand-assets/iwc-schaffhausen/page';

export const IWC_PAGE_IMAGES = {
  hero: `${IWC_PAGE_ASSET_BASE}/iwc-schaffhausen-hero.png`,
  story: `${IWC_PAGE_ASSET_BASE}/iwc-schaffhausen-story.webp`,
  watchesGuide: `${IWC_PAGE_ASSET_BASE}/iwc-schaffhausen-watches-guide.jpg`,
  automaticGuide: `${IWC_PAGE_ASSET_BASE}/iwc-schaffhausen-automatic-guide.webp`,
  ingenieurGuide: `${IWC_PAGE_ASSET_BASE}/iwc-schaffhausen-ingenieur-guide.jpg`,
  portugieserGuide: `${IWC_PAGE_ASSET_BASE}/iwc-schaffhausen-portugieser-guide.jpg`,
  preOwned: `${IWC_PAGE_ASSET_BASE}/iwc-schaffhausen-pre-owned.jpg`,
};

export const IWC_HERO_IMAGE = IWC_PAGE_IMAGES.hero;
export const IWC_STORY_IMAGE = IWC_PAGE_IMAGES.story;

export const IWC_COLLECTIONS = [
  { id: 1, name: "Pilot's Watches", slug: 'pilots-watches', image: UHREN, shortDescription_en: "Aviation-inspired IWC watches known for legibility, technical design, chronographs, and professional pilot-watch character.", shortDescription_de: "Luftfahrt-inspirierte IWC-Uhren, bekannt für Ablesbarkeit, technisches Design, Chronographen und professionellen Fliegeruhren-Charakter." },
  { id: 2, name: 'Portugieser', slug: 'portugieser', image: PORTUGIESER, shortDescription_en: 'A refined IWC collection with elegant proportions, clean dials, chronographs, annual calendars, and high complications.', shortDescription_de: 'Eine verfeinerte IWC-Kollektion mit eleganten Proportionen, klaren Zifferblättern, Chronographen, Jahreskalendern und hohen Komplikationen.' },
  { id: 3, name: 'Portofino', slug: 'portofino', image: ZEIGT_PILOTS, shortDescription_en: 'A classic IWC dress-watch family focused on simplicity, slim elegance, and versatile automatic models.', shortDescription_de: 'Eine klassische IWC-Dress-Uhren-Familie, fokussiert auf Einfachheit, schlanke Eleganz und vielseitige Automatik-Modelle.' },
  { id: 4, name: 'Ingenieur', slug: 'ingenieur', image: SCHAFFHAUSEN, shortDescription_en: 'A modern IWC sports-watch collection with engineering character, integrated bracelet design, and strong everyday wearability.', shortDescription_de: 'Eine moderne IWC-Sportuhren-Kollektion mit Engineering-Charakter, integriertem Armband-Design und starker Alltagstauglichkeit.' },
  { id: 5, name: 'Aquatimer', slug: 'aquatimer', image: PILOT_CHRONO, shortDescription_en: "IWC's dive-watch family, created for underwater performance, sport use, and robust technical presence.", shortDescription_de: "IWCs Taucheruhren-Familie, geschaffen für Unterwasserleistung, sportliche Nutzung und robuste technische Präsenz." },
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
  { label_en: "Pilot's Watches", label_de: "Fliegeruhren", link: '/iwc-schaffhausen/pilots-watches', filter: { collection: "Pilot's Watches" } },
  { label_en: 'Portugieser', label_de: 'Portugieser', link: '/iwc-schaffhausen/portugieser', filter: { collection: 'Portugieser' } },
  { label_en: 'Portofino', label_de: 'Portofino', link: '/iwc-schaffhausen/portofino', filter: { collection: 'Portofino' } },
  { label_en: 'Ingenieur', label_de: 'Ingenieur', link: '/iwc-schaffhausen/ingenieur', filter: { collection: 'Ingenieur' } },
  { label_en: 'Aquatimer', label_de: 'Aquatimer', link: '/iwc-schaffhausen/aquatimer', filter: { collection: 'Aquatimer' } },
  { label_en: 'Automatic', label_de: 'Automatik', link: '/iwc-schaffhausen-automatic', filter: { movementType: 'Automatic' } },
  { label_en: 'Pre-Owned', label_de: 'Gebraucht', link: '/iwc-schaffhausen-gebraucht', filter: { preOwned: true } },
];

export const IWC_SEO_CARDS = [
  { title_en: 'IWC Schaffhausen Watch', title_de: 'IWC Schaffhausen Uhr', description_en: 'Explore IWC Schaffhausen watches at Kariv Glamour — engineering precision, aviation heritage, and iconic collections with transparent product details.', description_de: 'Entdecken Sie IWC Schaffhausen Uhren bei Kariv Glamour — Engineering-Präzision, Aviation-Erbe und ikonische Kollektionen mit transparenten Produktdetails.', link: '/iwc-schaffhausen-uhr', image: IWC_PAGE_IMAGES.hero },
  { title_en: 'IWC Schaffhausen Watches', title_de: 'IWC Schaffhausen Uhren', description_en: "Browse the full IWC Schaffhausen collection including Pilot's Watches, Portugieser, Portofino, Ingenieur and Aquatimer.", description_de: "Stöbern Sie durch die gesamte IWC Schaffhausen Kollektion inklusive Fliegeruhren, Portugieser, Portofino, Ingenieur und Aquatimer.", link: '/iwc-schaffhausen-uhren', image: IWC_PAGE_IMAGES.watchesGuide },
  { title_en: 'IWC Schaffhausen Automatic', title_de: 'IWC Schaffhausen Automatic', description_en: 'Discover IWC Schaffhausen automatic watches — in-house calibres, power reserve indicators, and refined everyday wearability.', description_de: 'Entdecken Sie IWC Schaffhausen Automatik-Uhren — hauseigene Kaliber, Gangreserve-Anzeigen und verfeinerte Alltagstauglichkeit.', link: '/iwc-schaffhausen-automatic', image: IWC_PAGE_IMAGES.automaticGuide },
  { title_en: 'IWC Schaffhausen Ingenieur', title_de: 'IWC Schaffhausen Ingenieur', description_en: 'Explore the IWC Ingenieur — a modern sports-watch collection with engineering character and integrated bracelet design.', description_de: 'Entdecken Sie den IWC Ingenieur — eine moderne Sportuhren-Kollektion mit Engineering-Charakter und integriertem Armband-Design.', link: '/iwc-schaffhausen/ingenieur', image: IWC_PAGE_IMAGES.ingenieurGuide },
  { title_en: 'IWC Schaffhausen Portofino', title_de: 'IWC Schaffhausen Portofino', description_en: 'Browse IWC Portofino — classic dress watches focused on simplicity, slim elegance, and versatile automatic models.', description_de: 'Stöbern Sie durch IWC Portofino — klassische Dress-Uhren, fokussiert auf Einfachheit, schlanke Eleganz und vielseitige Automatik-Modelle.', link: '/iwc-schaffhausen/portofino', image: IWC_PAGE_IMAGES.story },
  { title_en: 'Pre-Owned IWC Schaffhausen', title_de: 'IWC Schaffhausen gebraucht', description_en: 'Explore pre-owned IWC Schaffhausen watches with transparent condition grading, box and papers information and product-specific details.', description_de: 'Entdecken Sie gebrauchte IWC Schaffhausen Uhren mit transparenter Zustandsbewertung, Box und Papers Informationen und produktspezifischen Details.', link: '/iwc-schaffhausen-gebraucht', image: IWC_PAGE_IMAGES.preOwned },
];

export const IWC_READ_MORE = [
  { title_en: 'IWC Story', title_de: 'IWC Story', description_en: "Explore IWC Schaffhausen's heritage of engineering precision, aviation, and classic Swiss watchmaking since 1868.", description_de: "Entdecken Sie IWC Schaffhausens Erbe der Engineering-Präzision, Aviation und klassischen Schweizer Uhrmacherei seit 1868.", link: '/iwc-schaffhausen/story', image: IWC_PAGE_IMAGES.story },
  { title_en: "IWC Pilot's Watches Guide", title_de: "IWC Fliegeruhren Guide", description_en: "Learn what makes IWC Pilot's Watches iconic — legibility, Big Pilot design, and professional aviation character.", description_de: "Erfahren Sie, was IWC Fliegeruhren ikonisch macht — Ablesbarkeit, Big Pilot Design und professionellen Aviation-Charakter.", link: '/iwc-schaffhausen/pilots-watches', image: IWC_PAGE_IMAGES.watchesGuide },
  { title_en: 'IWC Portugieser Guide', title_de: 'IWC Portugieser Guide', description_en: 'Discover the IWC Portugieser — elegant proportions, clean dials, chronographs, and high complications.', description_de: 'Entdecken Sie den IWC Portugieser — elegante Proportionen, klare Zifferblätter, Chronographen und hohe Komplikationen.', link: '/iwc-schaffhausen/portugieser', image: IWC_PAGE_IMAGES.portugieserGuide },
  { title_en: 'IWC Ingenieur Guide', title_de: 'IWC Ingenieur Guide', description_en: 'Explore the IWC Ingenieur — a modern sports watch with engineering identity and integrated bracelet design.', description_de: 'Entdecken Sie den IWC Ingenieur — eine moderne Sportuhr mit Engineering-Identität und integriertem Armband-Design.', link: '/iwc-schaffhausen/ingenieur', image: IWC_PAGE_IMAGES.ingenieurGuide },
  { title_en: 'IWC Automatic Guide', title_de: 'IWC Automatik Guide', description_en: 'Understand IWC in-house automatic calibres, power reserve, and what makes them ideal for daily wear.', description_de: 'Verstehen Sie IWC hauseigene Automatik-Kaliber, Gangreserve und was sie für den täglichen Gebrauch ideal macht.', link: '/iwc-schaffhausen-automatic-guide', image: IWC_PAGE_IMAGES.automaticGuide },
  { title_en: 'Buying Pre-Owned IWC', title_de: 'Gebrauchte IWC kaufen', description_en: 'What to check before buying a used IWC Schaffhausen — condition, box and papers, calibre, and service history.', description_de: 'Worauf Sie vor dem Kauf einer gebrauchten IWC Schaffhausen achten sollten — Zustand, Box und Papers, Kaliber und Service-Historie.', link: '/iwc-schaffhausen-gebraucht', image: IWC_PAGE_IMAGES.preOwned },
];

export const IWC_INTERNAL_LINKS = [
  {
    title_en: 'Popular IWC Searches', title_de: 'Beliebte IWC Suchen',
    links: [
      { label_en: 'IWC Schaffhausen Watch', label_de: 'IWC Schaffhausen Uhr', to: '/iwc-schaffhausen-uhr' },
      { label_en: 'IWC Schaffhausen Watches', label_de: 'IWC Schaffhausen Uhren', to: '/iwc-schaffhausen-uhren' },
      { label_en: 'IWC Schaffhausen Automatic', label_de: 'IWC Schaffhausen Automatic', to: '/iwc-schaffhausen-automatic' },
      { label_en: 'Pre-Owned IWC Schaffhausen', label_de: 'IWC Schaffhausen gebraucht', to: '/iwc-schaffhausen-gebraucht' },
      { label_en: "IWC Schaffhausen Men's Watch", label_de: 'IWC Schaffhausen Uhr Herren', to: '/iwc-schaffhausen-uhr-herren' },
      { label_en: "IWC Schaffhausen Women's Watch", label_de: 'IWC Schaffhausen Uhr Damen', to: '/iwc-schaffhausen-uhr-damen' },
    ],
  },
  {
    title_en: 'IWC Collections', title_de: 'IWC Kollektionen',
    links: [
      { label_en: "Pilot's Watches", label_de: 'Fliegeruhren', to: '/iwc-schaffhausen/pilots-watches' },
      { label_en: 'Portugieser', label_de: 'Portugieser', to: '/iwc-schaffhausen/portugieser' },
      { label_en: 'Portofino', label_de: 'Portofino', to: '/iwc-schaffhausen/portofino' },
      { label_en: 'Ingenieur', label_de: 'Ingenieur', to: '/iwc-schaffhausen/ingenieur' },
      { label_en: 'Aquatimer', label_de: 'Aquatimer', to: '/iwc-schaffhausen/aquatimer' },
    ],
  },
  {
    title_en: 'Buy & Pre-Owned', title_de: 'Kaufen & Gebraucht',
    links: [
      { label_en: 'Buy IWC Schaffhausen', label_de: 'IWC Schaffhausen kaufen', to: '/iwc-schaffhausen-kaufen' },
      { label_en: 'Buy IWC Schaffhausen Watch', label_de: 'IWC Schaffhausen Uhr kaufen', to: '/iwc-schaffhausen-uhr-kaufen' },
      { label_en: 'Buy Pre-Owned IWC Schaffhausen', label_de: 'IWC Schaffhausen gebraucht kaufen', to: '/iwc-schaffhausen-gebraucht-kaufen' },
      { label_en: "Buy IWC Pilot's Watches", label_de: "IWC Fliegeruhren kaufen", to: '/iwc-schaffhausen-pilot-watches-kaufen' },
      { label_en: 'Buy IWC Portugieser', label_de: 'IWC Portugieser kaufen', to: '/iwc-schaffhausen-portugieser-kaufen' },
      { label_en: 'Buy IWC Ingenieur', label_de: 'IWC Ingenieur kaufen', to: '/iwc-schaffhausen-ingenieur-kaufen' },
    ],
  },
  {
    title_en: 'Guides & Resources', title_de: 'Ratgeber & Guides',
    links: [
      { label_en: 'Which IWC Schaffhausen to Buy?', label_de: 'Welche IWC Schaffhausen kaufen?', to: '/welche-iwc-schaffhausen-kaufen' },
      { label_en: 'IWC Automatic Guide', label_de: 'IWC Automatik Guide', to: '/iwc-schaffhausen-automatic-guide' },
      { label_en: 'IWC Pilot Watch Guide', label_de: 'IWC Fliegeruhren Guide', to: '/iwc-schaffhausen-pilot-watch-guide' },
      { label_en: 'IWC Ingenieur Guide', label_de: 'IWC Ingenieur Guide', to: '/iwc-schaffhausen-ingenieur-guide' },
      { label_en: 'IWC Story', label_de: 'IWC Story', to: '/iwc-schaffhausen/story' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Patek Philippe watches', label_de: 'Patek Philippe Uhren', to: '/brands/patek-philippe' },
      { label_en: 'Audemars Piguet watches', label_de: 'Audemars Piguet Uhren', to: '/brands/audemars-piguet' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'Breitling watches', label_de: 'Breitling Uhren', to: '/brands/breitling' },
      { label_en: 'Grand Seiko watches', label_de: 'Grand Seiko Uhren', to: '/brands/grand-seiko' },
    ],
  },
];

export const IWC_FAQS = [
  { q_en: 'Where can I buy an IWC Schaffhausen watch online?', q_de: 'Wo kann ich online eine IWC Schaffhausen Uhr kaufen?', a_en: "You can buy IWC Schaffhausen watches online at Kariv Glamour. Browse new and <a href='/iwc-schaffhausen-gebraucht'>pre-owned IWC watches</a> with transparent product details, reference numbers and condition grading.", a_de: "Sie können IWC Schaffhausen Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/iwc-schaffhausen-gebraucht'>gebrauchte IWC Uhren</a> mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  { q_en: 'What are the most popular IWC Schaffhausen collections?', q_de: 'Was sind die beliebtesten IWC Schaffhausen Kollektionen?', a_en: "The main IWC collections are <a href='/iwc-schaffhausen/pilots-watches'>Pilot's Watches</a>, <a href='/iwc-schaffhausen/portugieser'>Portugieser</a>, <a href='/iwc-schaffhausen/portofino'>Portofino</a>, <a href='/iwc-schaffhausen/ingenieur'>Ingenieur</a>, and <a href='/iwc-schaffhausen/aquatimer'>Aquatimer</a>.", a_de: "Die wichtigsten IWC Kollektionen sind <a href='/iwc-schaffhausen/pilots-watches'>Fliegeruhren</a>, <a href='/iwc-schaffhausen/portugieser'>Portugieser</a>, <a href='/iwc-schaffhausen/portofino'>Portofino</a>, <a href='/iwc-schaffhausen/ingenieur'>Ingenieur</a> und <a href='/iwc-schaffhausen/aquatimer'>Aquatimer</a>." },
  { q_en: 'What is the difference between IWC Portugieser and Portofino?', q_de: 'Was ist der Unterschied zwischen IWC Portugieser und Portofino?', a_en: "The <a href='/iwc-schaffhausen/portugieser'>Portugieser</a> is a refined collection with elegant proportions, chronographs, and high complications, while the <a href='/iwc-schaffhausen/portofino'>Portofino</a> is focused on simplicity, slim elegance, and versatile dress-watch character.", a_de: "Der <a href='/iwc-schaffhausen/portugieser'>Portugieser</a> ist eine verfeinerte Kollektion mit eleganten Proportionen, Chronographen und hohen Komplikationen, während das <a href='/iwc-schaffhausen/portofino'>Portofino</a> auf Einfachheit, schlanke Eleganz und vielseitigen Dress-Uhren-Charakter fokussiert ist." },
  { q_en: 'What is the IWC Ingenieur?', q_de: 'Was ist der IWC Ingenieur?', a_en: "The <a href='/iwc-schaffhausen/ingenieur'>IWC Ingenieur</a> is a modern sports-watch collection with engineering character, integrated bracelet design, and strong everyday wearability.", a_de: "Der <a href='/iwc-schaffhausen/ingenieur'>IWC Ingenieur</a> ist eine moderne Sportuhren-Kollektion mit Engineering-Charakter, integriertem Armband-Design und starker Alltagstauglichkeit." },
  { q_en: 'Are IWC Schaffhausen automatic watches good for daily wear?', q_de: 'Sind IWC Schaffhausen Automatik-Uhren für den täglichen Gebrauch geeignet?', a_en: "Yes. <a href='/iwc-schaffhausen-automatic'>IWC automatic watches</a> feature in-house calibres with power reserve indicators and are designed for reliable, everyday wear.", a_de: "Ja. <a href='/iwc-schaffhausen-automatic'>IWC Automatik-Uhren</a> verfügen über hauseigene Kaliber mit Gangreserve-Anzeigen und sind für zuverlässiges, tägliches Tragen konzipiert." },
  { q_en: 'Is it safe to buy a pre-owned IWC Schaffhausen watch?', q_de: 'Ist es sicher, eine gebrauchte IWC Schaffhausen Uhr zu kaufen?', a_en: "Yes. Buying <a href='/iwc-schaffhausen-gebraucht'>pre-owned IWC</a> from Kariv Glamour includes clear condition grading, box and papers information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases.", a_de: "Ja. Der Kauf von <a href='/iwc-schaffhausen-gebraucht'>gebrauchten IWC Uhren</a> bei Kariv Glamour umfasst klare Zustandsbewertung, Box und Papers Informationen und <a href='/buyer-protection'>Käuferschutz</a> für berechtigte Käufe." },
  { q_en: 'What should I check before buying a used IWC?', q_de: 'Worauf sollte ich vor dem Kauf einer gebrauchten IWC achten?', a_en: "Check the condition of the case and bracelet, verify the calibre type, confirm box and papers, and review the service history. Visit our <a href='/iwc-schaffhausen-gebraucht'>pre-owned IWC page</a> for transparent listings.", a_de: "Prüfen Sie den Zustand von Gehäuse und Armband, verifizieren Sie den Kaliber-Typ, bestätigen Sie Box und Papers und prüfen Sie die Service-Historie. Besuchen Sie unsere <a href='/iwc-schaffhausen-gebraucht'>Seite für gebrauchte IWC Uhren</a> für transparente Angebote." },
  { q_en: 'What does box and papers mean when buying IWC?', q_de: 'Was bedeutet Box und Papers beim Kauf einer IWC?', a_en: "Box and papers refers to the original presentation box and the official warranty/documentation papers that accompanied the watch when new. A 'full set' includes both, which can add value and confidence when buying pre-owned.", a_de: "Box und Papers bezieht sich auf die Original-Präsentationsbox und die offiziellen Garantie-/Dokumentationspapiere, die die Uhr bei Neukauf begleiteten. Ein 'Vollset' umfasst beides, was beim Kauf einer gebrauchten Uhr Mehrwert und Vertrauen schaffen kann." },
];

export const IWC_SEO_PAGES = {
  'iwc-schaffhausen-uhr': {
    h1_en: 'IWC Schaffhausen Watch', h1_de: 'IWC Schaffhausen Uhr',
    title_en: 'IWC Schaffhausen Watch | Kariv Glamour', title_de: 'IWC Schaffhausen Uhr | Kariv Glamour',
    description_en: 'Explore IWC Schaffhausen watches at Kariv Glamour — engineering, aviation and iconic collections with transparent product information.',
    description_de: 'Entdecken Sie IWC Schaffhausen Uhren bei Kariv Glamour — Engineering, Aviation und ikonische Kollektionen mit transparenter Produktinformation.',
    intro_en: 'Explore IWC Schaffhausen watches at Kariv Glamour — with engineering precision, aviation heritage, and iconic collections like Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur and Aquatimer.',
    intro_de: 'Erkunden Sie IWC Schaffhausen Uhren bei Kariv Glamour — mit Engineering-Präzision, Aviation-Erbe und ikonischen Kollektionen wie Fliegeruhren, Portugieser, Portofino, Ingenieur und Aquatimer.',
    filter: {},
  },
  'iwc-schaffhausen-uhren': {
    h1_en: 'IWC Schaffhausen Watches', h1_de: 'IWC Schaffhausen Uhren',
    title_en: 'IWC Schaffhausen Watches | Kariv Glamour', title_de: 'IWC Schaffhausen Uhren | Kariv Glamour',
    description_en: 'IWC Schaffhausen watches at Kariv Glamour — Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur and Aquatimer.',
    description_de: 'IWC Schaffhausen Uhren bei Kariv Glamour — Fliegeruhren, Portugieser, Portofino, Ingenieur und Aquatimer.',
    intro_en: 'Browse IWC Schaffhausen watches by collection, material, movement, case size, condition and price.',
    intro_de: 'Stöbern Sie durch IWC Schaffhausen Uhren nach Kollektion, Material, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    filter: {},
  },
  'iwc-schaffhausen-uhr-herren': {
    h1_en: "IWC Schaffhausen Men's Watch", h1_de: 'IWC Schaffhausen Uhr Herren',
    title_en: "IWC Schaffhausen Men's Watch | Kariv Glamour", title_de: 'IWC Schaffhausen Uhr Herren | Kariv Glamour',
    description_en: "IWC Schaffhausen men's watches at Kariv Glamour — Pilot's Watches, Portugieser and Ingenieur for men.",
    description_de: 'IWC Schaffhausen Uhr Herren bei Kariv Glamour — Fliegeruhren, Portugieser und Ingenieur für Männer.',
    intro_en: 'Discover IWC Schaffhausen watches for men — from the Pilot\u2019s Watches to the Portugieser and Ingenieur.',
    intro_de: 'Entdecken Sie IWC Schaffhausen Uhren für Herren — von den Fliegeruhren über den Portugieser bis zum Ingenieur.',
    filter: { gender: 'Men' },
  },
  'iwc-schaffhausen-uhr-damen': {
    h1_en: "IWC Schaffhausen Women's Watch", h1_de: 'IWC Schaffhausen Uhr Damen',
    title_en: "IWC Schaffhausen Women's Watch | Kariv Glamour", title_de: 'IWC Schaffhausen Uhr Damen | Kariv Glamour',
    description_en: "IWC Schaffhausen women's watches at Kariv Glamour — elegant models in smaller case sizes.",
    description_de: 'IWC Schaffhausen Uhr Damen bei Kariv Glamour — elegante Modelle in kleineren Gehäusegrößen.',
    intro_en: 'Discover IWC Schaffhausen watches for women, including smaller Portofino and Portugieser models.',
    intro_de: 'Entdecken Sie IWC Schaffhausen Uhren für Damen, darunter kleinere Portofino und Portugieser Modelle.',
    filter: { gender: 'Women' },
  },
  'iwc-schaffhausen-automatic': {
    h1_en: 'IWC Schaffhausen Automatic', h1_de: 'IWC Schaffhausen Automatic',
    title_en: 'IWC Schaffhausen Automatic | Kariv Glamour', title_de: 'IWC Schaffhausen Automatic | Kariv Glamour',
    description_en: 'IWC Schaffhausen Automatic watches — in-house calibres, power reserve and everyday comfort.',
    description_de: 'IWC Schaffhausen Automatic Uhren — hauseigene Kaliber, Gangreserve und Alltagskomfort.',
    intro_en: 'Discover IWC Schaffhausen automatic watches with in-house calibres, power reserve indicators and refined everyday wearability.',
    intro_de: 'Entdecken Sie IWC Schaffhausen Automatik-Uhren mit hauseigenen Kalibern, Gangreserve-Anzeigen und verfeinerter Alltagstauglichkeit.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
      return f.includes('automatic') || f.includes('self-winding') || f.includes('in-house');
    },
  },
  'iwc-schaffhausen-gebraucht': {
    h1_en: 'Pre-Owned IWC Schaffhausen', h1_de: 'IWC Schaffhausen gebraucht',
    title_en: 'Pre-Owned IWC Schaffhausen | Kariv Glamour', title_de: 'IWC Schaffhausen gebraucht | Kariv Glamour',
    description_en: 'Pre-owned IWC Schaffhausen watches at Kariv Glamour with transparent condition grading.',
    description_de: 'Gebrauchte IWC Schaffhausen Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro_en: 'Discover pre-owned IWC Schaffhausen watches with clear condition grading, box and papers information and detailed product data.',
    intro_de: 'Entdecken Sie gebrauchte IWC Schaffhausen Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.',
    filter: {},
  },
  'iwc-schaffhausen-kaufen': {
    h1_en: 'Buy IWC Schaffhausen', h1_de: 'IWC Schaffhausen kaufen',
    title_en: 'Buy IWC Schaffhausen | Kariv Glamour', title_de: 'IWC Schaffhausen kaufen | Kariv Glamour',
    description_en: 'Buy IWC Schaffhausen at Kariv Glamour — new and pre-owned IWC models.',
    description_de: 'IWC Schaffhausen kaufen bei Kariv Glamour — neue und gebrauchte IWC Modelle.',
    intro_en: 'Buy IWC Schaffhausen at Kariv Glamour: new and pre-owned models with transparent product information.',
    intro_de: 'IWC Schaffhausen kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    filter: {},
  },
  'iwc-schaffhausen-uhr-kaufen': {
    h1_en: 'Buy IWC Schaffhausen Watch', h1_de: 'IWC Schaffhausen Uhr kaufen',
    title_en: 'Buy IWC Schaffhausen Watch | Kariv Glamour', title_de: 'IWC Schaffhausen Uhr kaufen | Kariv Glamour',
    description_en: 'Buy IWC Schaffhausen watch at Kariv Glamour — Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur and Aquatimer.',
    description_de: 'IWC Schaffhausen Uhr kaufen bei Kariv Glamour — Fliegeruhren, Portugieser, Portofino, Ingenieur und Aquatimer.',
    intro_en: 'Buy IWC Schaffhausen watches at Kariv Glamour — discover models from the Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur and Aquatimer collections.',
    intro_de: 'IWC Schaffhausen Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Fliegeruhren, Portugieser, Portofino, Ingenieur und Aquatimer.',
    filter: {},
  },
  'iwc-schaffhausen-gebraucht-kaufen': {
    h1_en: 'Buy Pre-Owned IWC Schaffhausen', h1_de: 'IWC Schaffhausen gebraucht kaufen',
    title_en: 'Buy Pre-Owned IWC Schaffhausen | Kariv Glamour', title_de: 'IWC Schaffhausen gebraucht kaufen | Kariv Glamour',
    description_en: 'Buy pre-owned IWC Schaffhausen at Kariv Glamour with clear condition grading.',
    description_de: 'IWC Schaffhausen gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.',
    intro_en: 'Buy pre-owned IWC Schaffhausen at Kariv Glamour — with condition grading, box and papers and detailed product data.',
    intro_de: 'IWC Schaffhausen gebraucht kaufen bei Kariv Glamour — mit Zustandsbewertung, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'iwc-schaffhausen-pilot-watches-kaufen': {
    h1_en: "Buy IWC Pilot's Watches", h1_de: "IWC Fliegeruhren kaufen",
    title_en: "Buy IWC Pilot's Watches | Kariv Glamour", title_de: "IWC Fliegeruhren kaufen | Kariv Glamour",
    description_en: "Buy IWC Pilot's Watches at Kariv Glamour — aviation heritage and professional pilot watches.",
    description_de: "IWC Fliegeruhren kaufen bei Kariv Glamour — Aviation-Erbe und professionelle Fliegeruhren.",
    intro_en: "Buy IWC Pilot's Watches at Kariv Glamour — iconic pilot watches with excellent legibility, technical design and professional aviation character.",
    intro_de: "IWC Fliegeruhren kaufen bei Kariv Glamour — ikonische Fliegeruhren mit hervorragender Ablesbarkeit, technischem Design und professionellem Aviation-Charakter.",
    filter: { collection: "Pilot's Watches" },
  },
  'iwc-schaffhausen-portugieser-kaufen': {
    h1_en: 'Buy IWC Portugieser', h1_de: 'IWC Portugieser kaufen',
    title_en: 'Buy IWC Portugieser | Kariv Glamour', title_de: 'IWC Portugieser kaufen | Kariv Glamour',
    description_en: 'Buy IWC Portugieser at Kariv Glamour — elegant proportions, chronographs and high complications.',
    description_de: 'IWC Portugieser kaufen bei Kariv Glamour — elegante Proportionen, Chronographen und hohe Komplikationen.',
    intro_en: 'Buy IWC Portugieser at Kariv Glamour — a refined collection with elegant proportions, clean dials, chronographs and high complications.',
    intro_de: 'IWC Portugieser kaufen bei Kariv Glamour — eine verfeinerte Kollektion mit eleganten Proportionen, klaren Zifferblättern, Chronographen und hohen Komplikationen.',
    filter: { collection: 'Portugieser' },
  },
  'iwc-schaffhausen-ingenieur-kaufen': {
    h1_en: 'Buy IWC Ingenieur', h1_de: 'IWC Ingenieur kaufen',
    title_en: 'Buy IWC Ingenieur | Kariv Glamour', title_de: 'IWC Ingenieur kaufen | Kariv Glamour',
    description_en: 'Buy IWC Ingenieur at Kariv Glamour — modern sports watch with engineering identity and integrated bracelet.',
    description_de: 'IWC Ingenieur kaufen bei Kariv Glamour — moderne Sportuhr mit Engineering-Identität und integriertem Armband.',
    intro_en: 'Buy IWC Ingenieur at Kariv Glamour — a modern sports-watch collection with engineering character, integrated bracelet and strong everyday wearability.',
    intro_de: 'IWC Ingenieur kaufen bei Kariv Glamour — eine moderne Sportuhren-Kollektion mit Engineering-Charakter, integriertem Armband und starker Alltagstauglichkeit.',
    filter: { collection: 'Ingenieur' },
  },
  'welche-iwc-schaffhausen-kaufen': {
    h1_en: 'Which IWC Schaffhausen to Buy?', h1_de: 'Welche IWC Schaffhausen kaufen?',
    title_en: 'Which IWC Schaffhausen to Buy | Kariv Glamour', title_de: 'Welche IWC Schaffhausen kaufen | Kariv Glamour',
    description_en: 'IWC buying advice — compare Pilot\u2019s Watches, Portugieser, Portofino, Ingenieur and Aquatimer.',
    description_de: 'IWC Kaufberatung — vergleichen Sie Fliegeruhren, Portugieser, Portofino, Ingenieur und Aquatimer.',
    intro_en: 'Which IWC Schaffhausen watch is right for you? Compare collections, movements, complications and case sizes to make the right decision.',
    intro_de: 'Welche IWC Schaffhausen Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke, Komplikationen und Gehäusegrößen, um die richtige Entscheidung zu treffen.',
    isGuide: true,
  },
  'iwc-schaffhausen-automatic-guide': {
    h1_en: 'IWC Schaffhausen Automatic Guide', h1_de: 'IWC Schaffhausen Automatik Guide',
    title_en: 'IWC Schaffhausen Automatic Guide | Kariv Glamour', title_de: 'IWC Schaffhausen Automatik Guide | Kariv Glamour',
    description_en: 'Understand IWC in-house automatic calibres, power reserve and everyday wearability.',
    description_de: 'Verstehen Sie IWC hauseigene Automatik-Kaliber, Gangreserve und Alltagstauglichkeit.',
    intro_en: 'IWC Schaffhausen Automatic watches feature in-house calibres with power reserve indicators and are designed for reliable, everyday wear.',
    intro_de: 'IWC Schaffhausen Automatik-Uhren verfügen über hauseigene Kaliber mit Gangreserve-Anzeigen und sind für zuverlässiges, tägliches Tragen konzipiert.',
    isGuide: true,
  },
  'iwc-schaffhausen-pilot-watch-guide': {
    h1_en: "IWC Pilot's Watch Guide", h1_de: "IWC Fliegeruhren Guide",
    title_en: "IWC Pilot's Watch Guide | Kariv Glamour", title_de: "IWC Fliegeruhren Guide | Kariv Glamour",
    description_en: "What makes IWC Pilot's Watches iconic — legibility, Big Pilot design and aviation character.",
    description_de: "Was IWC Fliegeruhren ikonisch macht — Ablesbarkeit, Big Pilot Design und Aviation-Charakter.",
    intro_en: "IWC Pilot's Watches are known for excellent legibility, technical design, the Big Pilot and professional aviation character.",
    intro_de: "IWC Fliegeruhren sind bekannt für hervorragende Ablesbarkeit, technisches Design, den Big Pilot und professionellen Aviation-Charakter.",
    isGuide: true,
  },
  'iwc-schaffhausen-ingenieur-guide': {
    h1_en: 'IWC Ingenieur Guide', h1_de: 'IWC Ingenieur Guide',
    title_en: 'IWC Ingenieur Guide | Kariv Glamour', title_de: 'IWC Ingenieur Guide | Kariv Glamour',
    description_en: 'The IWC Ingenieur — modern sports watch with engineering identity and integrated bracelet.',
    description_de: 'Der IWC Ingenieur — moderne Sportuhr mit Engineering-Identität und integriertem Armband.',
    intro_en: 'The IWC Ingenieur is a modern sports-watch collection with engineering character, integrated bracelet design and strong everyday wearability.',
    intro_de: 'Der IWC Ingenieur ist eine moderne Sportuhren-Kollektion mit Engineering-Charakter, integriertem Armband-Design und starker Alltagstauglichkeit.',
    isGuide: true,
  },
  'iwc-schaffhausen-story': {
    h1_en: 'IWC Schaffhausen Story', h1_de: 'IWC Schaffhausen Story',
    title_en: 'IWC Schaffhausen Story | Kariv Glamour', title_de: 'IWC Schaffhausen Story | Kariv Glamour',
    description_en: 'The IWC Schaffhausen Story — engineering, aviation and classic Swiss watchmaking since 1868.',
    description_de: 'Die IWC Schaffhausen Story — Engineering, Aviation und klassische Schweizer Uhrmacherei seit 1868.',
    intro_en: 'IWC Schaffhausen stands for engineering precision, aviation heritage, refined dress-watch design and classic Swiss watchmaking since 1868 — from the Pilot\u2019s Watches to the Portugieser, Portofino and Ingenieur.',
    intro_de: 'IWC Schaffhausen steht für Engineering-Präzision, Aviation-Erbe, verfeinertes Dress-Uhren-Design und klassische Schweizer Uhrmacherei seit 1868 — von den Fliegeruhren über den Portugieser und Portofino bis zum Ingenieur.',
    isGuide: true,
  },
};

applyCzechSeoPages(IWC_SEO_PAGES, 'IWC Schaffhausen', 'iwc');
applyCzechBrandFaqs(IWC_FAQS, 'iwc');
applyCzechBrandContent('iwc', IWC_COLLECTIONS, IWC_QUICK_FILTERS, IWC_SEO_CARDS, IWC_READ_MORE, IWC_INTERNAL_LINKS);
