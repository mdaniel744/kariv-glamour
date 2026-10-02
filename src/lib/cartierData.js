import { applyCzechSeoPages, applyCzechBrandContent } from './czechBrandData.js';
import { applyCzechBrandFaqs } from './czechBrandFaqs.js';

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
const CARTIER_COLLECTION_ASSET_BASE = '/brand-assets/cartier/collections';

const CARTIER_COLLECTION_IMAGES = {
  tank: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-tank.png`,
  santosDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-santos-de-cartier.png`,
  panthereDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-panthere-de-cartier.png`,
  ballonBleuDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-ballon-bleu.png`,
  pashaDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-pasha.png`,
  baignoire: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-baignoire.png`,
  cartierCrash: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-crash.png`,
  santosDumont: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-santos-dumont.png`,
  tankFrancaise: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-tank-francaise.png`,
  tankMust: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-tank-must.png`,
  tankLouisCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-tank-louis.png`,
  tankAmericaine: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-tank-americaine.png`,
  tortue: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-tortue.png`,
  laPanthereDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-la-panthere.png`,
  tressage: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-tressage.png`,
  reflectionDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-reflection.png`,
  rotondeDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-rotonde.png`,
  coussinDeCartier: `${CARTIER_COLLECTION_ASSET_BASE}/cartier-coussin.png`,
};

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
  { id: 1, name: 'Tank', slug: 'tank', image: CARTIER_COLLECTION_IMAGES.tank, shortDescription_en: 'A Cartier icon defined by rectangular lines, Roman numerals, refined proportions, and timeless elegance.', shortDescription_de: 'Ein Cartier-Icon, definiert durch rechteckige Linien, römische Ziffern, verfeinerte Proportionen und zeitlose Eleganz.' },
  { id: 2, name: 'Santos de Cartier', slug: 'santos-de-cartier', image: CARTIER_COLLECTION_IMAGES.santosDeCartier, shortDescription_en: 'A pioneering Cartier watch with strong geometric design, visible screws, and everyday luxury character.', shortDescription_de: 'Eine bahnbrechende Cartier-Uhr mit starkem geometrischem Design, sichtbaren Schrauben und alltäglichem Luxuscharakter.' },
  { id: 3, name: 'Panthère de Cartier', slug: 'panthere-de-cartier', image: CARTIER_COLLECTION_IMAGES.panthereDeCartier, shortDescription_en: 'A graceful Cartier watch known for jewellery-like bracelet design, feminine elegance, and fluid wearability.', shortDescription_de: 'Eine anmutige Cartier-Uhr, bekannt für schmuckhaftes Armbanddesign, feminine Eleganz und fließende Tragbarkeit.' },
  { id: 4, name: 'Ballon Bleu de Cartier', slug: 'ballon-bleu-de-cartier', image: CARTIER_COLLECTION_IMAGES.ballonBleuDeCartier, shortDescription_en: 'A rounded Cartier collection recognized for its curved case, refined crown detail, and soft elegant presence.', shortDescription_de: 'Eine gerundete Cartier-Kollektion, bekannt für ihr gebogenes Gehäuse, verfeinerte Kronendetails und sanfte elegante Präsenz.' },
  { id: 5, name: 'Pasha de Cartier', slug: 'pasha-de-cartier', image: CARTIER_COLLECTION_IMAGES.pashaDeCartier, shortDescription_en: 'A distinctive Cartier collection with round case design, bold personality, and modern luxury character.', shortDescription_de: 'Eine markante Cartier-Kollektion mit rundem Gehäusedesign, kühner Persönlichkeit und modernem Luxuscharakter.' },
  { id: 6, name: 'Baignoire', slug: 'baignoire', image: CARTIER_COLLECTION_IMAGES.baignoire, shortDescription_en: 'An oval Cartier design with sculptural elegance, graceful proportions, and strong feminine appeal.', shortDescription_de: 'Ein ovales Cartier-Design mit skulpturaler Eleganz, anmutigen Proportionen und starker femininer Ausstrahlung.' },
  { id: 7, name: 'Cartier Crash', slug: 'cartier-crash', image: CARTIER_COLLECTION_IMAGES.cartierCrash, shortDescription_en: 'A highly distinctive Cartier design with asymmetrical case form and strong collector interest.', shortDescription_de: 'Ein hochgradig markantes Cartier-Design mit asymmetrischer Gehäuseform und starker Sammleranziehung.' },
  { id: 8, name: 'Santos-Dumont', slug: 'santos-dumont', image: CARTIER_COLLECTION_IMAGES.santosDumont, shortDescription_en: 'A refined and elegant expression of the Santos story, with slim proportions and classic Cartier styling.', shortDescription_de: 'Ein verfeinerter und eleganter Ausdruck der Santos-Story, mit schlanken Proportionen und klassischem Cartier-Styling.' },
  { id: 9, name: 'Tank Française', slug: 'tank-francaise', image: CARTIER_COLLECTION_IMAGES.tankFrancaise, shortDescription_en: 'A Tank interpretation with integrated bracelet design and refined everyday elegance.', shortDescription_de: 'Eine Tank-Interpretation mit integriertem Armbanddesign und verfeinerter alltäglicher Eleganz.' },
  { id: 10, name: 'Tank Must', slug: 'tank-must', image: CARTIER_COLLECTION_IMAGES.tankMust, shortDescription_en: 'A clean and accessible expression of the Cartier Tank design language.', shortDescription_de: 'Ein klarer und zugänglicher Ausdruck der Cartier Tank-Designsprache.' },
  { id: 11, name: 'Tank Louis Cartier', slug: 'tank-louis-cartier', image: CARTIER_COLLECTION_IMAGES.tankLouisCartier, shortDescription_en: 'A classic and refined Tank model strongly associated with Cartier elegance and dress-watch style.', shortDescription_de: 'Ein klassisches und verfeinertes Tank-Modell, stark verbunden mit Cartier-Eleganz und Dress-Watch-Stil.' },
  { id: 12, name: 'Tank Américaine', slug: 'tank-americaine', image: CARTIER_COLLECTION_IMAGES.tankAmericaine, shortDescription_en: 'A curved rectangular Tank design with elongated proportions and sophisticated wrist presence.', shortDescription_de: 'Ein gebogenes rechteckiges Tank-Design mit verlängerten Proportionen und anspruchsvoller Handgelenkspräsenz.' },
  { id: 13, name: 'Tortue', slug: 'tortue', image: CARTIER_COLLECTION_IMAGES.tortue, shortDescription_en: 'A shaped Cartier watch family known for elegant curved lines and vintage-inspired sophistication.', shortDescription_de: 'Eine geformte Cartier-Uhrenfamilie, bekannt für elegante geschwungene Linien und vintage-inspirierte Raffinesse.' },
  { id: 14, name: 'La Panthère de Cartier', slug: 'la-panthere-de-cartier', image: CARTIER_COLLECTION_IMAGES.laPanthereDeCartier, shortDescription_en: 'A Cartier collection that connects watch design with the Maison\u2019s iconic panther-inspired elegance.', shortDescription_de: 'Eine Cartier-Kollektion, die Uhrendesign mit der ikonischen panther-inspirierten Eleganz der Maison verbindet.' },
  { id: 15, name: 'Tressage', slug: 'tressage', image: CARTIER_COLLECTION_IMAGES.tressage, shortDescription_en: 'A refined Cartier collection with jewellery-inspired design language and strong visual elegance.', shortDescription_de: 'Eine verfeinerte Cartier-Kollektion mit schmuckinspirierter Designsprache und starker visueller Eleganz.' },
  { id: 16, name: 'Reflection de Cartier', slug: 'reflection-de-cartier', image: CARTIER_COLLECTION_IMAGES.reflectionDeCartier, shortDescription_en: 'A sculptural Cartier watch design with jewellery-like presence and contemporary elegance.', shortDescription_de: 'Ein skulpturales Cartier-Uhrendesign mit schmuckhafter Präsenz und zeitgenössischer Eleganz.' },
  { id: 17, name: 'Rotonde de Cartier', slug: 'rotonde-de-cartier', image: CARTIER_COLLECTION_IMAGES.rotondeDeCartier, shortDescription_en: 'A refined round Cartier watch family associated with classic design and sophisticated watchmaking.', shortDescription_de: 'Eine verfeinerte runde Cartier-Uhrenfamilie, verbunden mit klassischem Design und anspruchsvoller Uhrmacherei.' },
  { id: 18, name: 'Coussin de Cartier', slug: 'coussin-de-cartier', image: CARTIER_COLLECTION_IMAGES.coussinDeCartier, shortDescription_en: 'A soft-shaped Cartier design with cushion-like form, jewellery character, and elegant wrist presence.', shortDescription_de: 'Ein weich geformtes Cartier-Design mit kissenartiger Form, Schmuckcharakter und eleganter Handgelenkspräsenz.' },
];

export const CARTIER_QUICK_FILTERS = [
  { label_en: 'Cartier Tank', label_de: 'Cartier Tank', link: '/cartier-tank-kaufen', filter: { collection: 'Tank' } },
  { label_en: 'Cartier Santos', label_de: 'Cartier Santos', link: '/cartier-santos-kaufen', filter: { collection: 'Santos' } },
  { label_en: 'Cartier Panthère', label_de: 'Cartier Panthère', link: '/cartier-panthere-kaufen', filter: { collection: 'Panthère' } },
  { label_en: 'Cartier Ballon Bleu', label_de: 'Cartier Ballon Bleu', link: '/cartier-ballon-bleu-kaufen', filter: { collection: 'Ballon Bleu' } },
  { label_en: 'Cartier Baignoire', label_de: 'Cartier Baignoire', link: '/cartier-baignoire-kaufen', filter: { collection: 'Baignoire' } },
  { label_en: 'Cartier Pasha', label_de: 'Cartier Pasha', link: '/cartier-pasha-kaufen', filter: { collection: 'Pasha' } },
  { label_en: 'Pre-Owned Cartier', label_de: 'Cartier gebraucht', link: '/cartier-gebraucht-kaufen', filter: { preOwned: true } },
  { label_en: 'Cartier for Women', label_de: 'Cartier für Damen', link: '/cartier-damen', filter: { gender: 'Women' } },
  { label_en: 'Cartier for Men', label_de: 'Cartier für Herren', link: '/cartier-herren', filter: { gender: 'Men' } },
  { label_en: 'Cartier with Box and Papers', label_de: 'Cartier mit Box und Papieren', link: '/guides', filter: { fullSet: true } },
];

export const CARTIER_SEO_CARDS = [
  { title_en: 'Buy Cartier Watch', title_de: 'Cartier Uhr kaufen', description_en: 'Explore Cartier watches through Kariv Glamour with refined product presentation, transparent details, and a premium shopping experience.', description_de: 'Entdecken Sie Cartier Uhren bei Kariv Glamour mit verfeinerter Produktpräsentation, transparenten Details und einem Premium-Einkaufserlebnis.', link: '/cartier-uhr-kaufen' },
  { title_en: 'Buy Pre-Owned Cartier', title_de: 'Cartier gebraucht kaufen', description_en: 'Discover pre-owned Cartier watches with clear condition grading, box and papers information, and detailed product data.', description_de: 'Entdecken Sie gebrauchte Cartier Uhren mit klarer Zustandsbewertung, Box und Papiere Informationen und detaillierten Produktdaten.', link: '/cartier-gebraucht-kaufen' },
  { title_en: 'Buy Cartier Tank', title_de: 'Cartier Tank kaufen', description_en: 'Browse Cartier Tank watches, one of the most recognizable rectangular watch designs in luxury watchmaking.', description_de: 'Stöbern Sie durch Cartier Tank Uhren, eines der erkennbarsten rechteckigen Uhrendesigns in der Luxusuhren-Herstellung.', link: '/cartier-tank-kaufen' },
  { title_en: 'Buy Cartier Santos', title_de: 'Cartier Santos kaufen', description_en: 'Explore Santos de Cartier watches, known for bold geometry, visible screws, and elegant everyday style.', description_de: 'Entdecken Sie Santos de Cartier Uhren, bekannt für kühne Geometrie, sichtbare Schrauben und eleganten Alltagsstil.', link: '/cartier-santos-kaufen' },
  { title_en: 'Buy Cartier Panthère', title_de: 'Cartier Panthère kaufen', description_en: 'Discover Panthère de Cartier watches with graceful bracelet design and jewellery-like elegance.', description_de: 'Entdecken Sie Panthère de Cartier Uhren mit anmutigem Armbanddesign und schmuckhafter Eleganz.', link: '/cartier-panthere-kaufen' },
  { title_en: 'Buy Cartier Ballon Bleu', title_de: 'Cartier Ballon Bleu kaufen', description_en: 'Shop Ballon Bleu de Cartier watches, known for rounded case design and refined Cartier style.', description_de: 'Shoppen Sie Ballon Bleu de Cartier Uhren, bekannt für gerundetes Gehäusedesign und verfeinerten Cartier-Stil.', link: '/cartier-ballon-bleu-kaufen' },
];

export const CARTIER_READ_MORE = [
  { title_en: 'Cartier Story', title_de: 'Cartier Story', description_en: 'Explore Cartier\u2019s design heritage, watchmaking elegance, and most recognizable watch families.', description_de: 'Entdecken Sie Cartiers Design-Erbe, Uhrmacher-Eleganz und die erkennbarsten Uhrenfamilien.', link: '/cartier/story', image: CARTIER_STORY_IMAGE },
  { title_en: 'Cartier Tank Guide', title_de: 'Cartier Tank Guide', description_en: 'Learn about the Tank collection and compare Tank Must, Tank Française, Tank Louis Cartier and Tank Américaine.', description_de: 'Erfahren Sie über die Tank-Kollektion und vergleichen Sie Tank Must, Tank Française, Tank Louis Cartier und Tank Américaine.', link: '/cartier-tank-kaufen', image: CARTIER_HERO_IMAGE },
  { title_en: 'Santos de Cartier Guide', title_de: 'Santos de Cartier Guide', description_en: 'Discover the design, history, and buying considerations behind Santos de Cartier watches.', description_de: 'Entdecken Sie Design, Geschichte und Kaufüberlegungen hinter Santos de Cartier Uhren.', link: '/cartier-santos-kaufen', image: CARTIER_SANTOS_IMAGE },
  { title_en: 'Cartier Watches for Women', title_de: 'Cartier Uhren für Damen', description_en: 'Explore elegant Cartier watches such as Panthère, Baignoire, Tank and Ballon Bleu.', description_de: 'Entdecken Sie elegante Cartier Uhren wie Panthère, Baignoire, Tank und Ballon Bleu.', link: '/cartier-damen', image: CARTIER_SANTOS_IMAGE },
  { title_en: 'Cartier Watches for Men', title_de: 'Cartier Uhren für Herren', description_en: 'Browse Cartier watches for men, including Santos, Tank, Pasha, Ballon Bleu and Drive-inspired designs.', description_de: 'Stöbern Sie durch Cartier Herrenuhren, einschließlich Santos, Tank, Pasha, Ballon Bleu und Drive-inspirierte Designs.', link: '/cartier-herren', image: CARTIER_SKELETON_IMAGE },
  { title_en: 'Buying Pre-Owned Cartier Watches', title_de: 'Gebrauchte Cartier Uhren kaufen', description_en: 'Understand condition, box and papers, service history and what to check before buying a used Cartier watch.', description_de: 'Verstehen Sie Zustand, Box und Papiere, Service-Historie und worauf Sie vor dem Kauf einer gebrauchten Cartier Uhr achten sollten.', link: '/cartier-gebraucht-kaufen', image: CARTIER_HERO_IMAGE },
];

export const CARTIER_INTERNAL_LINKS = [
  {
    title_en: 'Popular Cartier Searches', title_de: 'Beliebte Cartier Suchen',
    links: [
      { label_en: 'Buy Cartier watch', label_de: 'Cartier Uhr kaufen', to: '/cartier-uhr-kaufen' },
      { label_en: 'Buy pre-owned Cartier', label_de: 'Cartier gebraucht kaufen', to: '/cartier-gebraucht-kaufen' },
      { label_en: 'Used Cartier watches', label_de: 'Gebrauchte Cartier Uhren', to: '/gebrauchte-cartier-uhren' },
      { label_en: 'Cartier for women', label_de: 'Cartier für Damen', to: '/cartier-damen' },
      { label_en: 'Cartier for men', label_de: 'Cartier für Herren', to: '/cartier-herren' },
      { label_en: 'Cartier with box and papers', label_de: 'Cartier mit Box und Papieren', to: '/guides' },
    ],
  },
  {
    title_en: 'Cartier Collections', title_de: 'Cartier Kollektionen',
    links: [
      { label_en: 'Buy Cartier Tank', label_de: 'Cartier Tank kaufen', to: '/cartier-tank-kaufen' },
      { label_en: 'Buy Cartier Santos', label_de: 'Cartier Santos kaufen', to: '/cartier-santos-kaufen' },
      { label_en: 'Buy Cartier Panthère', label_de: 'Cartier Panthère kaufen', to: '/cartier-panthere-kaufen' },
      { label_en: 'Buy Cartier Ballon Bleu', label_de: 'Cartier Ballon Bleu kaufen', to: '/cartier-ballon-bleu-kaufen' },
      { label_en: 'Buy Cartier Baignoire', label_de: 'Cartier Baignoire kaufen', to: '/cartier-baignoire-kaufen' },
      { label_en: 'Buy Cartier Pasha', label_de: 'Cartier Pasha kaufen', to: '/cartier-pasha-kaufen' },
      { label_en: 'Buy Cartier Crash', label_de: 'Cartier Crash kaufen', to: '/cartier-crash-kaufen' },
    ],
  },
  {
    title_en: 'Related Watch Categories', title_de: 'Verwandte Uhrenkategorien',
    links: [
      { label_en: 'Selected Pre-Owned Watches', label_de: 'Ausgewählte gebrauchte Uhren', to: '/shop?isCertifiedPreOwned=true' },
      { label_en: 'Women\u2019s watches', label_de: 'Damenuhren', to: '/shop?gender=Women' },
      { label_en: 'Men\u2019s watches', label_de: 'Herrenuhren', to: '/shop?gender=Men' },
      { label_en: 'Dress Watches', label_de: 'Dress Watches', to: '/shop' },
      { label_en: 'Square & rectangular watches', label_de: 'Quadratische & rechteckige Uhren', to: '/shop' },
      { label_en: 'Gold watches', label_de: 'Golduhren', to: '/shop' },
    ],
  },
  {
    title_en: 'Related Luxury Watch Brands', title_de: 'Verwandte Luxusuhren-Marken',
    links: [
      { label_en: 'Rolex watches', label_de: 'Rolex Uhren', to: '/brands/rolex' },
      { label_en: 'Patek Philippe watches', label_de: 'Patek Philippe Uhren', to: '/brands/patek-philippe' },
      { label_en: 'Omega watches', label_de: 'Omega Uhren', to: '/brands/omega' },
      { label_en: 'Jaeger-LeCoultre watches', label_de: 'Jaeger-LeCoultre Uhren', to: '/brands/jaeger-lecoultre' },
      { label_en: 'Bulgari watches', label_de: 'Bulgari Uhren', to: '/brands/bvlgari' },
      { label_en: 'Audemars Piguet watches', label_de: 'Audemars Piguet Uhren', to: '/brands/audemars-piguet' },
    ],
  },
];

export const CARTIER_FAQS = [
  { q_en: 'Where can I buy a Cartier watch online?', q_de: 'Wo kann ich online eine Cartier Uhr kaufen?', a_en: "You can buy Cartier watches online at Kariv Glamour. Browse new and <a href='/cartier-gebraucht-kaufen'>pre-owned Cartier</a> watches with transparent product details, reference numbers, and condition grading.", a_de: "Sie können Cartier Uhren online bei Kariv Glamour kaufen. Stöbern Sie durch neue und <a href='/cartier-gebraucht-kaufen'>gebrauchte Cartier</a> Uhren mit transparenten Produktdetails, Referenznummern und Zustandsbewertung." },
  { q_en: 'Is it safe to buy a pre-owned Cartier watch?', q_de: 'Ist es sicher, eine gebrauchte Cartier Uhr zu kaufen?', a_en: "Yes. Buying <a href='/cartier-gebraucht-kaufen'>pre-owned Cartier</a> from Kariv Glamour includes clear condition grading, <a href='/guides'>box and papers</a> information, and detailed product data so you can buy with confidence.", a_de: "Ja. Der Kauf von <a href='/cartier-gebraucht-kaufen'>gebrauchten Cartier</a> Uhren bei Kariv Glamour umfasst klare Zustandsbewertung, <a href='/guides'>Box und Papiere</a> Informationen und detaillierte Produktdaten, damit Sie zuversichtlich kaufen können." },
  { q_en: 'Which Cartier watch is the most iconic?', q_de: 'Welche Cartier Uhr ist die ikonischste?', a_en: "The <a href='/cartier-tank-kaufen'>Cartier Tank</a> and <a href='/cartier-santos-kaufen'>Santos de Cartier</a> are among the most iconic Cartier watches, recognised for their distinctive shapes and timeless design.", a_de: "Der <a href='/cartier-tank-kaufen'>Cartier Tank</a> und <a href='/cartier-santos-kaufen'>Santos de Cartier</a> gehören zu den ikonischsten Cartier Uhren, anerkannt für ihre markanten Formen und zeitloses Design." },
  { q_en: 'What is the difference between Cartier Tank and Santos?', q_de: 'Was ist der Unterschied zwischen Cartier Tank und Santos?', a_en: "The <a href='/cartier-tank-kaufen'>Cartier Tank</a> features a rectangular case with refined proportions, while <a href='/cartier-santos-kaufen'>Santos de Cartier</a> has a square case with visible screws and a bolder geometric character.", a_de: "Der <a href='/cartier-tank-kaufen'>Cartier Tank</a> hat ein rechteckiges Gehäuse mit verfeinerten Proportionen, während <a href='/cartier-santos-kaufen'>Santos de Cartier</a> ein quadratisches Gehäuse mit sichtbaren Schrauben und einen kühneren geometrischen Charakter hat." },
  { q_en: 'Are Cartier watches good for women?', q_de: 'Sind Cartier Uhren für Damen geeignet?', a_en: "Yes. <a href='/cartier-damen'>Cartier watches for women</a> include elegant designs such as Panthère, Baignoire, Tank and Ballon Bleu, known for jewellery-like refinement and graceful proportions.", a_de: "Ja. <a href='/cartier-damen'>Cartier Uhren für Damen</a> umfassen elegante Designs wie Panthère, Baignoire, Tank und Ballon Bleu, bekannt für schmuckhafte Raffinesse und anmutige Proportionen." },
  { q_en: 'Are Cartier watches good for men?', q_de: 'Sind Cartier Uhren für Herren geeignet?', a_en: "Yes. <a href='/cartier-herren'>Cartier watches for men</a> include Santos, Tank, Pasha, Ballon Bleu and other designs that combine strong shapes with elegant proportions.", a_de: "Ja. <a href='/cartier-herren'>Cartier Uhren für Herren</a> umfassen Santos, Tank, Pasha, Ballon Bleu und weitere Designs, die starke Formen mit eleganten Proportionen verbinden." },
  { q_en: 'What does box and papers mean when buying Cartier?', q_de: 'Was bedeutet Box und Papiere beim Kauf von Cartier?', a_en: "<a href='/guides'>Box and papers</a> refers to the original presentation box and warranty or certificate documents. Having both can support authenticity and resale value.", a_de: "<a href='/guides'>Box und Papiere</a> bezieht sich auf die Original-Präsentationsbox und Garantie- oder Zertifikatsdokumente. Beides zu haben kann Authentizität und Wiederverkaufswert unterstützen." },
  { q_en: 'What should I check before buying a used Cartier watch?', q_de: 'Worauf sollte ich vor dem Kauf einer gebrauchten Cartier Uhr achten?', a_en: "Check the reference number, condition, <a href='/guides'>box and papers</a>, service history, and condition grading before buying a used Cartier watch.", a_de: "Prüfen Sie Referenznummer, Zustand, <a href='/guides'>Box und Papiere</a>, Service-Historie und Zustandsbewertung vor dem Kauf einer gebrauchten Cartier Uhr." },
  { q_en: 'Can I return a Cartier watch purchased online?', q_de: 'Kann ich eine online gekaufte Cartier Uhr zurückgeben?', a_en: "Yes, eligible purchases can be returned according to our <a href='/legal/returns-refund-policy'>returns policy</a>. Contact support within the return window if your watch is not as described.", a_de: "Ja, berechtigte Käufe können gemäß unserer <a href='/legal/returns-refund-policy'>Rückgaberichtlinie</a> zurückgegeben werden. Kontaktieren Sie den Support innerhalb des Rückgabezeitraums, wenn Ihre Uhr nicht wie beschrieben ist." },
];

export const CARTIER_SEO_PAGES = {
  'cartier-uhr-kaufen': { h1_en: 'Buy Cartier Watch', h1_de: 'Cartier Uhr kaufen', title_en: 'Buy Cartier Watch | Kariv Glamour', title_de: 'Cartier Uhr kaufen | Kariv Glamour', description_en: 'Buy Cartier watches at Kariv Glamour – new and pre-owned Cartier watches like Tank, Santos, Panthère and Ballon Bleu.', description_de: 'Cartier Uhr kaufen bei Kariv Glamour – neue und gebrauchte Cartier Uhren wie Tank, Santos, Panthère und Ballon Bleu.', intro_en: 'Discover a curated selection of elegant Cartier watches at Kariv Glamour. From new models to pre-owned Cartier watches – with transparent product information and reference numbers.', intro_de: 'Entdecken Sie eine kuratierte Auswahl eleganter Cartier Uhren bei Kariv Glamour. Von neuen Modellen bis zu gebrauchten Cartier Uhren – mit transparenter Produktinformation und Referenznummern.', filter: {} },
  'cartier-gebraucht-kaufen': { h1_en: 'Buy Pre-Owned Cartier', h1_de: 'Cartier gebraucht kaufen', title_en: 'Buy Pre-Owned Cartier | Kariv Glamour', title_de: 'Cartier gebraucht kaufen | Kariv Glamour', description_en: 'Buy pre-owned Cartier watches at Kariv Glamour with transparent condition grading and box & papers information.', description_de: 'Gebrauchte Cartier Uhren kaufen bei Kariv Glamour mit transparenter Zustandsbewertung und Box & Papers Informationen.', intro_en: 'Discover pre-owned Cartier watches with clear condition grading, box and papers information and detailed product data.', intro_de: 'Entdecken Sie gebrauchte Cartier Uhren mit klarer Zustandsbewertung, Box und Papers Informationen und detaillierten Produktdaten.', filter: {} },
  'gebrauchte-cartier-uhren': { h1_en: 'Used Cartier Watches', h1_de: 'Gebrauchte Cartier Uhren', title_en: 'Used Cartier Watches | Kariv Glamour', title_de: 'Gebrauchte Cartier Uhren | Kariv Glamour', description_en: 'Used Cartier watches at Kariv Glamour – compare Tank, Santos and Panthère listings.', description_de: 'Gebrauchte Cartier Uhren bei Kariv Glamour – Angebote für Tank, Santos und Panthère vergleichen.', intro_en: 'Browse used Cartier listings with clear condition information. Check each watch for any documented physical authentication.', intro_de: 'Entdecken Sie gebrauchte Cartier mit Zustandsangaben. Prüfen Sie bei jeder Uhr, ob eine physische Echtheitsprüfung dokumentiert ist.', filter: {} },
  'cartier-tank-kaufen': { h1_en: 'Buy Cartier Tank', h1_de: 'Cartier Tank kaufen', title_en: 'Buy Cartier Tank | Kariv Glamour', title_de: 'Cartier Tank kaufen | Kariv Glamour', description_en: 'Buy Cartier Tank at Kariv Glamour – the iconic rectangular Cartier watch in various versions.', description_de: 'Cartier Tank kaufen bei Kariv Glamour – die ikonische rechteckige Cartier Uhr in verschiedenen Ausführungen.', intro_en: 'The Cartier Tank is one of the world\u2019s most recognizable rectangular watches. Discover Cartier Tank models with elegant proportions and Roman numerals.', intro_de: 'Die Cartier Tank ist eine der erkennbarsten rechteckigen Uhren der Welt. Entdecken Sie Cartier Tank Modelle mit eleganten Proportionen und römischen Ziffern.', filter: { collection: 'Tank' } },
  'cartier-santos-kaufen': { h1_en: 'Buy Cartier Santos', h1_de: 'Cartier Santos kaufen', title_en: 'Buy Cartier Santos | Kariv Glamour', title_de: 'Cartier Santos kaufen | Kariv Glamour', description_en: 'Buy Santos de Cartier at Kariv Glamour – bold geometry and visible screws.', description_de: 'Santos de Cartier kaufen bei Kariv Glamour – markante Geometrie und sichtbare Schrauben.', intro_en: 'Santos de Cartier stands for bold geometry, visible screws and elegant everyday luxury. Discover Santos models at Kariv Glamour.', intro_de: 'Santos de Cartier steht für markante Geometrie, sichtbare Schrauben und elegante Alltagsluxus. Entdecken Sie Santos Modelle bei Kariv Glamour.', filter: { collection: 'Santos de Cartier' } },
  'cartier-panthere-kaufen': { h1_en: 'Buy Cartier Panthère', h1_de: 'Cartier Panthère kaufen', title_en: 'Buy Cartier Panthère | Kariv Glamour', title_de: 'Cartier Panthère kaufen | Kariv Glamour', description_en: 'Buy Panthère de Cartier at Kariv Glamour – jewellery-like bracelet design and graceful elegance.', description_de: 'Panthère de Cartier kaufen bei Kariv Glamour – schmuckhaftes Armbanddesign und elegante Anmut.', intro_en: 'Panthère de Cartier captivates with jewellery-like bracelet design and feminine elegance. Discover Panthère models at Kariv Glamour.', intro_de: 'Panthère de Cartier besticht durch schmuckhaftes Armbanddesign und feminine Eleganz. Entdecken Sie Panthère Modelle bei Kariv Glamour.', filter: { collection: 'Panthère de Cartier' } },
  'cartier-ballon-bleu-kaufen': { h1_en: 'Buy Cartier Ballon Bleu', h1_de: 'Cartier Ballon Bleu kaufen', title_en: 'Buy Cartier Ballon Bleu | Kariv Glamour', title_de: 'Cartier Ballon Bleu kaufen | Kariv Glamour', description_en: 'Buy Ballon Bleu de Cartier at Kariv Glamour – rounded case and refined crown.', description_de: 'Ballon Bleu de Cartier kaufen bei Kariv Glamour – gerundetes Gehäuse und feine Krone.', intro_en: 'Ballon Bleu de Cartier is known for its rounded case and refined crown detail. Discover Ballon Bleu models at Kariv Glamour.', intro_de: 'Ballon Bleu de Cartier ist bekannt für sein gerundetes Gehäuse und die feine Kronendetail. Entdecken Sie Ballon Bleu Modelle bei Kariv Glamour.', filter: { collection: 'Ballon Bleu de Cartier' } },
  'cartier-baignoire-kaufen': { h1_en: 'Buy Cartier Baignoire', h1_de: 'Cartier Baignoire kaufen', title_en: 'Buy Cartier Baignoire | Kariv Glamour', title_de: 'Cartier Baignoire kaufen | Kariv Glamour', description_en: 'Buy Cartier Baignoire at Kariv Glamour – oval design with sculptural elegance.', description_de: 'Cartier Baignoire kaufen bei Kariv Glamour – ovales Design mit skulpturaler Eleganz.', intro_en: 'The Cartier Baignoire impresses with oval design and sculptural elegance. Discover Baignoire models at Kariv Glamour.', intro_de: 'Die Cartier Baignoire überzeugt durch ovales Design und skulpturale Eleganz. Entdecken Sie Baignoire Modelle bei Kariv Glamour.', filter: { collection: 'Baignoire' } },
  'cartier-pasha-kaufen': { h1_en: 'Buy Cartier Pasha', h1_de: 'Cartier Pasha kaufen', title_en: 'Buy Cartier Pasha | Kariv Glamour', title_de: 'Cartier Pasha kaufen | Kariv Glamour', description_en: 'Buy Pasha de Cartier at Kariv Glamour – round case with bold personality.', description_de: 'Pasha de Cartier kaufen bei Kariv Glamour – rundes Gehäuse mit markanter Persönlichkeit.', intro_en: 'Pasha de Cartier combines round case design with bold personality. Discover Pasha models at Kariv Glamour.', intro_de: 'Pasha de Cartier vereint rundes Gehäusedesign mit markanter Persönlichkeit. Entdecken Sie Pasha Modelle bei Kariv Glamour.', filter: { collection: 'Pasha de Cartier' } },
  'cartier-crash-kaufen': { h1_en: 'Buy Cartier Crash', h1_de: 'Cartier Crash kaufen', title_en: 'Buy Cartier Crash | Kariv Glamour', title_de: 'Cartier Crash kaufen | Kariv Glamour', description_en: 'Buy Cartier Crash at Kariv Glamour – asymmetrical case with strong collector appeal.', description_de: 'Cartier Crash kaufen bei Kariv Glamour – asymmetrisches Gehäuse mit starker Sammleranziehung.', intro_en: 'The Cartier Crash is a unmistakable design with asymmetrical case and strong collector appeal. Discover available models at Kariv Glamour.', intro_de: 'Die Cartier Crash ist ein unverkennbares Design mit asymmetrischem Gehäuse und starker Sammleranziehung. Entdecken Sie verfügbare Modelle bei Kariv Glamour.', filter: { collection: 'Cartier Crash' } },
  'cartier-herren': { h1_en: 'Cartier Watches for Men', h1_de: 'Cartier Uhren für Herren', title_en: 'Cartier Watches for Men | Kariv Glamour', title_de: 'Cartier Uhr Herren | Kariv Glamour', description_en: 'Cartier watches for men at Kariv Glamour – Santos, Tank, Pasha and Ballon Bleu.', description_de: 'Cartier Uhren für Herren bei Kariv Glamour – Santos, Tank, Pasha und Ballon Bleu.', intro_en: 'Discover Cartier watches for men, including Santos, Tank, Pasha and Ballon Bleu – strong shapes with elegant proportions.', intro_de: 'Entdecken Sie Cartier Uhren für Herren, darunter Santos, Tank, Pasha und Ballon Bleu – starke Formen mit eleganten Proportionen.', filter: { gender: 'Men' } },
  'cartier-damen': { h1_en: 'Cartier Watches for Women', h1_de: 'Cartier Uhren für Damen', title_en: 'Cartier Watches for Women | Kariv Glamour', title_de: 'Cartier Uhr Damen | Kariv Glamour', description_en: 'Cartier watches for women at Kariv Glamour – Panthère, Baignoire, Tank and Ballon Bleu.', description_de: 'Cartier Uhren für Damen bei Kariv Glamour – Panthère, Baignoire, Tank und Ballon Bleu.', intro_en: 'Discover Cartier watches for women like Panthère, Baignoire, Tank and Ballon Bleu – jewellery-like elegance and graceful proportions.', intro_de: 'Entdecken Sie Cartier Uhren für Damen wie Panthère, Baignoire, Tank und Ballon Bleu – schmuckhafte Eleganz und anmutige Proportionen.', filter: { gender: 'Women' } },
  'cartier-story': { h1_en: 'Cartier Story', h1_de: 'Cartier Story', title_en: 'Cartier Story | Kariv Glamour', title_de: 'Cartier Story | Kariv Glamour', description_en: 'The Cartier Story – design heritage, watchmaking elegance and iconic watch families.', description_de: 'Die Cartier Story – Designheritage, Uhrmachereleganz und ikonische Uhrenfamilien.', intro_en: 'Cartier has shaped luxury design through a unique combination of jewellery expertise, watchmaking creativity, and instantly recognizable forms.', intro_de: 'Cartier hat das Luxusdesign durch eine einzigartige Verbindung aus Schmuckexpertise, uhrmacherischer Kreativität und unverkennbaren Formen geprägt.', isGuide: true },
};

applyCzechSeoPages(CARTIER_SEO_PAGES, 'Cartier', 'cartier');
applyCzechBrandFaqs(CARTIER_FAQS, 'cartier');
applyCzechBrandContent('cartier', CARTIER_COLLECTIONS, CARTIER_QUICK_FILTERS, CARTIER_SEO_CARDS, CARTIER_READ_MORE, CARTIER_INTERNAL_LINKS);
