import type { L } from './types';
import { site } from './site';

export interface Landmark {
  id: string;
  name: L;
  /**
   * Road distance in km. All `null` for now: the old distances belonged to a different site.
   * ⚠️ Add confirmed distances here once the client supplies the exact site pin.
   */
  distanceKm: number | null;
  icon: string;
  /** Approximate map position, used only to place pins. */
  lat: number;
  lng: number;
}

export const landmarks: Landmark[] = [
  {
    id: 'center',
    // The scheme is adjacent to UET Taxila; the pin sits on the campus until the exact site pin is supplied.
    name: { en: 'UET Taxila (scheme adjacent)', ur: 'یو ای ٹی ٹیکسلا (اسکیم ملحقہ)' },
    distanceKm: null,
    icon: 'home_pin',
    lat: site.geo.lat,
    lng: site.geo.lng,
  },
  {
    id: 'museum',
    name: { en: 'Taxila Museum', ur: 'ٹیکسلا میوزیم' },
    distanceKm: null,
    icon: 'museum',
    lat: 33.7459,
    lng: 72.8198,
  },
  {
    id: 'railway',
    name: { en: 'Taxila Cantt & Railway Junction', ur: 'ٹیکسلا کینٹ اور ریلوے جنکشن' },
    distanceKm: null,
    icon: 'train',
    lat: 33.7434,
    lng: 72.7872,
  },
  {
    id: 'gt-road',
    name: { en: 'Grand Trunk (GT) Road N-5', ur: 'جی ٹی روڈ (این-5)' },
    distanceKm: null,
    icon: 'add_road',
    lat: 33.7588,
    lng: 72.8095,
  },
  {
    id: 'dharmarajika',
    name: { en: 'Dharmarajika Stupa', ur: 'دھرماراجیکا اسٹوپا' },
    distanceKm: null,
    icon: 'account_balance',
    lat: 33.7436,
    lng: 72.8318,
  },
  {
    id: 'airport',
    name: { en: 'Islamabad International Airport', ur: 'اسلام آباد انٹرنیشنل ایئرپورٹ' },
    distanceKm: null,
    icon: 'flight',
    lat: 33.5491,
    lng: 72.8256,
  },
];
