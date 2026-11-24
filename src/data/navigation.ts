import type { L } from './types';

/** Route keys map 1:1 to pages. Paths are language-neutral; `localizePath()` adds /ur. */
export type RouteKey =
  | 'home'
  | 'about'
  | 'plots'
  | 'masterPlan'
  | 'amenities'
  | 'approvals'
  | 'location'
  | 'gallery'
  | 'contact';

export const routes: Record<RouteKey, string> = {
  home: '/',
  about: '/about/',
  plots: '/plots/',
  masterPlan: '/master-plan/',
  amenities: '/amenities/',
  approvals: '/approvals/',
  location: '/location/',
  gallery: '/gallery/',
  contact: '/contact/',
};

export const navLabels: Record<RouteKey, L> = {
  home: { en: 'Home', ur: 'صفحۂ اول' },
  about: { en: 'About', ur: 'تعارف' },
  plots: { en: 'Plots', ur: 'پلاٹس' },
  masterPlan: { en: 'Master Plan', ur: 'ماسٹر پلان' },
  amenities: { en: 'Amenities', ur: 'سہولیات' },
  approvals: { en: 'Approvals & NOC', ur: 'این او سی و قانونی حیثیت' },
  location: { en: 'Location', ur: 'مقام و راستہ' },
  gallery: { en: 'Gallery', ur: 'تصاویر' },
  contact: { en: 'Contact', ur: 'رابطہ کریں' },
};

export type NavItem = { key: RouteKey } | { group: L; children: RouteKey[] };

/** Header order. Master Plan, Amenities & Gallery are grouped so the Stitch header still fits. */
export const headerNav: NavItem[] = [
  { key: 'home' },
  { key: 'about' },
  { key: 'plots' },
  { group: { en: 'Project', ur: 'منصوبہ' }, children: ['masterPlan', 'amenities', 'gallery'] },
  { key: 'approvals' },
  { key: 'location' },
  { key: 'contact' },
];

/** Mobile menu & footer: flat list of everything. */
export const allNav: RouteKey[] = [
  'home',
  'about',
  'plots',
  'masterPlan',
  'amenities',
  'approvals',
  'location',
  'gallery',
  'contact',
];
