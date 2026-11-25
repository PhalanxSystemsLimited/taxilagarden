import type { L } from './types';

/**
 * Schedule of land use — percentages from the master layout plan scan (003.JPG).
 * The plan's own total area is intentionally not shown; the site uses 164 Kanal 10 Marla (data sheet).
 */
export const landUse: { key: string; label: L; percent: number; icon: string }[] = [
  { key: 'residential', label: { en: 'Residential', ur: 'رہائشی' }, percent: 53.79, icon: 'home' },
  { key: 'roads', label: { en: 'Roads', ur: 'سڑکیں' }, percent: 25.37, icon: 'add_road' },
  { key: 'parks', label: { en: 'Parks & Open Space', ur: 'پارکس و کھلی جگہ' }, percent: 8.44, icon: 'park' },
  { key: 'commercial', label: { en: 'Commercial', ur: 'کمرشل' }, percent: 4.9, icon: 'storefront' },
  { key: 'public', label: { en: 'Public Buildings', ur: 'سرکاری عمارات' }, percent: 3.26, icon: 'account_balance' },
  { key: 'graveyard', label: { en: 'Graveyard', ur: 'قبرستان' }, percent: 2.11, icon: 'yard' },
  { key: 'nalah', label: { en: 'Nalah (stream)', ur: 'نالہ' }, percent: 1.47, icon: 'water' },
  { key: 'mosque', label: { en: 'Mosque', ur: 'مسجد' }, percent: 0.62, icon: 'mosque' },
];
