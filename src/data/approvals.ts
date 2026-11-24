import type { ImageMetadata } from 'astro';
import type { L } from './types';
import masterLayout from '../assets/images/master-layout-plan.jpg';

export interface ApprovalDoc {
  id: string;
  badge: L;
  authority: L;
  title: L;
  referenceLabel: L;
  reference: L;
  date: string; // ISO
  description: L;
  legal: L;
  /** Scan image. `null` renders an on-brand placeholder until the client supplies the scan. */
  image: ImageMetadata | null;
  imageAlt: L;
}

export const approvals: ApprovalDoc[] = [
  {
    id: 'noc-letter',
    badge: { en: 'Official Letter', ur: 'سرکاری خط' },
    authority: { en: 'Tehsil Municipal Administration (TMA) Haripur', ur: 'تحصیل میونسپل ایڈمنسٹریشن (ٹی ایم اے) ہری پور' },
    title: { en: 'Official N.O.C Grant Letter', ur: 'این او سی کی منظوری کا سرکاری خط' },
    referenceLabel: { en: 'Reference No.', ur: 'حوالہ نمبر' },
    reference: { en: 'No. 1634 / TMA (H)', ur: 'No. 1634 / TMA (H)' },
    date: '2016-04-29',
    description: {
      en: 'Official letter issued by the Tehsil Municipal Officer (TMA Haripur) to Chairman Mr. Mehmood Nawaz Saleem for the Grant of N.O.C in favour of Taxila Gardens Housing Scheme, acknowledging official scrutiny fee deposited on 17-03-2016.',
      ur: 'تحصیل میونسپل آفیسر (ٹی ایم اے ہری پور) کی جانب سے چیئرمین جناب محمود نواز سلیم کے نام ٹیکسلا گارڈنز ہاؤسنگ اسکیم کے حق میں این او سی کی منظوری کا سرکاری خط، جس میں 17-03-2016 کو جمع کرائی گئی سرکاری اسکروٹنی فیس کی تصدیق کی گئی ہے۔',
    },
    legal: {
      en: 'Legitimate municipal letter from TMA Haripur acknowledging scheme submission, receipt of official processing fees, and documentation scrutiny.',
      ur: 'ٹی ایم اے ہری پور کا مستند میونسپل خط، جو اسکیم کی درخواست، سرکاری پراسیسنگ فیس کی وصولی اور دستاویزات کی جانچ کی تصدیق کرتا ہے۔',
    },
    image: null, // TODO: add the NOC letter scan to src/assets/images and import it here
    imageAlt: {
      en: 'TMA Haripur NOC letter No. 1634/TMA(H) dated 29 April 2016 for Taxila Gardens Housing Scheme',
      ur: 'ٹیکسلا گارڈنز ہاؤسنگ اسکیم کے لیے ٹی ایم اے ہری پور کا این او سی خط نمبر 1634، مورخہ 29 اپریل 2016',
    },
  },
  {
    id: 'master-layout',
    badge: { en: 'Approved', ur: 'منظور شدہ' },
    authority: { en: 'Tehsil Municipal Administration (TMA) Haripur', ur: 'تحصیل میونسپل ایڈمنسٹریشن (ٹی ایم اے) ہری پور' },
    title: { en: 'Approved Master Layout Plan (360.32 Kanals)', ur: 'منظور شدہ ماسٹر لے آؤٹ پلان (360.32 کنال)' },
    referenceLabel: { en: 'Reference', ur: 'حوالہ' },
    reference: { en: 'TMA Haripur Sub-Engineer Approval Stamp', ur: 'ٹی ایم اے ہری پور سب انجینئر کی منظوری کی مہر' },
    date: '2016-02-28',
    description: {
      en: 'Official Master Layout Plan covering 360.32 Kanals, bearing the official approval stamp and signatures of TMA Haripur Town Planning and Sub-Engineer. Sanctions 699 residential plots, wide boulevard road networks, parks, and civic reserves.',
      ur: '360.32 کنال پر محیط سرکاری ماسٹر لے آؤٹ پلان، جس پر ٹی ایم اے ہری پور ٹاؤن پلاننگ اور سب انجینئر کی منظوری کی مہر اور دستخط ثبت ہیں۔ اس میں 699 رہائشی پلاٹ، کشادہ بلیوارڈ سڑکیں، پارکس اور شہری سہولیات کے لیے مختص رقبے منظور شدہ ہیں۔',
    },
    legal: {
      en: 'The complete town planning layout is officially stamped and approved by TMA Haripur municipal authorities, protecting all designated road widths and public amenity areas.',
      ur: 'مکمل ٹاؤن پلاننگ لے آؤٹ ٹی ایم اے ہری پور کے میونسپل حکام سے باضابطہ مہر شدہ اور منظور شدہ ہے، جس سے تمام مقررہ سڑکوں کی چوڑائی اور عوامی سہولیات کے رقبے محفوظ ہیں۔',
    },
    image: masterLayout,
    imageAlt: {
      en: 'TMA Haripur approved master layout plan of Taxila Gardens Housing Scheme showing sectors, roads, parks and the schedule of land use',
      ur: 'ٹیکسلا گارڈنز ہاؤسنگ اسکیم کا ٹی ایم اے ہری پور سے منظور شدہ ماسٹر لے آؤٹ پلان، جس میں سیکٹرز، سڑکیں، پارکس اور زمین کے استعمال کا شیڈول دکھایا گیا ہے',
    },
  },
];
