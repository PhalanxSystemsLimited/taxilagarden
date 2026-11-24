import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Build-time loader for Material Symbols (Outlined, weight 400) — the icon family used by Stitch.
 * Icons are inlined as SVG, so no icon font is downloaded.
 */
const cache = new Map<string, string>();
const dir = path.join(process.cwd(), 'node_modules', '@material-symbols', 'svg-400', 'outlined');

/** Returns the inner markup of the icon's <svg> (viewBox "0 -960 960 960"). */
export function iconInner(name: string): string {
  const hit = cache.get(name);
  if (hit) return hit;
  const svg = readFileSync(path.join(dir, `${name}.svg`), 'utf8');
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  cache.set(name, inner);
  return inner;
}
