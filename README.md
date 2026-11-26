# Taxila Satellite Township — Website

Static marketing website for **Taxila Satellite Township** (Minawa Group).
Built with **Astro** (static HTML), **React** islands (`.jsx`) for the interactive parts, and **Tailwind CSS v4**.
There is no backend: every inquiry form opens WhatsApp with the visitor's details pre-filled.

- English at `/`, Urdu (RTL) at `/ur/…`. Every page exists in both languages.
- Design system ported from the Google Stitch export in `../stitch_next.js_website_revamp/`.
- Content from `../TST-Website-Redesign-Brief.md`.

---

## 1. Requirements

- Node.js **22.23+** (tested on 24.x) and npm 10+

## 2. Commands

```bash
npm install          # install dependencies (first time only)
npm run dev          # local dev server → http://localhost:4321
npm run build        # type-check (astro check) + build static site into ./dist
npm run preview      # serve ./dist locally to test the production build
```

`npm run build` fails if there are TypeScript errors, so a broken site can't be shipped by accident.

## 3. Deploying to Hostinger

1. Run `npm run build`.
2. In Hostinger **hPanel → File Manager** (or FTP), open `public_html/`.
3. Upload **the contents** of `dist/` (not the folder itself), including the hidden **`.htaccess`** file.
4. Done. The `.htaccess` handles HTTPS redirects, the 404 pages (English and Urdu), caching and compression.

> **Before going live, set the domain.** Open `src/data/site.ts`, change
> `SITE_URL = 'https://www.taxilasatellitetownship.example'` to the real domain (no trailing slash), then rebuild.
> It controls canonical URLs, Open Graph/Twitter tags, hreflang, `sitemap-index.xml` and `robots.txt`.
> To force `www.`, uncomment the two lines in `public/.htaccess`.

The same `dist/` folder also works on Netlify, Vercel, Cloudflare Pages or any static host.

---

## 4. Editing content (no coding knowledge needed)

All text and data live in **`src/data/`**. Edit, save and rebuild.

| File | What it controls |
|---|---|
| `site.ts` | Name, developer, **phone numbers**, **WhatsApp number + default message**, address, GPS, Google Maps link, hours, email/socials (empty = hidden), **domain** |
| `plots.ts` | The 5 plot categories (size, dimensions, sq ft, Marla, Kanal, descriptions) and the form's plot list |
| `amenities.ts` | The 8 amenities. `planned: true` shows the small "Planned" tag |
| `landmarks.ts` | Map landmarks, distances and pin positions |
| `gallery.ts` | Gallery photos with titles, captions and alt text |
| `navigation.ts` | Menu items and their labels |
| `i18n/en.ts` | All English page copy (headings, paragraphs, buttons, SEO titles/descriptions) |
| `i18n/ur.ts` | The Urdu translation of the same keys (**awaiting client review**) |

Bilingual fields look like `{ en: '…', ur: '…' }`. Always update both.

### Change the WhatsApp number

`src/data/site.ts` → `whatsapp.number` (international format, digits only, e.g. `923317000012`) and `whatsapp.display`.
Every WhatsApp button, the floating pill and all inquiry forms use it.

### Change phone numbers

`src/data/site.ts` → `phones`. `display` is what visitors see; `tel` is the dialled number (`+92…`).

### Add email or social links

Fill `email` or any key in `socials` in `site.ts`. They appear in the footer (and JSON-LD) automatically.

---

## 5. Images

Client photos live in `src/assets/images/`. Astro converts them to WebP in several sizes at build time and never upscales them.

- **Swap a photo:** replace the file and keep the same name. Then rebuild.
- **Add a gallery photo:** put it in `src/assets/images/`, import it at the top of `src/data/gallery.ts`, and add an entry.
- **Add the NOC letter scan:** save it as `src/assets/images/noc-letter.jpg`, then in `src/data/approvals.ts` add
  `import nocLetter from '../assets/images/noc-letter.jpg';` and set `image: nocLetter` on the first document.
  The placeholder card is replaced automatically, and the lightbox shows the full-resolution scan.
- **Add the real logo:** replace the SVG mark in `src/components/layout/Logo.astro`, and regenerate the favicons
  (edit the SVG in `scripts/prepare-assets.mjs`).

### Still awaiting the client
- Exact site location (Google Maps pin): set `geo` and `mapsUrl` in `src/data/site.ts`; the map currently centres on UET Taxila.
- Distances to landmarks: add `distanceKm` values in `src/data/landmarks.ts`.
- Office hours (`site.ts`) are not in the data sheet.
- Urdu review, including the spelling of "Toffkian" (توفکیاں).

`node scripts/prepare-assets.mjs` re-copies the photos from `../tghs assets/` and regenerates favicons, the OG image
and the vendor CSS in `public/`.

---

## 6. Project structure

```
src/
├── data/            ← all editable content (see §4)
├── assets/images/   ← photos (optimised at build)
├── layouts/         ← BaseLayout (head/SEO, header, footer, modal, motion)
├── views/           ← one file per page; used by both /en and /ur routes
├── pages/           ← routes: /, /about/, … and /ur/…
├── components/
│   ├── layout/      ← Header (+ mobile menu), Footer, Logo, SEO, floating WhatsApp/back-to-top
│   ├── sections/    ← Hero, StatStrip, PlotCard, RoadHierarchy, AmenityGrid, DocumentCard, GalleryGrid, …
│   ├── react/       ← interactive islands: BookVisitModal, InquiryForm, LocationMap
│   ├── ui/          ← Button, Badge, Icon, SectionHeading
│   └── Lightbox.astro (PhotoSwipe)
├── lib/             ← i18n helpers, WhatsApp message builder, motion (Lenis + GSAP), image helpers
└── styles/global.css ← design tokens (Stitch theme) + base styles
```

## 7. Tech notes

- **Motion:** Lenis smooth scroll + GSAP ScrollTrigger/SplitText. Everything is disabled under `prefers-reduced-motion`.
  The intro plays once per browser session.
- **Map:** Leaflet + OpenStreetMap tiles (no API key). It loads only when scrolled into view, and scroll-zoom is enabled after a click.
- **Icons:** Material Symbols (outlined), inlined as SVG at build time (no icon font download).
- **Fonts:** self-hosted via `@fontsource` (Playfair Display, Manrope, Space Grotesk, Noto Nastaliq Urdu).
- **No cookies, analytics or tracking.**
