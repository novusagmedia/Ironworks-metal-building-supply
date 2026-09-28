import { F, OFFER } from '../facts.mjs';
import { page } from '../blocks.mjs';
import { andList } from './_shared.mjs';

// Bio is Spencer's approved text (facts.md, 2026-09-26). Use verbatim; never extend.
const BIO = 'Spencer founded Ironworks with a focus on prompt service, fair pricing, and working directly with customers to find the right solution for their project. Ironworks offers custom trim options and takes a flexible, customer-focused approach to every job. Spencer believes in working with people to get projects done the way they need them, rather than forcing customers into a one-size-fits-all solution.';

export default page({
  slug: 'about',
  title: 'About Ironworks Metal & Building Supply | Morrill, NE',
  desc: `Founded in ${F.founded} by ${F.founder.name}, Ironworks makes panels and trim, supplies building packages, and installs buildings in the Scottsbluff-Morrill region.`,
  eyebrow: 'About Ironworks',
  crumb: 'About',
  h1: 'Built Local. Built Right.',
  lead: `Ironworks is a metal and building supply company in Morrill, Nebraska, founded by ${F.founder.name} in ${F.founded}.`,
  cta: 'both',
  ogImage: 'Real_pictures/8.webp',
  schemaExtra: [
    { '@context': 'https://schema.org', '@type': 'AboutPage', about: { '@id': `${F.domain}/#business` } },
    { '@context': 'https://schema.org', '@type': 'Person', name: F.founder.name, jobTitle: F.founder.title,
      worksFor: { '@id': `${F.domain}/#business` }, description: BIO },
  ],
  blocks: [
    ['h2', 'Who we are'],
    ['p', BIO],
    ['h2', 'What Ironworks does'],
    ['icons', [
      ['Panels and trim', `${andList(F.panelLines)}, with custom trim rolled on our own sheet-metal roller.`],
      ['Building packages', 'Post-frame, cold-form steel, and red iron.'],
      ['Installation', 'Ironworks can take a building from design through installation. Concrete is handled by our subcontractor partners.'],
      ['Garage doors and windows', `Authorized retailer of ${F.doorsWindows.garage} and ${F.doorsWindows.windows}.`],
    ]],
    ['h2', 'How a building project starts'],
    ['list', [
      `Tell us about the project through a [${OFFER.building.name}](${OFFER.building.href}), a [${OFFER.contractor.short}](${OFFER.contractor.href}), or a phone call.`,
      'Spencer or the team calls to go over the details.',
      'For building projects, we meet in person to review the site and plan.',
      'You get a proposal based on your actual project.',
    ]],
    ['h2', 'Where we work'],
    ['p', `Primary markets are ${andList(F.markets)}. Ironworks takes on projects across ${andList(F.states)}. ${F.delivery}.`],
  ],
});
