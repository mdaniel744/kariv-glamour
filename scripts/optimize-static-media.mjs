import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');

const assets = [
  ['logos/kariv-glamour-desktop-white.png', 'logos/kariv-glamour-desktop-white.webp', 768, 92],
  ['logos/kariv-glamour-mobile-green.png', 'logos/kariv-glamour-mobile-green.webp', 768, 92],
  ['logos/kariv-glamour-desktop-green.png', 'logos/kariv-glamour-desktop-green.webp', 768, 92],
  ['logos/kariv-glamour-mobile-white.png', 'logos/kariv-glamour-mobile-white.webp', 768, 92],
  ['media/kariv-principle.png', 'media/kariv-principle.webp', 1440, 88],
  ['brand-assets/hublot/page/hublot-hero.png', 'brand-assets/hublot/page/hublot-hero.webp', 1800, 92],
  ['brand-assets/hublot/page/hublot-brand-story.jpg', 'brand-assets/hublot/page/hublot-brand-story.webp', 1920, 88],
  ['brand-assets/hublot/page/hublot-pre-owned-guide.webp', 'brand-assets/hublot/page/hublot-pre-owned-guide.optimized.webp', 1800, 86],
  ['brand-assets/omega/page/buy-omega-seamaster-diver-300m.png', 'brand-assets/omega/page/buy-omega-seamaster-diver-300m.webp', 1200, 90],
  ['brand-assets/jaeger-lecoultre/page/jaeger-lecoultre-hero.png', 'brand-assets/jaeger-lecoultre/page/jaeger-lecoultre-hero.webp', 1600, 92],
  ['brand-assets/grand-seiko/page/grand-seiko-hero.png', 'brand-assets/grand-seiko/page/grand-seiko-hero.webp', 1200, 92],
  ['brand-assets/grand-seiko/page/grand-seiko-spring-drive-vs-snowflake.jpg', 'brand-assets/grand-seiko/page/grand-seiko-spring-drive-vs-snowflake.webp', 1800, 86],
  ['brand-assets/grand-seiko/page/grand-seiko-shunbun-vs-snowflake.webp', 'brand-assets/grand-seiko/page/grand-seiko-shunbun-vs-snowflake.optimized.webp', 1800, 86],
  ['brand-assets/breitling/page/breitling-navitimer-collector-guide.webp', 'brand-assets/breitling/page/breitling-navitimer-collector-guide.optimized.webp', 1800, 86],
  ['brand-assets/rolex/which-rolex-watch-to-buy.jpg', 'brand-assets/rolex/which-rolex-watch-to-buy.webp', 1600, 86],
  ['brand-assets/audemars-piguet/page/ap-royal-oak-guide.jpg', 'brand-assets/audemars-piguet/page/ap-royal-oak-guide.webp', 1800, 86],
  ['brand-assets/patek-philippe/patek-philippe-maintenance.avif', 'brand-assets/patek-philippe/patek-philippe-maintenance.webp', 1800, 86],
];

const report = [];
const sourceAvailability = await Promise.all(assets.map(async ([inputRelative]) => {
  try {
    await fs.access(path.join(publicDir, inputRelative));
    return true;
  } catch {
    return false;
  }
}));

if (sourceAvailability.every((available) => !available)) {
  console.log('Static media is already optimized. Restore the superseded source files from Git only when intentionally regenerating these replacements.');
  process.exit(0);
}

if (sourceAvailability.some((available) => !available)) {
  throw new Error('Static optimization sources are only partially present. Restore the complete source set from Git before regenerating.');
}

for (const [inputRelative, outputRelative, maxDimension, quality] of assets) {
  const input = path.join(publicDir, inputRelative);
  const output = path.join(publicDir, outputRelative);
  const inputStat = await fs.stat(input);
  const inputMetadata = await sharp(input).metadata();

  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp(input, { failOn: 'error' })
    .rotate()
    .toColourspace('srgb')
    .resize({ width: maxDimension, height: maxDimension, fit: 'inside', withoutEnlargement: true })
    .webp({ quality, alphaQuality: 94, smartSubsample: true, effort: 5 })
    .toFile(output);

  const outputStat = await fs.stat(output);
  const outputMetadata = await sharp(output).metadata();
  report.push({
    input: `/${inputRelative.replaceAll('\\', '/')}`,
    output: `/${outputRelative.replaceAll('\\', '/')}`,
    beforeBytes: inputStat.size,
    afterBytes: outputStat.size,
    savedBytes: inputStat.size - outputStat.size,
    savedPercent: Math.round((1 - outputStat.size / inputStat.size) * 1000) / 10,
    beforeDimensions: `${inputMetadata.width}×${inputMetadata.height}`,
    afterDimensions: `${outputMetadata.width}×${outputMetadata.height}`,
  });
}

const reportPath = path.join(root, 'docs', 'static-media-optimization.json');
await fs.mkdir(path.dirname(reportPath), { recursive: true });
await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);

const totalBefore = report.reduce((sum, item) => sum + item.beforeBytes, 0);
const totalAfter = report.reduce((sum, item) => sum + item.afterBytes, 0);
console.log(JSON.stringify({
  assets: report.length,
  beforeMegabytes: Math.round(totalBefore / 1024 / 1024 * 100) / 100,
  afterMegabytes: Math.round(totalAfter / 1024 / 1024 * 100) / 100,
  savedPercent: Math.round((1 - totalAfter / totalBefore) * 1000) / 10,
}, null, 2));
