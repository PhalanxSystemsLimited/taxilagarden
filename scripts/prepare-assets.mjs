/**
 * One-off asset preparation. Re-run with: `node scripts/prepare-assets.mjs`
 * - Copies client photos from ../tghs assets (read-only source) into src/assets/images with clean names
 * - Generates favicon set (svg, ico, 32px png, 180px apple-touch, 192/512 manifest icons)
 * - Generates a 1200×630 Open Graph JPG
 */
import { copyFile, mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.resolve(root, '..', 'tghs assets');
const imgOut = path.join(root, 'src', 'assets', 'images');
const pub = path.join(root, 'public');

const MAP = {
  'WhatsApp Image 2026-11-24 at 4.28.51 PM.jpeg': 'mosque-gateway.jpg',
  'WhatsApp Image 2026-11-24 at 4.28.52 PM.jpeg': 'site-office-arcade.jpg',
  'WhatsApp Image 2026-11-24 at 4.28.55 PM.jpeg': 'house-construction.jpg',
  'WhatsApp Image 2026-11-24 at 4.28.56 PM.jpeg': 'entrance-gate-aerial.jpg',
  'WhatsApp Image 2026-11-24 at 4.28.57 PM.jpeg': 'horse-monument.jpg',
  'WhatsApp Image 2026-11-24 at 4.28.59 PM.jpeg': 'mosque-hills-view.jpg',
  '003.JPG.jpeg': 'master-layout-plan.jpg',
  // 'WhatsApp Image 2026-11-24 at 4.29.03 PM.jpeg' — data sheet with a private owner's
  // phone & home address; intentionally NOT copied (see final report).
};

await mkdir(imgOut, { recursive: true });
await mkdir(pub, { recursive: true });

for (const [from, to] of Object.entries(MAP)) {
  await copyFile(path.join(src, from), path.join(imgOut, to));
  console.log('copied', to);
}

/* ---------- Favicon (brand monogram: tree mark on night-olive, gold) ---------- */
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#1A1D17"/>
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#D4A94B" stroke-opacity=".55" stroke-width="1.5"/>
  <g fill="#FFDF9E">
    <circle cx="32" cy="24" r="12"/>
    <circle cx="22" cy="30" r="8"/>
    <circle cx="42" cy="30" r="8"/>
    <rect x="30" y="30" width="4" height="20" rx="1.5"/>
    <rect x="18" y="49" width="28" height="3" rx="1.5" fill="#D4A94B"/>
  </g>
</svg>`;
await writeFile(path.join(pub, 'favicon.svg'), faviconSvg);
const svgBuf = Buffer.from(faviconSvg);
const png = (size) => sharp(svgBuf, { density: 384 }).resize(size, size).png().toBuffer();
await writeFile(path.join(pub, 'favicon-32.png'), await png(32));
await writeFile(path.join(pub, 'apple-touch-icon.png'), await png(180));
await writeFile(path.join(pub, 'icon-192.png'), await png(192));
await writeFile(path.join(pub, 'icon-512.png'), await png(512));

// favicon.ico = ICO container holding 16/32/48 PNGs
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(pngs[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += pngs[i].length;
});
await writeFile(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...pngs]));

/* ---------- Open Graph image 1200×630 ---------- */
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1A1D17" stop-opacity=".55"/>
      <stop offset=".55" stop-color="#1A1D17" stop-opacity=".7"/>
      <stop offset="1" stop-color="#1A1D17" stop-opacity=".95"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="80" y="395" width="64" height="2" fill="#D4A94B"/>
  <text x="80" y="380" font-family="Georgia, 'Times New Roman', serif" font-size="74" font-weight="600" fill="#FFF9ED">Taxila Gardens</text>
  <text x="80" y="460" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="46" fill="#FFDF9E">Housing Scheme</text>
  <text x="80" y="535" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="4" fill="#E8E2D6">GANDHARA HERITAGE LIVING · DELIVERED · TMA HARIPUR APPROVED 2016</text>
  <text x="80" y="140" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="5" fill="#D4A94B">LANDMARK GROUP</text>
</svg>`;
await sharp(await readFile(path.join(imgOut, 'mosque-gateway.jpg')))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(pub, 'og-image.jpg'));

// Vendor CSS loaded on demand (see src/lib/load-css.js)
await mkdir(path.join(pub, 'vendor'), { recursive: true });
await copyFile(path.join(root, 'node_modules/leaflet/dist/leaflet.css'), path.join(pub, 'vendor/leaflet.css'));
await copyFile(path.join(root, 'node_modules/photoswipe/dist/photoswipe.css'), path.join(pub, 'vendor/photoswipe.css'));

console.log('favicons + og-image + vendor css generated');
