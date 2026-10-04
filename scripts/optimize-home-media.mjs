import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const watchAssets = [
  ['rolex/collections/rolex-datejust.png', 'rolex-datejust.webp', 560],
  ['rolex/collections/rolex-day-date.png', 'rolex-day-date.webp', 560],
  ['rolex/collections/rolex-submariner.png', 'rolex-submariner.webp', 560],
  ['rolex/collections/rolex-cosmograph-daytona.png', 'rolex-daytona.webp', 560],
  ['omega/collections/omega-speedmaster-collection.png', 'omega-speedmaster.webp', 560],
  ['audemars-piguet/collections/audemars-piguet-royal-oak-collection.png', 'ap-royal-oak.webp', 560],
  ['patek-philippe/collections/patek-philippe-nautilus-collection.png', 'patek-nautilus.webp', 560],
  ['cartier/collections/cartier-santos-de-cartier.png', 'cartier-santos.webp', 560],
  ['tudor/collections/tudor-black-bay-collection.png', 'tudor-black-bay.webp', 560],
  ['iwc-schaffhausen/page/iwc-schaffhausen-portugieser-guide.jpg', 'iwc-portugieser.webp', 480, 78],
];

const outputs = [];
async function createWebp(input, output, maxWidth, quality = 84) {
  await fs.mkdir(path.dirname(output), { recursive: true });
  await sharp(input, { failOn: 'error' })
    .resize({ width: maxWidth, height: maxWidth, fit: 'inside', withoutEnlargement: true })
    .webp({ quality, alphaQuality: 95, effort: 5 })
    .toFile(output);
  const [before, after] = await Promise.all([fs.stat(input), fs.stat(output)]);
  outputs.push({ file: path.relative(publicDir, output).replaceAll('\\', '/'), before: before.size, after: after.size });
}

for (const [source, name, maxWidth, quality] of watchAssets) {
  await createWebp(
    path.join(publicDir, 'brand-assets', source),
    path.join(publicDir, 'media', 'home', name),
    maxWidth,
    quality,
  );
}

for (const theme of ['light', 'dark']) {
  const input = path.join(publicDir, 'logos', `kariv-emblem-${theme}.png`);
  await createWebp(input, path.join(publicDir, 'logos', `kariv-emblem-${theme}.webp`), 256, 90);
  const icon = path.join(publicDir, 'logos', `kariv-emblem-${theme}-icon.png`);
  await sharp(input, { failOn: 'error' })
    .resize({ width: 192, height: 192, fit: 'inside' })
    .png({ compressionLevel: 9 })
    .toFile(icon);
  const [before, after] = await Promise.all([fs.stat(input), fs.stat(icon)]);
  outputs.push({ file: path.relative(publicDir, icon).replaceAll('\\', '/'), before: before.size, after: after.size });
}

const before = outputs.reduce((sum, item) => sum + item.before, 0);
const after = outputs.reduce((sum, item) => sum + item.after, 0);
console.log(JSON.stringify({ files: outputs.length, beforeBytes: before, afterBytes: after, savedPercent: Math.round((1 - after / before) * 1000) / 10, outputs }, null, 2));
