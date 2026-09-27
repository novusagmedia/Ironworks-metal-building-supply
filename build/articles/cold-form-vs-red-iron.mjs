import { article, R } from '../blocks.mjs';

// DRAFT: technical content awaits Spencer's sign-off.
export default article({
  draft: true,
  slug: 'cold-form-vs-red-iron',
  title: 'Cold-Formed Steel vs Red Iron Buildings | Ironworks',
  desc: 'Cold-formed steel is lighter steel shaped at room temperature. Red iron is heavy structural steel. Here’s how they compare and which builds each one fits.',
  eyebrow: 'Buildings',
  crumb: 'Cold-Formed Steel vs Red Iron',
  h1: 'Cold-formed steel vs red iron buildings',
  lead: 'Both are steel buildings. Cold-formed steel uses lighter members shaped at room temperature. Red iron uses heavy structural steel, named for the red primer it usually ships in.',
  cta: 'building',
  blocks: [
    ['h2', 'How they differ'],
    ['icons', [
      ['Cold-formed steel', 'Lighter C- and Z-shaped members formed from steel sheet. Usually galvanized.'],
      ['Red iron', 'Heavy structural beams and columns, typically shipped with a red primer.'],
      ['Weight', 'Cold-form members are lighter and easier to handle on site.'],
      ['Size of building', 'Red iron is the usual choice for larger commercial and industrial buildings and very wide spans.'],
    ]],
    ['h2', 'How to choose'],
    ['list', [
      'Commercial or residential buildings of moderate size: cold-form steel kits are a common fit.',
      'Large commercial or industrial buildings: red iron.',
      'Not sure: send the use, site, size, and timeline and we’ll review it.',
    ]],
  ],
  faqs: [
    ['Why is it called red iron?', 'Structural steel frames are usually shipped with a red primer coat, which gave the buildings the name.'],
    ['Does Ironworks install both?', 'Yes. Ironworks supplies and installs cold-form steel and red iron buildings. Concrete is handled by our subcontractor partners.'],
  ],
  related: [R.COLD_FORM, R.RED_IRON, R.POST_FRAME],
});
