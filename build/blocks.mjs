// Long-form content is declared as typed blocks, never hand-written HTML.
// The renderer owns the markup, so every article gets identical structure.
import { F, OFFER } from './facts.mjs';
import { esc, pageUrl, breadcrumbSchema } from './layout.mjs';
import fs from 'node:fs';

// Real dimensions from build/images.json (written by build/images.mjs) → width/height attrs, no layout shift.
const IMG = JSON.parse(fs.readFileSync(new URL('./images.json', import.meta.url), 'utf8'));
const dims = (src) => (IMG[src] ? ` width="${IMG[src].w}" height="${IMG[src].h}"` : '');

// Inline text allows **bold** and [label](href). Everything else is escaped.
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

const list = (items) => `<ul class="a-list">${items.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`;

// Block types are fixed. Adding one is a design decision, not a content edit.
function renderBlock([type, data], index) {
  switch (type) {
    case 'h2': return `<h2 class="a-h2">${inline(data)}</h2>`;
    case 'p': return `<p>${inline(data)}</p>`;
    case 'list': return list(data);
    case 'callout': {
      // First block → h2, otherwise h3, so the heading outline never skips a level.
      const [title, body] = data;
      const h = index === 0 ? 'h2' : 'h3';
      const inner = Array.isArray(body) ? list(body) : `<p>${inline(body)}</p>`;
      return `<aside class="a-callout"><${h}>${inline(title)}</${h}>${inner}</aside>`;
    }
    case 'icons': return `<ul class="a-icons">${data.map(([term, def]) => `<li><strong>${inline(term)}</strong> — ${inline(def)}</li>`).join('')}</ul>`;
    case 'note': return `<p class="a-note">${inline(data)}</p>`;
    // Real Ironworks photos only (Brand Foundation §18). [src, alt, caption]
    case 'figure': return `<figure class="a-fig"><img src="${data[0]}"${dims(data[0])} alt="${esc(data[1])}" loading="lazy"/>${data[2] ? `<figcaption>${inline(data[2])}</figcaption>` : ''}</figure>`;
    case 'gallery': return `<div class="a-gallery">${data.map(([src, alt, label]) => `<figure class="a-gi"><img src="${src}"${dims(src)} alt="${esc(alt)}" loading="lazy"/><figcaption>${esc(label)}</figcaption></figure>`).join('')}</div>`;
    default: throw new Error(`Unknown block type "${type}". Allowed: h2, p, list, callout, icons, note, figure, gallery.`);
  }
}

// FAQs render as real <details>; FAQPage schema is parsed back out of that markup.
export function faqHtml(faqs) {
  if (!faqs?.length) return '';
  return `<section class="a-faq"><h2 class="a-h2">Questions</h2>${faqs.map(([q, a]) =>
    `<details><summary>${inline(q)}</summary><div class="a-faq-a"><p>${inline(a)}</p></div></details>`).join('')}</section>`;
}

export function faqSchemaFromHtml(html) {
  const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
  const items = [...html.matchAll(/<details><summary>(.*?)<\/summary><div class="a-faq-a">(.*?)<\/div><\/details>/gs)]
    .map(([, q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } }));
  return items.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items } : null;
}

const CTA = {
  both: { lead: 'Ready when you are.', text: `Contractors: send a job for review. Building buyers: start a ${OFFER.building.name}. Or call and talk it through.`, offers: [OFFER.contractor, OFFER.building] },
  contractor: { lead: 'Have a panel or trim job coming up?', text: `Send the details for a ${OFFER.contractor.name}. We review the actual job rather than give a generic number.`, offer: OFFER.contractor },
  building: { lead: 'Planning a building?', text: `Start a ${OFFER.building.name}. Spencer's team reviews your use, site, size, and timeline, then follows up with the next step.`, offer: OFFER.building },
};

// Related links are defined once as constants and passed by reference.
export const R = {
  CONTRACTORS: [OFFER.contractor.href, OFFER.contractor.name, 'Send an active or upcoming job for review.'],
  FIT_CHECK: [OFFER.building.href, OFFER.building.name, 'Tell us about your building project.'],
  DESIGNER: ['3d-designer.html', '3D Building Designer', 'Lay out size, doors, and colors in minutes.'],
  PANELS: ['metal-roofing-panels.html', 'Metal Roofing & Siding Panels', 'PBR, AG, and R-panel. PBR in 26 gauge.'],
  TRIM: ['custom-metal-trim.html', 'Custom Metal Trim', 'Trim rolled on our own sheet-metal roller.'],
  DOORS: ['garage-doors-windows.html', 'Garage Doors & Windows', 'Midland Garage Doors and Gerkin Windows.'],
  POST_FRAME: ['post-frame-buildings.html', 'Post-Frame Buildings', 'Ag barns, shops, garages, and storage.'],
  COLD_FORM: ['cold-form-steel-kits.html', 'Cold-Form Steel Kits', 'Steel framing kits for commercial and residential builds.'],
  RED_IRON: ['red-iron-buildings.html', 'Red Iron Buildings', 'Structural steel for larger commercial builds.'],
  PROJECTS: ['projects.html', 'Projects', 'Real buildings across the region.'],
  FAQ: ['faq.html', 'Questions & Answers', 'Hours, delivery, colors, pricing, and more.'],
  PANEL_ORDER: ['what-you-need-to-order-metal-panels.html', 'What You Need to Order Metal Panels', 'The nine details to send.'],
};

export const article = (opts) => render({ cta: 'contractor', ...opts }, 'article');
// Non-article pages (contact, about, thank-you, legal): same renderer, website type, optional CTA.
export const page = (opts) => render(opts, 'page');

function ctaHtml(key) {
  if (!key) return '';
  const c = CTA[key];
  const offers = c.offers || [c.offer];
  const buttons = offers.map((o, i) => `<a href="${o.href}" class="btn ${i ? 'btn-line' : 'btn-gold'}">Start a ${esc(o.short)}${i ? '' : ' <span class="arw">→</span>'}</a>`).join('\n        ');
  return `<aside class="a-cta">
      <h2>${esc(c.lead)}</h2>
      <p>${esc(c.text)}</p>
      <div class="a-cta-row">
        ${buttons}
        <a href="tel:${F.phone.tel}" class="btn btn-line">${F.phone.display}</a>
      </div>
    </aside>`;
}

function render({ slug, title, desc, eyebrow, crumb, h1, lead, blocks, faqs, related = [], cta, ogImage, noindex, draft, allow = [], schemaExtra = [], published = '2026-09-26' }, kind) {
  // draft: awaiting Spencer's technical sign-off → noindex, no sitemap, and no live page may link to it.
  if (draft) noindex = true;
  const file = `${slug}.html`;
  const page = { file, title, desc, ogImage, noindex, ogType: kind === 'article' ? 'article' : 'website', navScrolled: true };
  const faqBlock = faqHtml(faqs);

  const body = `
<header class="page-hero a-hero">
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="shell">
    <nav class="a-crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span aria-hidden="true">/</span><span>${esc(crumb)}</span></nav>
    <span class="eyebrow on-dark">${esc(eyebrow)}</span>
    <h1>${inline(h1)}</h1>
    <p>${inline(lead)}</p>
  </div>
</header>

<main class="a-main">
  <article class="a-body">
${blocks.map((b, i) => '    ' + renderBlock(b, i)).join('\n')}
    ${faqBlock}
    ${ctaHtml(cta)}
  </article>
${related.length ? `  <section class="a-related" aria-label="Related">
    <h2 class="a-h2">Related</h2>
    <div class="a-related-grid">
${related.map(([href, t, blurb]) => `      <a href="${href}" class="a-rel"><strong>${esc(t)}</strong><span>${esc(blurb)}</span></a>`).join('\n')}
    </div>
  </section>` : ''}
</main>
`;

  const schema = [breadcrumbSchema([{ name: 'Home', url: `${F.domain}/` }, { name: crumb, url: pageUrl(page) }])];
  const faqSchema = faqSchemaFromHtml(faqBlock);
  if (faqSchema) schema.push(faqSchema);
  if (kind === 'article') schema.push({
    '@context': 'https://schema.org', '@type': 'Article',
    headline: h1.replace(/\*\*|\[|\]\([^)]*\)/g, ''), description: desc,
    image: `${F.domain}/${ogImage || 'Real_pictures/9.webp'}`,
    author: { '@id': `${F.domain}/#business` }, publisher: { '@id': `${F.domain}/#business` },
    datePublished: published, dateModified: published, mainEntityOfPage: pageUrl(page),
  });
  schema.push(...schemaExtra);
  return { ...page, crumb, body, schema, kind, draft: !!draft, allow };
}
