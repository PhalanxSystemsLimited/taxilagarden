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

export const amenities: Amenity[] = [
  {
    icon: 'mosque',
    category: { en: 'Spiritual', ur: 'روحانی' },
    title: { en: 'Grand Jamia Mosque', ur: 'عظیم جامع مسجد' },
    description: {
      en: 'Architectural centerpiece integrating Gandhara stone-relief motifs with domed Islamic prayer halls and serene courtyards.',
      ur: 'گندھارا کے سنگی نقش و نگار اور گنبد دار اسلامی عبادت گاہوں کا امتزاج، پُرسکون صحنوں کے ساتھ اسکیم کا مرکزی تعمیراتی شاہکار۔',
    },
    planned: false,
    variant: 'dark',
    wide: true,
  },
  {
    icon: 'park',
    category: { en: 'Recreation', ur: 'تفریح' },
    title: { en: 'Gandhara Heritage Theme Parks', ur: 'گندھارا ہیریٹیج تھیم پارکس' },
    description: {
      en: 'Botanical gardens, reflecting fountains, native Margalla flora, jogging tracks.',
      ur: 'نباتاتی باغات، فوارے، مارگلہ کے مقامی پودے اور جاگنگ ٹریک۔',
    },
    planned: false,
    variant: 'olive',
  },
  {
    icon: 'security',
    category: { en: 'Security', ur: 'سیکیورٹی' },
    title: { en: '24/7 Gated Security & Surveillance', ur: 'چوبیس گھنٹے گیٹڈ سیکیورٹی اور نگرانی' },
    description: {
      en: 'Stone perimeter walls, RFID access barriers, HD CCTV, patrolling units.',
      ur: 'پتھر کی چار دیواری، آر ایف آئی ڈی رسائی بیریئرز، ایچ ڈی سی سی ٹی وی اور گشتی ٹیمیں۔',
    },
    planned: false,
    variant: 'cream',
  },
  {
    icon: 'storefront',
    category: { en: 'Commercial', ur: 'کمرشل' },
    title: { en: 'Commercial Boulevard & Retail', ur: 'کمرشل بلیوارڈ اور ریٹیل' },
    description: {
      en: 'Grocery, bakeries, pharmacies, banking, cafés on the 100 ft boulevard.',
      ur: '100 فٹ بلیوارڈ پر گروسری، بیکریاں، فارمیسیاں، بینکنگ اور کیفے۔',
    },
    planned: false,
    variant: 'cream',
  },
  {
    icon: 'power',
    category: { en: 'Infrastructure', ur: 'انفراسٹرکچر' },
    title: { en: 'Underground Utilities Network', ur: 'زیرِ زمین یوٹیلیٹیز نیٹ ورک' },
    description: {
      en: 'Underground power lines, fiber-optic ducts, filtered water reservoirs, storm drainage.',
      ur: 'زیرِ زمین بجلی کی لائنیں، فائبر آپٹک ڈکٹس، صاف پانی کے ذخائر اور برساتی نکاسی۔',
    },
    planned: true,
    variant: 'cream',
  },
  {
    icon: 'school',
    category: { en: 'Education', ur: 'تعلیم' },
    title: { en: 'Premier Educational Campus', ur: 'معیاری تعلیمی کیمپس' },
    description: {
      en: 'Reserved land for primary & secondary school campus.',
      ur: 'پرائمری اور سیکنڈری اسکول کیمپس کے لیے مختص زمین۔',
    },
    planned: true,
    variant: 'highlight',
    wide: true,
  },
  {
    icon: 'sports_basketball',
    category: { en: 'Recreation', ur: 'تفریح' },
    title: { en: 'Sports Enclave & Community Club', ur: 'اسپورٹس انکلیو اور کمیونٹی کلب' },
    description: {
      en: "Floodlit courts (badminton, basketball), kids' equipment, community hall.",
      ur: 'روشن کورٹس (بیڈمنٹن، باسکٹ بال)، بچوں کے کھیل کا سامان اور کمیونٹی ہال۔',
    },
    planned: true,
    variant: 'cream',
    wide: true,
  },
  {
    icon: 'local_hospital',
    category: { en: 'Healthcare', ur: 'صحت' },
    title: { en: 'Medical Center & First-Aid Clinic', ur: 'میڈیکل سینٹر اور فرسٹ ایڈ کلینک' },
    description: {
      en: '24-hour dispensary, urgent care, ambulance docking.',
      ur: 'چوبیس گھنٹے ڈسپنسری، ہنگامی طبی امداد اور ایمبولینس کی سہولت۔',
    },
    planned: true,
    variant: 'highlight',
    wide: true,
  },
];
