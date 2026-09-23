// Asset pipeline: source photography in assets-source/ (git-ignored) → sized
// webp in public/img, which is what ships. Re-runnable; skips existing output.
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const gallery = JSON.parse(readFileSync(new URL('./gallery-source.json', import.meta.url), 'utf8'));
mkdirSync('public/img', { recursive: true });

const out = {};
for (const [slug, files] of Object.entries(gallery)) {
  out[slug] = [];
  for (const [i, file] of files.entries()) {
    const name = `${slug}-${i + 1}.webp`;
    const dest = `public/img/${name}`;
    if (!existsSync(dest)) {
      await sharp(`assets-source/products/${file}`)
        .resize({ width: 1400, height: 1750, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(dest);
    }
    out[slug].push(name);
  }
}

const extra = [
  ['about-the-founder.webp', 'founder.webp', 1200],
  ['banner-image-1.webp', 'editorial-1.webp', 1400],
  ['banner-image-2.webp', 'editorial-2.webp', 1400],
  ['banner-video-poster.webp', 'hero-poster.webp', 1200]
];
for (const [src, name, w] of extra) {
  const dest = `public/img/${name}`;
  if (!existsSync(dest)) {
    await sharp(`assets-source/media/${src}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
  }
}

writeFileSync('scripts/gallery-built.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 1));
