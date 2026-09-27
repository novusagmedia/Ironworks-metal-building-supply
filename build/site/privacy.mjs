import { F } from '../facts.mjs';
import { page } from '../blocks.mjs';
import { emailLink, phoneLink } from './_shared.mjs';

export default page({
  slug: 'privacy',
  title: 'Privacy Policy | Ironworks',
  desc: 'How Ironworks Metal & Building Supply collects and uses the information you send through this website.',
  eyebrow: 'Legal',
  crumb: 'Privacy Policy',
  h1: 'Privacy Policy',
  lead: 'Last updated September 26, 2026.',
  blocks: [
    ['h2', 'Who we are'],
    ['p', `This website is operated by Ironworks Welding and Fabrication, LLC, doing business as ${F.name} (in Nebraska, Ironworks Metal Building Supply), ${F.address.street}, ${F.address.city}, ${F.address.region} ${F.address.zip}.`],
    ['h2', 'What we collect'],
    ['list', [
      'What you type into our forms: name, phone, email, company, project location, and project details.',
      'Basic usage data from analytics: pages visited, device type, and approximate location.',
    ]],
    ['h2', 'How we use it'],
    ['p', 'To review your project, respond to you, prepare pricing, and follow up. We do not sell your personal information.'],
    ['h2', 'Services we use'],
    ['icons', [
      ['Formspree', 'Receives and delivers form submissions to us.'],
      ['Google Analytics', 'Measures site traffic. It uses cookies; you can block them in your browser settings.'],
      ['Vercel', 'Hosts the site and provides privacy-friendly page analytics.'],
      ['Google Fonts', 'Serves the typefaces used on the site.'],
    ]],
    ['h2', 'Questions or removal requests'],
    ['p', `Email ${emailLink} or call ${phoneLink} to ask what we have on file or to have it removed.`],
  ],
});
