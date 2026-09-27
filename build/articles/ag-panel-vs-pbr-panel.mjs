import { F } from '../facts.mjs';
import { article, R } from '../blocks.mjs';

// DRAFT: technical content awaits Spencer's sign-off.
export default article({
  draft: true,
  slug: 'ag-panel-vs-pbr-panel',
  title: 'AG Panel vs PBR vs R-Panel: Which Metal Panel? | Ironworks',
  desc: 'AG panels have lower, closer ribs. PBR and R-panel have taller, wider ribs. Here’s how the three compare and where each one is usually used.',
  eyebrow: 'Panels & Trim',
  crumb: 'AG Panel vs PBR Panel',
  h1: 'AG panel vs PBR vs R-panel',
  lead: 'All three are exposed-fastener metal panels. AG panels have lower ribs spaced closer together. PBR and R-panel have taller ribs spaced wider apart.',
  blocks: [
    ['h2', 'How they differ'],
    ['icons', [
      ['AG panel', 'Lower, closely spaced ribs. The long-time standard on barns, sheds, and ag buildings.'],
      ['R-panel', 'Taller trapezoid ribs spaced wider apart. Common on shops, garages, and ag buildings.'],
      ['PBR panel', 'The R-panel shape plus a purlin bearing leg on the overlap edge. Common on commercial roofs.'],
    ]],
    ['h2', 'How to choose'],
    ['list', [
      'Matching an existing building: match the profile that’s there. Send a photo and a rib measurement.',
      'Ag buildings and sheds: AG panel is the traditional choice.',
      'Shops, garages, and commercial roofs: R-panel or PBR, depending on the spec.',
    ]],
    ['callout', ['Check the spec sheet', 'Rib size, spacing, gauge, and coverage vary by manufacturer. Ask for the spec of the exact panel before you order or match.']],
    ['h2', 'What Ironworks carries'],
    ['p', `AG panel, R-panel, and PBR panel. PBR is ${F.pbr.gauge}. Ask about current gauges and colors for AG and R-panel.`],
  ],
  faqs: [
    ['What is an AG panel?', 'An exposed-fastener metal panel with lower, closely spaced ribs, long used on barns, sheds, and ag buildings.'],
    ['Can AG panel and R-panel overlap each other?', 'No. The rib shapes don’t match, so they don’t lap together. Match the profile that’s already on the building.'],
  ],
  related: [R.PANELS, R.PANEL_ORDER, R.CONTRACTORS],
});
