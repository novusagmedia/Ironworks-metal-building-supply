import { F } from '../facts.mjs';
import { article, R } from '../blocks.mjs';

// DRAFT: technical content awaits Spencer's sign-off.
export default article({
  draft: true,
  allow: ['29 gauge'], // comparison must name it; Ironworks' own PBR is 26 gauge
  slug: '26-vs-29-gauge-metal-roofing',
  title: '26 Gauge vs 29 Gauge Metal Roofing | Ironworks',
  desc: 'With steel gauge, a lower number means thicker metal. 26 gauge is thicker than 29. Here’s what that changes for a roof or wall and how to choose.',
  eyebrow: 'Panels & Trim',
  crumb: '26 vs 29 Gauge Metal Roofing',
  h1: '26 gauge vs 29 gauge metal roofing',
  lead: 'With steel gauge, a lower number means thicker metal. So 26 gauge is thicker than 29 gauge. Thicker steel costs more and holds up better to dents and foot traffic.',
  blocks: [
    ['h2', 'What changes with thicker steel'],
    ['icons', [
      ['Dent resistance', '26 gauge takes knocks, ladders, and foot traffic better than 29.'],
      ['Stiffness', 'Thicker panels flex less between supports. How far a panel can span is set by the building design and the panel maker’s spec, not by gauge alone.'],
      ['Weight and cost', '26 gauge is heavier and costs more per panel than 29.'],
    ]],
    ['h2', 'How to choose'],
    ['list', [
      'Matching existing panels: match what’s on the building.',
      'Roofs that see foot traffic, or buildings where you want more dent resistance: 26 gauge.',
      'The building design or plans call for a gauge: follow the plans.',
    ]],
    ['callout', ['Thickness varies by maker', 'Actual steel thickness for a given gauge differs slightly between manufacturers and coatings. The spec sheet lists the real number.']],
    ['h2', 'What Ironworks carries'],
    ['p', `Ironworks’ PBR panels are ${F.pbr.gauge}, in ${F.pbr.colors.join(', ').toLowerCase()}. ${F.pbr.moreColors}. Ask about current gauges for AG and R-panel.`],
  ],
  faqs: [
    ['Is 26 gauge thicker than 29 gauge?', 'Yes. With steel gauge, a lower number means thicker metal.'],
    ['Do I need 26 gauge for my building?', 'It depends on the building, the spec, and what’s already on site. Send the job details and we’ll review it.'],
  ],
  related: [R.PANELS, R.PANEL_ORDER, R.CONTRACTORS],
});
