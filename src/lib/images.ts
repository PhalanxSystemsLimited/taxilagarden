import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import heroSrc from '../assets/images/mosque-gateway.jpg';

/** Never upscale: clamp requested widths to the source width. */
const clampWidths = (img: ImageMetadata, widths: number[]) => {
  const w = widths.filter((x) => x < img.width);
  return [...w, img.width];
};

/** Hero background — shared by the <img> and the <link rel="preload"> so URLs match. */
export const heroImage = () =>
  getImage({
    src: heroSrc,
    widths: clampWidths(heroSrc, [480, 768, 1024, 1280]),
    format: 'webp',
    quality: 68,
  });

/** Full-resolution version for the lightbox (same pixel size as the original). */
export const fullImage = (src: ImageMetadata, quality = 82) =>
  getImage({ src, width: src.width, format: 'webp', quality });
