import { OFFER } from '../facts.mjs';
import { page, R } from '../blocks.mjs';

// Labels match the homepage gallery captions. All 14 real photos appear here. Photos are from 2025 and 2026;
// towns are not known (Spencer via Giussepe, 2026-10-17), so captions name the building, never a place or a per-photo year.
export default page({
  slug: 'projects',
  title: 'Projects: Metal Buildings Across the Region | Ironworks',
  desc: 'Real post-frame and cold-form steel buildings from Ironworks, photographed in 2025 and 2026: shops, barns, garages, storage, and steel erection.',
  eyebrow: 'Our Work',
  crumb: 'Projects',
  h1: 'Built Across the Region',
  lead: 'Real Ironworks projects photographed in 2025 and 2026: post-frame shops and barns, cold-form steel builds, and steel erection.',
  cta: 'building',
  ogImage: 'Real_pictures/1.webp',
  blocks: [
    ['gallery', [
      ['Real_pictures/1.webp', 'Gray post-frame shop in winter', 'Gray post-frame shop'],
      ['Real_pictures/6.webp', 'Tan post-frame barn with carriage doors', 'Tan post-frame barn'],
      ['Real_pictures/2.webp', 'Black post-frame shop with lean-to', 'Black shop with lean-to'],
      ['Real_pictures/12.webp', 'Red gambrel barn with metal roof', 'Red gambrel barn'],
      ['Real_pictures/9.webp', 'Post-frame barndominium at golden hour', 'Post-frame barndominium'],
      ['Real_pictures/14.webp', 'Yellow metal building with red trim', 'Yellow post-frame shop'],
      ['Real_pictures/10.webp', 'Cold-form building frame on hillside site', 'Cold-form build, hillside site'],
      ['Real_pictures/11.webp', 'Commercial storage units', 'Commercial storage units'],
      ['Real_pictures/7.webp', 'Cold-form steel arch framing against blue sky', 'Cold-form framing'],
      ['Real_pictures/3.webp', 'Cold-form steel framing under construction', 'Cold-form framing'],
      ['Real_pictures/4.webp', 'Cold-form steel panels interior', 'Cold-form panels, interior'],
      ['Real_pictures/5.webp', 'Steel erection crew on scissor lift', 'Steel erection crew'],
      ['Real_pictures/8.webp', 'Steel framing crew on site', 'Steel erection'],
      ['Real_pictures/13.webp', 'Steel frame close-up under overcast sky', 'Steel frame close-up'],
    ]],
    ['p', `Planning something similar? Start a [${OFFER.building.name}](${OFFER.building.href}) or [lay it out in 3D](3d-designer.html).`],
  ],
  related: [R.POST_FRAME, R.COLD_FORM, R.RED_IRON],
});
