// Build: node build/build.mjs
// Writes every generated page to the repo root, regenerates sitemap.xml, and fails on any guard.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { F } from './facts.mjs';
import { head, nav, footer, businessSchema, breadcrumbSchema, pageUrl } from './layout.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HERE = path.join(ROOT, 'build');
const body = (name) => fs.readFileSync(path.join(HERE, 'pages', `${name}.body.html`), 'utf8');
const crumbs = (name, file) => [breadcrumbSchema([{ name: 'Home', url: `${F.domain}/` }, { name, url: `${F.domain}/${file}` }])];

// ---------- pages whose body is hand-built markup ----------
const pages = [
  {
    file: 'index.html', title: `${F.name} | Morrill, NE`,
    desc: 'Metal buildings, 26 gauge PBR panels, and custom trim from Morrill, NE. Design your building in 3D, then talk to a real builder.',
    ogImage: 'Real_pictures/9.webp', body: body('index'),
    schema: [businessSchema(), { '@context': 'https://schema.org', '@type': 'WebSite', name: F.name, url: `${F.domain}/` }],
  },
  {
    file: 'contractors.html', funnel: 'contractor', title: 'Contractor Job Specification Review | Ironworks',
    desc: 'Metal panels, trim, and building material for regional contractors. Send an active or upcoming job for a specification review and reorder-ready pricing.',
    ogImage: 'Real_pictures/8.webp', body: body('contractors'), navScrolled: true, scripts: ['js/forms.js'],
    schema: crumbs('For Contractors', 'contractors.html'),
  },
  {
    file: 'get-a-quote.html', funnel: 'building', title: `Building Project Fit Check | ${F.name}`,
    desc: 'Tell Ironworks about your building project. A local builder reviews it for your location in NE, WY, SD, or northern CO and follows up with a next step.',
    ogImage: 'Real_pictures/1.webp', body: body('get-a-quote'), navScrolled: true, scripts: ['js/forms.js'],
    schema: crumbs('Building Project Fit Check', 'get-a-quote.html'),
  },
  {
    file: '3d-designer.html', funnel: 'building', title: `3D Building Designer | ${F.name}`,
    desc: 'Design your metal building in 3D: post-frame, cold-form steel, or red iron. Configure it in minutes, then get a detailed quote from a local builder.',
    ogImage: 'Real_pictures/7.webp', body: body('3d-designer'), solidNav: true, scripts: ['js/forms.js'],
    schema: crumbs('3D Building Designer', '3d-designer.html'),
  },
];

// ---------- articles (block-declared) ----------
for (const dir of ['site', 'articles']) {
  for (const f of fs.readdirSync(path.join(HERE, dir)).filter((f) => f.endsWith('.mjs') && !f.startsWith('_')).sort()) {
    pages.push(...[(await import(path.join(HERE, dir, f))).default].flat());
  }
}

// Pages the build does not generate but that exist on the site.
const STATIC = ['hail-damage-inspection.html'];

// ---------- guards ----------
const problems = [];
const warnings = [];

// Meta descriptions: whole sentences, 158 characters max. Enforced here so it can't regress.
function trimDesc(desc, file) {
  if (desc.length <= 158) return desc;
  let out = '';
  for (const s of desc.match(/[^.!?]+[.!?]+/g) || [desc]) {
    if ((out + s).trim().length > 158) break;
    out += s;
  }
  out = out.trim();
  if (!out) problems.push(`${file}: first sentence of the meta description is over 158 characters`);
  else warnings.push(`${file}: meta description trimmed ${desc.length} → ${out.length} chars`);
  return out;
}

// Never-write list (Structure/phase-3-research.md). Checked against visible text of every page.
const BANNED = [
  /code[- ]compliant/i, /guarantee/i, /free (delivery|quote|shipping)/i, /in stock/i, /24[- ]hours?/i,
  /same[- ]day/i, /fast turnaround/i, /lowest price/i, /best price/i, /cheapest/i, /no middleman/i,
  /a\+ rated/i, /for years/i, /years of experience/i, /financing/i, /300 miles/i, /29 ?gauge/i,
  /fills up fast/i, /spots? (left|per day)/i, /delve|seamless|robust|tapestry|elevate your/i,
];
const visibleText = (html) => html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

// ---------- render ----------
const outputs = new Map();
for (const p of pages) {
  p.desc = trimDesc(p.desc, p.file);
  if (p.title.length > 70) warnings.push(`${p.file}: title is ${p.title.length} chars (Google shows ~60)`);
  outputs.set(p.file, head(p) + nav(p) + p.body + footer(p));
}

const drafts = new Set(pages.filter((p) => p.draft).map((p) => p.file));
for (const p of pages) {
  if (p.draft) continue;
  for (const d of drafts) if (outputs.get(p.file).includes(`href="${d}"`)) problems.push(`${p.file}: links to draft ${d} (drafts stay unlinked until approved)`);
}

const allowFor = Object.fromEntries(pages.map((p) => [p.file, (p.allow || []).map((a) => a.toLowerCase())]));
for (const [file, html] of outputs) {
  const text = visibleText(html);
  for (const re of BANNED) {
    const m = text.match(re);
    // Per-page exemptions are declared in the page itself (e.g. a comparison that must name 29 gauge).
    if (m && !allowFor[file].includes(m[0].toLowerCase())) problems.push(`${file}: never-write list hit "${m[0]}" …${text.slice(Math.max(0, m.index - 40), m.index + 40)}…`);
  }
  for (const [, href] of html.matchAll(/href="([^"#:?]+\.html)(?:#[^"]*)?"/g)) {
    if (!outputs.has(href) && !STATIC.includes(href) && !fs.existsSync(path.join(ROOT, href))) problems.push(`${file}: broken link → ${href}`);
  }
  for (const [, src] of html.matchAll(/(?:src|href)="((?:Real_pictures|Brand_assets|Hail_pictures|css|js)\/[^"]+)"/g)) {
    if (!fs.existsSync(path.join(ROOT, src))) problems.push(`${file}: missing file → ${src}`);
  }
}

if (problems.length) {
  console.error(`\n✗ Build stopped. ${problems.length} problem(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}

for (const [file, html] of outputs) fs.writeFileSync(path.join(ROOT, file), html);

const indexable = pages.filter((p) => !p.noindex);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url>\n    <loc>${pageUrl(p)}</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>`).join('\n')}
</urlset>
`);

// ---------- llms.txt (generated from facts + live pages; never hand-edit) ----------
const and = (xs) => (xs.length < 3 ? xs.join(' and ') : `${xs.slice(0, -1).join(', ')}, and ${xs.at(-1)}`);
const live = indexable.filter((p) => p.file !== '404.html');
fs.writeFileSync(path.join(ROOT, 'llms.txt'), `# ${F.name}

> Metal and building supply company in ${F.address.city}, Nebraska, founded in ${F.founded} by ${F.founder.name}. Ironworks rolls PBR panels and custom trim on its own sheet-metal roller, supplies and installs post-frame, cold-form steel, and red iron buildings, and is an authorized retailer of ${F.doorsWindows.garage} and ${F.doorsWindows.windows}. Primary markets are ${and(F.markets)}, with project-specific service across ${and(F.states)}.

## Pages
${live.map((p) => `- [${p.title.replace(/ \| .*$/, '')}](${pageUrl(p)}): ${p.desc}`).join('\n')}

## Facts worth citing correctly
- Hours: ${F.hours.text}. ${F.hours.closed}. ${F.hours.pickup}.
- ${F.delivery}. Delivery is not advertised as free.
- Panels: ${and(F.panelLines)}. PBR is ${F.pbr.gauge}; colors are ${and(F.pbr.colors.map((c) => c.toLowerCase()))}. ${F.pbr.moreColors}.
- Ironworks supplies and installs buildings. Concrete is done by subcontractor partners.
- Ironworks does not publish prices; pricing comes from reviewing the actual job.
- Ironworks does not guarantee code compliance, turnaround times, or inventory levels.
- A 3D design is not a quote. Ironworks reviews each design and follows up.
- Contractor pricing and volume pricing are available.

## Contact
- Address: ${F.address.street}, ${F.address.city}, ${F.address.region} ${F.address.zip}
- Phone: ${F.phone.display}
- Email: ${F.email}
- Google Business Profile: ${F.links.maps}
- Facebook: ${F.links.facebook}
- Instagram: ${F.links.instagram}
`);

// ---------- vercel.json redirects: fixed legacy map + a clean URL for every live page ----------
const LEGACY = [
  { source: '/hail-damage.html', destination: '/hail-damage-inspection.html', permanent: true },
  { source: '/Previous_sites_inspo/:path*', destination: '/', permanent: true },
  { source: '/ironworks.html', destination: '/', permanent: true },
  { source: '/index', destination: '/', permanent: true },
];
const vj = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
vj.redirects = [...LEGACY, ...live.filter((p) => p.file !== 'index.html')
  .map((p) => ({ source: `/${p.file.replace(/\.html$/, '')}`, destination: `/${p.file}`, permanent: true }))];
fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify(vj, null, 2) + '\n');

console.log(`✓ Built ${outputs.size} pages, sitemap has ${indexable.length} URLs${drafts.size ? `, ${drafts.size} draft(s) awaiting approval: ${[...drafts].join(', ')}` : ''}.`);
if (warnings.length) console.log('  Notes:\n  ' + warnings.join('\n  '));
