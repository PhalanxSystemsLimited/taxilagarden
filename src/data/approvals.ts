import type { ImageMetadata } from 'astro';
import type { L } from './types';
import masterLayout from '../assets/images/master-layout-plan.jpg';

export interface ApprovalDoc {
  id: string;
  badge: L;
  authority: L;
  title: L;
  /** Label/value rows shown on the card (e.g. Status, Area). */
  rows: { label: L; value: L; ltr?: boolean }[];
  description: L;
  legal: L;
  /** Scan image. `null` renders an on-brand placeholder. */
  image: ImageMetadata | null;
  imageAlt: L;
}

export const approvals: ApprovalDoc[] = [
  {
    id: 'master-layout',
    badge: { en: 'Approval Stamp', ur: 'منظوری کی مہر' },
    authority: { en: 'Master Layout Plan', ur: 'ماسٹر لے آؤٹ پلان' },
    title: { en: 'Approved Master Layout Plan', ur: 'منظور شدہ ماسٹر لے آؤٹ پلان' },
    rows: [
      { label: { en: 'Blocks', ur: 'بلاکس' }, value: { en: 'A, B, C & E', ur: 'اے، بی، سی اور ای' } },
    ],
    description: {
      en: 'Master layout plan of Taxila Satellite Township showing the sectors, plot layout, road network, parks and open spaces, mosque, commercial areas, public buildings and graveyard, with the schedule of land use and the official approval stamp.',
      ur: 'ٹیکسلا سیٹلائٹ ٹاؤن شپ کا ماسٹر لے آؤٹ پلان، جس میں سیکٹرز، پلاٹس کی ترتیب، سڑکوں کا نظام، پارکس و کھلی جگہیں، مسجد، کمرشل ایریاز، سرکاری عمارات اور قبرستان، زمین کے استعمال کے شیڈول اور سرکاری منظوری کی مہر کے ساتھ دکھائے گئے ہیں۔',
    },
    legal: {
      en: 'The schedule of land use on the plan designates residential, commercial, mosque, parks and open space, roads, public buildings and graveyard areas.',
      ur: 'پلان پر زمین کے استعمال کا شیڈول رہائشی، کمرشل، مسجد، پارکس و کھلی جگہ، سڑکوں، سرکاری عمارات اور قبرستان کے رقبے مختص کرتا ہے۔',
    },
    image: masterLayout,
    imageAlt: {
      en: 'Master layout plan of Taxila Satellite Township showing sectors, roads, parks and the schedule of land use',
      ur: 'ٹیکسلا سیٹلائٹ ٹاؤن شپ کا ماسٹر لے آؤٹ پلان، جس میں سیکٹرز، سڑکیں، پارکس اور زمین کے استعمال کا شیڈول دکھایا گیا ہے',
    },
  },
];
