// Pre-deploy checklist: npm run verify   (needs the local server: node serve.mjs → :3000)
// Every check prints PASS or FAIL with the offending items. Exit code 1 if anything fails.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { F } from './facts.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const exists = (f) => fs.existsSync(path.join(ROOT, f));
const pages = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
const html = Object.fromEntries(pages.map((f) => [f, read(f)]));
const visible = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const meta = (h, re) => (h.match(re) || [])[1];
const isNoindex = (h) => /<meta name="robots" content="noindex/.test(h);

const results = [];
const check = (name, fails) => results.push({ name, fails: fails.filter(Boolean) });

// 1. Internal links resolve (files and #anchors)
{
  const f = [];
  for (const [p, h] of Object.entries(html)) {
    for (const [, href] of h.matchAll(/href="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:|\/_vercel)/.test(href)) continue;
      const [file, anchor] = href.split('#');
      const target = file || p;
      if (file && !exists(file)) { f.push(`${p} → ${href} (no file)`); continue; }
      if (anchor && target.endsWith('.html') && !new RegExp(`id="${anchor}"`).test(html[target] || '')) f.push(`${p} → ${href} (no #${anchor})`);
    }
  }
  check('Every internal link and #anchor resolves', f);
}

// 2. Every image and social image exists
{
  const f = [];
  for (const [p, h] of Object.entries(html)) {
    for (const [, src] of h.matchAll(/<img[^>]+src="([^"]+)"/g)) if (!/^https?:/.test(src) && !exists(src)) f.push(`${p}: ${src}`);
    const og = meta(h, /og:image" content="https:\/\/www\.ironworksbuildingsupply\.com\/([^"]+)"/);
    if (og && !exists(og)) f.push(`${p}: og:image ${og}`);
    for (const [, alt] of h.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)) f.push(`${p}: image without alt`);
  }
  check('Every image and og:image exists, every <img> has alt', f);
}

// 3. No photo repeated on the same page (logo in nav + footer is intended)
check('No photo appears twice on one page', Object.entries(html).flatMap(([p, h]) => {
  const srcs = [...h.matchAll(/<img[^>]+src="(Real_pictures\/[^"]+)"/g)].map((m) => m[1]);
  return srcs.filter((s, i) => srcs.indexOf(s) !== i).map((s) => `${p}: ${s}`);
}));

// 4. Title and meta description limits
check('Titles ≤ 70 chars, descriptions 50–158 chars, one H1 per page', Object.entries(html).flatMap(([p, h]) => {
  const t = meta(h, /<title>([^<]*)<\/title>/) || '';
  const d = meta(h, /<meta name="description" content="([^"]*)"/) || '';
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  return [
    t.replace(/&amp;/g, '&').length > 70 && `${p}: title ${t.length} chars`,
    !t && `${p}: no title`,
    // Description limits only matter where Google shows them.
    !isNoindex(h) && (d.replace(/&[a-z]+;/g, 'x').length > 158 || d.length < 50) && `${p}: description ${d.length} chars`,
    h1 !== 1 && `${p}: ${h1} H1s`,
  ];
}));

// 5. Canonical points at the page itself
check('Canonical URL matches the file', Object.entries(html).map(([p, h]) => {
  const c = meta(h, /<link rel="canonical" href="([^"]+)"/);
  const want = p === 'index.html' ? `${F.domain}/` : `${F.domain}/${p}`;
  return p !== '404.html' && c !== want && `${p}: ${c}`;
}));

// 6. Schema parses, has no aggregateRating, and FAQ schema only claims questions the page shows
check('JSON-LD valid; no aggregateRating; FAQ schema matches visible questions', Object.entries(html).flatMap(([p, h]) => {
  const f = [];
  const vis = visible(h);
  for (const [, j] of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let o; try { o = JSON.parse(j); } catch { f.push(`${p}: invalid JSON-LD`); continue; }
    if (JSON.stringify(o).includes('aggregateRating')) f.push(`${p}: aggregateRating present`);
    if (o['@type'] === 'FAQPage') for (const q of o.mainEntity) if (!vis.includes(q.name)) f.push(`${p}: FAQ schema question not on page: ${q.name}`);
  }
  return f;
}));

// 7. Sitemap: valid namespace, every URL exists and is indexable, every indexable page listed
{
  const sm = read('sitemap.xml');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const fileOf = (u) => (u === `${F.domain}/` ? 'index.html' : u.replace(`${F.domain}/`, ''));
  const indexable = pages.filter((p) => !isNoindex(html[p]) && p !== '404.html');
  check('Sitemap valid and complete (no noindex pages, no missing pages)', [
    !sm.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') && 'wrong or missing sitemap namespace',
    ...locs.map((u) => !exists(fileOf(u)) ? `listed but missing: ${u}` : isNoindex(html[fileOf(u)]) && `listed but noindex: ${u}`),
    ...indexable.map((p) => !locs.map(fileOf).includes(p) && `indexable but not in sitemap: ${p}`),
  ]);
}

// 8. Redirects point somewhere real
{
  const v = JSON.parse(read('vercel.json'));
  check('Every redirect destination exists', (v.redirects || []).map((r) =>
    !/^https?:/.test(r.destination) && r.destination !== '/' && !exists(r.destination.replace(/^\//, '')) && `${r.source} → ${r.destination}`));
}

// 9. Facts: only the approved phone, email, and address appear; retired values never do
{
  const f = [];
  for (const [p, h] of Object.entries(html)) {
    const t = visible(h);
    for (const m of t.matchAll(/\(?\b\d{3}\)?[ .-]\d{3}-\d{4}\b/g)) if (m[0] !== F.phone.display) f.push(`${p}: phone "${m[0]}"`);
    // Visible text and mailto links only; form placeholders like you@email.com are examples, not contact info.
    for (const m of (t + ' ' + [...h.matchAll(/href="mailto:([^"]+)"/g)].map((x) => x[1]).join(' ')).matchAll(/[\w.+-]+@[\w-]+\.[\w.]+/g)) if (m[0] !== F.email) f.push(`${p}: email "${m[0]}"`);
    for (const m of t.matchAll(/\d{3,6} County Road \d+/g)) if (m[0] !== F.address.street) f.push(`${p}: address "${m[0]}"`);
    if (/gmail\.com/i.test(h)) f.push(`${p}: legacy gmail address`);
    for (const m of h.matchAll(/href="tel:(\d+)"/g)) if (m[1] !== F.phone.tel) f.push(`${p}: tel link ${m[1]}`);
  }
  check('Phone, email, and address match facts.mjs everywhere', f);
}

// 10. Drafts stay hidden: noindex, not linked from any live page
{
  const drafts = pages.filter((p) => isNoindex(html[p]) && /\| Ironworks<\/title>/.test(html[p]) && /og:type" content="article"/.test(html[p]));
  check('Draft articles are noindex and unlinked from live pages', pages.filter((p) => !isNoindex(html[p])).flatMap((p) =>
    drafts.filter((d) => html[p].includes(`href="${d}"`)).map((d) => `${p} links to draft ${d}`)));
}

// 11. Forms post to Formspree and land on a thank-you page that exists
{
  const js = read('js/forms.js');
  const f = [];
  for (const [, id, , thanks] of js.matchAll(/bindForm\('([^']+)', '[^']+', '([^']+)'(?:, '([^']+)')?\)/g)) {
    const page = pages.find((p) => html[p].includes(`id="${id}"`));
    if (!page) f.push(`form #${id} not on any page`);
    if (thanks && !exists(thanks)) f.push(`#${id} → ${thanks} missing`);
  }
  check('Every form is on a page and its thank-you page exists', f);
}

// 12. Internal files never deploy
{
  const ignore = read('.vercelignore');
  check('.vercelignore covers internal files', ['.claude', 'CLAUDE.md', 'Structure', 'build', 'serve.mjs', 'screenshot.mjs', 'frames']
    .map((x) => !ignore.split('\n').includes(x) && `${x} not ignored`));
}

// 13. llms.txt only links to pages that exist and are live
check('llms.txt links resolve to live pages', [...read('llms.txt').matchAll(/\((https:\/\/www\.ironworksbuildingsupply\.com\/[^)]*)\)/g)].map(([, u]) => {
  const f = u === `${F.domain}/` ? 'index.html' : u.replace(`${F.domain}/`, '');
  return (!exists(f) || isNoindex(html[f])) && u;
}));

// 14. Rendered checks: buttons, overflow, nav (puppeteer against localhost:3000)
{
  const f = [];
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const pg = await browser.newPage();
    for (const [w, label] of [[1440, 'desktop'], [768, 'tablet'], [390, 'phone']]) {
      await pg.setViewport({ width: w, height: 900 });
      for (const p of pages) {
        await pg.goto(`http://localhost:3000/${p}`, { waitUntil: 'domcontentloaded' });
        const r = await pg.evaluate(() => {
          const out = [];
          if (document.documentElement.scrollWidth > innerWidth + 1) out.push(`horizontal scroll ${document.documentElement.scrollWidth}px`);
          const btns = [...document.querySelectorAll('.btn, .nav-cta')].filter((b) => b.offsetParent);
          for (const b of btns) {
            const s = getComputedStyle(b), rc = b.getBoundingClientRect();
            if (rc.height < 40) out.push(`button "${b.textContent.trim().slice(0, 30)}" is ${Math.round(rc.height)}px tall`);
            if (parseFloat(s.paddingLeft) < 12) out.push(`button "${b.textContent.trim().slice(0, 30)}" has ${s.paddingLeft} side padding`);
            if (s.display === 'inline') out.push(`button "${b.textContent.trim().slice(0, 30)}" is display:inline`);
          }
          // buttons sharing a row must share a height and top edge
          const rows = new Map();
          for (const b of btns) { const k = b.parentElement; rows.set(k, [...(rows.get(k) || []), b.getBoundingClientRect()]); }
          for (const rcs of rows.values()) {
            const byTop = rcs.filter((r) => Math.abs(r.top - rcs[0].top) < 20);
            if (byTop.length > 1 && (Math.max(...byTop.map((r) => r.height)) - Math.min(...byTop.map((r) => r.height)) > 2 || Math.max(...byTop.map((r) => r.top)) - Math.min(...byTop.map((r) => r.top)) > 2)) out.push('buttons in one row are misaligned');
          }
          return out;
        });
        f.push(...r.map((x) => `${label} ${p}: ${x}`));
      }
    }
  } catch (e) {
    f.push(`could not run browser checks (is node serve.mjs running on :3000?): ${e.message.split('\n')[0]}`);
  } finally { await browser?.close(); }
  check('Buttons render correctly; no horizontal scroll (desktop, tablet, phone; every page)', f);
}

// ---------- report ----------
let failed = 0;
for (const r of results) {
  if (r.fails.length) failed++;
  console.log(`${r.fails.length ? '✗ FAIL' : '✓ PASS'}  ${r.name}${r.fails.length ? '\n    ' + r.fails.slice(0, 25).join('\n    ') + (r.fails.length > 25 ? `\n    …and ${r.fails.length - 25} more` : '') : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} checks passed across ${pages.length} pages.`);
process.exit(failed ? 1 : 0);
