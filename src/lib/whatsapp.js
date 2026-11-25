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
  // Also accepts "3009087462" (number typed without the leading 0).
  const m = digits.match(/^(?:\+92|0092|92|0)?(3\d{9})$/);
  return m ? `+92${m[1]}` : null;
}

/**
 * Standard local format used in the WhatsApp message to the sales team: "0300 9087462".
 * @param {string} input
 * @returns {string | null}
 */
export function toLocalPkFormat(input) {
  const intl = normalizePkMobile(input);
  if (!intl) return null;
  const local = `0${intl.slice(3)}`; // 03XXXXXXXXX
  return `${local.slice(0, 4)} ${local.slice(4)}`;
}

/**
 * As-you-type formatter for the phone field. Keeps the visitor's chosen style:
 *   "03009087462"   → "0300 9087462"
 *   "+923009087462" → "+92 300 9087462"   (also from "923…" or "00923…")
 *   "3009087462"    → "300 9087462"
 * Strips letters/dashes/brackets and stops accepting digits once the number is complete.
 * @param {string} raw
 * @returns {string}
 */
export function formatPkMobileInput(raw) {
  const str = String(raw || '');
  const hasPlus = str.trim().startsWith('+');
  let digits = str.replace(/\D/g, '');

  // International: "+92…", "92…" or "0092…"
  if (digits.startsWith('0092')) digits = digits.slice(2);
  if (hasPlus || (digits.startsWith('92') && digits.length >= 2)) {
    if (!digits.startsWith('92')) {
      // "+", "+9" while typing, or a non-Pakistani code (validation will reject it)
      return `+${digits.slice(0, 13)}`;
    }
    const rest = digits.slice(2, 12); // operator code + subscriber number (10 digits max)
    let out = '+92';
    if (rest) out += ` ${rest.slice(0, 3)}`;
    if (rest.length > 3) out += ` ${rest.slice(3)}`;
    return out;
  }

  // Local: "03XX XXXXXXX"
  if (digits.startsWith('0')) {
    const d = digits.slice(0, 11);
    return d.length > 4 ? `${d.slice(0, 4)} ${d.slice(4)}` : d;
  }

  // Without leading 0: "3XX XXXXXXX"
  if (digits.startsWith('3')) {
    const d = digits.slice(0, 10);
    return d.length > 3 ? `${d.slice(0, 3)} ${d.slice(3)}` : d;
  }

  return digits.slice(0, 13);
}

/**
 * @param {{ name: string; phone: string; plot: string; message?: string }} data
 */
export function buildInquiryMessage({ name, phone, plot, message }) {
  return [
    'Hello Taxila Satellite Township Sales Team,',
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
