import type { ImageMetadata } from 'astro';
import type { L } from './types';
import dataSheet from '../assets/images/data-sheet-redacted.jpg';
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
    id: 'data-sheet',
    badge: { en: 'NOC Approved', ur: 'این او سی منظور شدہ' },
    authority: { en: 'Regularization & Site Evaluation Form', ur: 'ریگولرائزیشن اور سائٹ ایویلیوایشن فارم' },
    title: { en: 'Housing Society Information & Data Sheet', ur: 'ہاؤسنگ سوسائٹی معلوماتی و ڈیٹا شیٹ' },
    rows: [
      { label: { en: 'Approving Authority', ur: 'منظوری دینے والا ادارہ' }, value: { en: 'TMA Khanpur', ur: 'ٹی ایم اے خانپور' } },
      { label: { en: 'Status', ur: 'حیثیت' }, value: { en: 'NOC Approved', ur: 'این او سی منظور شدہ' } },
      { label: { en: 'Total Area', ur: 'کل رقبہ' }, value: { en: '164 Kanal 10 Marla', ur: '164 کنال 10 مرلہ' } },
    ],
    description: {
      en: 'Official information and data sheet for Taxila Satellite Township, recording the district (Haripur), mouza and tehsil (Toffkian & Khanpur), total area, amenity land, approving authority and the block-wise site position of 349 plots.',
      ur: 'ٹیکسلا سیٹلائٹ ٹاؤن شپ کی سرکاری معلوماتی و ڈیٹا شیٹ، جس میں ضلع (ہری پور)، موضع و تحصیل (توفکیاں و خانپور)، کل رقبہ، سہولیات کی زمین، منظوری دینے والا ادارہ اور 349 پلاٹس کی بلاک وار تفصیل درج ہے۔',
    },
    legal: {
      en: 'Confirms NOC approval by TMA Khanpur and documents 67.384 Kanal of amenity land, of which 22 Kanal has been transferred. Personal details and rate information are redacted in this copy.',
      ur: 'ٹی ایم اے خانپور سے این او سی کی منظوری کی تصدیق کرتی ہے اور 67.384 کنال سہولیات کی زمین درج کرتی ہے، جس میں سے 22 کنال منتقل کی جا چکی ہے۔ اس نقل میں ذاتی معلومات اور نرخ پوشیدہ رکھے گئے ہیں۔',
    },
    image: dataSheet,
    imageAlt: {
      en: 'Taxila Satellite Township housing society information and data sheet, with personal details and rates redacted',
      ur: 'ٹیکسلا سیٹلائٹ ٹاؤن شپ کی ہاؤسنگ سوسائٹی معلوماتی و ڈیٹا شیٹ، ذاتی معلومات اور نرخ پوشیدہ',
    },
  },
  {
    id: 'master-layout',
    badge: { en: 'Approval Stamp', ur: 'منظوری کی مہر' },
    authority: { en: 'Master Layout Plan', ur: 'ماسٹر لے آؤٹ پلان' },
    title: { en: 'Approved Master Layout Plan', ur: 'منظور شدہ ماسٹر لے آؤٹ پلان' },
    rows: [
      { label: { en: 'Residential Plots', ur: 'رہائشی پلاٹس' }, value: { en: '349', ur: '349' }, ltr: true },
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
