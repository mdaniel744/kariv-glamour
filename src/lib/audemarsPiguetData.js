// Audemars Piguet collections, filters, and SEO data

const ROYAL_OAK_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/84467a1de_AudemarspiguetRoyalOak.webp';
const OFFSHORE_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/32878a83b_AudemarsPiguetRoyalOakOffshore.webp';
const CONCEPT_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/41d8402d6_AudemarsPiguetRoyalOakOffshore.webp';

export const AP_HERO_IMAGE = ROYAL_OAK_IMG;

export const AP_COLLECTIONS = [
  { id: 1, name: 'Royal Oak', slug: 'royal-oak', image: ROYAL_OAK_IMG, shortDescription: 'The iconic octagonal integrated bracelet sports watch designed by Gerald Genta in 1972 — AP\u2019s signature collection with Tapisserie dials and refined finishing.' },
  { id: 2, name: 'Royal Oak Offshore', slug: 'royal-oak-offshore', image: OFFSHORE_IMG, shortDescription: 'A bolder, sportier, and larger interpretation of the Royal Oak, launched in 1993 with robust construction and a strong, assertive wrist presence.' },
  { id: 3, name: 'Royal Oak Concept', slug: 'royal-oak-concept', image: CONCEPT_IMG, shortDescription: 'A technical and futuristic line of high-complication AP watches, featuring tourbillons, GMTs, and avant-garde materials and case architecture.' },
  { id: 4, name: 'Code 11.59', slug: 'code-1159', image: '', shortDescription: 'A modern round-case collection revealed in 2019, offering complications, dressier character, and refined finishes alongside the Royal Oak families.' },
];

export const AP_CASE_MATERIALS = ['Stainless Steel', 'Rose Gold', 'Yellow Gold', 'White Gold', 'Platinum', 'Titanium', 'Ceramic', 'Black Ceramic', 'White Ceramic', 'Carbon', 'Two-tone / Bicolor', 'Gem-set'];
export const AP_SHAPES = ['Octagonal', 'Round', 'Tonneau / Concept-style case'];
export const AP_MOVEMENTS = ['Automatic', 'Self-winding', 'Manual-winding', 'Chronograph', 'Quartz', 'Tourbillon'];
export const AP_COMPLICATIONS = ['Chronograph', 'Perpetual Calendar', 'Tourbillon', 'GMT', 'Minute repeater / Supersonnerie', 'Date', 'Time only'];
export const AP_FEATURES = ['Integrated bracelet', 'Openworked / Skeleton', 'Tapisserie dial', 'Chronograph', 'Perpetual calendar', 'Tourbillon', 'GMT', 'Extra-thin', 'Frosted gold', 'Ceramic case', 'Limited edition', 'Boutique edition', 'Full set', 'Collector model'];
export const AP_DIAL_COLORS = ['Black', 'Blue', 'Green', 'Grey', 'White', 'Silver', 'Brown', 'Anthracite', 'Champagne', 'Mother of Pearl', 'Skeleton / Openworked', 'Purple', 'Salmon'];
export const AP_BRACELETS = ['Steel bracelet', 'Titanium bracelet', 'Gold bracelet', 'Rubber strap', 'Leather strap', 'Alligator leather', 'Integrated bracelet', 'Textile'];
export const AP_CASE_SIZES = ['34 mm', '37 mm', '38 mm', '39 mm', '41 mm', '42 mm', '43 mm', '44 mm'];
export const AP_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];
export const AP_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const AP_TYPES = ['New', 'Pre-Owned', 'Vintage'];

export const AP_QUICK_FILTERS = [
  { label: 'Royal Oak', link: '/audemars-piguet/royal-oak' },
  { label: 'Royal Oak Offshore', link: '/audemars-piguet/royal-oak-offshore' },
  { label: 'Royal Oak Concept', link: '/audemars-piguet/royal-oak-concept' },
  { label: 'Code 11.59', link: '/audemars-piguet/code-1159' },
  { label: 'Pre-Owned AP', link: '/audemars-piguet-gebraucht' },
  { label: 'AP Price Guide', link: '/audemars-piguet-uhr-preis' },
];

export const AP_SEO_CARDS = [
  { title: 'Audemars Piguet Uhr', description: 'Explore Audemars Piguet watches at Kariv Glamour with transparent product details, reference numbers and a premium collector-focused shopping experience.', link: '/audemars-piguet-uhr' },
  { title: 'Audemars Piguet Uhren', description: 'Browse the full Audemars Piguet collection including Royal Oak, Royal Oak Offshore, Royal Oak Concept and Code 11.59.', link: '/audemars-piguet-uhren' },
  { title: 'Audemars Piguet Royal Oak', description: 'Discover the iconic Audemars Piguet Royal Oak with its octagonal bezel, integrated bracelet and signature Tapisserie dial.', link: '/audemars-piguet/royal-oak' },
  { title: 'Audemars Piguet Royal Oak Offshore', description: 'Browse Royal Oak Offshore watches — bolder, sportier, and larger interpretations of the legendary Royal Oak.', link: '/audemars-piguet/royal-oak-offshore' },
  { title: 'Audemars Piguet Uhr Herren', description: 'Discover Audemars Piguet watches for men, from the Royal Oak to the Royal Oak Offshore and Code 11.59.', link: '/audemars-piguet-uhr-herren' },
  { title: 'Audemars Piguet gebraucht', description: 'Explore pre-owned Audemars Piguet watches with transparent condition grading, box and papers information and product-specific details.', link: '/audemars-piguet-gebraucht' },
];

export const AP_READ_MORE = [
  { title: 'Audemars Piguet Story', description: 'Explore AP\u2019s heritage of bold case architecture, integrated bracelet design, high-end finishing and complications.', link: '/audemars-piguet/story' },
  { title: 'Royal Oak Guide', description: 'Learn what makes the Royal Oak one of the most iconic luxury sports watches in watchmaking history.', link: '/audemars-piguet/royal-oak' },
  { title: 'Royal Oak Offshore Guide', description: 'Discover the Royal Oak Offshore — a bolder, sportier interpretation of the legendary Royal Oak since 1993.', link: '/audemars-piguet/royal-oak-offshore' },
  { title: 'Pre-Owned AP Guide', description: 'Understand condition, box and papers, service history and what to check before buying a used Audemars Piguet.', link: '/audemars-piguet-gebraucht' },
  { title: 'AP Price Guide', description: 'Understand Audemars Piguet pricing across collections, materials, complications and reference numbers.', link: '/audemars-piguet-uhr-preis' },
];

export const AP_INTERNAL_LINKS = [
  {
    title: 'Beliebte AP Suchen',
    links: [
      { label: 'Audemars Piguet Uhr', to: '/audemars-piguet-uhr' },
      { label: 'Audemars Piguet Uhren', to: '/audemars-piguet-uhren' },
      { label: 'Audemars Piguet Uhr Herren', to: '/audemars-piguet-uhr-herren' },
      { label: 'Audemars Piguet Uhr Damen', to: '/audemars-piguet-uhr-damen' },
      { label: 'Audemars Piguet gebraucht', to: '/audemars-piguet-gebraucht' },
      { label: 'Audemars Piguet mit Box und Papieren', to: '/guides' },
    ],
  },
  {
    title: 'AP Kollektionen',
    links: [
      { label: 'Royal Oak', to: '/audemars-piguet/royal-oak' },
      { label: 'Royal Oak Offshore', to: '/audemars-piguet/royal-oak-offshore' },
      { label: 'Royal Oak Concept', to: '/audemars-piguet/royal-oak-concept' },
      { label: 'Code 11.59', to: '/audemars-piguet/code-1159' },
    ],
  },
  {
    title: 'Produktspezifische Seiten',
    links: [
      { label: 'Audemars Piguet kaufen', to: '/audemars-piguet-kaufen' },
      { label: 'Audemars Piguet Uhr kaufen', to: '/audemars-piguet-uhr-kaufen' },
      { label: 'Royal Oak kaufen', to: '/audemars-piguet-royal-oak-kaufen' },
      { label: 'Royal Oak Offshore kaufen', to: '/audemars-piguet-royal-oak-offshore-kaufen' },
      { label: 'Code 11.59 kaufen', to: '/audemars-piguet-code-1159-kaufen' },
    ],
  },
  {
    title: 'Verwandte Uhrenkategorien',
    links: [
      { label: 'Certified Pre-Owned Watches', to: '/shop?isCertifiedPreOwned=true' },
      { label: 'Herrenuhren', to: '/shop?gender=Men' },
      { label: 'Damenuhren', to: '/shop?gender=Women' },
      { label: 'Chronograph Watches', to: '/shop' },
      { label: 'Luxury Sports Watches', to: '/shop' },
      { label: 'Tourbillon Watches', to: '/shop' },
      { label: 'Limited Edition Watches', to: '/shop' },
    ],
  },
  {
    title: 'Verwandte Luxusuhren-Marken',
    links: [
      { label: 'Rolex watches', to: '/brands/rolex' },
      { label: 'Patek Philippe watches', to: '/brands/patek-philippe' },
      { label: 'Hublot watches', to: '/brands/hublot' },
      { label: 'Breitling watches', to: '/brands/breitling' },
      { label: 'Omega watches', to: '/brands/omega' },
      { label: 'Cartier watches', to: '/brands/cartier' },
    ],
  },
];

export const AP_FAQS = [
  { q: 'Where can I buy an Audemars Piguet watch online?', a: "You can buy Audemars Piguet watches online at Kariv Glamour. Browse new and <a href='/audemars-piguet-gebraucht'>pre-owned AP watches</a> with transparent product details, reference numbers and condition grading." },
  { q: 'Is it safe to buy a pre-owned Audemars Piguet watch?', a: "Yes. Buying <a href='/audemars-piguet-gebraucht'>pre-owned Audemars Piguet</a> from Kariv Glamour includes clear condition grading, <a href='/guides'>box and papers</a> information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases." },
  { q: 'What are the most popular Audemars Piguet collections?', a: "The main Audemars Piguet collections are the <a href='/audemars-piguet/royal-oak'>Royal Oak</a>, <a href='/audemars-piguet/royal-oak-offshore'>Royal Oak Offshore</a>, <a href='/audemars-piguet/royal-oak-concept'>Royal Oak Concept</a>, and <a href='/audemars-piguet/code-1159'>Code 11.59</a>." },
  { q: 'What is the difference between Royal Oak and Royal Oak Offshore?', a: "The <a href='/audemars-piguet/royal-oak'>Royal Oak</a> is the original 1972 integrated bracelet sports watch with a refined, versatile character, while the <a href='/audemars-piguet/royal-oak-offshore'>Royal Oak Offshore</a> launched in 1993 as a bolder, sportier, and larger interpretation." },
  { q: 'What is the Audemars Piguet Code 11.59 collection?', a: "<a href='/audemars-piguet/code-1159'>Code 11.59</a> is a modern round-case collection revealed in 2019, offering complications, dressier character, and refined finishes alongside the Royal Oak families." },
  { q: 'What is the Royal Oak Concept line?', a: "The <a href='/audemars-piguet/royal-oak-concept'>Royal Oak Concept</a> is a technical and futuristic line of high-complication AP watches featuring tourbillons, GMTs, and avant-garde materials and case architecture." },
  { q: 'How much does an Audemars Piguet watch cost?', a: "Audemars Piguet prices vary widely depending on collection, material, complication, and reference. Visit our <a href='/audemars-piguet-uhr-preis'>AP price guide</a> to learn more about pricing across collections." },
  { q: 'Can I sell my Audemars Piguet watch?', a: "Yes. If you want to sell your Audemars Piguet watch, visit our <a href='/sell-trade'>sell and trade page</a> for a professional valuation and transparent process." },
];

export const AP_SEO_PAGES = {
  'audemars-piguet-uhr': { h1: 'Audemars Piguet Uhr', title: 'Audemars Piguet Uhr | Kariv Glamour', description: 'Entdecken Sie Audemars Piguet Uhren bei Kariv Glamour mit transparenter Produktinformation.', intro: 'Erkunden Sie Audemars Piguet Uhren bei Kariv Glamour \u2013 mit klaren Produktdetails, Referenznummern und Zustandsbewertung.', filter: {} },
  'audemars-piguet-uhren': { h1: 'Audemars Piguet Uhren', title: 'Audemars Piguet Uhren | Kariv Glamour', description: 'Audemars Piguet Uhren bei Kariv Glamour \u2013 Royal Oak, Royal Oak Offshore, Royal Oak Concept und Code 11.59.', intro: 'St\u00f6bern Sie durch Audemars Piguet Uhren nach Kollektion, Material, Uhrwerk, Geh\u00e4usegr\u00f6\u00dfe, Zustand und Preis.', filter: {} },
  'audemars-piguet-uhr-herren': { h1: 'Audemars Piguet Uhr Herren', title: 'Audemars Piguet Uhr Herren | Kariv Glamour', description: 'Audemars Piguet Uhr Herren bei Kariv Glamour \u2013 Royal Oak und Royal Oak Offshore f\u00fcr M\u00e4nner.', intro: 'Entdecken Sie Audemars Piguet Uhren f\u00fcr Herren \u2013 von der ikonischen Royal Oak bis zur Royal Oak Offshore und Code 11.59.', filter: { gender: 'Men' } },
  'audemars-piguet-uhr-damen': { h1: 'Audemars Piguet Uhr Damen', title: 'Audemars Piguet Uhr Damen | Kariv Glamour', description: 'Audemars Piguet Uhr Damen bei Kariv Glamour \u2013 elegante AP Modelle in kleineren Geh\u00e4usegr\u00f6\u00dfen.', intro: 'Entdecken Sie Audemars Piguet Uhren f\u00fcr Damen, darunter kleinere Royal Oak Modelle und elegante Varianten.', filter: { gender: 'Women' } },
  'audemars-piguet-gebraucht': { h1: 'Audemars Piguet gebraucht', title: 'Audemars Piguet gebraucht | Kariv Glamour', description: 'Gebrauchte Audemars Piguet Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.', intro: 'Entdecken Sie gebrauchte Audemars Piguet Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.', filter: {} },
  'audemars-piguet-kaufen': { h1: 'Audemars Piguet kaufen', title: 'Audemars Piguet kaufen | Kariv Glamour', description: 'Audemars Piguet kaufen bei Kariv Glamour \u2013 neue und gebrauchte AP Modelle.', intro: 'Audemars Piguet kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.', filter: {} },
  'audemars-piguet-uhr-kaufen': { h1: 'Audemars Piguet Uhr kaufen', title: 'Audemars Piguet Uhr kaufen | Kariv Glamour', description: 'Audemars Piguet Uhr kaufen bei Kariv Glamour \u2013 Royal Oak, Royal Oak Offshore und weitere Modelle.', intro: 'Audemars Piguet Uhr kaufen bei Kariv Glamour \u2013 entdecken Sie Modelle wie Royal Oak, Royal Oak Offshore, Royal Oak Concept und Code 11.59.', filter: {} },
  'audemars-piguet-gebraucht-kaufen': { h1: 'Audemars Piguet gebraucht kaufen', title: 'Audemars Piguet gebraucht kaufen | Kariv Glamour', description: 'Audemars Piguet gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.', intro: 'Audemars Piguet gebraucht kaufen bei Kariv Glamour \u2013 mit Zustandsbewertung, Box und Papers und detaillierten Produktdaten.', filter: {} },
  'audemars-piguet-royal-oak-kaufen': { h1: 'Audemars Piguet Royal Oak kaufen', title: 'Audemars Piguet Royal Oak kaufen | Kariv Glamour', description: 'Audemars Piguet Royal Oak kaufen bei Kariv Glamour \u2013 die ikonische Luxus-Sportuhr.', intro: 'Audemars Piguet Royal Oak kaufen bei Kariv Glamour \u2013 die ikonische integrierte Luxus-Sportuhr mit Achtkantl\u00fcnette und Tapisserie-Zifferblatt.', filter: { collection: 'Royal Oak' } },
  'audemars-piguet-royal-oak-offshore-kaufen': { h1: 'Audemars Piguet Royal Oak Offshore kaufen', title: 'Audemars Piguet Royal Oak Offshore kaufen | Kariv Glamour', description: 'Audemars Piguet Royal Oak Offshore kaufen bei Kariv Glamour \u2013 sportlich und markant.', intro: 'Audemars Piguet Royal Oak Offshore kaufen bei Kariv Glamour \u2013 eine sportlichere, markantere Interpretation der Royal Oak seit 1993.', filter: { collection: 'Royal Oak Offshore' } },
  'audemars-piguet-code-1159-kaufen': { h1: 'Audemars Piguet Code 11.59 kaufen', title: 'Audemars Piguet Code 11.59 kaufen | Kariv Glamour', description: 'Audemars Piguet Code 11.59 kaufen bei Kariv Glamour \u2013 moderne Rundgeh\u00e4use-Kollektion.', intro: 'Audemars Piguet Code 11.59 kaufen bei Kariv Glamour \u2013 eine moderne Rundgeh\u00e4use-Kollektion mit Komplikationen und elegantem Charakter.', filter: { collection: 'Code 11.59' } },
  'audemars-piguet-uhr-preis': { h1: 'Audemars Piguet Uhr Preis', title: 'Audemars Piguet Uhr Preis | Kariv Glamour', description: 'Audemars Piguet Preise verstehen \u2013 Kollektionen, Materialien, Komplikationen und Referenznummern.', intro: 'Audemars Piguet Uhr Preise variieren je nach Kollektion, Material, Komplikation und Referenz. Erfahren Sie mehr \u00fcber die Preisstruktur von AP Uhren.', isGuide: true },
  'was-kostet-eine-audemars-piguet-uhr': { h1: 'Was kostet eine Audemars Piguet Uhr?', title: 'Was kostet eine Audemars Piguet Uhr | Kariv Glamour', description: 'Was kostet eine Audemars Piguet Uhr? Preise und Einflussfaktoren erkl\u00e4rt.', intro: 'Was kostet eine Audemars Piguet Uhr? Die Preise h\u00e4ngen von Kollektion, Material, Komplikation und Verf\u00fcgbarkeit ab.', isGuide: true },
  'audemars-piguet-teuerste-uhr': { h1: 'Audemars Piguet teuerste Uhr', title: 'Audemars Piguet teuerste Uhr | Kariv Glamour', description: 'Die teuersten Audemars Piguet Uhren und was ihren Wert bestimmt.', intro: 'Die teuersten Audemars Piguet Uhren sind oft limitierte St\u00fccke, hochkomplizierte Tourbillons oder historische Referenzen. Erfahren Sie, was ihren Wert bestimmt.', isGuide: true },
  'welche-audemars-piguet-kaufen': { h1: 'Welche Audemars Piguet kaufen?', title: 'Welche Audemars Piguet kaufen | Kariv Glamour', description: 'Audemars Piguet Kaufberatung \u2013 vergleichen Sie Royal Oak, Royal Oak Offshore, Royal Oak Concept und Code 11.59.', intro: 'Welche Audemars Piguet Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Funktionen und Geh\u00e4usegr\u00f6\u00dfen, um die richtige Entscheidung zu treffen.', isGuide: true },
  'audemars-piguet-story': { h1: 'Audemars Piguet Story', title: 'Audemars Piguet Story | Kariv Glamour', description: 'Die Audemars Piguet Story \u2013 bold case architecture, integrated bracelet design und high-end finishing.', intro: 'Audemars Piguet ist bekannt f\u00fcr bold case architecture, integrated bracelet design, high-end finishing und Komplikationen \u2013 von der ikonischen Royal Oak bis zur Code 11.59 Kollektion.', isGuide: true },
};