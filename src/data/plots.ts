import type { L } from './types';

export interface Plot {
  /** Value sent in the WhatsApp message and used to preselect the form. Keep in English. */
  value: string;
  label: L;
  short: string; // e.g. "5M"
  dimensions: string; // width × depth, feet
  sqft: number;
  marla: number;
  kanal: number;
  badge: L;
  badgeTone: 'night' | 'olive' | 'brown' | 'gold' | 'sand';
  description: L;
  featured?: boolean;
}

export const plots: Plot[] = [
  {
    value: '5 Marla',
    label: { en: '5 Marla', ur: '5 مرلہ' },
    short: '5M',
    dimensions: '25 × 45',
    sqft: 1125,
    marla: 5,
    kanal: 0.25,
    badge: { en: 'Residential', ur: 'رہائشی' },
    badgeTone: 'night',
    description: {
      en: 'Well-proportioned for compact modern residential construction.',
      ur: 'جدید اور مختصر رہائشی تعمیر کے لیے متوازن تناسب والا پلاٹ۔',
    },
  },
  {
    value: '7 Marla',
    label: { en: '7 Marla', ur: '7 مرلہ' },
    short: '7M',
    dimensions: '30 × 55',
    sqft: 1650,
    marla: 7.33,
    kanal: 0.37,
    badge: { en: 'Executive', ur: 'ایگزیکٹو' },
    badgeTone: 'olive',
    description: {
      en: 'Ample layout for multi-bedroom homes and double car porches.',
      ur: 'کئی کمروں والے گھروں اور ڈبل کار پورچ کے لیے کشادہ لے آؤٹ۔',
    },
  },
  {
    value: '8 Marla',
    label: { en: '8 Marla', ur: '8 مرلہ' },
    short: '8M',
    dimensions: '30 × 60',
    sqft: 1800,
    marla: 8,
    kanal: 0.4,
    badge: { en: 'Residential', ur: 'رہائشی' },
    badgeTone: 'night',
    description: {
      en: 'Generous 60ft depth allowing custom architectural layouts.',
      ur: '60 فٹ کی کشادہ گہرائی، جو اپنی پسند کے تعمیراتی نقشے کی گنجائش دیتی ہے۔',
    },
  },
  {
    value: '10 Marla',
    label: { en: '10 Marla', ur: '10 مرلہ' },
    short: '10M',
    dimensions: '35 × 65',
    sqft: 2275,
    marla: 10.11,
    kanal: 0.5,
    badge: { en: 'Premium', ur: 'پریمیم' },
    badgeTone: 'brown',
    description: {
      en: 'Premium residential plot accommodating luxury villas and lawns.',
      ur: 'پرتعیش ولاز اور لان کے لیے موزوں پریمیم رہائشی پلاٹ۔',
    },
  },
  {
    value: '1 Kanal',
    label: { en: '1 Kanal', ur: '1 کنال' },
    short: '1K',
    dimensions: '50 × 90',
    sqft: 4500,
    marla: 20,
    kanal: 1,
    badge: { en: 'Luxury Estate', ur: 'لگژری اسٹیٹ' },
    badgeTone: 'brown',
    description: {
      en: 'Estate plot — the premier residential address in Taxila Gardens.',
      ur: 'اسٹیٹ پلاٹ — ٹیکسلا گارڈنز کا سب سے نمایاں رہائشی پتہ۔',
    },
    featured: true,
  },
];

/** The single option list used by every form (brief §6.3). */
export const plotOptions: { value: string; label: L }[] = [
  ...plots.map((p) => ({ value: p.value, label: p.label })),
  { value: 'Commercial', label: { en: 'Commercial', ur: 'کمرشل' } },
  { value: 'General Inquiry', label: { en: 'General Inquiry', ur: 'عمومی معلومات' } },
];

export const formatNumber = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
