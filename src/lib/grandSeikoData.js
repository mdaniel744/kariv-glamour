// Grand Seiko collections, filters, and SEO data
// Grand Seiko is positioned around Japanese craftsmanship, precision,
// nature-inspired dials, Spring Drive, and the Grammar of Design.

const GS_PAGE_ASSET_BASE = '/brand-assets/grand-seiko/page';

export const GS_PAGE_IMAGES = {
  hero: `${GS_PAGE_ASSET_BASE}/grand-seiko-hero.webp`,
  story: `${GS_PAGE_ASSET_BASE}/grand-seiko-story.webp`,
  shunbunGuide: `${GS_PAGE_ASSET_BASE}/grand-seiko-shunbun-guide.webp`,
  shunbunVsSnowflake: `${GS_PAGE_ASSET_BASE}/grand-seiko-shunbun-vs-snowflake.optimized.webp`,
  snowflakeGuide: `${GS_PAGE_ASSET_BASE}/grand-seiko-snowflake-guide.jpg`,
  springDriveGuide: `${GS_PAGE_ASSET_BASE}/grand-seiko-spring-drive-guide.webp`,
  springDriveVsSnowflake: `${GS_PAGE_ASSET_BASE}/grand-seiko-spring-drive-vs-snowflake.webp`,
  preOwned: `${GS_PAGE_ASSET_BASE}/grand-seiko-pre-owned.jpg`,
};

const EVOLUTION9_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/4a6c12570_GrandSeikoEvolution9.jpg';
const HERITAGE_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/b9cc089d5_GrandSeikoHeritage.webp';
const MENS_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/a0b5ed446_GrandSeikoMenUhr.jpg';
const LADIES_IMG = 'https://media.base44.com/images/public/6a3f1710b5d8247379a67f8a/dafceffa4_Grand_Seiko_Ladies_Automatic.webp';

export const GS_HERO_IMAGE = GS_PAGE_IMAGES.hero;
export const GS_STORY_IMAGE = GS_PAGE_IMAGES.story;

export const GS_COLLECTIONS = [
  { id: 1, name: 'Heritage', slug: 'heritage', image: HERITAGE_IMG, shortDescription_en: 'The heart of Grand Seiko — balanced design and the pure essentials of watchmaking, home to iconic models like the Snowflake and Shunbun.', shortDescription_de: 'Das Herz von Grand Seiko — ausgewogenes Design und die reinen Essentials der Uhrmacherei, Heimat ikonischer Modelle wie Snowflake und Shunbun.' },
  { id: 2, name: 'Elegance', slug: 'elegance', image: MENS_IMG, shortDescription_en: 'Dress watches with refined design, slim profiles and formal character — Grand Seiko at its most restrained and graceful.', shortDescription_de: 'Dress-Uhren mit verfeinertem Design, schlanken Profilen und formellem Charakter — Grand Seiko in seiner zurückhaltendsten und anmutigsten Form.' },
  { id: 3, name: 'Sport', slug: 'sport', image: '', shortDescription_en: 'GMT, diver and chronograph models with higher water resistance and robust construction for active wear.', shortDescription_de: 'GMT-, Taucher- und Chronographenmodelle mit höherer Wasserdichtigkeit und robuster Konstruktion für aktiven Gebrauch.' },
  { id: 4, name: 'Evolution 9', slug: 'evolution-9', image: EVOLUTION9_IMG, shortDescription_en: 'A modern design language with advanced movements, enhanced legibility and refined Zaratsu finishing.', shortDescription_de: 'Eine moderne Designsprache mit fortschrittlichen Uhrwerken, verbesserter Ablesbarkeit und verfeinertem Zaratsu-Schliff.' },
  { id: 5, name: 'Masterpiece', slug: 'masterpiece', image: LADIES_IMG, shortDescription_en: 'High-end, rare and artisan timepieces in precious metals — collector-focused Grand Seiko at its finest.', shortDescription_de: 'Hochwertige, seltene und handwerkliche Zeitmesser in Edelmetallen — sammlerfokussiertes Grand Seiko in seiner feinsten Form.' },
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
  { label_en: 'Heritage', label_de: 'Heritage', link: '/grand-seiko/heritage' },
  { label_en: 'Elegance', label_de: 'Elegance', link: '/grand-seiko/elegance' },
  { label_en: 'Sport', label_de: 'Sport', link: '/grand-seiko/sport' },
  { label_en: 'Evolution 9', label_de: 'Evolution 9', link: '/grand-seiko/evolution-9' },
  { label_en: 'Masterpiece', label_de: 'Masterpiece', link: '/grand-seiko/masterpiece' },
  { label_en: 'Snowflake', label_de: 'Snowflake', link: '/grand-seiko-snowflake' },
  { label_en: 'Spring Drive', label_de: 'Spring Drive', link: '/grand-seiko-spring-drive' },
  { label_en: 'Pre-Owned', label_de: 'Gebraucht', link: '/grand-seiko-gebraucht' },
];

export const GS_SEO_CARDS = [
  { title_en: 'Grand Seiko Watch', title_de: 'Grand Seiko Uhr', description_en: 'Explore Grand Seiko watches at Kariv Glamour — Japanese craftsmanship, Spring Drive technology and nature-inspired dials with transparent product details.', description_de: 'Entdecken Sie Grand Seiko Uhren bei Kariv Glamour — japanische Handwerkskunst, Spring Drive Technologie und naturinspirierte Zifferblätter mit transparenten Produktdetails.', link: '/grand-seiko-uhr', image: GS_PAGE_IMAGES.hero },
  { title_en: 'Grand Seiko Watches', title_de: 'Grand Seiko Uhren', description_en: 'Browse the full Grand Seiko collection including Heritage, Elegance, Sport, Evolution 9 and Masterpiece.', description_de: 'Stöbern Sie durch die gesamte Grand Seiko Kollektion inklusive Heritage, Elegance, Sport, Evolution 9 und Masterpiece.', link: '/grand-seiko-uhren', image: GS_PAGE_IMAGES.story },
  { title_en: 'Grand Seiko Snowflake', title_de: 'Grand Seiko Snowflake', description_en: 'Discover the Grand Seiko Snowflake (SBGA211) — a Heritage Collection Spring Drive model with a textured white dial inspired by Japanese snow.', description_de: 'Entdecken Sie den Grand Seiko Snowflake (SBGA211) — ein Heritage Collection Spring Drive Modell mit strukturiertem weißen Zifferblatt, inspiriert von japanischem Schnee.', link: '/grand-seiko-snowflake', image: GS_PAGE_IMAGES.snowflakeGuide },
  { title_en: 'Grand Seiko Shunbun', title_de: 'Grand Seiko Shunbun', description_en: 'Explore the Grand Seiko Shunbun (SBGA413) — a 62GS-inspired case with a dial expressing a brief spring scene, powered by Spring Drive.', description_de: 'Entdecken Sie den Grand Seiko Shunbun (SBGA413) — ein 62GS-inspiriertes Gehäuse mit einem Zifferblatt, das eine kurze Frühlingsszene ausdrückt, angetrieben von Spring Drive.', link: '/grand-seiko-shunbun', image: GS_PAGE_IMAGES.shunbunGuide },
  { title_en: 'Grand Seiko Spring Drive', title_de: 'Grand Seiko Spring Drive', description_en: 'Learn about Grand Seiko Spring Drive — the unique movement combining mechanical precision with quartz accuracy for one-second-a-day precision.', description_de: 'Erfahren Sie mehr über Grand Seiko Spring Drive — das einzigartige Uhrwerk, das mechanische Präzision mit Quarzgenauigkeit für eine Sekunde pro Tag Präzision verbindet.', link: '/grand-seiko-spring-drive', image: GS_PAGE_IMAGES.springDriveGuide },
  { title_en: 'Grand Seiko GMT', title_de: 'Grand Seiko GMT', description_en: 'Browse Grand Seiko GMT watches for travel — dual-time functionality with Spring Drive or mechanical movements.', description_de: 'Stöbern Sie durch Grand Seiko GMT Uhren für Reisen — Dual-Zeit-Funktionalität mit Spring Drive oder mechanischen Uhrwerken.', link: '/grand-seiko-gmt', image: GS_PAGE_IMAGES.springDriveVsSnowflake },
];

export const GS_READ_MORE = [
  { title_en: 'Grand Seiko Story', title_de: 'Grand Seiko Story', description_en: 'Explore Grand Seiko\'s heritage of Japanese craftsmanship, the Grammar of Design, and the pursuit of the pure essentials of watchmaking.', description_de: 'Entdecken Sie Grand Seikos Erbe japanischer Handwerkskunst, die Grammar of Design und die Verfolgung der reinen Essentials der Uhrmacherei.', link: '/grand-seiko/story', image: GS_PAGE_IMAGES.story },
  { title_en: 'Snowflake Guide', title_de: 'Snowflake Guide', description_en: 'Learn what makes the Grand Seiko Snowflake one of the most beloved nature-inspired dials in watchmaking.', description_de: 'Erfahren Sie, was den Grand Seiko Snowflake zu einem der beliebtesten naturinspirierten Zifferblätter der Uhrmacherei macht.', link: '/grand-seiko-snowflake', image: GS_PAGE_IMAGES.snowflakeGuide },
  { title_en: 'Shunbun Guide', title_de: 'Shunbun Guide', description_en: 'Discover the Grand Seiko Shunbun — a 62GS-inspired case design with a dial capturing a fleeting spring moment.', description_de: 'Entdecken Sie den Grand Seiko Shunbun — ein 62GS-inspiriertes Gehäusedesign mit einem Zifferblatt, das einen flüchtigen Frühlingsmoment einfängt.', link: '/grand-seiko-shunbun', image: GS_PAGE_IMAGES.shunbunGuide },
  { title_en: 'Spring Drive Guide', title_de: 'Spring Drive Guide', description_en: 'Understand Grand Seiko Spring Drive technology — the movement that unites mechanical and electronic precision.', description_de: 'Verstehen Sie Grand Seiko Spring Drive Technologie — das Uhrwerk, das mechanische und elektronische Präzision vereint.', link: '/grand-seiko-spring-drive-guide', image: GS_PAGE_IMAGES.springDriveGuide },
  { title_en: 'Snowflake vs Shunbun', title_de: 'Snowflake vs Shunbun', description_en: 'Compare the Grand Seiko Snowflake and Shunbun — two iconic nature-inspired Spring Drive models.', description_de: 'Vergleichen Sie den Grand Seiko Snowflake und Shunbun — zwei ikonische naturinspirierte Spring Drive Modelle.', link: '/grand-seiko-snowflake-vs-shunbun', image: GS_PAGE_IMAGES.shunbunVsSnowflake },
  { title_en: 'Buying Pre-Owned Grand Seiko', title_de: 'Gebrauchte Grand Seiko kaufen', description_en: 'What to check before buying a used Grand Seiko — condition, Zaratsu polishing, box and papers, and movement verification.', description_de: 'Worauf Sie vor dem Kauf einer gebrauchten Grand Seiko achten sollten — Zustand, Zaratsu-Politur, Box und Papers und Uhrwerk-Verifizierung.', link: '/grand-seiko-gebraucht', image: GS_PAGE_IMAGES.preOwned },
];

export const GS_INTERNAL_LINKS = [
  {
    title_en: 'Popular Grand Seiko Searches', title_de: 'Beliebte Grand Seiko Suchen',
    links: [
      { label_en: 'Grand Seiko Watch', label_de: 'Grand Seiko Uhr', to: '/grand-seiko-uhr' },
      { label_en: 'Grand Seiko Watches', label_de: 'Grand Seiko Uhren', to: '/grand-seiko-uhren' },
      { label_en: 'Grand Seiko Snowflake', label_de: 'Grand Seiko Snowflake', to: '/grand-seiko-snowflake' },
      { label_en: 'Grand Seiko Shunbun', label_de: 'Grand Seiko Shunbun', to: '/grand-seiko-shunbun' },
      { label_en: 'Grand Seiko Spring Drive', label_de: 'Grand Seiko Spring Drive', to: '/grand-seiko-spring-drive' },
      { label_en: 'Grand Seiko GMT', label_de: 'Grand Seiko GMT', to: '/grand-seiko-gmt' },
    ],
  },
  {
    title_en: 'Grand Seiko Collections', title_de: 'Grand Seiko Kollektionen',
    links: [
      { label_en: 'Heritage', label_de: 'Heritage', to: '/grand-seiko/heritage' },
      { label_en: 'Elegance', label_de: 'Elegance', to: '/grand-seiko/elegance' },
      { label_en: 'Sport', label_de: 'Sport', to: '/grand-seiko/sport' },
      { label_en: 'Evolution 9', label_de: 'Evolution 9', to: '/grand-seiko/evolution-9' },
      { label_en: 'Masterpiece', label_de: 'Masterpiece', to: '/grand-seiko/masterpiece' },
    ],
  },
  {
    title_en: 'Buy & Pre-Owned', title_de: 'Kaufen & Gebraucht',
    links: [
      { label_en: 'Buy Grand Seiko', label_de: 'Grand Seiko kaufen', to: '/grand-seiko-kaufen' },
      { label_en: 'Buy Grand Seiko Watch', label_de: 'Grand Seiko Uhr kaufen', to: '/grand-seiko-uhr-kaufen' },
      { label_en: 'Pre-Owned Grand Seiko', label_de: 'Grand Seiko gebraucht', to: '/grand-seiko-gebraucht' },
      { label_en: 'Buy Pre-Owned Grand Seiko', label_de: 'Grand Seiko gebraucht kaufen', to: '/grand-seiko-gebraucht-kaufen' },
      { label_en: "Grand Seiko Men's Watch", label_de: 'Grand Seiko Uhr Herren', to: '/grand-seiko-uhr-herren' },
      { label_en: "Grand Seiko Women's Watch", label_de: 'Grand Seiko Uhr Damen', to: '/grand-seiko-uhr-damen' },
    ],
  },
  {
    title_en: 'Guides & Resources', title_de: 'Ratgeber & Guides',
    links: [
      { label_en: 'Which Grand Seiko to Buy?', label_de: 'Welche Grand Seiko kaufen?', to: '/welche-grand-seiko-kaufen' },
      { label_en: 'Snowflake vs Shunbun', label_de: 'Snowflake vs Shunbun', to: '/grand-seiko-snowflake-vs-shunbun' },
      { label_en: 'Spring Drive Guide', label_de: 'Spring Drive Guide', to: '/grand-seiko-spring-drive-guide' },
      { label_en: 'Grand Seiko Story', label_de: 'Grand Seiko Story', to: '/grand-seiko/story' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Patek Philippe watches', label_de: 'Patek Philippe Uhren', to: '/brands/patek-philippe' },
      { label_en: 'Audemars Piguet watches', label_de: 'Audemars Piguet Uhren', to: '/brands/audemars-piguet' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'Cartier watches', label_de: 'Cartier Uhren', to: '/brands/cartier' },
      { label_en: 'Breitling watches', label_de: 'Breitling Uhren', to: '/brands/breitling' },
    ],
  },
];

export const GS_FAQS = [
  { q_en: 'Where can I buy a Grand Seiko watch online?', q_de: 'Wo kann ich online eine Grand Seiko Uhr kaufen?', a_en: "You can buy Grand Seiko watches online at Kariv Glamour. Browse new and <a href='/grand-seiko-gebraucht'>pre-owned Grand Seiko</a> watches with transparent product details, reference numbers and condition grading.", a_de: "Sie können Grand Seiko Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/grand-seiko-gebraucht'>gebrauchte Grand Seiko</a> Uhren mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  { q_en: 'What is Grand Seiko Spring Drive?', q_de: 'Was ist Grand Seiko Spring Drive?', a_en: "Grand Seiko Spring Drive is a unique movement that combines the beauty of a mechanical watch with the precision of electronic regulation. It achieves an accuracy of approximately one second per day and offers a smooth gliding seconds hand. Read more in our <a href='/grand-seiko-spring-drive-guide'>Spring Drive Guide</a>.", a_de: "Grand Seiko Spring Drive ist ein einzigartiges Uhrwerk, das die Schönheit einer mechanischen Uhr mit der Präzision elektronischer Regelung verbindet. Es erreicht eine Genauigkeit von etwa einer Sekunde pro Tag und bietet einen sanft gleitenden Sekundenzeiger. Lesen Sie mehr in unserem <a href='/grand-seiko-spring-drive-guide'>Spring Drive Guide</a>." },
  { q_en: 'What is the Grand Seiko Snowflake?', q_de: 'Was ist der Grand Seiko Snowflake?', a_en: "The <a href='/grand-seiko-snowflake'>Grand Seiko Snowflake</a> (SBGA211) is a Heritage Collection Spring Drive 3-Day model powered by Caliber 9R65 with 72 hours of power reserve. Its textured white dial is inspired by the snowfields of the Shinshu region.", a_de: "Der <a href='/grand-seiko-snowflake'>Grand Seiko Snowflake</a> (SBGA211) ist ein Heritage Collection Spring Drive 3-Day Modell, angetrieben von Caliber 9R65 mit 72 Stunden Gangreserve. Sein strukturiertes weißes Zifferblatt ist von den Schneefeldern der Region Shinshu inspiriert." },
  { q_en: 'What is the Grand Seiko Shunbun?', q_de: 'Was ist der Grand Seiko Shunbun?', a_en: "The <a href='/grand-seiko-shunbun'>Grand Seiko Shunbun</a> (SBGA413) features a 62GS-inspired case design with a dial expressing a brief spring scene, powered by Spring Drive Caliber 9R65 with about 72 hours of power reserve.", a_de: "Der <a href='/grand-seiko-shunbun'>Grand Seiko Shunbun</a> (SBGA413) zeichnet sich durch ein 62GS-inspiriertes Gehäusedesign mit einem Zifferblatt aus, das eine kurze Frühlingsszene ausdrückt, angetrieben von Spring Drive Caliber 9R65 mit ca. 72 Stunden Gangreserve." },
  { q_en: 'Is it safe to buy a pre-owned Grand Seiko?', q_de: 'Ist es sicher, eine gebrauchte Grand Seiko zu kaufen?', a_en: "Yes. Buying <a href='/grand-seiko-gebraucht'>pre-owned Grand Seiko</a> from Kariv Glamour includes clear condition grading, box and papers information, and <a href='/buyer-protection'>buyer protection</a> for eligible purchases.", a_de: "Ja. Der Kauf von <a href='/grand-seiko-gebraucht'>gebrauchten Grand Seiko</a> Uhren bei Kariv Glamour umfasst klare Zustandsbewertung, Box und Papers Informationen und <a href='/buyer-protection'>Käuferschutz</a> für berechtigte Käufe." },
  { q_en: 'What is the difference between Grand Seiko Heritage and Elegance?', q_de: 'Was ist der Unterschied zwischen Grand Seiko Heritage und Elegance?', a_en: "The <a href='/grand-seiko/heritage'>Heritage</a> collection is the heart of Grand Seiko, focused on balanced design and the pure essentials of watchmaking, while <a href='/grand-seiko/elegance'>Elegance</a> focuses on dress watches with slim profiles, refined design and formal character.", a_de: "Die <a href='/grand-seiko/heritage'>Heritage</a> Kollektion ist das Herz von Grand Seiko, fokussiert auf ausgewogenes Design und die reinen Essentials der Uhrmacherei, während <a href='/grand-seiko/elegance'>Elegance</a> sich auf Dress-Uhren mit schlanken Profilen, verfeinertem Design und formellem Charakter konzentriert." },
  { q_en: 'Are Grand Seiko GMT watches good for travel?', q_de: 'Sind Grand Seiko GMT Uhren gut für Reisen?', a_en: "Yes. <a href='/grand-seiko-gmt'>Grand Seiko GMT</a> watches offer dual-time functionality with Spring Drive or mechanical movements, making them excellent travel companions with high precision and legibility.", a_de: "Ja. <a href='/grand-seiko-gmt'>Grand Seiko GMT</a> Uhren bieten Dual-Zeit-Funktionalität mit Spring Drive oder mechanischen Uhrwerken und sind somit ausgezeichnete Reisebegleiter mit hoher Präzision und Ablesbarkeit." },
  { q_en: 'What should I check before buying a used Grand Seiko?', q_de: 'Worauf sollte ich vor dem Kauf einer gebrauchten Grand Seiko achten?', a_en: "Check the condition of the Zaratsu-polished surfaces, verify the movement type (Spring Drive, Hi-Beat, or Quartz), confirm box and papers, and review the service history. Visit our <a href='/grand-seiko-gebraucht'>pre-owned Grand Seiko page</a> for transparent listings.", a_de: "Prüfen Sie den Zustand der Zaratsu-polierten Oberflächen, verifizieren Sie den Uhrwerkstyp (Spring Drive, Hi-Beat oder Quartz), bestätigen Sie Box und Papers und prüfen Sie die Service-Historie. Besuchen Sie unsere <a href='/grand-seiko-gebraucht'>Seite für gebrauchte Grand Seiko</a> für transparente Angebote." },
];

export const GS_SEO_PAGES = {
  'grand-seiko-uhr': {
    h1_en: 'Grand Seiko Watch', h1_de: 'Grand Seiko Uhr',
    title_en: 'Grand Seiko Watch | Kariv Glamour', title_de: 'Grand Seiko Uhr | Kariv Glamour',
    description_en: 'Explore Grand Seiko watches at Kariv Glamour — Japanese craftsmanship, Spring Drive and nature-inspired dials.',
    description_de: 'Entdecken Sie Grand Seiko Uhren bei Kariv Glamour — japanische Handwerkskunst, Spring Drive und naturinspirierte Zifferblätter.',
    intro_en: 'Explore Grand Seiko watches at Kariv Glamour — with Japanese craftsmanship, precision, Zaratsu polishing, Spring Drive technology and nature-inspired dials.',
    intro_de: 'Erkunden Sie Grand Seiko Uhren bei Kariv Glamour — mit japanischer Handwerkskunst, Präzision, Zaratsu-Politur, Spring Drive Technologie und naturinspirierten Zifferblättern.',
    filter: {},
  },
  'grand-seiko-uhren': {
    h1_en: 'Grand Seiko Watches', h1_de: 'Grand Seiko Uhren',
    title_en: 'Grand Seiko Watches | Kariv Glamour', title_de: 'Grand Seiko Uhren | Kariv Glamour',
    description_en: 'Grand Seiko watches at Kariv Glamour — Heritage, Elegance, Sport, Evolution 9 and Masterpiece collections.',
    description_de: 'Grand Seiko Uhren bei Kariv Glamour — Heritage, Elegance, Sport, Evolution 9 und Masterpiece Kollektionen.',
    intro_en: 'Browse Grand Seiko watches by collection, material, movement, case size, condition and price.',
    intro_de: 'Stöbern Sie durch Grand Seiko Uhren nach Kollektion, Material, Uhrwerk, Gehäusegröße, Zustand und Preis.',
    filter: {},
  },
  'grand-seiko-uhr-herren': {
    h1_en: "Grand Seiko Men's Watch", h1_de: 'Grand Seiko Uhr Herren',
    title_en: "Grand Seiko Men's Watch | Kariv Glamour", title_de: 'Grand Seiko Uhr Herren | Kariv Glamour',
    description_en: "Grand Seiko men's watches at Kariv Glamour — Heritage, Evolution 9 and Sport models for men.",
    description_de: 'Grand Seiko Uhr Herren bei Kariv Glamour — Heritage, Evolution 9 und Sport Modelle für Männer.',
    intro_en: 'Discover Grand Seiko watches for men — from the Heritage collection to Evolution 9 and Sport.',
    intro_de: 'Entdecken Sie Grand Seiko Uhren für Herren — von der Heritage Kollektion bis zur Evolution 9 und Sport.',
    filter: { gender: 'Men' },
  },
  'grand-seiko-uhr-damen': {
    h1_en: "Grand Seiko Women's Watch", h1_de: 'Grand Seiko Uhr Damen',
    title_en: "Grand Seiko Women's Watch | Kariv Glamour", title_de: 'Grand Seiko Uhr Damen | Kariv Glamour',
    description_en: "Grand Seiko women's watches at Kariv Glamour — elegant GS models in smaller case sizes.",
    description_de: 'Grand Seiko Uhr Damen bei Kariv Glamour — elegante GS Modelle in kleineren Gehäusegrößen.',
    intro_en: 'Discover Grand Seiko watches for women, including smaller Heritage and Elegance models with fine details.',
    intro_de: 'Entdecken Sie Grand Seiko Uhren für Damen, darunter kleinere Heritage und Elegance Modelle mit feinen Details.',
    filter: { gender: 'Women' },
  },
  'grand-seiko-snowflake': {
    h1_en: 'Grand Seiko Snowflake', h1_de: 'Grand Seiko Snowflake',
    title_en: 'Grand Seiko Snowflake (SBGA211) | Kariv Glamour', title_de: 'Grand Seiko Snowflake (SBGA211) | Kariv Glamour',
    description_en: 'Grand Seiko Snowflake SBGA211 — Heritage Collection Spring Drive 3-Day with Caliber 9R65 and 72 hours power reserve.',
    description_de: 'Grand Seiko Snowflake SBGA211 — Heritage Kollektion Spring Drive 3-Day mit Caliber 9R65 und 72 Stunden Gangreserve.',
    intro_en: 'The Grand Seiko Snowflake (SBGA211) is a Heritage Collection Spring Drive 3-Day model powered by Caliber 9R65 with 72 hours of power reserve. Its textured white dial is inspired by the snowfields of the Shinshu region.',
    intro_de: 'Der Grand Seiko Snowflake (SBGA211) ist ein Heritage Collection Spring Drive 3-Day Modell, angetrieben von Caliber 9R65 mit 72 Stunden Gangreserve. Das strukturierte weiße Zifferblatt ist von den Schneefeldern der Region Shinshu inspiriert.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.model, p.productTitle, p.dialColor, p.referenceNumber].filter(Boolean).join(' ').toLowerCase();
      return f.includes('snowflake') || f.includes('sbga211') || f.includes('sbga21');
    },
  },
  'grand-seiko-shunbun': {
    h1_en: 'Grand Seiko Shunbun', h1_de: 'Grand Seiko Shunbun',
    title_en: 'Grand Seiko Shunbun (SBGA413) | Kariv Glamour', title_de: 'Grand Seiko Shunbun (SBGA413) | Kariv Glamour',
    description_en: 'Grand Seiko Shunbun SBGA413 — 62GS-inspired case with spring dial, Spring Drive Caliber 9R65.',
    description_de: 'Grand Seiko Shunbun SBGA413 — 62GS-inspiriertes Gehäuse mit Frühlings-Zifferblatt, Spring Drive Caliber 9R65.',
    intro_en: 'The Grand Seiko Shunbun (SBGA413) features a 62GS-inspired case design with a dial expressing a brief spring scene, powered by Spring Drive Caliber 9R65 with about 72 hours of power reserve.',
    intro_de: 'Der Grand Seiko Shunbun (SBGA413) zeichnet sich durch ein 62GS-inspiriertes Gehäusedesign mit einem Zifferblatt aus, das eine kurze Frühlingsszene ausdrückt, angetrieben von Spring Drive Caliber 9R65 mit ca. 72 Stunden Gangreserve.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.model, p.productTitle, p.dialColor, p.referenceNumber].filter(Boolean).join(' ').toLowerCase();
      return f.includes('shunbun') || f.includes('sbga413') || f.includes('sbga41');
    },
  },
  'grand-seiko-spring-drive': {
    h1_en: 'Grand Seiko Spring Drive', h1_de: 'Grand Seiko Spring Drive',
    title_en: 'Grand Seiko Spring Drive | Kariv Glamour', title_de: 'Grand Seiko Spring Drive | Kariv Glamour',
    description_en: 'Grand Seiko Spring Drive — unique movement with mechanical and quartz precision, approx. one second per day.',
    description_de: 'Grand Seiko Spring Drive — einzigartige Bewegung mit mechanischer und Quarz-Präzision, ca. eine Sekunde pro Tag.',
    intro_en: 'Grand Seiko Spring Drive combines the beauty of a mechanical movement with the precision of electronic regulation. The movement achieves an accuracy of about one second per day and offers a smoothly gliding seconds hand.',
    intro_de: 'Grand Seiko Spring Drive vereint die Schönheit eines mechanischen Uhrwerks mit der Präzision elektronischer Regelung. Die Bewegung erreicht eine Genauigkeit von etwa einer Sekunde pro Tag und bietet einen sanft gleitenden Sekundenzeiger.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.movementType, p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
      return f.includes('spring drive');
    },
  },
  'grand-seiko-gmt': {
    h1_en: 'Grand Seiko GMT', h1_de: 'Grand Seiko GMT',
    title_en: 'Grand Seiko GMT | Kariv Glamour', title_de: 'Grand Seiko GMT | Kariv Glamour',
    description_en: 'Grand Seiko GMT watches for travel — dual-time functionality with Spring Drive or mechanical movements.',
    description_de: 'Grand Seiko GMT Uhren für Reisen — Dual-Zeit Funktion mit Spring Drive oder mechanischen Uhrwerken.',
    intro_en: 'Grand Seiko GMT watches offer dual-time functionality with Spring Drive or mechanical movements — ideal for travel with high precision and legibility.',
    intro_de: 'Grand Seiko GMT Uhren bieten Dual-Zeit-Funktionalität mit Spring Drive oder mechanischen Uhrwerken — ideal für Reisen mit hoher Präzision und Ablesbarkeit.',
    filter: {},
    clientFilter: (p) => {
      const f = [p.functions, p.model, p.productTitle].filter(Boolean).join(' ').toLowerCase();
      return f.includes('gmt');
    },
  },
  'grand-seiko-gebraucht': {
    h1_en: 'Pre-Owned Grand Seiko', h1_de: 'Grand Seiko gebraucht',
    title_en: 'Pre-Owned Grand Seiko | Kariv Glamour', title_de: 'Grand Seiko gebraucht | Kariv Glamour',
    description_en: 'Pre-owned Grand Seiko watches at Kariv Glamour with transparent condition grading.',
    description_de: 'Gebrauchte Grand Seiko Uhren bei Kariv Glamour mit transparenter Zustandsbewertung.',
    intro_en: 'Discover pre-owned Grand Seiko watches with clear condition grading, Zaratsu polishing information, box and papers and detailed product data.',
    intro_de: 'Entdecken Sie gebrauchte Grand Seiko Uhren mit klarer Zustandsbewertung, Zaratsu-Politur-Informationen, Box und Papers und detaillierten Produktdaten.',
    filter: {},
  },
  'grand-seiko-kaufen': {
    h1_en: 'Buy Grand Seiko', h1_de: 'Grand Seiko kaufen',
    title_en: 'Buy Grand Seiko | Kariv Glamour', title_de: 'Grand Seiko kaufen | Kariv Glamour',
    description_en: 'Buy Grand Seiko at Kariv Glamour — new and pre-owned GS models.',
    description_de: 'Grand Seiko kaufen bei Kariv Glamour — neue und gebrauchte GS Modelle.',
    intro_en: 'Buy Grand Seiko at Kariv Glamour: new and pre-owned models with transparent product information.',
    intro_de: 'Grand Seiko kaufen bei Kariv Glamour: neue und gebrauchte Modelle mit transparenter Produktinformation.',
    filter: {},
  },
  'grand-seiko-uhr-kaufen': {
    h1_en: 'Buy Grand Seiko Watch', h1_de: 'Grand Seiko Uhr kaufen',
    title_en: 'Buy Grand Seiko Watch | Kariv Glamour', title_de: 'Grand Seiko Uhr kaufen | Kariv Glamour',
    description_en: 'Buy Grand Seiko watch at Kariv Glamour — Heritage, Elegance, Sport, Evolution 9 and Masterpiece.',
    description_de: 'Grand Seiko Uhr kaufen bei Kariv Glamour — Heritage, Elegance, Sport, Evolution 9 und Masterpiece.',
    intro_en: 'Buy Grand Seiko watches at Kariv Glamour — discover models from the Heritage, Elegance, Sport, Evolution 9 and Masterpiece collections.',
    intro_de: 'Grand Seiko Uhr kaufen bei Kariv Glamour — entdecken Sie Modelle aus den Kollektionen Heritage, Elegance, Sport, Evolution 9 und Masterpiece.',
    filter: {},
  },
  'grand-seiko-gebraucht-kaufen': {
    h1_en: 'Buy Pre-Owned Grand Seiko', h1_de: 'Grand Seiko gebraucht kaufen',
    title_en: 'Buy Pre-Owned Grand Seiko | Kariv Glamour', title_de: 'Grand Seiko gebraucht kaufen | Kariv Glamour',
    description_en: 'Buy pre-owned Grand Seiko at Kariv Glamour with clear condition grading.',
    description_de: 'Grand Seiko gebraucht kaufen bei Kariv Glamour mit klarer Zustandsbewertung.',
    intro_en: 'Buy pre-owned Grand Seiko at Kariv Glamour — with condition grading, Zaratsu polishing information and detailed product data.',
    intro_de: 'Grand Seiko gebraucht kaufen bei Kariv Glamour — mit Zustandsbewertung, Zaratsu-Politur-Informationen und detaillierten Produktdaten.',
    filter: {},
  },
  'welche-grand-seiko-kaufen': {
    h1_en: 'Which Grand Seiko to Buy?', h1_de: 'Welche Grand Seiko kaufen?',
    title_en: 'Which Grand Seiko to Buy | Kariv Glamour', title_de: 'Welche Grand Seiko kaufen | Kariv Glamour',
    description_en: 'Grand Seiko buying advice — compare Heritage, Elegance, Sport, Evolution 9 and Masterpiece.',
    description_de: 'Grand Seiko Kaufberatung — vergleichen Sie Heritage, Elegance, Sport, Evolution 9 und Masterpiece.',
    intro_en: 'Which Grand Seiko watch is right for you? Compare collections, movements (Spring Drive, Hi-Beat, Quartz), case sizes and dial designs to make the right decision.',
    intro_de: 'Welche Grand Seiko Uhr passt zu Ihnen? Vergleichen Sie Kollektionen, Uhrwerke (Spring Drive, Hi-Beat, Quartz), Gehäusegrößen und Zifferblatt-Designs, um die richtige Entscheidung zu treffen.',
    isGuide: true,
  },
  'grand-seiko-snowflake-vs-shunbun': {
    h1_en: 'Grand Seiko Snowflake vs Shunbun', h1_de: 'Grand Seiko Snowflake vs Shunbun',
    title_en: 'Grand Seiko Snowflake vs Shunbun | Kariv Glamour', title_de: 'Grand Seiko Snowflake vs Shunbun | Kariv Glamour',
    description_en: 'Comparison of Grand Seiko Snowflake and Shunbun — two iconic nature-inspired Spring Drive models.',
    description_de: 'Vergleich der Grand Seiko Snowflake und Shunbun — zwei ikonische naturinspirierte Spring Drive Modelle.',
    intro_en: 'The comparison between Grand Seiko Snowflake (SBGA211) and Shunbun (SBGA413): Both are Heritage Collection Spring Drive models with nature-inspired dials, but differ in case design and color.',
    intro_de: 'Der Vergleich zwischen Grand Seiko Snowflake (SBGA211) und Shunbun (SBGA413): Beide sind Heritage Collection Spring Drive Modelle mit naturinspirierten Zifferblättern, unterscheiden sich aber in Gehäusedesign und Farbgebung.',
    isGuide: true,
  },
  'grand-seiko-spring-drive-guide': {
    h1_en: 'Grand Seiko Spring Drive Guide', h1_de: 'Grand Seiko Spring Drive Guide',
    title_en: 'Grand Seiko Spring Drive Guide | Kariv Glamour', title_de: 'Grand Seiko Spring Drive Guide | Kariv Glamour',
    description_en: 'Understand Grand Seiko Spring Drive technology — the movement that unites mechanical and electronic precision.',
    description_de: 'Verstehen Sie Grand Seiko Spring Drive Technologie — die Bewegung, die mechanische und elektronische Präzision vereint.',
    intro_en: 'Grand Seiko Spring Drive is a unique movement that combines mechanical energy with electronic regulation, achieving an accuracy of about one second per day.',
    intro_de: 'Grand Seiko Spring Drive ist eine einzigartige Bewegung, die mechanische Energie mit elektronischer Regelung kombiniert und eine Genauigkeit von etwa einer Sekunde pro Tag erreicht.',
    isGuide: true,
  },
  'grand-seiko-story': {
    h1_en: 'Grand Seiko Story', h1_de: 'Grand Seiko Story',
    title_en: 'Grand Seiko Story | Kariv Glamour', title_de: 'Grand Seiko Story | Kariv Glamour',
    description_en: 'The Grand Seiko Story — Japanese craftsmanship, the Grammar of Design and the pure essence of watchmaking.',
    description_de: 'Die Grand Seiko Story — japanische Handwerkskunst, die Grammar of Design und die pure Essenz der Uhrmacherei.',
    intro_en: 'Grand Seiko stands for Japanese craftsmanship, the Grammar of Design, Zaratsu polishing, nature-inspired dials and the pursuit of the pure essence of watchmaking — from the Heritage collection to Evolution 9.',
    intro_de: 'Grand Seiko steht für japanische Handwerkskunst, die Grammar of Design, Zaratsu-Politur, naturinspirierte Zifferblätter und die Verfolgung der reinen Essenz der Uhrmacherei — von der Heritage Kollektion bis zur Evolution 9.',
    isGuide: true,
  },
};
