import { guideTopic } from './topics.js';

// Existing editorial assets, not listing photographs. Never imply that the
// illustrated example is the exact reference or an item currently for sale.
const photo = (path, en, de, contain = false) => ({ src: `/brand-assets/${path}`, alt: { en, de }, contain });
const BRAND_MEDIA = {
  rolex: photo('rolex/which-rolex-watch-to-buy.webp', 'A selection of Rolex watches', 'Eine Auswahl von Rolex-Uhren'),
  patekPhilippe: photo('patek-philippe/patek-philippe-buying-watch-guide.webp', 'Patek Philippe Nautilus in its presentation box', 'Patek Philippe Nautilus in ihrer Präsentationsbox'),
  omega: photo('omega/page/which-omega-watch-to-buy.jpg', 'Omega watches', 'Omega-Uhren'),
  cartier: photo('cartier/collections/cartier-tank.png', 'Cartier Tank', 'Cartier Tank', true),
  audemarsPiguet: photo('audemars-piguet/page/ap-royal-oak-guide.webp', 'Audemars Piguet Royal Oak', 'Audemars Piguet Royal Oak'),
  breitling: photo('breitling/page/breitling-buying-guide.jpg', 'Breitling watch detail', 'Detail einer Breitling-Uhr'),
  hublot: photo('hublot/page/hublot-big-bang-guide.jpg', 'Hublot Big Bang', 'Hublot Big Bang'),
  grandSeiko: photo('grand-seiko/page/grand-seiko-snowflake-guide.jpg', 'Grand Seiko Snowflake', 'Grand Seiko Snowflake'),
  iwc: photo('iwc-schaffhausen/page/iwc-schaffhausen-portugieser-guide.jpg', 'IWC Portugieser', 'IWC Portugieser'),
  jaegerLeCoultre: photo('jaeger-lecoultre/page/jaeger-lecoultre-reverso.jpg', 'Jaeger-LeCoultre Reverso', 'Jaeger-LeCoultre Reverso'),
  tagHeuer: photo('tag-heuer/page/tag-heuer-carrera-chronograph.avif', 'TAG Heuer Carrera chronograph', 'TAG Heuer Carrera Chronograph', true),
  tudor: photo('tudor/page/tudor-black-bay-watch.webp', 'Tudor Black Bay', 'Tudor Black Bay', true),
  panerai: photo('panerai/page/panerai-luminor-guide.avif', 'Panerai Luminor', 'Panerai Luminor', true),
  bvlgari: photo('bvlgari/collections/bvlgari-octo-finissimo-collection.png', 'Bvlgari Octo Finissimo', 'Bvlgari Octo Finissimo', true),
  girardPerregaux: photo('girard-perregaux/collections/girard-perregaux-laureato-collection.png', 'Girard-Perregaux Laureato', 'Girard-Perregaux Laureato', true),
};

const TECHNICAL_MEDIA = {
  papers: photo('rolex/rolex-box-and-papers.webp', 'Rolex presentation box and documents', 'Rolex-Präsentationsbox und Dokumente'),
  archives: photo('patek-philippe/patek-philippe-boxes-and-papers.jpg', 'Patek Philippe presentation box and documents', 'Patek-Philippe-Präsentationsbox und Dokumente'),
  rolexMechanics: photo('rolex/rolex-watchmaking.avif', 'Gloved hands inspecting a Rolex watch', 'Behandschuhte Hände prüfen eine Rolex-Uhr'),
  patekMechanics: photo('patek-philippe/patek-philippe-watchmaking.jpg', 'Patek Philippe watchmaking detail', 'Detail der Patek-Philippe-Uhrmacherei'),
  coaxial: photo('omega/page/omega-watch-making.jpg', 'A watchmaker working on a movement', 'Ein Uhrmacher arbeitet an einem Uhrwerk'),
  metas: photo('omega/page/omega-watch-making.jpg', 'Work on a watch movement', 'Arbeit an einem Uhrwerk'),
  springDrive: photo('grand-seiko/page/grand-seiko-spring-drive-guide.webp', 'Grand Seiko Spring Drive dive watch', 'Grand-Seiko-Spring-Drive-Taucheruhr'),
  snowflakeShunbun: photo('grand-seiko/page/grand-seiko-shunbun-vs-snowflake.optimized.webp', 'Grand Seiko Shunbun and Snowflake dial designs', 'Zifferblattdesigns von Grand Seiko Shunbun und Snowflake'),
  ingenieur: photo('iwc-schaffhausen/page/iwc-schaffhausen-ingenieur-guide.jpg', 'IWC Ingenieur', 'IWC Ingenieur'),
  iwcAutomatic: photo('iwc-schaffhausen/page/iwc-schaffhausen-automatic-guide.webp', 'IWC automatic watch', 'IWC-Automatikuhr'),
  pilot: photo('iwc-schaffhausen/page/iwc-schaffhausen-hero.png', 'IWC Pilot’s Watch chronograph with a blue dial', 'IWC-Pilot’s-Watch-Chronograph mit blauem Zifferblatt', true),
  duoface: photo('jaeger-lecoultre/page/jaeger-lecoultre-reverso-duoface.jpg', 'Jaeger-LeCoultre Reverso Duoface', 'Jaeger-LeCoultre Reverso Duoface'),
  masterChronograph: photo('jaeger-lecoultre/page/jaeger-lecoultre-master-control-guide.webp', 'Jaeger-LeCoultre Master Control chronograph with calendar', 'Jaeger-LeCoultre-Master-Control-Chronograph mit Kalender'),
  carreraFormula: photo('tag-heuer/page/tag-heuer-carrera-vs-formula-1.webp', 'TAG Heuer Carrera and Formula 1 watches', 'TAG-Heuer-Carrera- und Formula-1-Uhren'),
  connected: photo('tag-heuer/page/tag-heuer-connected-calibre-e5.avif', 'TAG Heuer Connected', 'TAG Heuer Connected', true),
  serpenti: photo('bvlgari/collections/bvlgari-serpenti-collection.png', 'Bvlgari Serpenti', 'Bvlgari Serpenti', true),
  jackpot: { src: '/editorial/jackpot-mechanisms.svg', alt: { en: 'Jackpot Tourbillon: tourbillon, reel display and chime — a conceptual diagram, not the watch layout', de: 'Jackpot Tourbillon: Tourbillon, Walzenanzeige und Schlagwerk — ein Schaubild, kein Werkplan' }, contain: true },
};

const SUPPORTING_MEDIA = {
  rolex: photo('rolex/rolex-submariner-guide.jpg', 'Rolex Submariner dial and bezel variations', 'Zifferblatt- und Lünettenvarianten der Rolex Submariner'),
  patekPhilippe: photo('patek-philippe/patek-philippe-nautilus-guide.jpg', 'Patek Philippe Nautilus', 'Patek Philippe Nautilus'),
  omega: photo('omega/page/omega-speedmaster-guide.jpg', 'Omega Speedmaster', 'Omega Speedmaster'),
  cartier: photo('cartier/collections/cartier-santos-de-cartier.png', 'Santos de Cartier', 'Santos de Cartier', true),
  audemarsPiguet: photo('audemars-piguet/page/ap-royal-oak-offshore-guide.avif', 'Audemars Piguet Royal Oak Offshore', 'Audemars Piguet Royal Oak Offshore'),
  breitling: photo('breitling/page/breitling-navitimer-collector-guide.optimized.webp', 'Breitling Navitimer', 'Breitling Navitimer'),
  hublot: photo('hublot/page/hublot-classic-fusion-guide.jpg', 'Hublot Classic Fusion', 'Hublot Classic Fusion'),
  grandSeiko: TECHNICAL_MEDIA.springDrive,
  iwc: TECHNICAL_MEDIA.ingenieur,
  jaegerLeCoultre: photo('jaeger-lecoultre/page/jaeger-lecoultre-master-control-guide.webp', 'Jaeger-LeCoultre Master Control', 'Jaeger-LeCoultre Master Control'),
  tagHeuer: photo('tag-heuer/page/tag-heuer-aquaracer-300m.png', 'TAG Heuer Aquaracer', 'TAG Heuer Aquaracer', true),
  tudor: photo('tudor/page/tudor-pelagos-guide.png', 'Tudor Pelagos', 'Tudor Pelagos', true),
  panerai: photo('panerai/page/panerai-radiomir-guide.avif', 'Panerai Radiomir', 'Panerai Radiomir', true),
  bvlgari: TECHNICAL_MEDIA.serpenti,
  girardPerregaux: photo('girard-perregaux/collections/girard-perregaux-bridges-collection.png', 'Girard-Perregaux Bridges', 'Girard-Perregaux Bridges', true),
};

export function getGuideMedia(route, locale = 'en') {
  const topic = guideTopic(route.slug);
  const hero = TECHNICAL_MEDIA[topic] || BRAND_MEDIA[route.pageKey];
  if (!hero) return null;
  // Specific technical articles use one relevant image; broader family/choice
  // articles use a second illustration to help readers compare design language.
  let supporting = ['story', 'choice', 'newPreowned', 'price', 'vintage', 'speedSeamaster', 'blackBayPelagos', 'luminorRadiomir', 'luminorSubmersible'].includes(topic)
    ? SUPPORTING_MEDIA[route.pageKey] : null;
  if (topic === 'speedSeamaster') supporting = photo('omega/page/omega-seamaster-guide.jpg', 'Omega Seamaster', 'Omega Seamaster');
  if (topic === 'luminorSubmersible') supporting = photo('panerai/page/panerai-submersible-guide.avif', 'Panerai Submersible with rotating timing bezel', 'Panerai Submersible mit drehbarer Zeitlünette', true);
  const localize = (media) => media && ({ ...media, alt: media.alt[locale] || media.alt.en });
  return { hero: localize(hero), supporting: localize(supporting) };
}
