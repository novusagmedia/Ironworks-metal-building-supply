// Image audit: node build/images.mjs
// Writes build/images.json (dimensions for width/height attrs) and reports rotation flags,
// near-duplicates by pixel similarity, and where each image is used.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['Real_pictures', 'Hail_pictures', 'Brand_assets'];
const imgs = DIRS.flatMap((d) => fs.readdirSync(path.join(ROOT, d)).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).map((f) => `${d}/${f}`));
const html = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const pagesText = Object.fromEntries(html.map((f) => [f, fs.readFileSync(path.join(ROOT, f), 'utf8')]));

// 16x16 grayscale average hash; Hamming distance ≤ 10 of 256 = visually the same photo.
async function ahash(file) {
  const px = await sharp(file).rotate().resize(16, 16, { fit: 'fill' }).grayscale().raw().toBuffer();
  const avg = px.reduce((a, b) => a + b, 0) / px.length;
  return [...px].map((v) => (v > avg ? 1 : 0));
}

const manifest = {};
const rows = [];
for (const rel of imgs) {
  const abs = path.join(ROOT, rel);
  const m = await sharp(abs).metadata();
  const used = html.filter((f) => pagesText[f].includes(rel));
  manifest[rel] = { w: m.width, h: m.height };
  rows.push({ rel, w: m.width, h: m.height, kb: Math.round(fs.statSync(abs).size / 1024), orientation: m.orientation || 1, used, hash: await ahash(abs) });
}
fs.writeFileSync(path.join(ROOT, 'build', 'images.json'), JSON.stringify(manifest, null, 1));

console.log('Image | size | KB | EXIF orientation | used on');
for (const r of rows) console.log(`${r.rel} | ${r.w}x${r.h} | ${r.kb} | ${r.orientation === 1 ? 'ok' : '⚠️ ' + r.orientation} | ${r.used.length ? r.used.join(', ') : '— unused'}`);

console.log('\nNear-duplicates (pixel similarity):');
let dup = 0;
for (let i = 0; i < rows.length; i++) for (let j = i + 1; j < rows.length; j++) {
  const d = rows[i].hash.reduce((a, b, k) => a + (b !== rows[j].hash[k]), 0);
  if (d <= 10) { dup++; console.log(`  ${rows[i].rel} ≈ ${rows[j].rel} (distance ${d}/256)`); }
}
if (!dup) console.log('  none');

console.log('\nSame image twice on one page:');
let twice = 0;
for (const [f, h] of Object.entries(pagesText)) for (const r of rows.filter((r) => !r.rel.startsWith('Brand_assets/'))) { // logo in nav + footer is intended
  const n = h.split(`src="${r.rel}"`).length - 1;
  if (n > 1) { twice++; console.log(`  ${f}: ${r.rel} ×${n}`); }
}
if (!twice) console.log('  none');
