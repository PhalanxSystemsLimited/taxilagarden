/**
 * WhatsApp helpers shared by every inquiry form.
 * The site has no backend: forms build a pre-filled message and open wa.me in a new tab.
 */

/**
 * Accepts Pakistani mobile numbers:
 *   03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX, 00923XXXXXXXXX
 * with or without spaces / dashes / brackets.
 * @param {string} input
 * @returns {string | null} normalised "+923XXXXXXXXX" or null when invalid
 */
export function normalizePkMobile(input) {
  const digits = String(input || '').replace(/[\s\-().]/g, '');
  const m = digits.match(/^(?:\+92|0092|92|0)(3\d{9})$/);
  return m ? `+92${m[1]}` : null;
}

/**
 * @param {{ name: string; phone: string; plot: string; message?: string }} data
 */
export function buildInquiryMessage({ name, phone, plot, message }) {
  return [
    'Hello Taxila Gardens Sales Team,',
    `Name: ${name.trim()}`,
    `Phone: ${phone.trim()}`,
    `Interested in: ${plot}`,
    `Message: ${(message || '').trim() || '-'}`,
  ].join('\n');
}

/**
 * @param {string} number digits only, international format (e.g. 923330109942)
 * @param {string} text
 */
export function waUrl(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
