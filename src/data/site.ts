/**
 * Global site facts. Edit here and every page updates.
 * Numbers & phone formats are shown in Western digits in both languages.
 */

/**
 * ⚠️ CONFIRM WITH CLIENT: the domain has not been bought yet.
 * Replace this with the final domain (no trailing slash) before going live,
 * then rebuild. It drives canonical URLs, Open Graph tags, hreflang, sitemap.xml and robots.txt.
 */
export const SITE_URL = 'https://www.taxilagardens.example';

export const site = {
  name: 'Taxila Gardens Housing Scheme',
  shortName: 'Taxila Gardens',
  abbreviation: 'TGHS',
  developer: 'Landmark Group',

  facts: {
    landKanal: 360.32,
    plots: 699,
    layoutApprovalDate: '2016-02-28',
    approvalAuthority: 'TMA Haripur',
    nocNumber: 'No. 1634 / TMA (H)',
    nocDate: '2016-04-29',
    mainBoulevardFt: 100,
  },

  phones: [
    { display: '0333-010 9942', tel: '+923330109942', primary: true },
    { display: '0333-010 9934', tel: '+923330109934', primary: false },
  ],

  whatsapp: {
    number: '923330109942', // international format, digits only (used in wa.me links)
    display: '0333-010 9942',
    defaultMessage:
      'Hello Taxila Gardens Sales Team, I am interested in learning more about available plots and booking procedures.',
  },

  address: {
    line: 'Taxila Gardens Housing Scheme, Near Taxila Hills & HITEC, Khanpur, Haripur',
    locality: 'Khanpur',
    region: 'Haripur, Khyber Pakhtunkhwa',
    country: 'PK',
  },

  geo: { lat: 33.782, lng: 72.7937 },
  mapsUrl: 'https://maps.app.goo.gl/xbUgZ7K5DpDAJGxr9',

  hours: {
    weekdays: { days: 'Mo-Sa', opens: '09:00', closes: '18:00' },
  },

  areaServed: ['Taxila', 'Rawalpindi', 'Islamabad', 'Wah Cantt', 'Hasan Abdal'],

  /** No email or social accounts exist yet. Fill these in and they will render automatically. */
  email: '' as string,
  socials: {
    facebook: '' as string,
    instagram: '' as string,
    youtube: '' as string,
    tiktok: '' as string,
  },
} as const;

export type SocialKey = keyof typeof site.socials;

export const waLink = (message: string = site.whatsapp.defaultMessage) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
