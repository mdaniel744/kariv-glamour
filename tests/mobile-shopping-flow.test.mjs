import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const COLLECTION_COMPONENTS = [
  'src/components/audemarspiguet/APCollectionGrid.jsx',
  'src/components/breitling/BreitlingCollectionGrid.jsx',
  'src/components/bvlgari/BvlgariCollectionGrid.jsx',
  'src/components/cartier/CartierCollectionGrid.jsx',
  'src/components/girardperregaux/GirardPerregauxCollectionGrid.jsx',
  'src/components/grandseiko/GrandSeikoCollectionGrid.jsx',
  'src/components/hublot/HublotCollectionGrid.jsx',
  'src/components/iwc/IWCCollectionGrid.jsx',
  'src/components/jaegerlecoultre/JLCCollectionGrid.jsx',
  'src/components/omega/OmegaCollectionCarousel.jsx',
  'src/components/panerai/PaneraiCollectionGrid.jsx',
  'src/components/patek/PatekPhilippeCollectionCarousel.jsx',
  'src/components/rolex/RolexCollectionCarousel.jsx',
  'src/components/tagheuer/TAGHeuerCollectionGrid.jsx',
  'src/components/tudor/TudorCollectionGrid.jsx',
];

const PRODUCT_COMPONENTS = COLLECTION_COMPONENTS.map((path) =>
  path.replace(/Collection(?:Grid|Carousel)\.jsx$/, 'ProductGrid.jsx'),
);

const SEO_LANDING_COMPONENTS = [
  'AudemarsPiguetSeoLanding.jsx',
  'BreitlingSeoLanding.jsx',
  'BvlgariSeoLanding.jsx',
  'CartierSeoLanding.jsx',
  'GirardPerregauxSeoLanding.jsx',
  'GrandSeikoSeoLanding.jsx',
  'HublotSeoLanding.jsx',
  'IWCSeoLanding.jsx',
  'JaegerLeCoultreSeoLanding.jsx',
  'OmegaSeoLanding.jsx',
  'PaneraiSeoLanding.jsx',
  'PatekPhilippeSeoLanding.jsx',
  'RolexSeoLanding.jsx',
  'TAGHeuerSeoLanding.jsx',
  'TudorSeoLanding.jsx',
].map((file) => `src/page-content/${file}`);

test('the home hero keeps its primary shopping controls compact on mobile', () => {
  const source = read('src/components/home/HeroSection.jsx');

  assert.match(source, /data-site-hero="home"/);
  assert.match(source, /min-h-\[220px\]/);
  assert.match(source, /hidden max-w-xl[\s\S]*md:block/);
  assert.match(source, /mt-5 hidden flex-wrap[\s\S]*md:flex/);
});

test('brand heroes show only their title before the collection rail on every screen size', () => {
  const source = read('src/components/shared/BrandHero.jsx');

  assert.match(source, /data-site-hero="brand"/);
  assert.match(source, /hero\.title/);
  assert.doesNotMatch(source, /hero\.description|hero\.shopCTA|MediaImage|LocalizedLink|ChevronRight/);
});

test('every custom brand hides collection and shop titles while preserving the shopping sections', () => {
  COLLECTION_COMPONENTS.forEach((path) => {
    const source = read(path);
    assert.match(source, /data-brand-collections/, `${path} needs the collection marker`);
    assert.match(source, /data-brand-collections-header className="hidden"/, `${path} needs an always-hidden collection introduction`);
    assert.match(source, /py-3 sm:py-4 md:py-8/, `${path} needs compact spacing at every breakpoint`);
  });

  PRODUCT_COMPONENTS.forEach((path) => {
    const source = read(path);
    assert.match(source, /py-5 sm:py-6 md:py-8/, `${path} needs compact shop spacing at every breakpoint`);
    assert.match(source, /<div className="hidden">\s*<span[^>]*>\{t\('productGrid\.eyebrow'\)/, `${path} needs an always-hidden shop title`);
  });
});

test('brand collection tiles are compact on mobile and apply real collection filters', () => {
  COLLECTION_COMPONENTS.forEach((path) => {
    const source = read(path);
    assert.match(source, /data-collection-card/, `${path} needs a collection-card marker`);
    assert.match(source, /h-\[164px\]/, `${path} needs a compact, consistent mobile tile`);
    assert.match(source, /sm:h-\[230px\]/, `${path} needs a fixed desktop tile height`);
    assert.match(source, /h-\[calc\(100%-48px\)\]/, `${path} needs a dedicated image area above the title`);
    assert.match(source, /flex h-12 items-center/, `${path} needs a dedicated title row that cannot overlap the image`);
    assert.match(source, /scale-\[1\.18\]/, `${path} needs enlarged mobile watch imagery`);
    assert.match(source, /h-\[calc\(100%-48px\)\] overflow-hidden/, `${path} must clip enlarged imagery above the title row`);
    assert.match(source, /line-clamp-2[^\n]*leading-tight text-primary/, `${path} needs a contained theme-aware title`);
    assert.doesNotMatch(source, /from-black\/75|via-black\/35/, `${path} must not use a dark title gradient`);
    assert.doesNotMatch(source, /sm:aspect-\[/, `${path} must not return to a tall desktop aspect ratio`);
    assert.match(source, /\/shop\?brand=\$\{encodeURIComponent\(BRAND\)\}&collection=\$\{encodeURIComponent\((?:c|col)\.name\)\}/, `${path} needs a valid catalogue filter fallback`);
    assert.match(source, /handleBrandCollectionFilterClick\(event, (?:c|col)\.name\)/, `${path} needs same-page collection filtering`);
  });

  const quickFilters = read('src/components/shared/BrandQuickFilters.jsx');
  assert.match(quickFilters, /BRAND_COLLECTION_FILTER_EVENT/);
  assert.doesNotMatch(quickFilters, /rounded-xl border border-border\/80 bg-background\/95/);
});

test('SEO model and collection pages share one responsive horizontal pill rail', () => {
  SEO_LANDING_COMPONENTS.forEach((path) => {
    const source = read(path);
    assert.match(source, /import SeoPillRail/, `${path} needs the shared pill rail`);
    assert.match(source, /<SeoPillRail items=\{\w+_QUICK_FILTERS\}/, `${path} needs its related models in the rail`);
    assert.doesNotMatch(source, /flex flex-wrap gap-2 justify-center/, `${path} must keep related models on one line`);
  });

  const rail = read('src/components/shared/SeoPillRail.jsx');
  assert.match(rail, /overflow-x-auto/);
  assert.match(rail, /touch-pan-x/);
  assert.match(rail, /rounded-full/);
  assert.match(rail, /onMouseEnter=\{\(\) => startHoverScroll\(-1\)\}/);
  assert.match(rail, /onMouseEnter=\{\(\) => startHoverScroll\(1\)\}/);
});

test('fallback brand pages use the same compact title, collections, and shop order', () => {
  const source = read('src/page-content/BrandDetail.jsx');

  assert.match(source, /data-site-hero="brand"/);
  assert.doesNotMatch(source, /brand\?\.heroImage|ChevronRight/);
  assert.match(source, /data-brand-collections-header className="hidden"/);
  assert.match(source, /<div className="hidden">\s*<h2[^>]*>\{copy\.available\}/);
  assert.match(source, /border-t border-border py-5 sm:py-6 md:py-8/);
});
