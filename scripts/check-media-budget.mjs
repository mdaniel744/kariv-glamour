import fs from 'node:fs/promises';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');
const mediaExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']);
const limits = {
  totalBytes: 40 * 1024 * 1024,
  singleAssetBytes: 2.5 * 1024 * 1024,
};

const files = [];
async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    if (entry.isFile() && mediaExtensions.has(path.extname(entry.name).toLowerCase())) {
      const stat = await fs.stat(fullPath);
      files.push({ path: path.relative(publicDir, fullPath), bytes: stat.size });
    }
  }
}

await walk(publicDir);
const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
const oversized = files.filter((file) => file.bytes > limits.singleAssetBytes);
const failures = [];
if (totalBytes > limits.totalBytes) failures.push(`Public media is ${(totalBytes / 1024 / 1024).toFixed(2)}MB; budget is 40MB.`);
if (oversized.length > 0) failures.push(`Assets over 2.5MB: ${oversized.map((file) => file.path).join(', ')}`);

console.log(JSON.stringify({ files: files.length, totalMegabytes: Math.round(totalBytes / 1024 / 1024 * 100) / 100, oversized }, null, 2));
if (failures.length > 0) throw new Error(failures.join('\n'));
