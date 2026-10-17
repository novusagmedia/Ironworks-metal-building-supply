// Sized image variants: node build/resize.mjs   (npm run build runs this first)
// For every photo it writes Real_pictures/r/<name>-<width>.webp (and Brand_assets/r/ for the logo),
// then build/variants.json, which build.mjs reads to give every <img> a srcset, width, and height.
// Idempotent: a variant is only re-encoded when its source is newer. Originals stay in place as the
// <img src> fallback and the og:image, so nothing that links to them breaks.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Photo widths cover a phone at 2–3× (1080–1280), tablets, and a 1440 desktop at 1×.
// The logo renders at most ~60 CSS px wide, so 120 and 240 cover 2× and 3× screens.
const SETS = [
  { dir: 'Real_pictures', widths: [400, 640, 800, 1080, 1280], quality: 72 },
  { dir: 'Brand_assets', only: ['ironworks-logo.webp'], widths: [120, 240], quality: 85 },
];

const manifest = {};
let made = 0, kept = 0;
for (const set of SETS) {
  const srcDir = path.join(ROOT, set.dir);
  const outDir = path.join(srcDir, 'r');
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(srcDir).filter((f) => /\.(webp|jpe?g|png)$/i.test(f) && (!set.only || set.only.includes(f)));
  for (const f of files) {
    const abs = path.join(srcDir, f);
    const rel = `${set.dir}/${f}`;
    const meta = await sharp(abs).rotate().metadata();
    const base = f.replace(/\.[^.]+$/, '');
    // Never upscale: widths below the source, plus the source width itself re-encoded (smaller than the original).
    const widths = [...set.widths.filter((w) => w < meta.width), meta.width];
    manifest[rel] = [];
    for (const w of widths) {
      const out = path.join(outDir, `${base}-${w}.webp`);
      const relOut = `${set.dir}/r/${base}-${w}.webp`;
      const fresh = fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(abs).mtimeMs;
      let h;
      if (fresh) { h = (await sharp(out).metadata()).height; kept++; }
      else {
        // Big candidates go to high-density phones and desktops, where a few points of quality are invisible but ~15% of bytes.
        const quality = w >= 1080 ? set.quality - 6 : set.quality;
        const info = await sharp(abs).rotate().resize({ width: w, withoutEnlargement: true })
          .webp({ quality, effort: 5, smartSubsample: true }).toFile(out);
        h = info.height; made++;
      }
      manifest[rel].push({ w, h, file: relOut, kb: Math.round(fs.statSync(out).size / 1024) });
    }
  }
}

fs.writeFileSync(path.join(ROOT, 'build', 'variants.json'), JSON.stringify(manifest, null, 1));
const total = (xs) => xs.reduce((a, v) => a + v.kb, 0);
console.log(`✓ Image variants: ${made} encoded, ${kept} up to date, ${Object.keys(manifest).length} sources.`);
for (const [src, vs] of Object.entries(manifest)) {
  const orig = Math.round(fs.statSync(path.join(ROOT, src)).size / 1024);
  console.log(`  ${src} (${orig} KB) → ${vs.map((v) => `${v.w}w ${v.kb}KB`).join(' · ')}`);
}
