/**
 * Builds the public, redacted copy of the TST data sheet:
 *   - row 3  (owner's name, home address, personal mobile) → blacked out
 *   - rows 10–11 (market value & DC/FBR rates)              → blacked out
 * Source (read-only): ../tghs assets/WhatsApp Image 2026-11-24 at 4.29.03 PM.jpeg
 * Output:             src/assets/images/data-sheet-redacted.jpg
 * Re-run with: node scripts/redact-datasheet.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.resolve(root, '..', 'tghs assets', 'WhatsApp Image 2026-11-24 at 4.29.03 PM.jpeg');
const out = path.join(root, 'src', 'assets', 'images', 'data-sheet-redacted.jpg');

const { width, height } = await sharp(src).metadata();
const box = (x, y, w, h, label) => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1a1d17"/>
  <text x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
        font-size="17" font-weight="700" letter-spacing="2" fill="#d4a94b">${label}</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  ${box(468, 418, 384, 96, 'REDACTED — PERSONAL DETAILS')}
  ${box(456, 766, 390, 92, 'REDACTED — RATES ON INQUIRY')}
</svg>`;

await sharp(src)
  .composite([{ input: Buffer.from(svg) }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out);
console.log('written', path.relative(root, out), `${width}×${height}`);
