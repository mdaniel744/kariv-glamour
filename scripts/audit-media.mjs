import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const RASTER_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);
const MEDIA_EXTENSIONS = new Set([...RASTER_EXTENSIONS, '.svg', '.mp4', '.webm']);
const args = new Map();

for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const label = args.get('--label') || 'inventory';
const jsonOutput = args.get('--output') || `docs/media-inventory-${label}.json`;
const markdownOutput = args.get('--markdown') || `docs/media-inventory-${label}.md`;

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

function flagsFor(item) {
  const flags = [];
  if (item.bytes > 300 * 1024) flags.push('>300KB');
  if (item.bytes > 500 * 1024) flags.push('>500KB');
  if (item.bytes > 1024 * 1024) flags.push('>1MB');
  if (item.bytes > 2 * 1024 * 1024) flags.push('>2MB');
  if ((item.width || 0) > 3000) flags.push('>3000px');
  if ((item.width || 0) > 4000) flags.push('>4000px');
  if (item.extension === '.png' && !item.hasAlpha) flags.push('opaque-png');
  return flags;
}

const sourceFiles = (await walk(path.join(ROOT, 'src')))
  .filter((file) => /\.(?:js|jsx|ts|tsx|css)$/.test(file));
const sourceText = (await Promise.all(sourceFiles.map(async (file) => {
  try { return await readFile(file, 'utf8'); } catch { return ''; }
}))).join('\n');

const inventory = [];
for (const file of await walk(PUBLIC_DIR)) {
  const extension = path.extname(file).toLowerCase();
  if (!MEDIA_EXTENSIONS.has(extension)) continue;
  const fileStat = await stat(file);
  const relativePath = `/${path.relative(PUBLIC_DIR, file).replaceAll('\\', '/')}`;
  const item = {
    path: relativePath,
    extension,
    bytes: fileStat.size,
    kilobytes: Number((fileStat.size / 1024).toFixed(1)),
    referencedInSource: sourceText.includes(relativePath) || sourceText.includes(path.basename(file)),
  };

  if (RASTER_EXTENSIONS.has(extension)) {
    try {
      const metadata = await sharp(file, { animated: true }).metadata();
      Object.assign(item, {
        format: metadata.format,
        width: metadata.width || null,
        height: metadata.height || null,
        aspectRatio: metadata.width && metadata.height
          ? Number((metadata.width / metadata.height).toFixed(3))
          : null,
        hasAlpha: Boolean(metadata.hasAlpha),
        orientation: metadata.orientation || null,
        pages: metadata.pages || 1,
        colorSpace: metadata.space || null,
      });
    } catch (error) {
      item.metadataError = error.message;
    }
  }

  item.flags = flagsFor(item);
  const buffer = await readFile(file);
  item.sha256 = createHash('sha256').update(buffer).digest('hex');
  inventory.push(item);
}

inventory.sort((a, b) => b.bytes - a.bytes);
const formatTotals = {};
for (const item of inventory) {
  const key = item.extension.replace('.', '') || 'unknown';
  formatTotals[key] ??= { count: 0, bytes: 0 };
  formatTotals[key].count += 1;
  formatTotals[key].bytes += item.bytes;
}

const duplicates = Object.values(Object.groupBy(inventory, (item) => item.sha256))
  .filter((group) => group.length > 1)
  .map((group) => group.map((item) => item.path));

const report = {
  label,
  generatedAt: new Date().toISOString(),
  root: 'public',
  summary: {
    fileCount: inventory.length,
    totalBytes: inventory.reduce((sum, item) => sum + item.bytes, 0),
    totalMegabytes: Number((inventory.reduce((sum, item) => sum + item.bytes, 0) / 1024 / 1024).toFixed(2)),
    rasterCount: inventory.filter((item) => RASTER_EXTENSIONS.has(item.extension)).length,
    referencedCount: inventory.filter((item) => item.referencedInSource).length,
    flaggedCount: inventory.filter((item) => item.flags.length > 0).length,
    duplicateGroups: duplicates.length,
    formatTotals,
  },
  duplicates,
  files: inventory,
};

const flagged = inventory.filter((item) => item.flags.length > 0);
const markdown = [
  `# Media inventory — ${label}`,
  '',
  `Generated: ${report.generatedAt}`,
  '',
  `- Files: ${report.summary.fileCount}`,
  `- Total: ${report.summary.totalMegabytes} MB`,
  `- Flagged: ${report.summary.flaggedCount}`,
  `- Exact duplicate groups: ${report.summary.duplicateGroups}`,
  '',
  '| Asset | Size | Dimensions | Format | Flags | Referenced |',
  '|---|---:|---:|---|---|---|',
  ...flagged.map((item) => `| \`${item.path}\` | ${item.kilobytes} KB | ${item.width || '—'}×${item.height || '—'} | ${item.format || item.extension.slice(1)} | ${item.flags.join(', ')} | ${item.referencedInSource ? 'yes' : 'no'} |`),
  '',
  'Exact duplicates:',
  '',
  ...(duplicates.length ? duplicates.map((group) => `- ${group.map((file) => `\`${file}\``).join(', ')}`) : ['- None']),
  '',
].join('\n');

await mkdir(path.dirname(path.resolve(jsonOutput)), { recursive: true });
await mkdir(path.dirname(path.resolve(markdownOutput)), { recursive: true });
await writeFile(path.resolve(jsonOutput), `${JSON.stringify(report, null, 2)}\n`);
await writeFile(path.resolve(markdownOutput), markdown);

console.log(JSON.stringify(report.summary, null, 2));
