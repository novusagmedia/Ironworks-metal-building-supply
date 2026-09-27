import { F } from '../facts.mjs';
import { article, R } from '../blocks.mjs';

// Sources: MOS Template Pack TPL-ACQ-02, Six-Week Social post 10, facts.mjs.
export default article({
  slug: 'what-you-need-to-order-metal-panels',
  title: 'What Do I Need to Order Metal Panels? | Ironworks',
  desc: 'Send the profile, gauge, color, lengths, quantities, trim, location, date, and pickup or delivery. Ironworks reviews the actual job, not a generic number.',
  eyebrow: 'Panels & Trim',
  crumb: 'What You Need to Order Metal Panels',
  h1: 'What do I need to order metal panels?',
  lead: 'Nine details. Send the profile, gauge, color, lengths, quantities, trim, project location, required date, and whether you’ll pick up or need delivery. We review the actual job rather than give a generic number.',
  cta: 'contractor',
  ogImage: 'Real_pictures/8.webp',
  blocks: [
    ['h2', 'The nine details that make a panel job easy to review'],
    ['icons', [
      ['Profile', `Which panel. Ironworks carries ${F.panelLines.slice(0, -1).join(', ')}, and ${F.panelLines.at(-1)}.`],
      ['Gauge', `PBR panels are ${F.pbr.gauge}.`],
      ['Color', `Current PBR colors: ${F.pbr.colors.join(', ').toLowerCase()}. ${F.pbr.moreColors}.`],
      ['Lengths', 'The cut length of each panel run.'],
      ['Quantities', 'How many panels at each length.'],
      ['Trim and accessories', 'Every trim piece and accessory the job needs, with lengths.'],
      ['Project location', 'City and state, so delivery and site conditions can be reviewed.'],
      ['Required date', 'When the material needs to be on site.'],
      ['Pickup or delivery', 'Whether you’ll collect the order in Morrill or need it delivered.'],
    ]],
    ['callout', ['Missing a detail?', 'Send what you have and mark what’s still unknown. It’s easier to fill one gap on a call than to start over.']],
    ['h2', 'Picking up in Morrill'],
    ['p', `The shop is at ${F.address.street}, ${F.address.city}, ${F.address.region} ${F.address.zip}. ${F.hours.pickup}: ${F.hours.text}. ${F.hours.closed}.`],
    ['h2', 'Delivery'],
    ['p', `${F.delivery}. Tell us the project location and required date, and we’ll confirm what works for your job.`],
    ['note', 'Why no price list online? Pricing depends on the actual job. We do not want to guess at scope, timing, or price.'],
  ],
  faqs: [
    ['Do I need every detail before I contact Ironworks?', 'No. Send the information you have and mark what’s still unknown. Spencer’s team will follow up on the gaps.'],
    ['What colors do you carry for PBR panels?', `${F.pbr.colors.join(', ')}. ${F.pbr.moreColors}.`],
    ['Can I pick up my order?', `Yes. ${F.hours.pickup}: ${F.hours.text}, at ${F.address.street} in ${F.address.city}. ${F.hours.closed}.`],
  ],
  related: [R.CONTRACTORS, R.FIT_CHECK, R.DESIGNER],
});
