import { en, type Dict } from '../data/i18n/en';
import { ur } from '../data/i18n/ur';
import type { L, Lang } from '../data/types';
import { routes, type RouteKey } from '../data/navigation';

const dicts: Record<Lang, Dict> = { en, ur };

export const languages: Lang[] = ['en', 'ur'];
export const dirOf = (lang: Lang) => (lang === 'ur' ? 'rtl' : 'ltr');
export const htmlLang = (lang: Lang) => (lang === 'ur' ? 'ur-PK' : 'en-PK');

export const getDict = (lang: Lang): Dict => dicts[lang];

/** Pick the right language from a bilingual field. */
export const tl = (value: L, lang: Lang) => value[lang];

/** Replace `{name}` placeholders. */
export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ''));

/** "/about/" → "/ur/about/" for Urdu. */
export const localizePath = (path: string, lang: Lang) => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'en') return clean;
  return clean === '/' ? '/ur/' : `/ur${clean}`;
};

export const routeHref = (key: RouteKey, lang: Lang) => localizePath(routes[key], lang);

/** Strip any /ur prefix to get the language-neutral path. */
export const neutralPath = (pathname: string) => {
  const p = pathname.replace(/^\/ur(?=\/|$)/, '') || '/';
  return p.endsWith('/') || p.includes('.') ? p : `${p}/`;
};

export const langFromPath = (pathname: string): Lang => (/^\/ur(\/|$)/.test(pathname) ? 'ur' : 'en');

/** Is this route the current page? (for aria-current) */
export const isActive = (key: RouteKey, pathname: string) => {
  const current = neutralPath(pathname);
  return key === 'home' ? current === '/' : current.startsWith(routes[key]);
};

const MONTHS_UR = ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'];

/** "2016-04-29" → "29 April 2016" / "29 اپریل 2016" (Western digits in both). */
export const formatDate = (iso: string, lang: Lang, short = false) => {
  const d = new Date(`${iso}T00:00:00Z`);
  if (lang === 'ur') return `${d.getUTCDate()} ${MONTHS_UR[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: short ? 'short' : 'long', year: 'numeric', timeZone: 'UTC' });
};
