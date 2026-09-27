// Shared chrome: <head>, nav, mobile menu, footer, schema. Every page gets these from here.
import { F, OFFER } from './facts.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const pageUrl = (p) => (p.file === 'index.html' ? `${F.domain}/` : `${F.domain}/${p.file}`);

// Approved Phase 2 nav (Structure/phase-2-architecture.md). Groups open on hover, focus, or tap.
const NAV = [
  { label: 'Buildings', items: [
    { label: 'Post-Frame Buildings', href: 'post-frame-buildings.html' },
    { label: 'Cold-Form Steel Kits', href: 'cold-form-steel-kits.html' },
    { label: 'Red Iron Buildings', href: 'red-iron-buildings.html' },
    { label: 'Design in 3D', href: '3d-designer.html' },
  ] },
  { label: 'Panels & Trim', items: [
    { label: 'Metal Roofing & Siding Panels', href: 'metal-roofing-panels.html' },
    { label: 'Custom Metal Trim', href: 'custom-metal-trim.html' },
    { label: 'What to Send for a Panel Order', href: 'what-you-need-to-order-metal-panels.html' },
  ] },
  { label: 'Doors & Windows', href: 'garage-doors-windows.html' },
  { label: 'Contractors', href: OFFER.contractor.href },
  { label: 'Projects', href: 'projects.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Contact', href: 'contact.html' },
];

const ld = (obj) => `  <script type="application/ld+json">\n  ${JSON.stringify(obj)}\n  </script>`;

export function businessSchema() {
  const a = F.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${F.domain}/#business`,
    name: F.name,
    image: `${F.domain}/Real_pictures/9.webp`,
    logo: `${F.domain}/${F.logo}`,
    url: `${F.domain}/`,
    telephone: F.phone.e164,
    email: F.email,
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.region, postalCode: a.zip, addressCountry: 'US' },
    hasMap: F.links.maps,
    openingHoursSpecification: F.hours.schema.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    foundingDate: F.founded,
    founder: { '@type': 'Person', name: F.founder.name, jobTitle: F.founder.title },
    areaServed: [
      { '@type': 'State', name: 'Nebraska' },
      { '@type': 'State', name: 'Wyoming' },
      { '@type': 'AdministrativeArea', name: 'Northern Colorado' },
      { '@type': 'State', name: 'South Dakota' },
    ],
    description: 'Metal buildings and steel panels for the Scottsbluff-Morrill region, with delivery available across NE, WY, SD, and northern CO. Post-frame buildings, cold-form steel kits, and red iron packages with in-house panel and trim rolling.',
    sameAs: [F.links.facebook, F.links.instagram],
    makesOffer: ['Post-Frame Buildings', 'Cold-Form Steel Kits', 'Red Iron Buildings', 'Metal Panels & Trim (rolled in-house)']
      .map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: t.url })),
  };
}

export function head(p) {
  const url = pageUrl(p);
  const img = `${F.domain}/${p.ogImage || 'Real_pictures/9.webp'}`;
  const schemas = (p.schema || []).map(ld).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${F.ga4}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${F.ga4}');
</script>
  <meta charset="UTF-8"/>${p.file === '404.html' ? '\n  <base href="/"/>' : ''}
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.desc)}"/>
  <link rel="canonical" href="${url}"/>
  <meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}"/>
  <meta property="og:type" content="${p.ogType || 'website'}"/>
  <meta property="og:site_name" content="${esc(F.name)}"/>
  <meta property="og:title" content="${esc(p.title)}"/>
  <meta property="og:description" content="${esc(p.desc)}"/>
  <meta property="og:url" content="${url}"/>
  <meta property="og:image" content="${img}"/>
  <meta property="og:locale" content="en_US"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${esc(p.title)}"/>
  <meta name="twitter:description" content="${esc(p.desc)}"/>
  <meta name="twitter:image" content="${img}"/>
${schemas}
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;600;700;800;900&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&display=swap" rel="stylesheet"/>
  <link rel="icon" href="favicon-32.png" sizes="32x32"/>
  <link rel="icon" href="favicon.ico"/>
  <link rel="apple-touch-icon" href="apple-touch-icon.png"/>
  <link rel="stylesheet" href="css/ironworks.css"/>
</head>
<body>
`;
}

// solid: pages without a dark hero behind the fixed nav keep the dark bar at all times.
export function nav(p) {
  const attrs = p.solidNav ? ' data-solid style="position:relative"' : '';
  const cls = p.navScrolled || p.solidNav ? 'nav scrolled' : 'nav';
  const on = (href) => (href === p.file ? ' class="on" aria-current="page"' : '');
  const items = NAV.map((n, i) => n.items
    ? `    <li class="has-sub${n.items.some((c) => c.href === p.file) ? ' on' : ''}">
      <button class="sub-btn" aria-expanded="false" aria-controls="sub-${i}">${n.label}<span class="caret" aria-hidden="true"></span></button>
      <ul class="sub" id="sub-${i}">
${n.items.map((c) => `        <li><a href="${c.href}"${on(c.href)}>${c.label}</a></li>`).join('\n')}
      </ul>
    </li>`
    : `    <li><a href="${n.href}"${on(n.href)}>${n.label}</a></li>`).join('\n');
  const mob = NAV.map((n) => n.items
    ? `  <p class="mob-group">${n.label}</p>\n${n.items.map((c) => `  <a href="${c.href}" class="mob-sub">${c.label}</a>`).join('\n')}`
    : `  <a href="${n.href}">${n.label}</a>`).join('\n');
  return `
<!-- ── NAV ── -->
<nav class="${cls}" id="nav"${attrs}>
  <a href="index.html" aria-label="Ironworks home">
    <img src="${F.logo}" alt="${esc(F.name)}" class="nav-logo"/>
  </a>
  <ul class="nav-links">
${items}
  </ul>
  <div class="nav-right">
    <a href="tel:${F.phone.tel}" class="nav-phone">${F.phone.display}</a>
    <a href="${OFFER.building.href}" class="nav-cta">${OFFER.building.short}</a>
    <button class="hamburger" id="hbg" aria-label="Open menu" aria-controls="mob" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</nav>
<div class="mob" id="mob">
${mob}
  <a href="tel:${F.phone.tel}">Call ${F.phone.display}</a>
  <a href="${OFFER.building.href}" class="mob-cta">Start Your ${OFFER.building.short}</a>
</div>
`;
}

const ICON_FB = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#8B9CAE" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>';
const ICON_IG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B9CAE" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#8B9CAE" stroke="none"/></svg>';

export function footer(p) {
  const a = F.address;
  const scripts = ['js/ironworks.js', ...(p.scripts || [])].map((s) => `<script src="${s}"></script>`).join('\n');
  return `
<footer class="foot">
  <div class="shell">
    <div>
      <img src="${F.logo}" alt="${esc(F.name)}" class="foot-logo"/>
      <p class="foot-tag">Metal &amp; Building Supply<br>Morrill, Nebraska</p>
      <div class="foot-social">
        <a href="${F.links.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON_FB}</a>
        <a href="${F.links.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON_IG}</a>
      </div>
    </div>
    <div class="foot-col">
      <h5>Contact</h5>
      <a href="${F.links.maps}" target="_blank" rel="noopener">${a.street}<br>${a.city}, ${a.region} ${a.zip}</a>
      <p>${F.hours.text}<br>${F.hours.closed}</p>
      <a href="tel:${F.phone.tel}">${F.phone.display}</a>
      <a href="mailto:${F.email}">${F.email}</a>
    </div>
    <div class="foot-col">
      <h5>Products</h5>
      <a href="metal-roofing-panels.html">PBR / R-Panel Roofing</a>
      <a href="metal-roofing-panels.html">AG Panels</a>
      <a href="custom-metal-trim.html">Custom Trim &amp; Hardware</a>
      <a href="post-frame-buildings.html">Post-Frame Buildings</a>
      <a href="cold-form-steel-kits.html">Cold-Form Steel Kits</a>
      <a href="red-iron-buildings.html">Red Iron Buildings</a>
      <a href="garage-doors-windows.html">Garage Doors &amp; Windows</a>
    </div>
    <div class="foot-col">
      <h5>Quick Links</h5>
      <a href="index.html">Home</a>
      <a href="${OFFER.contractor.href}">For Contractors</a>
      <a href="${OFFER.building.href}">${OFFER.building.short}</a>
      <a href="3d-designer.html">3D Designer</a>
      <a href="projects.html">Projects</a>
      <a href="faq.html">Questions &amp; Answers</a>
      <a href="scottsbluff-gering-morrill.html">Scottsbluff, Gering &amp; Morrill</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="${F.links.review}" target="_blank" rel="noopener">Leave a Google Review</a>
    </div>
  </div>
  <div class="foot-bottom">
    <div class="shell">
      <p>&copy; ${new Date().getFullYear()} ${esc(F.name)} · All Rights Reserved</p>
      <p>Built by Novus AG Media</p>
    </div>
  </div>
</footer>

${scripts}
  <!-- Vercel Web Analytics -->
  <script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;
}
