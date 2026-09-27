import { OFFER } from '../facts.mjs';
import { article, R } from '../blocks.mjs';

// DRAFT: technical content awaits Spencer's sign-off.
export default article({
  draft: true,
  slug: 'post-frame-vs-steel-building',
  title: 'Post-Frame vs Pole Barn vs Steel Building | Ironworks',
  desc: 'Post-frame is today’s version of the pole barn: wood columns and trusses with a metal skin. A steel building uses a steel frame on a concrete foundation.',
  eyebrow: 'Buildings',
  crumb: 'Post-Frame vs Steel Building',
  h1: 'Post-frame vs pole barn vs steel building',
  lead: 'A pole barn and a post-frame building are the same family: wood columns and trusses with a metal skin. A steel building swaps the wood frame for steel and sits on a concrete foundation.',
  cta: 'building',
  blocks: [
    ['h2', 'Post-frame and pole barns'],
    ['p', '“Pole barn” is the older name. Early ones used round poles set in the ground. Post-frame is the modern version, usually built with engineered or laminated columns, wood trusses, and girts, then skinned in metal panels.'],
    ['h2', 'Steel buildings'],
    ['p', 'A steel building uses a steel frame instead of wood, anchored to a concrete foundation. Ironworks offers two kinds: [cold-form steel kits](cold-form-steel-kits.html), built from lighter formed steel, and [red iron buildings](red-iron-buildings.html), built from heavy structural steel.'],
    ['h2', 'How they compare'],
    ['icons', [
      ['Foundation', 'Post-frame columns are set in the ground or on piers. Steel frames anchor to a concrete foundation.'],
      ['Interior finishing', 'Wood framing makes it easy to attach insulation, liner panels, and interior walls.'],
      ['Clear spans', 'Steel frames are the usual choice when you need very wide open spans, like large commercial spaces.'],
      ['Typical uses', 'Post-frame: ag barns, shops, garages, and storage. Steel: commercial and industrial buildings.'],
    ]],
    ['callout', ['The right answer depends on the project', `Use, site, size, and budget all matter. A [${OFFER.building.name}](${OFFER.building.href}) is the fastest way to get a straight answer for your building.`]],
  ],
  faqs: [
    ['Is a pole barn the same as a post-frame building?', 'Close. Post-frame is the modern, engineered version of the pole barn.'],
    ['Does Ironworks build all three?', 'Ironworks supplies and installs post-frame, cold-form steel, and red iron buildings. Concrete is handled by our subcontractor partners.'],
  ],
  related: [R.POST_FRAME, R.COLD_FORM, R.RED_IRON],
});
