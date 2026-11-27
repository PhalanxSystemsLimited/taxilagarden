/**
 * Global site facts. Edit here and every page updates.
 * Source: Taxila Satellite Township "Housing Society Information & Data Sheet" (prices intentionally excluded).
 * Numbers & phone formats are shown in Western digits in both languages.
 */
import type { L } from './types';

/**
 * ⚠️ CONFIRM WITH CLIENT: the domain has not been bought yet.
 * Replace this with the final domain (no trailing slash) before going live,
 * then rebuild. It drives canonical URLs, Open Graph tags, hreflang, sitemap.xml and robots.txt.
 */
export const SITE_URL = 'https://www.taxilasatellitetownship.example';

export const site = {
  name: 'Taxila Satellite Township',
  shortName: 'Taxila Satellite Township',
  abbreviation: 'TST',
  developer: 'Minawa Group',

  facts: {
    area: { kanal: 164, marla: 10 }, // 164 Kanal 10 Marla
    amenitiesKanal: 67.384, // parks, graveyard, roads, etc.
    amenitiesTransferredKanal: 22,
    approvalAuthority: 'TMA Khanpur',
    nocStatus: 'NOC Approved',
    district: 'Haripur',
    tehsil: 'Khanpur',
    mouza: 'Toffkian',
  },

  /** First entry is the primary number (top bar, "Call" buttons, structured data). */
  phones: [
    { display: '0331-7000012', tel: '+923317000012', label: { en: 'Site Office (Mobile & WhatsApp)', ur: 'سائٹ آفس (موبائل و واٹس ایپ)' } as L },
    { display: '051-2320148', tel: '+92512320148', label: { en: 'Head Office', ur: 'ہیڈ آفس' } as L },
    { display: '051-2320150', tel: '+92512320150', label: { en: 'Head Office', ur: 'ہیڈ آفس' } as L },
  ],

  whatsapp: {
    number: '923317000012', // international format, digits only (used in wa.me links) — confirmed by client 25 Nov 2026
    display: '0331-7000012',
    defaultMessage:
      'Hello Taxila Satellite Township Sales Team, I would like to know more about Taxila Satellite Township.',
  },

  email: 'taxila.township@gmail.com' as string,

  address: {
    site: {
      en: 'Canal Road, Taxila Satellite Township, Village & P.O. Toffkian, Tehsil Khanpur, District Haripur',
      ur: 'کینال روڈ، ٹیکسلا سیٹلائٹ ٹاؤن شپ، گاؤں و ڈاکخانہ توفکیاں، تحصیل خانپور، ضلع ہری پور',
    } as L,
    locality: 'Toffkian, Khanpur',
    region: 'Haripur, Khyber Pakhtunkhwa',
    country: 'PK',
  },

  /**
   * ⚠️ AWAITING CLIENT: exact site pin not supplied yet. The map is centred on UET Taxila,
   * which the scheme is adjacent to. Replace lat/lng (and mapsUrl with a Google Maps share link)
   * once the client sends the location pin.
   */
  geo: { lat: 33.7672, lng: 72.8229 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Taxila+Satellite+Township+Toffkian+Taxila',

  /** ⚠️ Office hours are not in the data sheet — confirm with client. */
  hours: {
    weekdays: { days: 'Mo-Sa', opens: '09:00', closes: '18:00' },
  },

  areaServed: ['Taxila', 'Khanpur', 'Haripur', 'Wah Cantt', 'Rawalpindi', 'Islamabad'],

  /** Projects completed by Minawa Group (from the data sheet). */
  developerProjects: [
    { name: 'Clara Apartments', location: { en: 'Diplomatic Enclave, Islamabad', ur: 'ڈپلومیٹک انکلیو، اسلام آباد' } as L },
    { name: 'The Royal Enclave — Executive Apartments', location: { en: 'Diplomatic Enclave, Islamabad', ur: 'ڈپلومیٹک انکلیو، اسلام آباد' } as L },
    { name: 'Park Tower — Luxury Apartments', location: { en: 'F-10/3, Islamabad', ur: 'ایف-10/3، اسلام آباد' } as L },
    { name: 'Oakwood Cottages', location: { en: 'Bhurban, Murree', ur: 'بھوربن، مری' } as L },
    { name: 'Country Club Apartments', location: { en: 'New Murree Expressway, Islamabad', ur: 'نیو مری ایکسپریس وے، اسلام آباد' } as L },
    { name: 'Wakefield Gardens', location: { en: 'Khanpur, Taxila', ur: 'خانپور، ٹیکسلا' } as L },
  ],

  /** No social accounts yet. Fill these in and they will render automatically. */
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

/** "164 Kanal 10 Marla" / "164 کنال 10 مرلہ" */
export const areaText = (lang: 'en' | 'ur') =>
  lang === 'ur'
    ? `${site.facts.area.kanal} کنال ${site.facts.area.marla} مرلہ`
    : `${site.facts.area.kanal} Kanal ${site.facts.area.marla} Marla`;
