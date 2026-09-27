import { F, OFFER } from '../facts.mjs';
import { page, R } from '../blocks.mjs';

export default page({
  slug: 'custom-metal-trim',
  title: 'Custom Metal Trim & Hardware | Ironworks, Morrill NE',
  desc: 'Custom metal trim rolled on our own sheet-metal roller in Morrill, NE, plus fasteners and hardware. Send your trim profiles and lengths for review.',
  eyebrow: 'Panels & Trim',
  crumb: 'Custom Metal Trim',
  h1: 'Custom Metal Trim & Hardware',
  lead: 'Custom trim profiles rolled on our own sheet-metal roller, made to the spec your job needs. Fasteners and hardware too.',
  cta: 'contractor',
  ogImage: 'Real_pictures/14.webp',
  blocks: [
    ['h2', 'What we make and supply'],
    ['icons', [
      ['Custom trim', 'Trim profiles made to your spec on our own roller.'],
      ['Panel-matched trim', `Trim for the panels you order, in the same color lineup: ${F.pbr.colors.join(', ').toLowerCase()}.`],
      ['Fasteners and hardware', 'The hardware to finish the job.'],
    ]],
    ['h2', 'What to send'],
    ['list', ['Each trim profile, with a sketch or dimensions if it’s custom', 'Color', 'Lengths and quantities', 'Project location and required date', 'Pickup or delivery']],
    ['callout', ['Not sure of a profile?', 'Send a photo or sketch and what it’s for. It’s easier to sort out on a call than to guess.']],
    ['h2', 'Pickup and delivery'],
    ['p', `${F.hours.pickup}: ${F.hours.text}. ${F.delivery}.`],
    ['p', `Contractors: send the job through the [${OFFER.contractor.name}](${OFFER.contractor.href}).`],
  ],
  related: [R.PANELS, R.PANEL_ORDER, R.CONTRACTORS],
});
