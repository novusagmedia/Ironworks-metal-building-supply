import { systemPage } from './_systems.mjs';
import { R } from '../blocks.mjs';
export default systemPage({
  slug: 'red-iron-buildings', name: 'Red Iron Buildings', crumb: 'Red Iron Buildings',
  desc: 'Pre-engineered red iron steel buildings for commercial and industrial builds in the Scottsbluff-Morrill region, supplied and installed by Ironworks.',
  lead: 'Pre-engineered structural steel for large commercial and industrial builds. Serious strength for demanding builds.',
  // No photo: none of the library shows red iron (photos 5/8/13 are galvanized cold-form). See Structure/shot-list.md.
  photo: null,
  goodFor: ['Commercial buildings', 'Industrial buildings'],
  related: [R.POST_FRAME, R.COLD_FORM, R.PANELS],
});
