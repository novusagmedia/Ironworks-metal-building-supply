import { F, OFFER } from '../facts.mjs';
import { page, R } from '../blocks.mjs';
import { phoneLink } from './_shared.mjs';

export default page({
  slug: 'scottsbluff-gering-morrill',
  title: 'Metal Building Supply in Scottsbluff, Gering & Morrill | Ironworks',
  desc: 'A local metal building supplier in Morrill, NE, serving Scottsbluff and Gering: panels, trim, building packages, installation, and pickup Mon–Fri.',
  eyebrow: 'Local',
  crumb: 'Scottsbluff, Gering & Morrill',
  h1: 'Metal Building Supply in Scottsbluff, Gering & Morrill',
  lead: `Ironworks is in Morrill, a short drive from Scottsbluff and Gering. Panels, trim, building packages, and installation from people you can meet at the shop.`,
  cta: 'both',
  ogImage: 'Real_pictures/9.webp',
  blocks: [
    ['figure', ['Real_pictures/1.webp', 'Gray post-frame shop in winter', 'Residential shop']],
    ['h2', 'Why local matters'],
    ['list', [
      `Pick up at the shop: ${F.address.street}, ${F.address.city}. ${F.hours.pickup}.`,
      'Talk directly with Spencer about the project, and meet in person for building projects.',
      'Panels and trim rolled on our own sheet-metal roller.',
      'One company from design through installation.',
    ]],
    ['h2', 'What we supply'],
    ['icons', [
      ['Panels and trim', `[Metal roofing & siding panels](${R.PANELS[0]}) and [custom trim](${R.TRIM[0]}).`],
      ['Buildings', `[Post-frame](${R.POST_FRAME[0]}), [cold-form steel](${R.COLD_FORM[0]}), and [red iron](${R.RED_IRON[0]}).`],
      ['Doors and windows', `[${F.doorsWindows.garage} and ${F.doorsWindows.windows}](${R.DOORS[0]}).`],
    ]],
    ['h2', 'Hours and contact'],
    ['p', `${F.hours.text}. ${F.hours.closed}. Call ${phoneLink}. Contractors: send a job through the [${OFFER.contractor.short}](${OFFER.contractor.href}).`],
  ],
  related: [R.PANELS, R.POST_FRAME, R.PROJECTS],
});
