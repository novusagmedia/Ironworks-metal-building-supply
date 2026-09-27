import { F } from '../facts.mjs';
import { page, R } from '../blocks.mjs';
import { phoneLink } from './_shared.mjs';

export default page({
  slug: 'garage-doors-windows',
  title: 'Midland Garage Doors & Gerkin Windows | Ironworks, Morrill NE',
  desc: `Ironworks is an authorized retailer of ${F.doorsWindows.garage} and ${F.doorsWindows.windows}. Custom orders year-round from Morrill, NE. Garage door seals too.`,
  eyebrow: 'Doors & Windows',
  crumb: 'Garage Doors & Windows',
  h1: 'Garage Doors & Windows',
  lead: `Ironworks is an authorized retailer of ${F.doorsWindows.garage} and ${F.doorsWindows.windows}. Custom doors and windows can be ordered any time of year.`,
  cta: 'both',
  blocks: [
    ['h2', 'What we carry'],
    ['icons', [
      [F.doorsWindows.garage, 'Garage doors, ordered to your opening.'],
      [F.doorsWindows.windows, 'Windows and doors, custom-ordered to your openings.'],
      ['Garage door seals', 'Replacement seals. The right fit depends on the door type, existing setup, and measurements.'],
    ]],
    ['h2', 'How to order'],
    ['list', ['Measure the opening, or send the building plans.', 'Tell us the door or window style and color you want.', `Call ${phoneLink} and we’ll review the order with you.`]],
    ['p', 'Doors and windows are a regular, year-round product line, not a seasonal special.'],
    ['h2', 'Visit the shop'],
    ['p', `${F.address.street}, ${F.address.city}, ${F.address.region}. ${F.hours.text}. ${F.hours.closed}.`],
  ],
  related: [R.POST_FRAME, R.PANELS, R.FAQ],
});
