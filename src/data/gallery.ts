import type { ImageMetadata } from 'astro';
import type { L } from './types';
import mosqueGateway from '../assets/images/mosque-gateway.jpg';
import entranceGate from '../assets/images/entrance-gate-aerial.jpg';
import horseMonument from '../assets/images/horse-monument.jpg';
import siteOffice from '../assets/images/site-office-arcade.jpg';
import mosqueHills from '../assets/images/mosque-hills-view.jpg';
import houseConstruction from '../assets/images/house-construction.jpg';

export interface GalleryItem {
  id: string;
  image: ImageMetadata;
  category: L;
  title: L;
  caption: L;
  alt: L;
}

/**
 * Captions describe what is actually in each client photo.
 * To add a photo: drop it into src/assets/images, import it above and add an entry below.
 */
export const gallery: GalleryItem[] = [
  {
    id: 'entrance-gate',
    image: entranceGate,
    category: { en: 'Security', ur: 'سیکیورٹی' },
    title: { en: 'Gated Main Entrance', ur: 'مرکزی گیٹڈ داخلہ' },
    caption: {
      en: 'Aerial view of the main entrance with guard posts, boom barriers and the tree-lined approach boulevard.',
      ur: 'مرکزی داخلے کا فضائی منظر — گارڈ پوسٹس، بوم بیریئرز اور درختوں سے آراستہ بلیوارڈ۔',
    },
    alt: {
      en: 'Aerial view of the Taxila Gardens main entrance with guard houses, boom barriers and a landscaped boulevard',
      ur: 'ٹیکسلا گارڈنز کے مرکزی داخلے کا فضائی منظر، گارڈ ہاؤسز، بوم بیریئرز اور سرسبز بلیوارڈ',
    },
  },
  {
    id: 'horse-monument',
    image: horseMonument,
    category: { en: 'Landscape', ur: 'لینڈ اسکیپ' },
    title: { en: 'Landscaped Roundabout Monument', ur: 'سرسبز چوک کی یادگار' },
    caption: {
      en: 'White stallion monument on a landscaped roundabout lined with palms and flowering shrubs.',
      ur: 'کھجور کے درختوں اور پھولدار جھاڑیوں سے آراستہ چوک پر سفید گھوڑے کی یادگار۔',
    },
    alt: {
      en: 'White horse statue on a dark plinth in a landscaped green roundabout with palm plants',
      ur: 'سرسبز چوک میں سیاہ چبوترے پر سفید گھوڑے کا مجسمہ اور کھجور کے پودے',
    },
  },
  {
    id: 'mosque-gateway',
    image: mosqueGateway,
    category: { en: 'Architecture', ur: 'فنِ تعمیر' },
    title: { en: 'Jamia Mosque & Arched Gateway', ur: 'جامع مسجد اور محرابی دروازہ' },
    caption: {
      en: 'Domed mosque with carved jali screens and a pointed-arch gateway in warm sandstone tones.',
      ur: 'گنبد والی مسجد، منقش جالیاں اور ریتلے پتھر کے رنگ میں نوکدار محرابی دروازہ۔',
    },
    alt: {
      en: 'Domed sandstone-coloured mosque with lattice jali screens and a pointed arch gateway under a clear sky',
      ur: 'صاف آسمان تلے جالی دار کھڑکیوں اور نوکدار محراب والی گنبد دار مسجد',
    },
  },
  {
    id: 'mosque-hills',
    image: mosqueHills,
    category: { en: 'Landscape', ur: 'لینڈ اسکیپ' },
    title: { en: 'Open Plots & Hill Views', ur: 'کھلے پلاٹ اور پہاڑی مناظر' },
    caption: {
      en: 'Green open plots and the carpeted approach road, with the mosque and the hills on the horizon.',
      ur: 'سرسبز کھلے پلاٹ اور پختہ سڑک، افق پر مسجد اور پہاڑوں کا منظر۔',
    },
    alt: {
      en: 'Open green plots with the domed mosque and a mountain range in the background',
      ur: 'سرسبز کھلے پلاٹ، پس منظر میں گنبد والی مسجد اور پہاڑی سلسلہ',
    },
  },
  {
    id: 'site-office',
    image: siteOffice,
    category: { en: 'On-site', ur: 'سائٹ پر' },
    title: { en: 'Arcaded Site Building', ur: 'محرابی برآمدے والی عمارت' },
    caption: {
      en: 'Single-storey building with a broad arched veranda, set behind a manicured lawn.',
      ur: 'کشادہ محرابی برآمدے والی یک منزلہ عمارت، سامنے تراشیدہ سبزہ زار۔',
    },
    alt: {
      en: 'Cream single-storey building with a row of arches and a large green lawn in front',
      ur: 'محرابوں کی قطار والی کریم رنگ یک منزلہ عمارت اور سامنے وسیع سبزہ زار',
    },
  },
  {
    id: 'homes-rising',
    image: houseConstruction,
    category: { en: 'Development', ur: 'تعمیرات' },
    title: { en: 'Homes Taking Shape', ur: 'تعمیر ہوتے گھر' },
    caption: {
      en: 'A family home rising beside a carpeted street, with the hills beyond.',
      ur: 'پختہ گلی کے کنارے زیرِ تعمیر گھر، پس منظر میں پہاڑ۔',
    },
    alt: {
      en: 'Brick house under construction beside a paved road with green fields and hills behind',
      ur: 'پختہ سڑک کے کنارے اینٹوں سے زیرِ تعمیر مکان، پیچھے سبزہ اور پہاڑ',
    },
  },
];

export const galleryById = (id: string) => {
  const item = gallery.find((g) => g.id === id);
  if (!item) throw new Error(`Unknown gallery item: ${id}`);
  return item;
};
