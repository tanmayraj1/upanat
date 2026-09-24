/**
 * Renders the social share card and the favicon set.
 *
 * The card is a real HTML page (scripts/og-card.html) captured headless at 2x
 * so the brand faces are the actual webfonts rather than a traced approximation.
 * Re-run after changing the card or the photograph it features:
 *
 *   node scripts/generate-brand-assets.mjs
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const card = resolve('scripts/og-card.html');

if (!existsSync(CHROME)) {
  console.error('Google Chrome is required to render the share card; skipping.');
  process.exit(1);
}

mkdirSync('public/og', { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'upanat-og-'));
const shot = join(work, 'og.png');

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=2',
  '--window-size=1200,630',
  '--virtual-time-budget=6000',
  `--screenshot=${shot}`,
  `file://${card}`
], { stdio: 'ignore' });

await sharp(shot).resize(1200, 630).jpeg({ quality: 88, chromaSubsampling: '4:4:4' }).toFile('public/og.jpg');
rmSync(work, { recursive: true, force: true });

// Favicons: the leaf mark, gold on the emerald ground so it holds up in a
// browser tab at 16px and on a home screen at 180px.
const mark = (size, pad) => Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0A362A"/>
  <g transform="translate(${pad} ${pad}) scale(${(size - pad * 2) / 24})"
     fill="none" stroke="#E8C36B" stroke-width="1.6" stroke-linecap="round">
    <path d="M4 20C4 11 10 4 20 4c0 10-7 16-16 16z"/>
    <path d="M4 20L14 10"/>
  </g>
</svg>`);

await sharp(mark(180, 34)).png().toFile('public/apple-touch-icon.png');
await sharp(mark(512, 96)).png().toFile('public/icon-512.png');
await sharp(mark(192, 36)).png().toFile('public/icon-192.png');
await sharp(mark(32, 4)).png().toFile('public/favicon.png');

console.log('Wrote public/og.jpg and the icon set.');

// Per-product share cards, so a shared product link previews that pair.
const products = JSON.parse(readFileSync('scripts/gallery-built.json', 'utf8'));
const meta = readFileSync('src/data/products.ts', 'utf8');

const shotFor = (slug) => resolve(`public/img/${products[slug][0]}`);

for (const slug of Object.keys(products)) {
  const block = meta.slice(meta.indexOf(`slug: '${slug}'`));
  const name = block.match(/name: '([^']+)'/)?.[1] ?? slug;
  const cat = block.match(/cat: '([^']+)'/)?.[1] ?? '';
  const work = block.match(/work: '([^']+)'/)?.[1] ?? '';

  const params = new URLSearchParams({
    eyebrow: `${cat} · ${work}`,
    line1: name.replace(/\s*\(([^)]+)\)/, ''),
    line2: name.match(/\(([^)]+)\)/)?.[1] ?? '',
    img: `file://${shotFor(slug)}`
  });

  const dir = mkdtempSync(join(tmpdir(), 'upanat-og-'));
  const png = join(dir, 'p.png');
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--force-device-scale-factor=2', '--window-size=1200,630',
    '--virtual-time-budget=6000',
    `--screenshot=${png}`,
    `file://${card}?${params}`
  ], { stdio: 'ignore' });

  await sharp(png).resize(1200, 630).jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
    .toFile(`public/og/${slug}.jpg`);
  rmSync(dir, { recursive: true, force: true });
}

console.log(`Wrote ${Object.keys(products).length} product share cards.`);
