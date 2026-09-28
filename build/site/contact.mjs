import { F, OFFER } from '../facts.mjs';
import { page } from '../blocks.mjs';
import { businessSchema } from '../layout.mjs';
import { andList, phoneLink, emailLink, addressLine, hoursLine } from './_shared.mjs';

export default page({
  slug: 'contact',
  title: 'Contact Ironworks | Metal & Building Supply in Morrill, NE',
  desc: `Call ${F.phone.display} or visit the shop at ${addressLine}. Open ${F.hours.text}. Pickups follow business hours.`,
  eyebrow: 'Contact',
  crumb: 'Contact',
  h1: 'Talk to Ironworks',
  lead: 'Call, email, or stop by the shop in Morrill. Spencer works directly with customers on project questions.',
  cta: 'both',
  schemaExtra: [{ '@context': 'https://schema.org', '@type': 'ContactPage', about: { '@id': `${F.domain}/#business` } }, businessSchema()],
  blocks: [
    ['icons', [
      ['Phone', phoneLink],
      ['Email', emailLink],
      ['Shop', `[${addressLine}](${F.links.maps})`],
      ['Hours', hoursLine],
      ['Pickup', `${F.hours.pickup}.`],
    ]],
    ['h2', 'Where we work'],
    ['p', `Primary markets are ${andList(F.markets)}. Ironworks takes on projects across ${andList(F.states)}. ${F.delivery}.`],
    ['h2', 'Which form should I use?'],
    ['icons', [
      ['Contractors and roofers', `Send an active or upcoming job through the [${OFFER.contractor.name}](${OFFER.contractor.href}).`],
      ['Building buyers', `Start a [${OFFER.building.name}](${OFFER.building.href}) with your use, site, size, and timeline.`],
      ['Garage doors, windows, and seals', `Call ${phoneLink}. Ironworks is an authorized retailer of ${F.doorsWindows.garage} and ${F.doorsWindows.windows}.`],
    ]],
  ],
});
