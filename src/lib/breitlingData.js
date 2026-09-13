import { applyCzechSeoPages, applyCzechBrandContent } from './czechBrandData.js';
import { applyCzechBrandFaqs } from './czechBrandFaqs.js';

// Breitling-specific filter option lists and SEO data

const BREITLING_PAGE_ASSET_BASE = '/brand-assets/breitling/page';

export const BREITLING_PAGE_IMAGES = {
  hero: `${BREITLING_PAGE_ASSET_BASE}/breitling-hero.webp`,
  story: `${BREITLING_PAGE_ASSET_BASE}/breitling-story.avif`,
  buyingGuide: `${BREITLING_PAGE_ASSET_BASE}/breitling-buying-guide.jpg`,
  chronographGuide: `${BREITLING_PAGE_ASSET_BASE}/breitling-chronograph-guide.webp`,
  navitimerGuide: `${BREITLING_PAGE_ASSET_BASE}/breitling-navitimer-collector-guide.optimized.webp`,
  preOwnedGuide: `${BREITLING_PAGE_ASSET_BASE}/breitling-pre-owned-guide.jpg`,
};

export const BREITLING_HERO_IMAGE = BREITLING_PAGE_IMAGES.hero;
export const BREITLING_STORY_IMAGE = BREITLING_PAGE_IMAGES.story;

export const BREITLING_COLLECTIONS = [
  { id: 1, name: 'Navitimer', slug: 'navitimer', shortDescription_en: 'Breitling\u2019s iconic aviation chronograph, known for its circular slide rule bezel and pilot heritage since 1952.', shortDescription_de: 'Breitlings ikonischer Aviation-Chronograph, bekannt für seine Circular Slide Rule Lünette und das Piloten-Erbe seit 1952.' },
  { id: 2, name: 'Chronomat', slug: 'chronomat', shortDescription_en: 'A versatile luxury sports chronograph with the signature rider tabs and a strong all-rounder character.', shortDescription_de: 'Ein vielseitiger Luxus-Sportchronograph mit markanten Rider Tabs und einem starken Allrounder-Charakter.' },
  { id: 3, name: 'Superocean', slug: 'superocean', shortDescription_en: 'Breitling\u2019s modern dive-watch collection, built for diving, surfing and active lifestyles with robust water resistance.', shortDescription_de: 'Breitlings moderne Tauchuhren-Kollektion, gebaut für Tauchen, Surfen und aktive Lebensstile mit robuster Wasserdichtigkeit.' },
  { id: 4, name: 'Superocean Heritage', slug: 'superocean-heritage', shortDescription_en: 'A vintage-inspired dive watch line rooted in the 1957 SuperOcean, blending retro design with modern performance.', shortDescription_de: 'Eine vintage-inspirierte Tauchuhren-Linie, verwurzelt im SuperOcean von 1957, die Retro-Design mit moderner Leistung verbindet.' },
  { id: 5, name: 'Avenger', slug: 'avenger', shortDescription_en: 'A bold pilot and professional watch collection with robust construction, strong wrist presence and aviation DNA.', shortDescription_de: 'Eine kühne Piloten- und Profiuhren-Kollektion mit robuster Konstruktion, starker Handgelenkspräsenz und Aviation-DNA.' },
  { id: 6, name: 'Classic AVI', slug: 'classic-avi', shortDescription_en: 'An aviation heritage collection inspired by 1950s and 60s cockpit instruments, with pilot chronograph design.', shortDescription_de: 'Eine Aviation-Heritage-Kollektion, inspiriert von Cockpit-Instrumenten der 1950er und 60er Jahre, mit Piloten-Chronographen-Design.' },
  { id: 7, name: 'Premier', slug: 'premier', shortDescription_en: 'An elegant chronograph collection combining refined dress-watch styling with Breitling\u2019s chronograph heritage.', shortDescription_de: 'Eine elegante Chronographen-Kollektion, die verfeinertes Dress-Watch-Styling mit Breitlings Chronographen-Erbe verbindet.' },
  { id: 8, name: 'Lady Premier', slug: 'lady-premier', shortDescription_en: 'A women\u2019s Breitling collection offering elegant chronograph design in smaller, refined case sizes.', shortDescription_de: 'Eine Breitling-Damenkollektion mit elegantem Chronographen-Design in kleineren, verfeinerten Gehäusegrößen.' },
  { id: 9, name: 'Top Time', slug: 'top-time', shortDescription_en: 'A retro racing and sport chronograph collection with vintage-inspired design and accessible Breitling character.', shortDescription_de: 'Eine Retro-Racing- und Sportchronographen-Kollektion mit vintage-inspiriertem Design und zugänglichem Breitling-Charakter.' },
  { id: 10, name: 'Professional', slug: 'professional', shortDescription_en: 'Breitling instruments for professionals, including models like Aerospace, Emergency, Exospace B55 and Endurance Pro.', shortDescription_de: 'Breitling-Instrumente für Profis, inklusive Modelle wie Aerospace, Emergency, Exospace B55 und Endurance Pro.' },
];

export const BREITLING_CASE_MATERIALS = ['Steel', 'Stainless Steel', 'Titanium', 'Gold', 'Rose Gold', 'Yellow Gold', 'Ceramic', 'Breitlight', 'Bronze', 'Platinum', 'Diamond-set', 'Two-tone / Bicolor'];
export const BREITLING_SHAPES = ['Round', 'Square', 'Tonneau'];
export const BREITLING_MOVEMENTS = ['Automatic', 'Self-winding', 'Manual-winding', 'Chronograph', 'Quartz', 'Thermocompensated SuperQuartz', 'Tourbillon'];
export const BREITLING_COMPLICATIONS = ['Chronograph', 'GMT', 'Worldtimer', 'Date', 'Power reserve', 'Moonphase', 'Tourbillon', 'Time only'];
export const BREITLING_FEATURES = ['Dive watch', 'Pilot watch', 'Professional watch', 'Slide rule bezel', 'Rotating bezel', 'COSC / Chronometer', 'Limited edition'];
export const BREITLING_DIAL_COLORS = ['Black', 'Blue', 'Green', 'Grey', 'White', 'Silver', 'Brown', 'Anthracite', 'Champagne', 'Orange', 'Red', 'Beige', 'Mother of Pearl', 'Panda'];
export const BREITLING_BRACELETS = ['Steel bracelet', 'Titanium bracelet', 'Gold bracelet', 'Rubber strap', 'Leather strap', 'Alligator leather', 'Textile', 'NATO strap', 'Mesh bracelet', 'Interchangeable strap'];
export const BREITLING_CASE_SIZES = ['32 mm', '36 mm', '38 mm', '40 mm', '41 mm', '42 mm', '43 mm', '44 mm', '46 mm', '48 mm'];
export const BREITLING_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];
export const BREITLING_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const BREITLING_TYPES = ['New', 'Pre-Owned', 'Vintage'];

export const BREITLING_QUICK_FILTERS = [
  { label_en: 'Breitling Navitimer', label_de: 'Breitling Navitimer', link: '/breitling/navitimer', filter: { collection: 'Navitimer' } },
  { label_en: 'Breitling Chronomat', label_de: 'Breitling Chronomat', link: '/breitling/chronomat', filter: { collection: 'Chronomat' } },
  { label_en: 'Breitling Superocean', label_de: 'Breitling Superocean', link: '/breitling/superocean', filter: { collection: 'Superocean' } },
  { label_en: 'Breitling Avenger', label_de: 'Breitling Avenger', link: '/breitling/avenger', filter: { collection: 'Avenger' } },
  { label_en: 'Breitling Premier', label_de: 'Breitling Premier', link: '/breitling/premier', filter: { collection: 'Premier' } },
  { label_en: 'Breitling Professional', label_de: 'Breitling Professional', link: '/breitling/professional', filter: { collection: 'Professional' } },
  { label_en: 'Pre-Owned Breitling', label_de: 'Breitling gebraucht', link: '/breitling-uhr-gebraucht', filter: { preOwned: true } },
  { label_en: 'Breitling with Box and Papers', label_de: 'Breitling mit Box und Papieren', link: '/guides', filter: { fullSet: true } },
];

export const BREITLING_SEO_CARDS = [
  { title_en: 'Breitling Watch', title_de: 'Breitling Uhr', description_en: 'Explore Breitling watches through Kariv Glamour with clear product details, reference numbers and a premium shopping experience.', description_de: 'Entdecken Sie Breitling Uhren bei Kariv Glamour mit klaren Produktdetails, Referenznummern und einem Premium-Einkaufserlebnis.', link: '/breitling-uhr', image: BREITLING_PAGE_IMAGES.hero },
  { title_en: 'Breitling Watches for Men', title_de: 'Breitling Uhren Herren', description_en: 'Browse Breitling watches for men, from aviation chronographs to robust dive and pilot watches.', description_de: 'Stöbern Sie durch Breitling Herrenuhren, von Aviation-Chronographen bis zu robusten Tauch- und Pilotuhren.', link: '/breitling-uhr-herren', image: BREITLING_PAGE_IMAGES.buyingGuide },
  { title_en: 'Breitling Watches for Women', title_de: 'Breitling Uhren Damen', description_en: 'Discover Breitling watches for women, including the elegant Lady Premier and smaller-case collections.', description_de: 'Entdecken Sie Breitling Damenuhren, darunter die elegante Lady Premier und weitere Kollektionen in kleineren Gehäusegrößen.', link: '/breitling-uhr-damen', image: BREITLING_PAGE_IMAGES.chronographGuide },
  { title_en: 'Pre-Owned Breitling Watches', title_de: 'Breitling Uhren gebraucht', description_en: 'Discover pre-owned Breitling watches with transparent condition grading, box and papers information and product-specific details.', description_de: 'Entdecken Sie gebrauchte Breitling Uhren mit transparenter Zustandsbewertung, Box und Papiere Informationen und produktspezifischen Details.', link: '/breitling-uhr-gebraucht', image: BREITLING_PAGE_IMAGES.preOwnedGuide },
  { title_en: 'Breitling Navitimer', title_de: 'Breitling Navitimer', description_en: 'Explore the Breitling Navitimer, the iconic aviation chronograph with circular slide rule bezel and pilot heritage.', description_de: 'Entdecken Sie den Breitling Navitimer, den ikonischen Aviation-Chronographen mit Circular Slide Rule Lünette und Piloten-Erbe.', link: '/breitling/navitimer', image: BREITLING_PAGE_IMAGES.navitimerGuide },
  { title_en: 'Breitling Superocean', title_de: 'Breitling Superocean', description_en: 'Browse Breitling Superocean dive watches, built for diving, surfing and active lifestyles with robust water resistance.', description_de: 'Stöbern Sie durch Breitling Superocean Tauchuhren, gebaut für Tauchen, Surfen und aktive Lebensstile mit robuster Wasserdichtigkeit.', link: '/breitling/superocean', image: BREITLING_PAGE_IMAGES.story },
];

export const BREITLING_READ_MORE = [
  { title_en: 'Breitling Story', title_de: 'Breitling Story', description_en: 'Explore Breitling\u2019s aviation heritage, chronograph expertise and instrument-for-professionals identity.', description_de: 'Entdecken Sie Breitlings Aviation-Erbe, Chronographen-Expertise und Identität als Instrumente für Profis.', link: '/breitling/story', image: BREITLING_PAGE_IMAGES.story },
  { title_en: 'Breitling Navitimer Guide', title_de: 'Breitling Navitimer Guide', description_en: 'Learn what makes the Navitimer one of the most iconic aviation chronographs in watchmaking history.', description_de: 'Erfahren Sie, was den Navitimer zu einem der ikonischsten Aviation-Chronographen der Uhrmachergeschichte macht.', link: '/breitling/navitimer', image: BREITLING_PAGE_IMAGES.navitimerGuide },
  { title_en: 'Breitling Buying Guide', title_de: 'Breitling Kaufberatung', description_en: 'Compare Breitling collections and understand which model best matches your style and needs.', description_de: 'Vergleichen Sie Breitling Kollektionen und verstehen Sie, welches Modell am besten zu Ihrem Stil und Bedürfnissen passt.', link: '/welche-breitling-uhr-kaufen', image: BREITLING_PAGE_IMAGES.buyingGuide },
  { title_en: 'Buying Pre-Owned Breitling Watches', title_de: 'Gebrauchte Breitling Uhren kaufen', description_en: 'Understand condition, box and papers, service history and what to check before buying a used Breitling.', description_de: 'Verstehen Sie Zustand, Box und Papiere, Service-Historie und worauf Sie vor dem Kauf einer gebrauchten Breitling achten sollten.', link: '/breitling-uhr-gebraucht', image: BREITLING_PAGE_IMAGES.preOwnedGuide },
  { title_en: 'Breitling Chronograph Guide', title_de: 'Breitling Chronographen-Guide', description_en: 'Learn about Breitling\u2019s chronograph heritage, from the Navitimer to the Chronomat and Premier lines.', description_de: 'Erfahren Sie über Breitlings Chronographen-Erbe, vom Navitimer bis zu den Chronomat und Premier Linien.', link: '/breitling/navitimer', image: BREITLING_PAGE_IMAGES.chronographGuide },
];

export const BREITLING_INTERNAL_LINKS = [
  {
    title_en: 'Popular Breitling Searches', title_de: 'Beliebte Breitling Suchen',
    links: [
      { label_en: 'Breitling Watch', label_de: 'Breitling Uhr', to: '/breitling-uhr' },
      { label_en: 'Breitling Watches', label_de: 'Breitling Uhren', to: '/breitling-uhren' },
      { label_en: 'Breitling Watches for Men', label_de: 'Breitling Uhren Herren', to: '/breitling-uhr-herren' },
      { label_en: 'Breitling Watches for Women', label_de: 'Breitling Uhren Damen', to: '/breitling-uhr-damen' },
      { label_en: 'Pre-Owned Breitling Watches', label_de: 'Breitling Uhren gebraucht', to: '/breitling-uhr-gebraucht' },
      { label_en: 'Used Breitling Watches', label_de: 'Gebrauchte Breitling Uhren', to: '/gebrauchte-breitling-uhren' },
      { label_en: 'Breitling with box and papers', label_de: 'Breitling mit Box und Papieren', to: '/guides' },
    ],
  },
  {
    title_en: 'Breitling Collections', title_de: 'Breitling Kollektionen',
    links: [
      { label_en: 'Breitling Navitimer', label_de: 'Breitling Navitimer', to: '/breitling/navitimer' },
      { label_en: 'Breitling Chronomat', label_de: 'Breitling Chronomat', to: '/breitling/chronomat' },
      { label_en: 'Breitling Superocean', label_de: 'Breitling Superocean', to: '/breitling/superocean' },
      { label_en: 'Breitling Superocean Heritage', label_de: 'Breitling Superocean Heritage', to: '/breitling/superocean-heritage' },
      { label_en: 'Breitling Avenger', label_de: 'Breitling Avenger', to: '/breitling/avenger' },
      { label_en: 'Breitling Premier', label_de: 'Breitling Premier', to: '/breitling/premier' },
      { label_en: 'Breitling Professional', label_de: 'Breitling Professional', to: '/breitling/professional' },
    ],
  },
  {
    title_en: 'Product-Specific Pages', title_de: 'Produktspezifische Seiten',
    links: [
      { label_en: 'Buy Breitling', label_de: 'Breitling kaufen', to: '/breitling-kaufen' },
      { label_en: 'Buy Breitling Watch', label_de: 'Breitling Uhr kaufen', to: '/breitling-uhr-kaufen' },
      { label_en: 'Buy Pre-Owned Breitling', label_de: 'Breitling gebraucht kaufen', to: '/breitling-gebraucht-kaufen' },
      { label_en: 'Buy Breitling Navitimer', label_de: 'Breitling Navitimer kaufen', to: '/breitling-navitimer-kaufen' },
      { label_en: 'Buy Breitling Chronomat', label_de: 'Breitling Chronomat kaufen', to: '/breitling-chronomat-kaufen' },
      { label_en: 'Buy Breitling Superocean', label_de: 'Breitling Superocean kaufen', to: '/breitling-superocean-kaufen' },
    ],
  },
  {
    title_en: 'Related Watch Categories', title_de: 'Verwandte Uhrenkategorien',
    links: [
      { label_en: 'Certified Pre-Owned Watches', label_de: 'Zertifizierte gebrauchte Uhren', to: '/shop?isCertifiedPreOwned=true' },
      { label_en: 'Men\u2019s watches', label_de: 'Herrenuhren', to: '/shop?gender=Men' },
      { label_en: 'Women\u2019s watches', label_de: 'Damenuhren', to: '/shop?gender=Women' },
      { label_en: 'Chronograph Watches', label_de: 'Chronographen', to: '/shop' },
      { label_en: 'Pilot Watches', label_de: 'Pilotenuhren', to: '/shop' },
      { label_en: 'Dive Watches', label_de: 'Tauchuhren', to: '/shop' },
      { label_en: 'Aviation Watches', label_de: 'Aviation-Uhren', to: '/shop' },
      { label_en: 'Limited Edition Watches', label_de: 'Limitierte Auflagen', to: '/shop' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'TAG Heuer watches', label_de: 'TAG Heuer Uhren', to: '/brands/tag-heuer' },
      { label_en: 'Tudor watches', label_de: 'Tudor Uhren', to: '/brands/tudor' },
      { label_en: 'IWC watches', label_de: 'IWC Uhren', to: '/brands/iwc-schaffhausen' },
      { label_en: 'Panerai watches', label_de: 'Panerai Uhren', to: '/brands/panerai' },
      { label_en: 'Hublot watches', label_de: 'Hublot Uhren', to: '/brands/hublot' },
    ],
  },
];

export const BREITLING_FAQS = [
  { q_en: 'Where can I buy a Breitling watch online?', q_de: 'Wo kann ich online eine Breitling Uhr kaufen?', a_en: "You can buy Breitling watches online at Kariv Glamour. Browse new and <a href='/breitling-uhr-gebraucht'>pre-owned Breitling</a> watches with transparent product details and condition grading.", a_de: "Sie können Breitling Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/breitling-uhr-gebraucht'>gebrauchte Breitling</a> Uhren mit transparenten Produktdetails und Zustandsbewertung." },
  { q_en: 'Is it safe to buy a pre-owned Breitling watch?', q_de: 'Ist es sicher, eine gebrauchte Breitling Uhr zu kaufen?', a_en: "Yes. Buying <a href='/breitling-uhr-gebraucht'>pre-owned Breitling</a> from Kariv Glamour includes clear condition grading, <a href='/guides'>box and papers</a> information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases.", a_de: "Ja. Der Kauf von <a href='/breitling-uhr-gebraucht'>gebrauchten Breitling</a> Uhren bei Kariv Glamour umfasst klare Zustandsbewertung, <a href='/guides'>Box und Papiere</a> Informationen und <a href='/buyer-protection'>Käuferschutz</a> für berechtigte Käufe." },
  { q_en: 'What are the most popular Breitling collections?', q_de: 'Was sind die beliebtesten Breitling Kollektionen?', a_en: "The most popular Breitling collections are the <a href='/breitling/navitimer'>Breitling Navitimer</a>, <a href='/breitling/chronomat'>Breitling Chronomat</a>, <a href='/breitling/superocean'>Breitling Superocean</a> and <a href='/breitling/avenger'>Breitling Avenger</a>.", a_de: "Die beliebtesten Breitling Kollektionen sind die <a href='/breitling/navitimer'>Breitling Navitimer</a>, <a href='/breitling/chronomat'>Breitling Chronomat</a>, <a href='/breitling/superocean'>Breitling Superocean</a> und <a href='/breitling/avenger'>Breitling Avenger</a>." },
  { q_en: 'What is the difference between Breitling Navitimer and Chronomat?', q_de: 'Was ist der Unterschied zwischen Breitling Navitimer und Chronomat?', a_en: "The <a href='/breitling/navitimer'>Breitling Navitimer</a> is an aviation chronograph with a circular slide rule bezel, while the <a href='/breitling/chronomat'>Breitling Chronomat</a> is a versatile sports chronograph with rider tabs and broader everyday appeal.", a_de: "Die <a href='/breitling/navitimer'>Breitling Navitimer</a> ist ein Aviation-Chronograph mit Circular Slide Rule Lünette, während die <a href='/breitling/chronomat'>Breitling Chronomat</a> ein vielseitiger Sportchronograph mit Rider Tabs und breiterer alltäglicher Attraktivität ist." },
  { q_en: 'What is the Breitling Professional collection?', q_de: 'Was ist die Breitling Professional Kollektion?', a_en: "The <a href='/breitling/professional'>Breitling Professional</a> line includes instrument watches such as the Aerospace, Emergency, Exospace B55 and Endurance Pro, designed as instruments for professionals.", a_de: "Die <a href='/breitling/professional'>Breitling Professional</a> Linie umfasst Instrumentenuhren wie Aerospace, Emergency, Exospace B55 und Endurance Pro, konzipiert als Instrumente für Profis." },
  { q_en: 'Are Breitling watches COSC certified?', q_de: 'Sind Breitling Uhren COSC-zertifiziert?', a_en: "Many Breitling movements are COSC-certified chronometers, meaning they meet strict precision standards. Check individual product pages for certification details.", a_de: "Viele Breitling Uhrwerke sind COSC-zertifizierte Chronometer, was bedeutet, dass sie strenge Präzisionsstandards erfüllen. Prüfen Sie die einzelnen Produktseiten für Zertifizierungsdetails." },
  { q_en: 'What should I check before buying a used Breitling?', q_de: 'Worauf sollte ich vor dem Kauf einer gebrauchten Breitling achten?', a_en: "Check the reference number, condition, <a href='/guides'>box and papers</a>, service history, and whether the movement is COSC-certified before buying a used Breitling.", a_de: "Prüfen Sie Referenznummer, Zustand, <a href='/guides'>Box und Papiere</a>, Service-Historie und ob das Uhrwerk COSC-zertifiziert ist, vor dem Kauf einer gebrauchten Breitling." },
  { q_en: 'Can I sell my Breitling watch?', q_de: 'Kann ich meine Breitling Uhr verkaufen?', a_en: "Yes. If you want to sell your Breitling watch, visit our <a href='/sell-trade'>sell and trade page</a> for a professional valuation and transparent process.", a_de: "Ja. Wenn Sie Ihre Breitling Uhr verkaufen möchten, besuchen Sie unsere <a href='/sell-trade'>Verkaufs- und Tauschseite</a> für eine professionelle Bewertung und einen transparenten Prozess." },
];

export const BREITLING_SEO_PAGES = {
  'breitling-uhr': { h1_en: 'Breitling Watch', h1_de: 'Breitling Uhr', title_en: 'Breitling Watch | Kariv Glamour', title_de: 'Breitling Uhr | Kariv Glamour', description_en: 'Explore Breitling watches at Kariv Glamour with transparent product information.', description_de: 'Entdecken Sie Breitling Uhren bei Kariv Glamour mit transparenter Produktinformation.', intro_en: 'Explore Breitling watches at Kariv Glamour — with clear product details, reference numbers and condition grading.', intro_de: 'Erkunden Sie Breitling Uhren bei Kariv Glamour – mit klaren Produktdetails, Referenznummern und Zustandsbewertung.', filter: {} },
  'breitling-uhren': { h1_en: 'Breitling Watches', h1_de: 'Breitling Uhren', title_en: 'Breitling Watches | Kariv Glamour', title_de: 'Breitling Uhren | Kariv Glamour', description_en: 'Breitling watches at Kariv Glamour — Navitimer, Chronomat, Superocean, Avenger and Premier.', description_de: 'Breitling Uhren bei Kariv Glamour – Navitimer, Chronomat, Superocean, Avenger und Premier.', intro_en: 'Browse Breitling watches by collection, material, movement, case size, condition and price.', intro_de: 'Stöbern Sie durch Breitling Uhren nach Kollektion, Material, Uhrwerk, Gehäusegröße, Zustand und Preis.', filter: {} },
  'breitling-uhr-herren': { h1_en: 'Breitling Watches for Men', h1_de: 'Breitling Uhren Herren', title_en: 'Breitling Watches for Men | Kariv Glamour', title_de: 'Breitling Uhr Herren | Kariv Glamour', description_en: 'Breitling watches for men at Kariv Glamour — aviation and sports chronographs for men.', description_de: 'Breitling Uhr Herren bei Kariv Glamour – Aviator- und Sportchronographen für Männer.', intro_en: 'Discover Breitling watches for men — from aviation chronographs like the Navitimer to robust dive and pilot watches.', intro_de: 'Entdecken Sie Breitling Uhren für Herren – von Aviation-Chronographen wie dem Navitimer bis zu robusten Tauch- und Pilotuhren.', filter: { gender: 'Men' } },
  'breitling-uhr-damen': { h1_en: 'Breitling Watches for Women', h1_de: 'Breitling Uhren Damen', title_en: 'Breitling Watches for Women | Kariv Glamour', title_de: 'Breitling Uhr Damen | Kariv Glamour', description_en: 'Breitling watches for women at Kariv Glamour — elegant chronographs for women.', description_de: 'Breitling Uhr Damen bei Kariv Glamour – elegante Chronographen für Frauen.', intro_en: 'Discover Breitling watches for women, including the Lady Premier collection and other models in smaller case sizes.', intro_de: 'Entdecken Sie Breitling Uhren für Damen, darunter die Lady Premier Kollektion und weitere Modelle in kleineren Gehäusegrößen.', filter: { gender: 'Women' } },
  'breitling-uhr-gebraucht': { h1_en: 'Pre-Owned Breitling Watches', h1_de: 'Breitling Uhren gebraucht', title_en: 'Pre-Owned Breitling Watches | Kariv Glamour', title_de: 'Breitling Uhr gebraucht | Kariv Glamour', description_en: 'Pre-owned Breitling watches at Kariv Glamour with transparent condition grading.', description_de: 'Gebrauchte Breitling Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.', intro_en: 'Discover pre-owned Breitling watches with clear condition grading, box and papers information and detailed product data.', intro_de: 'Entdecken Sie gebrauchte Breitling Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.', filter: {} },
  'breitling-kaufen': { h1_en: 'Buy Breitling', h1_de: 'Breitling kaufen', title_en: 'Buy Breitling | Kariv Glamour', title_de: 'Breitling kaufen | Kariv Glamour', description_en: 'Buy Breitling at Kariv Glamour — new and pre-owned Breitling models.', description_de: 'Breitling kaufen bei Kariv Glamour – neue und gebrauchte Breitling Modelle.', intro_en: 'Buy Breitling at Kariv Glamour: new and pre-owned models with transparent product information.', intro_de: 'Breitling kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.', filter: {} },
  'breitling-uhr-kaufen': { h1_en: 'Buy Breitling Watch', h1_de: 'Breitling Uhr kaufen', title_en: 'Buy Breitling Watch | Kariv Glamour', title_de: 'Breitling Uhr kaufen | Kariv Glamour', description_en: 'Buy Breitling watch at Kariv Glamour — Navitimer, Chronomat and more models.', description_de: 'Breitling Uhr kaufen bei Kariv Glamour – Navitimer, Chronomat und weitere Modelle.', intro_en: 'Buy Breitling watches at Kariv Glamour — discover models like Navitimer, Chronomat, Superocean and Avenger.', intro_de: 'Breitling Uhr kaufen bei Kariv Glamour – entdecken Sie Modelle wie Navitimer, Chronomat, Superocean und Avenger.', filter: {} },
  'breitling-gebraucht-kaufen': { h1_en: 'Buy Pre-Owned Breitling', h1_de: 'Breitling gebraucht kaufen', title_en: 'Buy Pre-Owned Breitling | Kariv Glamour', title_de: 'Breitling gebraucht kaufen | Kariv Glamour', description_en: 'Buy pre-owned Breitling at Kariv Glamour with clear condition grading.', description_de: 'Breitling gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.', intro_en: 'Buy pre-owned Breitling at Kariv Glamour — with condition grading, box and papers and detailed product data.', intro_de: 'Breitling gebraucht kaufen bei Kariv Glamour – mit Zustandsbewertung, Box und Papers und detaillierten Produktdaten.', filter: {} },
  'gebrauchte-breitling-uhren': { h1_en: 'Used Breitling Watches', h1_de: 'Gebrauchte Breitling Uhren', title_en: 'Used Breitling Watches | Kariv Glamour', title_de: 'Gebrauchte Breitling Uhren | Kariv Glamour', description_en: 'Used Breitling watches at Kariv Glamour — verified models.', description_de: 'Gebrauchte Breitling Uhren bei Kariv Glamour – geprüfte Modelle.', intro_en: 'Browse used Breitling watches and find verified models with traceable condition descriptions.', intro_de: 'Stöbern Sie durch gebrauchte Breitling Uhren und finden Sie geprüfte Modelle mit nachvollziehbarer Zustandsbeschreibung.', filter: {} },
  'breitling-navitimer-kaufen': { h1_en: 'Buy Breitling Navitimer', h1_de: 'Breitling Navitimer kaufen', title_en: 'Buy Breitling Navitimer | Kariv Glamour', title_de: 'Breitling Navitimer kaufen | Kariv Glamour', description_en: 'Buy Breitling Navitimer at Kariv Glamour — iconic aviation chronograph.', description_de: 'Breitling Navitimer kaufen bei Kariv Glamour – ikonischer Aviation-Chronograph.', intro_en: 'Buy Breitling Navitimer at Kariv Glamour — the iconic aviation chronograph with circular slide rule bezel and pilot heritage.', intro_de: 'Breitling Navitimer kaufen bei Kariv Glamour – der ikonische Aviation-Chronograph mit Circular Slide Rule Bezel und Piloten-Erbe.', filter: { collection: 'Navitimer' } },
  'breitling-chronomat-kaufen': { h1_en: 'Buy Breitling Chronomat', h1_de: 'Breitling Chronomat kaufen', title_en: 'Buy Breitling Chronomat | Kariv Glamour', title_de: 'Breitling Chronomat kaufen | Kariv Glamour', description_en: 'Buy Breitling Chronomat at Kariv Glamour — versatile sports chronograph.', description_de: 'Breitling Chronomat kaufen bei Kariv Glamour – vielseitiger Sportchronograph.', intro_en: 'Buy Breitling Chronomat at Kariv Glamour — a versatile luxury sports chronograph with rider tabs and bold design.', intro_de: 'Breitling Chronomat kaufen bei Kariv Glamour – ein vielseitiger Luxus-Sportchronograph mit Rider Tabs und markantem Design.', filter: { collection: 'Chronomat' } },
  'breitling-superocean-kaufen': { h1_en: 'Buy Breitling Superocean', h1_de: 'Breitling Superocean kaufen', title_en: 'Buy Breitling Superocean | Kariv Glamour', title_de: 'Breitling Superocean kaufen | Kariv Glamour', description_en: 'Buy Breitling Superocean at Kariv Glamour — robust dive watch.', description_de: 'Breitling Superocean kaufen bei Kariv Glamour – robuste Tauchuhr.', intro_en: 'Buy Breitling Superocean at Kariv Glamour — a robust dive watch, built for diving, surfing and active lifestyles.', intro_de: 'Breitling Superocean kaufen bei Kariv Glamour – eine robuste Tauchuhr, gebaut für Tauchen, Surfen und aktive Lebensstile.', filter: { collection: 'Superocean' } },
  'welche-breitling-uhr-kaufen': { h1_en: 'Which Breitling Watch to Buy?', h1_de: 'Welche Breitling Uhr kaufen?', title_en: 'Which Breitling Watch to Buy | Kariv Glamour', title_de: 'Welche Breitling Uhr kaufen | Kariv Glamour', description_en: 'Breitling buying guide — compare Navitimer, Chronomat, Superocean and other collections.', description_de: 'Breitling Kaufberatung – vergleichen Sie Navitimer, Chronomat, Superocean und weitere Kollektionen.', intro_en: 'Which Breitling watch is right for you? Compare collections, features and case sizes to make the right decision.', intro_de: 'Welche Breitling Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Funktionen und Gehäusegrößen, um die richtige Entscheidung zu treffen.', isGuide: true },
  'breitling-story': { h1_en: 'Breitling Story', h1_de: 'Breitling Story', title_en: 'Breitling Story | Kariv Glamour', title_de: 'Breitling Story | Kariv Glamour', description_en: 'The Breitling Story — aviation heritage, chronograph expertise and instruments for professionals.', description_de: 'Die Breitling Story – Aviation-Erbe, Chronographen-Expertise und Instrumente für Profis.', intro_en: 'Breitling is known for its aviation heritage, chronograph expertise and identity as instruments for professionals — from the iconic Navitimer to the Professional collection.', intro_de: 'Breitling ist bekannt für sein Aviation-Erbe, seine Chronographen-Expertise und seine Identität als Instrumente für Profis – von der ikonischen Navitimer bis zur Professional-Kollektion.', isGuide: true },
};

applyCzechSeoPages(BREITLING_SEO_PAGES, 'Breitling', 'breitling');
applyCzechBrandFaqs(BREITLING_FAQS, 'breitling');
applyCzechBrandContent('breitling', BREITLING_COLLECTIONS, BREITLING_QUICK_FILTERS, BREITLING_SEO_CARDS, BREITLING_READ_MORE, BREITLING_INTERNAL_LINKS);
