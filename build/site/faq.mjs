import { F, OFFER } from '../facts.mjs';
import { page, R } from '../blocks.mjs';
import { andList, addressLine } from './_shared.mjs';

// Every answer comes from facts.mjs or MOS-approved wording (TPL-RP-05, CCB 3D rule).
export default page({
  slug: 'faq',
  title: 'Questions & Answers | Ironworks Metal & Building Supply',
  desc: 'Hours, pickup, delivery, panel colors and gauge, pricing, installation, and how the 3D designer works at Ironworks in Morrill, NE.',
  eyebrow: 'FAQ',
  crumb: 'Questions & Answers',
  h1: 'Questions & Answers',
  lead: 'Straight answers to what people ask most. Don’t see yours? Call and ask.',
  cta: 'both',
  blocks: [['p', `Contractors can start with the [${OFFER.contractor.name}](${OFFER.contractor.href}); building buyers with the [${OFFER.building.name}](${OFFER.building.href}).`]],
  faqs: [
    ['What are your hours?', `${F.hours.text}. ${F.hours.closed}.`],
    ['Can I pick up my order?', `Yes, at ${addressLine}. ${F.hours.pickup}.`],
    ['How far do you deliver?', `${F.delivery}. Primary markets are ${andList(F.markets)}.`],
    ['What panels do you carry?', `${andList(F.panelLines)}. PBR panels are ${F.pbr.gauge}.`],
    ['What colors do PBR panels come in?', `${andList(F.pbr.colors)}. ${F.pbr.moreColors}.`],
    ['Why don’t you list prices online?', 'Pricing depends on the actual job. We do not want to guess at scope, timing, or price, so we review your project and give you real numbers.'],
    ['Is a 3D design the same as a quote?', 'No. The 3D designer helps you lay out the building. Pricing comes after Spencer’s team reviews your site and project.'],
    ['Do you install buildings?', 'Yes. Ironworks can take a building from design through installation. Concrete is handled by our subcontractor partners.'],
    ['Do you work with contractors?', 'Yes. Contractor pricing and volume pricing are available.'],
    ['Do you sell garage doors and windows?', `Yes. Ironworks is an authorized retailer of ${F.doorsWindows.garage} and ${F.doorsWindows.windows}, year-round.`],
    ['Where do you work?', `${andList(F.states)}, depending on the project.`],
  ],
  related: [R.PANEL_ORDER, R.PANELS, R.POST_FRAME],
});
