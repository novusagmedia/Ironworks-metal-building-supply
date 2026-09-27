import { F } from '../facts.mjs';
import { article, R } from '../blocks.mjs';

// DRAFT: technical content awaits Spencer's sign-off (Structure/spencer-review-comparisons.md).
export default article({
  draft: true,
  slug: 'pbr-vs-r-panel',
  title: 'PBR Panel vs R-Panel: What’s the Difference? | Ironworks',
  desc: 'PBR and R-panel look almost the same. The difference is the purlin bearing leg on the PBR overlap. Here’s what that changes and when each one fits.',
  eyebrow: 'Panels & Trim',
  crumb: 'PBR Panel vs R-Panel',
  h1: 'PBR panel vs R-panel: what’s the difference?',
  lead: 'They look almost identical from the ground. The difference is one extra lip on the PBR panel’s overlap edge, called the purlin bearing leg, and it changes how the panels sit where they overlap.',
  blocks: [
    ['h2', 'The short answer'],
    ['p', 'PBR stands for purlin bearing rib. On a PBR panel, the overlapping edge has an extra leg that rests on the purlin, so the lap is supported instead of floating. R-panel has the same general rib shape without that leg.'],
    ['h2', 'Side by side'],
    ['icons', [
      ['Shape', 'Both are exposed-fastener panels with tall trapezoid ribs. From a distance you can’t tell them apart.'],
      ['The overlap', 'PBR adds the purlin bearing leg on the overlap edge. R-panel doesn’t.'],
      ['Where you see them', 'PBR shows up often on commercial roofs and larger buildings. R-panel is common on shops, garages, and ag buildings.'],
      ['Fasteners', 'Both use exposed screws through the panel. Screw type and pattern come from the panel maker’s spec.'],
    ]],
    ['callout', ['Profiles vary by maker', 'Rib height, spacing, and coverage width differ between manufacturers. Before you order, ask for the spec sheet of the exact panel, and match replacements to it.']],
    ['h2', 'Which one fits your job'],
    ['list', [
      'Replacing or matching existing panels: match what’s on the building. Send a photo and a measurement of the rib.',
      'New roof on a larger or commercial building: PBR is the usual pick.',
      'Walls, shops, and garages: either works. The choice often comes down to what’s already on site and the spec.',
    ]],
    ['h2', 'What Ironworks carries'],
    ['p', `Ironworks carries PBR panel, AG panel, and R-panel. PBR is ${F.pbr.gauge}, in ${F.pbr.colors.join(', ').toLowerCase()}. ${F.pbr.moreColors}.`],
  ],
  faqs: [
    ['Can I mix PBR and R-panel on the same roof?', 'The overlaps are built differently, so they’re not meant to lap into each other. Send the job details and we’ll look at what’s on the building.'],
    ['Is PBR stronger than R-panel?', 'The purlin bearing leg supports the overlap, which is why PBR is common on commercial roofs. Actual load ratings depend on the gauge, the panel maker, and the building design.'],
  ],
  related: [R.PANELS, R.PANEL_ORDER, R.CONTRACTORS],
});
