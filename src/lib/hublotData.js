// Hublot-specific filter option lists
const HUBLOT_PAGE_ASSET_BASE = '/brand-assets/hublot/page';

export const HUBLOT_PAGE_IMAGES = {
  hero: `${HUBLOT_PAGE_ASSET_BASE}/hublot-hero.webp`,
  story: `${HUBLOT_PAGE_ASSET_BASE}/hublot-story.jpg`,
  brandStory: `${HUBLOT_PAGE_ASSET_BASE}/hublot-brand-story.webp`,
  bigBangGuide: `${HUBLOT_PAGE_ASSET_BASE}/hublot-big-bang-guide.jpg`,
  classicFusionGuide: `${HUBLOT_PAGE_ASSET_BASE}/hublot-classic-fusion-guide.jpg`,
  materialsGuide: `${HUBLOT_PAGE_ASSET_BASE}/hublot-materials-guide.webp`,
  preOwnedGuide: `${HUBLOT_PAGE_ASSET_BASE}/hublot-pre-owned-guide.optimized.webp`,
};

export const HUBLOT_HERO_IMAGE = HUBLOT_PAGE_IMAGES.hero;
export const HUBLOT_STORY_IMAGE = HUBLOT_PAGE_IMAGES.story;

export const HUBLOT_COLLECTIONS = [
  { id: 1, name: 'Big Bang', slug: 'big-bang', shortDescription_en: 'Hublot\u2019s bold luxury sports-watch family, known for strong case design, modern materials, skeleton dials and high wrist presence.', shortDescription_de: 'Hublots markante Luxus-Sportuhren-Familie, bekannt für starkes Gehäusedesign, moderne Materialien, Skeleton-Zifferblätter und starke Handgelenkspräsenz.' },
  { id: 2, name: 'Big Bang Original', slug: 'big-bang-original', shortDescription_en: 'A design-focused Big Bang line connected to Hublot\u2019s original bold case architecture and signature luxury-sport identity.', shortDescription_de: 'Eine designfokussierte Big Bang Linie, verbunden mit Hublots ursprünglicher markanter Gehäusearchitektur und signature Luxus-Sport-Identität.' },
  { id: 3, name: 'Big Bang Unico', slug: 'big-bang-unico', shortDescription_en: 'A technical Big Bang line known for skeletonized chronograph design, modern construction and strong collector appeal.', shortDescription_de: 'Eine technische Big Bang Linie, bekannt für skeletonisiertes Chronographen-Design, moderne Konstruktion und starke Sammler-Attraktivität.' },
  { id: 4, name: 'Spirit of Big Bang', slug: 'spirit-of-big-bang', shortDescription_en: 'A tonneau-shaped Hublot collection combining bold architecture, curved case design and technical watchmaking character.', shortDescription_de: 'Eine tonneauförmige Hublot-Kollektion, die markante Architektur, gebogenes Gehäusedesign und technischen Uhrmacher-Charakter vereint.' },
  { id: 5, name: 'Square Bang', slug: 'square-bang', shortDescription_en: 'A square-shaped Hublot collection with modern geometry, strong case presence and contemporary design language.', shortDescription_de: 'Eine quadratische Hublot-Kollektion mit moderner Geometrie, starker Gehäusepräsenz und zeitgemäßer Designsprache.' },
  { id: 6, name: 'Classic Fusion', slug: 'classic-fusion', shortDescription_en: 'A cleaner and more refined Hublot collection that blends modern materials with a more understated luxury style.', shortDescription_de: 'Eine cleanere und verfeinerte Hublot-Kollektion, die moderne Materialien mit einem zurückhaltenderen Luxus-Stil verbindet.' },
  { id: 7, name: 'Classic Fusion 3-Hands', slug: 'classic-fusion-3-hands', shortDescription_en: 'A simple and versatile Classic Fusion option focused on clean time display and everyday luxury wear.', shortDescription_de: 'Eine einfache und vielseitige Classic Fusion Option, fokussiert auf reine Zeitanzeige und alltäglichen Luxus.' },
  { id: 8, name: 'Classic Fusion Chronograph', slug: 'classic-fusion-chronograph', shortDescription_en: 'A sporty Classic Fusion line with chronograph functionality and balanced modern design.', shortDescription_de: 'Eine sportliche Classic Fusion Linie mit Chronographenfunktion und ausgewogenem modernem Design.' },
  { id: 9, name: 'Classic Fusion Moonphase', slug: 'classic-fusion-moonphase', shortDescription_en: 'A more elegant Classic Fusion expression with moonphase complication and refined dial presence.', shortDescription_de: 'Ein eleganterer Classic Fusion Ausdruck mit Mondphasen-Komplikation und verfeinertem Zifferblatt.' },
  { id: 10, name: 'Classic Fusion Partnerships', slug: 'classic-fusion-partnerships', shortDescription_en: 'A special category for limited, collaborative or partnership-driven Classic Fusion models when inventory supports them.', shortDescription_de: 'Eine spezielle Kategorie für limitierte, kollaborative oder partnerschaftsgetriebene Classic Fusion Modelle, wenn der Bestand dies unterstützt.' },
  { id: 11, name: 'Exceptional Timepieces', slug: 'exceptional-timepieces', shortDescription_en: 'A collector-focused area for rare Hublot watches, high complications, special materials and limited editions.', shortDescription_de: 'Ein sammlerfokussierter Bereich für seltene Hublot-Uhren, hohe Komplikationen, spezielle Materialien und limitierte Auflagen.' },
];

export const HUBLOT_CASE_MATERIALS = ['Titanium', 'Ceramic', 'Black Ceramic', 'Carbon', 'Sapphire', 'King Gold', 'Magic Gold', 'Rose Gold', 'Yellow Gold', 'White Gold', 'Stainless Steel', 'Steel', 'Bronze', 'Composite', 'Gem-set'];
export const HUBLOT_SHAPES = ['Round', 'Tonneau', 'Square'];
export const HUBLOT_MOVEMENTS = ['Automatic', 'Self-winding', 'Manual-winding', 'Chronograph', 'Tourbillon', 'Moonphase', 'Skeleton'];
export const HUBLOT_COMPLICATIONS = ['Time only', 'Date', 'Chronograph', 'Flyback chronograph', 'Moonphase', 'GMT', 'Tourbillon', 'Power reserve', 'High complication'];
export const HUBLOT_DIAL_COLORS = ['Black', 'Blue', 'Grey', 'White', 'Green', 'Red', 'Brown', 'Gold', 'Silver', 'Skeleton', 'Transparent', 'Sapphire', 'Multicolour'];
export const HUBLOT_BRACELETS = ['Rubber', 'Structured rubber', 'Leather', 'Alligator leather', 'Textile', 'Velcro strap', 'Titanium bracelet', 'Ceramic bracelet', 'Gold bracelet', 'Interchangeable strap'];
export const HUBLOT_CASE_SIZES = ['32 mm', '33 mm', '38 mm', '39 mm', '40 mm', '42 mm', '44 mm', '45 mm', '49 mm'];
export const HUBLOT_AVAILABILITY = ['In Stock', 'Reserved', 'Coming Soon', 'Sold'];
export const HUBLOT_BOX_PAPERS = ['Box included', 'Papers included', 'Full set'];
export const HUBLOT_TYPES = ['New', 'Pre-Owned', 'Vintage'];

export const HUBLOT_QUICK_FILTERS = [
  { label_en: 'Hublot Big Bang', label_de: 'Hublot Big Bang', link: '/hublot/big-bang', filter: { collection: 'Big Bang' } },
  { label_en: 'Hublot Big Bang Unico', label_de: 'Hublot Big Bang Unico', link: '/hublot/big-bang-unico', filter: { collection: 'Big Bang Unico' } },
  { label_en: 'Hublot Classic Fusion', label_de: 'Hublot Classic Fusion', link: '/hublot/classic-fusion', filter: { collection: 'Classic Fusion' } },
  { label_en: 'Hublot Spirit of Big Bang', label_de: 'Hublot Spirit of Big Bang', link: '/hublot/spirit-of-big-bang', filter: { collection: 'Spirit of Big Bang' } },
  { label_en: 'Hublot Square Bang', label_de: 'Hublot Square Bang', link: '/hublot/square-bang', filter: { collection: 'Square Bang' } },
  { label_en: 'Hublot Ceramic Watches', label_de: 'Hublot Keramik-Uhren', link: '/hublot-uhren', filter: { caseMaterial: 'Ceramic' } },
  { label_en: 'Hublot Skeleton Watches', label_de: 'Hublot Skeleton-Uhren', link: '/hublot-uhren', filter: { dialColor: 'Skeleton' } },
  { label_en: 'Pre-Owned Hublot', label_de: 'Hublot gebraucht', link: '/hublot-gebraucht', filter: { preOwned: true } },
  { label_en: 'Hublot with Box and Papers', label_de: 'Hublot mit Box und Papieren', link: '/guides', filter: { fullSet: true } },
];

export const HUBLOT_SEO_CARDS = [
  { title_en: 'Hublot Watch', title_de: 'Hublot Uhr', description_en: 'Explore Hublot watches through Kariv Glamour with clear product details, refined presentation and a premium shopping experience.', description_de: 'Entdecken Sie Hublot Uhren bei Kariv Glamour mit klaren Produktdetails, verfeinerter Präsentation und einem Premium-Einkaufserlebnis.', link: '/hublot-uhr', image: HUBLOT_PAGE_IMAGES.hero },
  { title_en: 'Hublot Watches', title_de: 'Hublot Uhren', description_en: 'Browse Hublot watches by collection, material, movement, case size, condition and price.', description_de: 'Stöbern Sie durch Hublot Uhren nach Kollektion, Material, Uhrwerk, Gehäusegröße, Zustand und Preis.', link: '/hublot-uhren', image: HUBLOT_PAGE_IMAGES.brandStory },
  { title_en: 'Pre-Owned Hublot', title_de: 'Hublot gebraucht', description_en: 'Discover pre-owned Hublot watches with transparent condition grading, box and papers information, and product-specific details.', description_de: 'Entdecken Sie gebrauchte Hublot Uhren mit transparenter Zustandsbewertung, Box und Papers Informationen und produktspezifischen Details.', link: '/hublot-gebraucht', image: HUBLOT_PAGE_IMAGES.preOwnedGuide },
  { title_en: 'Hublot Big Bang', title_de: 'Hublot Big Bang', description_en: 'Discover Hublot Big Bang watches, known for bold luxury-sport design, strong materials and modern wrist presence.', description_de: 'Entdecken Sie Hublot Big Bang Uhren, bekannt für mutiges Luxus-Sport-Design, starke Materialien und moderne Handgelenkspräsenz.', link: '/hublot/big-bang', image: HUBLOT_PAGE_IMAGES.bigBangGuide },
  { title_en: 'Hublot Classic Fusion', title_de: 'Hublot Classic Fusion', description_en: 'Explore Hublot Classic Fusion watches with cleaner styling, modern materials and refined everyday luxury character.', description_de: 'Entdecken Sie Hublot Classic Fusion Uhren mit cleanerem Stil, modernen Materialien und verfeinertem alltäglichen Luxus-Charakter.', link: '/hublot/classic-fusion', image: HUBLOT_PAGE_IMAGES.classicFusionGuide },
  { title_en: 'Hublot Spirit of Big Bang', title_de: 'Hublot Spirit of Big Bang', description_en: 'Browse Spirit of Big Bang watches with tonneau-shaped cases, technical design and strong Hublot identity.', description_de: 'Stöbern Sie durch Spirit of Big Bang Uhren mit tonneauförmigen Gehäusen, technischem Design und starker Hublot-Identität.', link: '/hublot/spirit-of-big-bang', image: HUBLOT_PAGE_IMAGES.materialsGuide },
];

export const HUBLOT_READ_MORE = [
  { title_en: 'Hublot Story', title_de: 'Hublot Story', description_en: 'Explore Hublot\u2019s modern design identity, material fusion and bold approach to luxury watchmaking.', description_de: 'Entdecken Sie Hublots moderne Design-Identität, Materialfusion und mutigen Ansatz der Luxusuhrenherstellung.', link: '/hublot/story', image: HUBLOT_PAGE_IMAGES.story },
  { title_en: 'Hublot Big Bang Guide', title_de: 'Hublot Big Bang Guide', description_en: 'Learn what makes the Big Bang one of Hublot\u2019s most recognizable luxury sports-watch collections.', description_de: 'Erfahren Sie, was den Big Bang zu einer von Hublots erkennbarsten Luxus-Sportuhren-Kollektionen macht.', link: '/hublot/big-bang', image: HUBLOT_PAGE_IMAGES.bigBangGuide },
  { title_en: 'Hublot Classic Fusion Guide', title_de: 'Hublot Classic Fusion Guide', description_en: 'Compare Classic Fusion models and understand why this line offers a more refined Hublot look.', description_de: 'Vergleichen Sie Classic Fusion Modelle und verstehen Sie, warum diese Linie einen verfeinerten Hublot-Look bietet.', link: '/hublot/classic-fusion', image: HUBLOT_PAGE_IMAGES.classicFusionGuide },
  { title_en: 'Buying Pre-Owned Hublot Watches', title_de: 'Gebrauchte Hublot Uhren kaufen', description_en: 'Understand condition, box and papers, service history and what to check before buying a used Hublot.', description_de: 'Verstehen Sie Zustand, Box und Papers, Service-Historie und worauf Sie vor dem Kauf einer gebrauchten Hublot achten sollten.', link: '/hublot-gebraucht', image: HUBLOT_PAGE_IMAGES.preOwnedGuide },
  { title_en: 'Hublot Materials Guide', title_de: 'Hublot Material-Guide', description_en: 'Learn about ceramic, titanium, sapphire, carbon, King Gold and other materials used in modern luxury watches.', description_de: 'Erfahren Sie über Keramik, Titan, Saphir, Carbon, King Gold und weitere Materialien, die in modernen Luxusuhren verwendet werden.', link: '/guides', image: HUBLOT_PAGE_IMAGES.materialsGuide },
];

export const HUBLOT_INTERNAL_LINKS = [
  {
    title_en: 'Popular Hublot Searches', title_de: 'Beliebte Hublot Suchen',
    links: [
      { label_en: 'Hublot Watch', label_de: 'Hublot Uhr', to: '/hublot-uhr' },
      { label_en: 'Hublot Watches', label_de: 'Hublot Uhren', to: '/hublot-uhren' },
      { label_en: 'Pre-Owned Hublot', label_de: 'Hublot gebraucht', to: '/hublot-gebraucht' },
      { label_en: 'Used Hublot Watches', label_de: 'Gebrauchte Hublot Uhren', to: '/gebrauchte-hublot-uhren' },
      { label_en: 'Buy Hublot', label_de: 'Hublot kaufen', to: '/hublot-kaufen' },
      { label_en: 'Hublot with box and papers', label_de: 'Hublot mit Box und Papieren', to: '/guides' },
    ],
  },
  {
    title_en: 'Hublot Collections', title_de: 'Hublot Kollektionen',
    links: [
      { label_en: 'Hublot Big Bang', label_de: 'Hublot Big Bang', to: '/hublot/big-bang' },
      { label_en: 'Hublot Big Bang Unico', label_de: 'Hublot Big Bang Unico', to: '/hublot/big-bang-unico' },
      { label_en: 'Hublot Classic Fusion', label_de: 'Hublot Classic Fusion', to: '/hublot/classic-fusion' },
      { label_en: 'Hublot Spirit of Big Bang', label_de: 'Hublot Spirit of Big Bang', to: '/hublot/spirit-of-big-bang' },
      { label_en: 'Hublot Square Bang', label_de: 'Hublot Square Bang', to: '/hublot/square-bang' },
      { label_en: 'Hublot Classic Fusion Chronograph', label_de: 'Hublot Classic Fusion Chronograph', to: '/hublot/classic-fusion-chronograph' },
    ],
  },
  {
    title_en: 'Product-Specific Pages', title_de: 'Produktspezifische Seiten',
    links: [
      { label_en: 'Buy Hublot Big Bang', label_de: 'Hublot Big Bang kaufen', to: '/hublot-big-bang-kaufen' },
      { label_en: 'Buy Hublot Big Bang Unico', label_de: 'Hublot Big Bang Unico kaufen', to: '/hublot-big-bang-unico-kaufen' },
      { label_en: 'Buy Hublot Classic Fusion', label_de: 'Hublot Classic Fusion kaufen', to: '/hublot-classic-fusion-kaufen' },
      { label_en: 'Buy Hublot Spirit of Big Bang', label_de: 'Hublot Spirit of Big Bang kaufen', to: '/hublot-spirit-of-big-bang-kaufen' },
      { label_en: 'Buy Hublot Square Bang', label_de: 'Hublot Square Bang kaufen', to: '/hublot-square-bang-kaufen' },
    ],
  },
  {
    title_en: 'Related Watch Categories', title_de: 'Verwandte Uhrenkategorien',
    links: [
      { label_en: 'Certified Pre-Owned Watches', label_de: 'Zertifizierte gebrauchte Uhren', to: '/shop?isCertifiedPreOwned=true' },
      { label_en: 'Men\u2019s watches', label_de: 'Herrenuhren', to: '/shop?gender=Men' },
      { label_en: 'Chronograph Watches', label_de: 'Chronographen', to: '/shop' },
      { label_en: 'Skeleton Watches', label_de: 'Skeleton-Uhren', to: '/shop' },
      { label_en: 'Ceramic Watches', label_de: 'Keramik-Uhren', to: '/shop' },
      { label_en: 'Sports Watches', label_de: 'Sportuhren', to: '/shop' },
      { label_en: 'Limited Edition Watches', label_de: 'Limitierte Auflagen', to: '/shop' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Audemars Piguet watches', label_de: 'Audemars Piguet Uhren', to: '/brands/audemars-piguet' },
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'TAG Heuer watches', label_de: 'TAG Heuer Uhren', to: '/brands/tag-heuer' },
      { label_en: 'Breitling watches', label_de: 'Breitling Uhren', to: '/brands/breitling' },
      { label_en: 'Panerai watches', label_de: 'Panerai Uhren', to: '/brands/panerai' },
      { label_en: 'Bulgari watches', label_de: 'Bulgari Uhren', to: '/brands/bvlgari' },
    ],
  },
];

export const HUBLOT_FAQS = [
  { q_en: 'Where can I buy a Hublot watch online?', q_de: 'Wo kann ich online eine Hublot Uhr kaufen?', a_en: "You can buy Hublot watches online at Kariv Glamour. Browse new and <a href='/hublot-gebraucht'>pre-owned Hublot</a> watches with transparent product details and condition grading.", a_de: "Sie können Hublot Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/hublot-gebraucht'>gebrauchte Hublot</a> Uhren mit transparenten Produktdetails und Zustandsbewertung." },
  { q_en: 'Is it safe to buy a pre-owned Hublot watch?', q_de: 'Ist es sicher, eine gebrauchte Hublot Uhr zu kaufen?', a_en: "Yes. Buying <a href='/hublot-gebraucht'>pre-owned Hublot</a> from Kariv Glamour includes clear condition grading, <a href='/guides'>box and papers</a> information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases.", a_de: "Ja. Der Kauf von <a href='/hublot-gebraucht'>gebrauchten Hublot</a> Uhren bei Kariv Glamour umfasst klare Zustandsbewertung, <a href='/guides'>Box und Papiere</a> Informationen und <a href='/buyer-protection'>Käuferschutz</a> für berechtigte Käufe." },
  { q_en: 'What are the most popular Hublot collections?', q_de: 'Was sind die beliebtesten Hublot Kollektionen?', a_en: "The most popular Hublot collections are the <a href='/hublot/big-bang'>Hublot Big Bang</a>, <a href='/hublot/big-bang-unico'>Hublot Big Bang Unico</a>, and <a href='/hublot/classic-fusion'>Hublot Classic Fusion</a>.", a_de: "Die beliebtesten Hublot Kollektionen sind die <a href='/hublot/big-bang'>Hublot Big Bang</a>, <a href='/hublot/big-bang-unico'>Hublot Big Bang Unico</a> und <a href='/hublot/classic-fusion'>Hublot Classic Fusion</a>." },
  { q_en: 'What is the difference between Hublot Big Bang and Classic Fusion?', q_de: 'Was ist der Unterschied zwischen Hublot Big Bang und Classic Fusion?', a_en: "The <a href='/hublot/big-bang'>Hublot Big Bang</a> is bold and sporty with strong wrist presence, while <a href='/hublot/classic-fusion'>Hublot Classic Fusion</a> offers a cleaner, more understated design.", a_de: "Die <a href='/hublot/big-bang'>Hublot Big Bang</a> ist mutig und sportlich mit starker Handgelenkspräsenz, während die <a href='/hublot/classic-fusion'>Hublot Classic Fusion</a> ein cleaneres, zurückhaltenderes Design bietet." },
  { q_en: 'What is Hublot Big Bang Unico?', q_de: 'Was ist die Hublot Big Bang Unico?', a_en: "<a href='/hublot/big-bang-unico'>Hublot Big Bang Unico</a> is a technical Big Bang line with skeletonized chronograph design and Hublot\u2019s in-house Unico movement.", a_de: "Die <a href='/hublot/big-bang-unico'>Hublot Big Bang Unico</a> ist eine technische Big Bang Linie mit skeletonisiertem Chronographen-Design und Hublots hauseigenem Unico-Werk." },
  { q_en: 'Are Hublot watches good for daily wear?', q_de: 'Sind Hublot Uhren für den täglichen Gebrauch geeignet?', a_en: "Yes, many Hublot watches are built for daily wear thanks to modern materials like ceramic and titanium, though <a href='/hublot-gebraucht'>pre-owned Hublot</a> buyers should review condition carefully.", a_de: "Ja, viele Hublot Uhren sind für den täglichen Gebrauch gebaut dank moderner Materialien wie Keramik und Titan, obwohl Käufer von <a href='/hublot-gebraucht'>gebrauchten Hublot</a> Uhren den Zustand sorgfältig prüfen sollten." },
  { q_en: 'What should I check before buying a used Hublot?', q_de: 'Worauf sollte ich vor dem Kauf einer gebrauchten Hublot achten?', a_en: "Check the reference number, condition, <a href='/guides'>box and papers</a>, service history, and condition grading before buying a used Hublot.", a_de: "Prüfen Sie Referenznummer, Zustand, <a href='/guides'>Box und Papiere</a>, Service-Historie und Zustandsbewertung vor dem Kauf einer gebrauchten Hublot." },
  { q_en: 'What does box and papers mean when buying Hublot?', q_de: 'Was bedeutet Box und Papers beim Kauf einer Hublot?', a_en: "<a href='/guides'>Box and papers</a> refers to the original presentation box and warranty or certificate documents, which can support authenticity and resale value.", a_de: "<a href='/guides'>Box und Papiere</a> bezieht sich auf die Original-Präsentationsbox und Garantie- oder Zertifikatsdokumente, die Authentizität und Wiederverkaufswert unterstützen können." },
];

export const HUBLOT_SEO_PAGES = {
  'hublot-uhr': { h1_en: 'Hublot Watch', h1_de: 'Hublot Uhr', title_en: 'Hublot Watch | Kariv Glamour', title_de: 'Hublot Uhr | Kariv Glamour', description_en: 'Explore Hublot watches at Kariv Glamour with transparent product information.', description_de: 'Entdecken Sie Hublot Uhren bei Kariv Glamour mit transparenter Produktinformation.', intro_en: 'Explore Hublot watches at Kariv Glamour — with clear product details, reference numbers and condition grading.', intro_de: 'Erkunden Sie Hublot Uhren bei Kariv Glamour – mit klaren Produktdetails, Referenznummern und Zustandsbewertung.', filter: {} },
  'hublot-uhren': { h1_en: 'Hublot Watches', h1_de: 'Hublot Uhren', title_en: 'Hublot Watches | Kariv Glamour', title_de: 'Hublot Uhren | Kariv Glamour', description_en: 'Hublot watches at Kariv Glamour — Big Bang, Classic Fusion, Spirit of Big Bang and Square Bang.', description_de: 'Hublot Uhren bei Kariv Glamour – Big Bang, Classic Fusion, Spirit of Big Bang und Square Bang.', intro_en: 'Browse Hublot watches by collection, material, movement, case size, condition and price.', intro_de: 'Stöbern Sie durch Hublot Uhren nach Kollektion, Material, Uhrwerk, Gehäusegröße, Zustand und Preis.', filter: {} },
  'hublot-gebraucht': { h1_en: 'Pre-Owned Hublot', h1_de: 'Hublot gebraucht', title_en: 'Pre-Owned Hublot | Kariv Glamour', title_de: 'Hublot gebraucht | Kariv Glamour', description_en: 'Pre-owned Hublot watches at Kariv Glamour with transparent condition grading.', description_de: 'Gebrauchte Hublot Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.', intro_en: 'Discover pre-owned Hublot watches with clear condition grading, box and papers information and detailed product data.', intro_de: 'Entdecken Sie gebrauchte Hublot Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.', filter: {} },
  'hublot-kaufen': { h1_en: 'Buy Hublot', h1_de: 'Hublot kaufen', title_en: 'Buy Hublot | Kariv Glamour', title_de: 'Hublot kaufen | Kariv Glamour', description_en: 'Buy Hublot at Kariv Glamour — new and pre-owned Hublot models.', description_de: 'Hublot kaufen bei Kariv Glamour – neue und gebrauchte Hublot Modelle.', intro_en: 'Buy Hublot at Kariv Glamour: new and pre-owned models with transparent product information.', intro_de: 'Hublot kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.', filter: {} },
  'hublot-uhr-kaufen': { h1_en: 'Buy Hublot Watch', h1_de: 'Hublot Uhr kaufen', title_en: 'Buy Hublot Watch | Kariv Glamour', title_de: 'Hublot Uhr kaufen | Kariv Glamour', description_en: 'Buy Hublot watch at Kariv Glamour — Big Bang, Classic Fusion and more models.', description_de: 'Hublot Uhr kaufen bei Kariv Glamour – Big Bang, Classic Fusion und weitere Modelle.', intro_en: 'Buy Hublot watches at Kariv Glamour — discover models like Big Bang, Classic Fusion and Spirit of Big Bang.', intro_de: 'Hublot Uhr kaufen bei Kariv Glamour – entdecken Sie Modelle wie Big Bang, Classic Fusion und Spirit of Big Bang.', filter: {} },
  'hublot-gebraucht-kaufen': { h1_en: 'Buy Pre-Owned Hublot', h1_de: 'Hublot gebraucht kaufen', title_en: 'Buy Pre-Owned Hublot | Kariv Glamour', title_de: 'Hublot gebraucht kaufen | Kariv Glamour', description_en: 'Buy pre-owned Hublot at Kariv Glamour with clear condition grading.', description_de: 'Hublot gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.', intro_en: 'Buy pre-owned Hublot at Kariv Glamour — with condition grading, box and papers and detailed product data.', intro_de: 'Hublot gebraucht kaufen bei Kariv Glamour – mit Zustandsbewertung, Box und Papers und detaillierten Produktdaten.', filter: {} },
  'gebrauchte-hublot-uhren': { h1_en: 'Used Hublot Watches', h1_de: 'Gebrauchte Hublot Uhren', title_en: 'Used Hublot Watches | Kariv Glamour', title_de: 'Gebrauchte Hublot Uhren | Kariv Glamour', description_en: 'Used Hublot watches at Kariv Glamour — verified models.', description_de: 'Gebrauchte Hublot Uhren bei Kariv Glamour – geprüfte Modelle.', intro_en: 'Browse used Hublot watches and find verified models with traceable condition descriptions.', intro_de: 'Stöbern Sie durch gebrauchte Hublot Uhren und finden Sie geprüfte Modelle mit nachvollziehbarer Zustandsbeschreibung.', filter: {} },
  'hublot-big-bang-kaufen': { h1_en: 'Buy Hublot Big Bang', h1_de: 'Hublot Big Bang kaufen', title_en: 'Buy Hublot Big Bang | Kariv Glamour', title_de: 'Hublot Big Bang kaufen | Kariv Glamour', description_en: 'Buy Hublot Big Bang at Kariv Glamour — bold luxury sports watch.', description_de: 'Hublot Big Bang kaufen bei Kariv Glamour – markante Luxus-Sportuhr.', intro_en: 'Buy Hublot Big Bang at Kariv Glamour — the bold luxury sports watch with modern materials and strong wrist presence.', intro_de: 'Hublot Big Bang kaufen bei Kariv Glamour – die markante Luxus-Sportuhr mit modernen Materialien und starker Handgelenkspräsenz.', filter: { collection: 'Big Bang' } },
  'hublot-big-bang-unico-kaufen': { h1_en: 'Buy Hublot Big Bang Unico', h1_de: 'Hublot Big Bang Unico kaufen', title_en: 'Buy Hublot Big Bang Unico | Kariv Glamour', title_de: 'Hublot Big Bang Unico kaufen | Kariv Glamour', description_en: 'Buy Hublot Big Bang Unico at Kariv Glamour — skeleton chronograph.', description_de: 'Hublot Big Bang Unico kaufen bei Kariv Glamour – Skeleton-Chronograph.', intro_en: 'Buy Hublot Big Bang Unico at Kariv Glamour — technical, skeletonized and with the in-house Unico movement.', intro_de: 'Hublot Big Bang Unico kaufen bei Kariv Glamour – technisch, skeletonisiert und mit Unico-Manufakturwerk.', filter: { collection: 'Big Bang Unico' } },
  'hublot-classic-fusion-kaufen': { h1_en: 'Buy Hublot Classic Fusion', h1_de: 'Hublot Classic Fusion kaufen', title_en: 'Buy Hublot Classic Fusion | Kariv Glamour', title_de: 'Hublot Classic Fusion kaufen | Kariv Glamour', description_en: 'Buy Hublot Classic Fusion at Kariv Glamour — cleaner and more understated.', description_de: 'Hublot Classic Fusion kaufen bei Kariv Glamour – cleaner und zurückhaltender.', intro_en: 'Buy Hublot Classic Fusion at Kariv Glamour — clean style with modern materials and understated luxury.', intro_de: 'Hublot Classic Fusion kaufen bei Kariv Glamour – cleaner Stil mit modernen Materialien und zurückhaltendem Luxus.', filter: { collection: 'Classic Fusion' } },
  'hublot-classic-fusion-chronograph-kaufen': { h1_en: 'Buy Hublot Classic Fusion Chronograph', h1_de: 'Hublot Classic Fusion Chronograph kaufen', title_en: 'Buy Hublot Classic Fusion Chronograph | Kariv Glamour', title_de: 'Hublot Classic Fusion Chronograph kaufen | Kariv Glamour', description_en: 'Buy Hublot Classic Fusion Chronograph at Kariv Glamour.', description_de: 'Hublot Classic Fusion Chronograph kaufen bei Kariv Glamour.', intro_en: 'Buy Hublot Classic Fusion Chronograph at Kariv Glamour — sporty, with chronograph functionality and modern design.', intro_de: 'Hublot Classic Fusion Chronograph kaufen bei Kariv Glamour – sportlich, mit Chronographenfunktion und modernem Design.', filter: { collection: 'Classic Fusion Chronograph' } },
  'hublot-spirit-of-big-bang-kaufen': { h1_en: 'Buy Hublot Spirit of Big Bang', h1_de: 'Hublot Spirit of Big Bang kaufen', title_en: 'Buy Hublot Spirit of Big Bang | Kariv Glamour', title_de: 'Hublot Spirit of Big Bang kaufen | Kariv Glamour', description_en: 'Buy Hublot Spirit of Big Bang at Kariv Glamour — tonneau case.', description_de: 'Hublot Spirit of Big Bang kaufen bei Kariv Glamour – Tonneau-Gehäuse.', intro_en: 'Buy Hublot Spirit of Big Bang at Kariv Glamour — tonneau shape, bold architecture and technical watchmaking.', intro_de: 'Hublot Spirit of Big Bang kaufen bei Kariv Glamour – Tonneau-Form, markante Architektur und technische Uhrmacherkunst.', filter: { collection: 'Spirit of Big Bang' } },
  'hublot-square-bang-kaufen': { h1_en: 'Buy Hublot Square Bang', h1_de: 'Hublot Square Bang kaufen', title_en: 'Buy Hublot Square Bang | Kariv Glamour', title_de: 'Hublot Square Bang kaufen | Kariv Glamour', description_en: 'Buy Hublot Square Bang at Kariv Glamour — square design.', description_de: 'Hublot Square Bang kaufen bei Kariv Glamour – quadratisches Design.', intro_en: 'Buy Hublot Square Bang at Kariv Glamour — square geometry with bold case and modern design.', intro_de: 'Hublot Square Bang kaufen bei Kariv Glamour – quadratische Geometrie mit markantem Gehäuse und modernem Design.', filter: { collection: 'Square Bang' } },
  'hublot-story': { h1_en: 'Hublot Story', h1_de: 'Hublot Story', title_en: 'Hublot Story | Kariv Glamour', title_de: 'Hublot Story | Kariv Glamour', description_en: 'The Hublot Story — modern materials, bold architecture and contemporary design.', description_de: 'Die Hublot Story – moderne Materialien, markante Architektur und zeitgemäßes Design.', intro_en: 'Hublot is known for its modern approach to luxury watchmaking, combining unexpected materials, bold architecture and contemporary design.', intro_de: 'Hublot ist bekannt für seinen modernen Ansatz in der Luxusuhrenherstellung – eine Verbindung unerwarteter Materialien, markanter Architektur und zeitgemäßen Designs.', isGuide: true },
};
