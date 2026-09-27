import { systemPage } from './_systems.mjs';
import { R } from '../blocks.mjs';
export default systemPage({
  slug: 'red-iron-buildings', name: 'Red Iron Buildings', crumb: 'Red Iron Buildings',
  desc: 'Pre-engineered red iron steel buildings for commercial and industrial builds in the Scottsbluff-Morrill region, supplied and installed by Ironworks.',
  lead: 'Pre-engineered structural steel for large commercial and industrial builds. Serious strength for demanding builds.',
  photo: ['Real_pictures/8.webp', 'Red iron steel framing crew on site', 'Red iron framing crew on site'],
  goodFor: ['Commercial buildings', 'Industrial buildings'],
  notes: [['figure', ['Real_pictures/5.webp', 'Steel erection crew on scissor lift', 'Steel erection']]],
  related: [R.POST_FRAME, R.COLD_FORM, R.PANELS],
});
