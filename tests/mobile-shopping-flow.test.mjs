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

test('fallback brand pages use the same compact title, collections, and shop order', () => {
  const source = read('src/page-content/BrandDetail.jsx');

  assert.match(source, /data-site-hero="brand"/);
  assert.doesNotMatch(source, /brand\?\.heroImage|ChevronRight/);
  assert.match(source, /data-brand-collections-header className="hidden"/);
  assert.match(source, /<div className="hidden">\s*<h2[^>]*>\{copy\.available\}/);
  assert.match(source, /border-t border-border py-5 sm:py-6 md:py-8/);
});
