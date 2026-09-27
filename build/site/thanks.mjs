import { F } from '../facts.mjs';
import { page } from '../blocks.mjs';
import { phoneLink } from './_shared.mjs';

// Opening line follows MOS Template Pack TPL-RP-01 (Immediate Acknowledgment).
const ack = 'Thanks for reaching out to Ironworks. We are reviewing the details and will follow up during our staffed response window.';
const sooner = `Our hours are ${F.hours.text}. Want to talk sooner? Call ${phoneLink}.`;
const base = { noindex: true, eyebrow: 'Received', lead: ack };

export default [
  page({ ...base, slug: 'thanks-fit-check', title: 'Fit Check Received | Ironworks', desc: 'Your Building Project Fit Check was received.', crumb: 'Fit Check received',
    h1: 'We received your Building Fit Check.',
    blocks: [
      ['h2', 'What happens next'],
      ['list', [
        'Spencer’s team reviews your project details.',
        'We call to go over use, site, size, and timeline.',
        'If the project is a fit, we set up an in-person meeting.',
        'You get a proposal based on your actual project.',
      ]],
      ['p', sooner],
      ['p', 'While you wait, you can [lay out your building in 3D](3d-designer.html).'],
    ] }),
  page({ ...base, slug: 'thanks-contractor', title: 'Job Details Received | Ironworks', desc: 'Your Contractor Job Specification Review was received.', crumb: 'Job details received',
    h1: 'We received your job details.',
    blocks: [
      ['h2', 'What happens next'],
      ['list', [
        'We review the spec: profile, gauge, color, lengths, quantities, and trim.',
        'We follow up with pricing and the next step.',
        'If anything is missing, we’ll ask for it rather than guess.',
      ]],
      ['p', sooner],
      ['p', 'Next time, here’s [what to send for a panel order](what-you-need-to-order-metal-panels.html).'],
    ] }),
  page({ ...base, slug: 'thanks-3d', title: 'Design Received | Ironworks', desc: 'Your 3D building design was received.', crumb: 'Design received',
    h1: 'We received your design.',
    blocks: [
      ['h2', 'What happens next'],
      ['list', [
        'Spencer’s team reviews your design.',
        'We call to go over options and pricing.',
        'A 3D design isn’t a quote on its own. Pricing comes after we review your site and project.',
      ]],
      ['p', sooner],
    ] }),
];
