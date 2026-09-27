import { F, OFFER } from '../facts.mjs';
import { page, R } from '../blocks.mjs';
import { andList } from './_shared.mjs';

export default page({
  slug: 'metal-roofing-panels',
  title: 'Metal Roofing & Siding Panels: PBR, AG, R-Panel | Ironworks',
  desc: `PBR, AG, and R-panel metal roofing and siding from Morrill, NE. PBR in ${F.pbr.gauge} and ${F.pbr.colors.length} colors, with more by order. Pickup or delivery.`,
  eyebrow: 'Panels & Trim',
  crumb: 'Metal Roofing & Siding Panels',
  h1: 'Metal Roofing & Siding Panels',
  lead: `${andList(F.panelLines)} for roofs and walls, rolled on our own sheet-metal roller in Morrill. Pickup or delivery.`,
  cta: 'contractor',
  ogImage: 'Real_pictures/14.webp',
  blocks: [
    ['figure', ['Real_pictures/14.webp', 'Yellow metal building with red trim', 'Metal panels with contrasting trim']],
    ['h2', 'Panels we carry'],
    ['icons', F.panelLines.map((l) => [l, l === 'PBR panel' ? `${F.pbr.gauge}.` : 'Ask for current gauge and colors.'])],
    ['h2', 'PBR colors'],
    ['p', `${andList(F.pbr.colors)}. ${F.pbr.moreColors}.`],
    ['callout', ['Ordering panels?', `Send the profile, gauge, color, lengths, quantities, trim, location, required date, and pickup or delivery. Here’s [what to send](${R.PANEL_ORDER[0]}).`]],
    ['h2', 'Pickup and delivery'],
    ['p', `Pick up at ${F.address.street}, ${F.address.city}. ${F.hours.pickup}: ${F.hours.text}. ${F.hours.closed}. ${F.delivery}.`],
    ['h2', 'For contractors'],
    ['p', `Contractor and volume pricing are available. Send an active or upcoming job through the [${OFFER.contractor.name}](${OFFER.contractor.href}) and we’ll review the actual job rather than give a generic number.`],
  ],
  related: [R.PANEL_ORDER, R.TRIM, R.CONTRACTORS],
});
