import type { L } from './types';

export interface Amenity {
  icon: string; // Material Symbols (outlined) name
  category: L;
  title: L;
  description: L;
  /** Not yet built — shows a small "Planned" tag. */
  planned: boolean;
  /** Visual variant from the Stitch bento grid. */
  variant: 'dark' | 'cream' | 'highlight' | 'olive';
  wide?: boolean;
}

/**
 * Aligned with the master layout plan's schedule of land use and the on-site photographs.
 * Amenity land: 67.384 Kanal (22 Kanal transferred) — see site.ts.
 */
export const amenities: Amenity[] = [
  {
    icon: 'mosque',
    category: { en: 'Spiritual', ur: 'روحانی' },
    title: { en: 'Jamia Mosque', ur: 'جامع مسجد' },
    description: {
      en: 'A domed mosque with carved jali screens and an arched gateway, at the heart of the community.',
      ur: 'منقش جالیوں اور محرابی دروازے والی گنبد دار مسجد، کمیونٹی کے دل میں۔',
    },
    planned: false,
    variant: 'dark',
    wide: true,
  },
  {
    icon: 'park',
    category: { en: 'Recreation', ur: 'تفریح' },
    title: { en: 'Parks & Open Spaces', ur: 'پارکس و کھلی جگہیں' },
    description: {
      en: 'Parks and open spaces set aside in the master plan.',
      ur: 'ماسٹر پلان میں پارکس اور کھلی جگہوں کے لیے مختص رقبہ۔',
    },
    planned: false,
    variant: 'olive',
  },
  {
    icon: 'storefront',
    category: { en: 'Commercial', ur: 'کمرشل' },
    title: { en: 'Commercial Areas', ur: 'کمرشل ایریاز' },
    description: {
      en: 'Designated commercial areas for everyday shopping and services within the township.',
      ur: 'روزمرہ خریداری اور خدمات کے لیے ٹاؤن شپ کے اندر مخصوص کمرشل ایریاز۔',
    },
    planned: false,
    variant: 'cream',
  },
  {
    icon: 'security',
    category: { en: 'Security', ur: 'سیکیورٹی' },
    title: { en: 'Gated Main Entrance', ur: 'گیٹڈ مرکزی داخلہ' },
    description: {
      en: 'A gated main entrance with guard posts and boom barriers.',
      ur: 'گارڈ پوسٹس اور بوم بیریئرز کے ساتھ گیٹڈ مرکزی داخلہ۔',
    },
    planned: false,
    variant: 'cream',
  },
  {
    icon: 'add_road',
    category: { en: 'Infrastructure', ur: 'انفراسٹرکچر' },
    title: { en: 'Road Network', ur: 'سڑکوں کا نظام' },
    description: {
      en: 'A planned road network connecting Blocks A, B, C and E.',
      ur: 'بلاک اے، بی، سی اور ای کو ملانے والا منظم سڑکوں کا نظام۔',
    },
    planned: false,
    variant: 'cream',
  },
  {
    icon: 'account_balance',
    category: { en: 'Civic', ur: 'شہری' },
    title: { en: 'Public Buildings', ur: 'سرکاری عمارات' },
    description: {
      en: 'Sites reserved in the master plan for public and community buildings.',
      ur: 'ماسٹر پلان میں سرکاری اور کمیونٹی عمارات کے لیے مختص جگہیں۔',
    },
    planned: false,
    variant: 'highlight',
  },
  {
    icon: 'yard',
    category: { en: 'Community', ur: 'کمیونٹی' },
    title: { en: 'Community Graveyard', ur: 'کمیونٹی قبرستان' },
    description: {
      en: 'A graveyard designated within the township’s approved layout.',
      ur: 'ٹاؤن شپ کے منظور شدہ لے آؤٹ میں مخصوص قبرستان۔',
    },
    planned: false,
    variant: 'highlight',
  },
];
