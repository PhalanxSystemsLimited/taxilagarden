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

/**
 * Plot categories confirmed by the client (25 Nov 2026).
 * sq ft = width × depth; Kanal = Marla ÷ 20.
 */
export const plots: Plot[] = [
  {
    value: '5 Marla',
    label: { en: '5 Marla', ur: '5 مرلہ' },
    short: '5M',
    dimensions: '25 × 50',
    sqft: 1250,
    marla: 5,
    kanal: 0.25,
    badge: { en: 'Residential', ur: 'رہائشی' },
    badgeTone: 'night',
    description: {
      en: 'A well-proportioned 25 × 50 ft plot, ideal for a compact modern family home.',
      ur: '25 × 50 فٹ کا متوازن پلاٹ، جدید اور مختصر خاندانی گھر کے لیے موزوں۔',
    },
  },
  {
    value: '6 Marla',
    label: { en: '6 Marla', ur: '6 مرلہ' },
    short: '6M',
    dimensions: '30 × 50',
    sqft: 1500,
    marla: 6,
    kanal: 0.3,
    badge: { en: 'Family', ur: 'فیملی' },
    badgeTone: 'olive',
    description: {
      en: 'A wider 30 × 50 ft plot with room for a more spacious home layout.',
      ur: '30 × 50 فٹ کا کشادہ پلاٹ، زیادہ وسیع گھر کے نقشے کی گنجائش کے ساتھ۔',
    },
  },
  {
    value: '7.7 Marla',
    label: { en: '7.7 Marla', ur: '7.7 مرلہ' },
    short: '7.7M',
    dimensions: '31.25 × 59.71',
    sqft: 1866,
    marla: 7.7,
    kanal: 0.385,
    badge: { en: 'Premium', ur: 'پریمیم' },
    badgeTone: 'brown',
    description: {
      en: 'Our largest plot category — 31.25 × 59.71 ft, for a larger family home with outdoor space.',
      ur: 'ہماری سب سے بڑی پلاٹ کیٹیگری — 31.25 × 59.71 فٹ، کھلی جگہ کے ساتھ بڑے خاندانی گھر کے لیے۔',
    },
    featured: true,
  },
];

/** The single option list used by every form. */
export const plotOptions: { value: string; label: L }[] = [
  ...plots.map((p) => ({ value: p.value, label: p.label })),
  { value: 'Commercial', label: { en: 'Commercial', ur: 'کمرشل' } },
  { value: 'General Inquiry', label: { en: 'General Inquiry', ur: 'عمومی معلومات' } },
];

export const formatNumber = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
