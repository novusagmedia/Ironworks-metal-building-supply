import { OFFER } from '../facts.mjs';
import { page, R } from '../blocks.mjs';

// Labels match the approved homepage gallery captions. All 14 real photos appear here.
export default page({
  slug: 'projects',
  title: 'Projects: Metal Buildings Across the Region | Ironworks',
  desc: 'Real post-frame and cold-form steel buildings from Ironworks: shops, barns, garages, storage, and steel erection across the region.',
  eyebrow: 'Our Work',
  crumb: 'Projects',
  h1: 'Built Across the Region',
  lead: 'Real Ironworks projects: post-frame shops and barns, cold-form steel builds, and steel erection.',
  cta: 'building',
  ogImage: 'Real_pictures/1.webp',
  blocks: [
    ['gallery', [
      ['Real_pictures/1.webp', 'Gray post-frame shop in winter', 'Residential shop'],
      ['Real_pictures/6.webp', 'Tan post-frame barn with carriage doors', 'Post-frame barn'],
      ['Real_pictures/2.webp', 'Black post-frame shop with lean-to', 'Shop / garage'],
      ['Real_pictures/12.webp', 'Red gambrel barn with metal roof', 'Gambrel barn'],
      ['Real_pictures/9.webp', 'Post-frame barndominium at golden hour', 'Post-frame barndominium'],
      ['Real_pictures/14.webp', 'Yellow metal building with red trim', 'Post-frame shop'],
      ['Real_pictures/10.webp', 'Cold-form building frame on hillside site', 'Cold-form build, hillside site'],
      ['Real_pictures/11.webp', 'Commercial storage units', 'Commercial storage'],
      ['Real_pictures/7.webp', 'Cold-form steel arch framing against blue sky', 'Cold-form framing'],
      ['Real_pictures/3.webp', 'Cold-form steel framing under construction', 'Cold-form framing'],
      ['Real_pictures/4.webp', 'Cold-form steel panels interior', 'Cold-form panels'],
      ['Real_pictures/5.webp', 'Steel erection crew on scissor lift', 'The build'],
      ['Real_pictures/8.webp', 'Steel framing crew on site', 'Steel erection'],
      ['Real_pictures/13.webp', 'Steel frame close-up under overcast sky', 'Steel structure'],
    ]],
    ['p', `Planning something similar? Start a [${OFFER.building.name}](${OFFER.building.href}) or [lay it out in 3D](3d-designer.html).`],
  ],
  related: [R.POST_FRAME, R.COLD_FORM, R.RED_IRON],
});
