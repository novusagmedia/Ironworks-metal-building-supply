import { OFFER } from '../facts.mjs';
import { page } from '../blocks.mjs';

export default page({
  slug: '404',
  title: 'Page Not Found | Ironworks',
  desc: 'This page does not exist on the Ironworks website.',
  noindex: true,
  eyebrow: 'Not found',
  crumb: 'Not found',
  h1: 'That page isn’t here.',
  lead: 'The link may be old or mistyped. Here’s where to go instead.',
  blocks: [
    ['icons', [
      ['Contractors', `[${OFFER.contractor.name}](${OFFER.contractor.href})`],
      ['Building buyers', `[${OFFER.building.name}](${OFFER.building.href})`],
      ['Design in 3D', '[3D Building Designer](3d-designer.html)'],
      ['Everything else', '[Home](index.html) or [Contact](contact.html)'],
    ]],
  ],
});
