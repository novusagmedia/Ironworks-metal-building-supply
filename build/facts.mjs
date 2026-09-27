// Every fact the site states, in one place. Mirrors Structure/facts.md (the sourced
// record, outside the repo). If a value isn't here, no page may say it.
export const F = {
  name: 'Ironworks Metal & Building Supply',
  domain: 'https://www.ironworksbuildingsupply.com',
  founded: '2025',
  founder: { name: 'Spencer Bush', title: 'Founder' },

  address: { street: '30101 County Road 9', city: 'Morrill', region: 'NE', zip: '69358' },
  phone: { display: '(308) 672-3891', tel: '3086723891', e164: '+1-308-672-3891' },
  email: 'sales@ironworksbuildingsupply.com',

  hours: {
    text: 'Monday–Friday, 8:00 AM–5:00 PM',
    closed: 'Closed on federal holidays',
    pickup: 'Pickups follow normal business hours',
    schema: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' }],
  },

  markets: ['Scottsbluff', 'Gering', 'Morrill'],
  states: ['Nebraska', 'Wyoming', 'South Dakota', 'northern Colorado'],
  delivery: 'Delivery is available roughly 250+ miles out, depending on the project',

  pbr: {
    gauge: '26 gauge',
    colors: ['White', 'Gray', 'Tan', 'Red', 'Blue', 'Black', 'Copper', 'Dark green'],
    moreColors: 'Additional colors are available by order',
  },
  panelLines: ['PBR panel', 'AG panel', 'R-panel'],
  doorsWindows: { garage: 'Midland Garage Doors', windows: 'Gerkin Windows' },

  links: {
    maps: 'https://www.google.com/maps/place/?q=place_id:ChIJA8iOdrVmvUURA1_d6H4LjB0',
    review: 'https://g.page/r/CQNf3eh-C4wdEBM/review',
    facebook: 'https://www.facebook.com/profile.php?id=61575009470576',
    instagram: 'https://www.instagram.com/ironworks_mbs/',
    designer: 'https://design.ironworksbuildingsupply.com/',
  },

  ga4: 'G-PGCKWH38WE',
  logo: 'Brand_assets/ironworks-logo.webp',
};

// Offer names are fixed by the MOS. Use these constants, never retype them.
export const OFFER = {
  contractor: { name: 'Contractor Job Specification Review', short: 'Job-Spec Review', href: 'contractors.html' },
  building: { name: 'Building Project Fit Check', short: 'Building Fit Check', href: 'get-a-quote.html' },
};
