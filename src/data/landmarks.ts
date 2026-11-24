import type { L } from './types';
import { site } from './site';

export interface Landmark {
  id: string;
  name: L;
  /** Road distance shown to visitors (from the brief). `null` = the scheme itself. */
  distanceKm: number | null;
  icon: string;
  /**
   * Approximate map position. ⚠️ Positions are approximate and only used to place pins;
   * the distances above are the official figures. Adjust lat/lng here if a pin looks off.
   */
  lat: number;
  lng: number;
}

export const landmarks: Landmark[] = [
  {
    id: 'center',
    name: { en: 'Taxila Gardens (Center)', ur: 'ٹیکسلا گارڈنز (مرکز)' },
    distanceKm: null,
    icon: 'home_pin',
    lat: site.geo.lat,
    lng: site.geo.lng,
  },
  {
    id: 'gt-road',
    name: { en: 'Grand Trunk (GT) Road N-5', ur: 'جی ٹی روڈ (این-5)' },
    distanceKm: 3.2,
    icon: 'add_road',
    lat: 33.7588,
    lng: 72.8095,
  },
  {
    id: 'museum',
    name: { en: 'Taxila Museum', ur: 'ٹیکسلا میوزیم' },
    distanceKm: 4.5,
    icon: 'museum',
    lat: 33.7459,
    lng: 72.8198,
  },
  {
    id: 'railway',
    name: { en: 'Taxila Cantt & Railway Junction', ur: 'ٹیکسلا کینٹ اور ریلوے جنکشن' },
    distanceKm: 5.0,
    icon: 'train',
    lat: 33.7434,
    lng: 72.7872,
  },
  {
    id: 'uet',
    name: { en: 'UET Taxila', ur: 'یو ای ٹی ٹیکسلا' },
    distanceKm: 5.5,
    icon: 'school',
    lat: 33.7672,
    lng: 72.8229,
  },
  {
    id: 'motorway',
    name: { en: 'M-1 Motorway Interchange', ur: 'ایم-1 موٹروے انٹرچینج' },
    distanceKm: 6.0,
    icon: 'route',
    lat: 33.8105,
    lng: 72.7515,
  },
  {
    id: 'dharmarajika',
    name: { en: 'Dharmarajika Stupa (UNESCO)', ur: 'دھرماراجیکا اسٹوپا (یونیسکو)' },
    distanceKm: 6.8,
    icon: 'account_balance',
    lat: 33.7436,
    lng: 72.8318,
  },
  {
    id: 'airport',
    name: { en: 'Islamabad International Airport', ur: 'اسلام آباد انٹرنیشنل ایئرپورٹ' },
    distanceKm: 28.0,
    icon: 'flight',
    lat: 33.5491,
    lng: 72.8256,
  },
];
