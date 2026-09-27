import { systemPage } from './_systems.mjs';
import { R } from '../blocks.mjs';
// Copy source: approved homepage building cards + Who We Serve (live site, Jul 2026).
export default systemPage({
  slug: 'post-frame-buildings', name: 'Post-Frame Buildings', crumb: 'Post-Frame Buildings',
  desc: 'Post-frame buildings for ag, commercial, and residential use in the Scottsbluff-Morrill region. Designed, supplied, and installed by Ironworks.',
  lead: 'The most versatile system for ag, commercial, and residential. Strong, fast to build, and cost-effective across large spans.',
  photo: ['Real_pictures/9.webp', 'Post-frame barndominium at golden hour built by Ironworks', 'Post-frame barndominium'],
  goodFor: ['Ag barns and shops', 'Equipment storage buildings', 'Personal shops and garages', 'Horse barns and hobby buildings', 'Small commercial projects'],
  notes: [['figure', ['Real_pictures/6.webp', 'Tan post-frame barn with carriage doors', 'Post-frame barn']]],
  related: [R.COLD_FORM, R.RED_IRON, R.PANELS],
});
