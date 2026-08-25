import fs from 'node:fs/promises';
import path from 'node:path';

const sourceRoot = path.join(process.cwd(), 'src');
const targets = [];

async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    if (entry.isFile() && /(CollectionPage|SeoLanding)\.jsx$/.test(entry.name)) targets.push(fullPath);
  }
}

await walk(sourceRoot);

const imagePattern = /<img\s+src=\{(p|product)\.featuredImage\}\s+alt=\{localize\(\1, 'productTitle'\)\}\s+loading="lazy"\s+className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"\s*\/>/g;
let changedFiles = 0;
let changedImages = 0;

for (const file of targets) {
  const source = await fs.readFile(file, 'utf8');
  let replacements = 0;
  let next = source.replace(imagePattern, (_match, variable) => {
    replacements += 1;
    return `<ProductCardImage src={${variable}.featuredImage} alt={localize(${variable}, 'productTitle')} />`;
  });

  if (replacements === 0) continue;
  if (!next.includes("@/components/shared/ProductCardImage")) {
    next = next.replace(/(import React[^\n]*\n)/, "$1import ProductCardImage from '@/components/shared/ProductCardImage';\n");
  }
  await fs.writeFile(file, next);
  changedFiles += 1;
  changedImages += replacements;
}

console.log(JSON.stringify({ changedFiles, changedImages }, null, 2));
