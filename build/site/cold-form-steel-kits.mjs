import { systemPage } from './_systems.mjs';
import { R } from '../blocks.mjs';
export default systemPage({
  slug: 'cold-form-steel-kits', name: 'Cold-Form Steel Kits', crumb: 'Cold-Form Steel Kits',
  desc: 'Cold-form steel building kits for commercial and residential builds in the Scottsbluff-Morrill region. Designed, supplied, and installed by Ironworks.',
  lead: 'Engineered steel framing kits that go up fast, for commercial and residential builds.',
  photo: ['Real_pictures/7.webp', 'Cold-form steel arch framing against blue sky', 'Cold-form framing'],
  goodFor: ['Commercial buildings', 'Residential buildings'],
  notes: [['figure', ['Real_pictures/10.webp', 'Cold-form building frame on hillside site', 'Cold-form build on a hillside site']]],
  related: [R.POST_FRAME, R.RED_IRON, R.PANELS],
});
