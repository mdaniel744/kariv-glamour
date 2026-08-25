import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const pages = ['home', 'shop', 'omega'];

async function readMetrics(folder, page) {
  const report = JSON.parse(await fs.readFile(path.join(root, 'docs', folder, `${page}.json`), 'utf8'));
  const requests = report.audits['network-requests'].details.items;
  const bytesFor = (resourceType) => requests
    .filter((request) => request.resourceType === resourceType)
    .reduce((sum, request) => sum + (request.transferSize || 0), 0);

  return {
    score: Math.round(report.categories.performance.score * 100),
    lcpMs: Math.round(report.audits['largest-contentful-paint'].numericValue),
    cls: Math.round(report.audits['cumulative-layout-shift'].numericValue * 1000) / 1000,
    tbtMs: Math.round(report.audits['total-blocking-time'].numericValue),
    totalKiB: Math.round(report.audits['total-byte-weight'].numericValue / 1024),
    imageKiB: Math.round(bytesFor('Image') / 1024),
    scriptKiB: Math.round(bytesFor('Script') / 1024),
    requests: requests.length,
  };
}

const summary = {};
for (const page of pages) {
  summary[page] = {
    before: await readMetrics('performance-baseline', page),
    after: await readMetrics('performance-after', page),
  };
  summary[page].change = {
    lcpPercent: Math.round((1 - summary[page].after.lcpMs / summary[page].before.lcpMs) * 1000) / 10,
    totalBytesPercent: Math.round((1 - summary[page].after.totalKiB / summary[page].before.totalKiB) * 1000) / 10,
    imageBytesPercent: Math.round((1 - summary[page].after.imageKiB / summary[page].before.imageKiB) * 1000) / 10,
  };
}

await fs.writeFile(path.join(root, 'docs', 'performance-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);

const tableRows = pages.map((page) => {
  const { before, after, change } = summary[page];
  return `| ${page} | ${before.score} → ${after.score} | ${(before.lcpMs / 1000).toFixed(1)}s → ${(after.lcpMs / 1000).toFixed(1)}s (${change.lcpPercent}% faster) | ${before.cls} → ${after.cls} | ${before.totalKiB} → ${after.totalKiB} KiB | ${before.imageKiB} → ${after.imageKiB} KiB (${change.imageBytesPercent}% less) |`;
});

const markdown = `# Mobile performance measurements\n\nLighthouse ${pages.length}-page comparison on the local Next.js development server, simulated mobile throttling, captured on 2026-08-25. Development JavaScript and Clerk keyless-mode code make the absolute scores unsuitable as production targets; the same environment was used before and after so payload and LCP changes remain comparable. INP is a field metric and is not available from this lab run; TBT remains in the JSON reports as the lab interaction proxy.\n\n| Page | Score | LCP | CLS | Total transfer | Image transfer |\n|---|---:|---:|---:|---:|---:|\n${tableRows.join('\n')}\n\nRaw reports are retained in \`docs/performance-baseline\` and \`docs/performance-after\`.\n`;

await fs.writeFile(path.join(root, 'docs', 'performance-summary.md'), markdown);
console.log(markdown);
