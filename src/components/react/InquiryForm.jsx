import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { buildInquiryMessage, formatPkMobileInput, normalizePkMobile, toLocalPkFormat, waUrl } from '../../lib/whatsapp.js';

/**
 * Inquiry form → WhatsApp (no backend).
 * Used inside the Book-a-Visit modal and on the Contact page.
 *
 * @param {{
 *   strings: Record<string, string>;
 *   plotOptions: { value: string; label: string }[];
 *   waNumber: string;
 *   initialPlot?: string;
 *   variant?: 'modal' | 'page';
 *   onCancel?: () => void;
 *   autoFocus?: boolean;
 * }} props
 */
export default function InquiryForm({ strings: s, plotOptions, waNumber, initialPlot = '', variant = 'page', onCancel, autoFocus = false }) {
  const uid = useId();
  const ids = { name: `${uid}-name`, phone: `${uid}-phone`, plot: `${uid}-plot`, msg: `${uid}-msg`, err: `${uid}-err` };
  const fallback = plotOptions[plotOptions.length - 1]?.value ?? '';
  const [values, setValues] = useState({ name: '', phone: '', plot: initialPlot || fallback, message: '' });
  const [errors, setErrors] = useState(/** @type {{name?: string; phone?: string}} */ ({}));
  const [sentUrl, setSentUrl] = useState('');
  const nameRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const phoneRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const successRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  // Keep preselected plot in sync when the modal is reopened from another plot card.
  useEffect(() => {
    if (initialPlot) setValues((v) => ({ ...v, plot: initialPlot }));
  }, [initialPlot]);

  useEffect(() => {
    if (autoFocus) nameRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (sentUrl) successRef.current?.focus();
  }, [sentUrl]);

  // Caret position to restore after the phone number is re-formatted.
  const caretRef = useRef(/** @type {number | null} */ (null));
  useLayoutEffect(() => {
    const el = phoneRef.current;
    if (el && caretRef.current !== null && document.activeElement === el) {
      el.setSelectionRange(caretRef.current, caretRef.current);
    }
    caretRef.current = null;
  }, [values.phone]);

  /** Position in `formatted` just after the n-th digit. */
  const caretAfterDigits = (/** @type {string} */ formatted, /** @type {number} */ n) => {
    if (n <= 0) return formatted.startsWith('+') ? 1 : 0;
    let seen = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) seen++;
      if (seen === n) return i + 1;
    }
    return formatted.length;
  };

  /** Apply a new raw phone value: format it and keep the caret next to the same digit. */
  const setPhone = (/** @type {string} */ raw, /** @type {number} */ caret) => {
    let digitsBefore = raw.slice(0, caret).replace(/\D/g, '').length;
    // "00 92…" collapses to "+92…": two digits disappear from in front of the caret.
    if (raw.replace(/\D/g, '').startsWith('0092')) digitsBefore = Math.max(0, digitsBefore - 2);
    const formatted = formatPkMobileInput(raw);
    caretRef.current = caretAfterDigits(formatted, digitsBefore);
    setValues((v) => ({ ...v, phone: formatted }));
    setErrors((er) => ({ ...er, phone: undefined }));
  };

  const onPhoneChange = (/** @type {any} */ e) => setPhone(e.target.value, e.target.selectionStart ?? e.target.value.length);

  // Backspace/Delete next to an auto-inserted space removes the neighbouring digit instead of "doing nothing".
  const onPhoneKeyDown = (/** @type {React.KeyboardEvent<HTMLInputElement>} */ e) => {
    const el = e.currentTarget;
    const start = el.selectionStart ?? 0;
    if (start !== el.selectionEnd) return;
    const v = el.value;
    if (e.key === 'Backspace' && start > 0 && v[start - 1] === ' ') {
      e.preventDefault();
      setPhone(v.slice(0, start - 2) + v.slice(start), start - 2);
    } else if (e.key === 'Delete' && v[start] === ' ') {
      e.preventDefault();
      setPhone(v.slice(0, start) + v.slice(start + 2), start);
    }
  };

  /** @param {'name'|'phone'|'plot'|'message'} key */
  const update = (key) => (/** @type {any} */ e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (key === 'name' || key === 'phone') setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    /** @type {{name?: string; phone?: string}} */
    const next = {};
    if (values.name.trim().length < 2) next.name = s.errorName;
    if (!normalizePkMobile(values.phone)) next.phone = s.errorPhone;
    setErrors(next);
    if (next.name) nameRef.current?.focus();
    else if (next.phone) phoneRef.current?.focus();
    return Object.keys(next).length === 0;
  };

  /** @param {React.FormEvent} e */
  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const url = waUrl(
      waNumber,
      // Sales team always receives one standard format: "0300 9087462"
      buildInquiryMessage({ name: values.name, phone: toLocalPkFormat(values.phone) ?? values.phone, plot: values.plot, message: values.message }),
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    setSentUrl(url);
  };

  const reset = () => {
    setSentUrl('');
    setValues({ name: '', phone: '', plot: initialPlot || fallback, message: '' });
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  if (sentUrl) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="rounded-xl border border-nature-olive/40 bg-nature-olive/10 p-space-lg text-center outline-none"
      >
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-nature-olive text-white">
          <Icon name="check_circle" size={30} />
        </span>
        <p className="font-display text-headline-sm text-on-surface">{s.successTitle}</p>
        <p className="mt-2 font-body text-body-sm text-on-surface-variant">{s.successBody}</p>
        <div className="mt-5 flex flex-col items-center gap-2">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-whatsapp px-space-lg py-2 font-label text-label-badge uppercase text-whatsapp-ink"
          >
            <Icon name="chat" size={18} />
            {s.successRetry}
          </a>
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1 font-label text-label-badge uppercase text-secondary hover:text-gold-antique-hover">
            <Icon name="refresh" size={16} />
            {s.sendAnother}
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Boolean(errors.name || errors.phone);
  const compact = variant === 'modal';

  return (
    <form onSubmit={submit} noValidate className="space-y-space-md" aria-describedby={hasErrors ? ids.err : undefined}>
      <p id={ids.err} className="sr-only" aria-live="assertive">
        {hasErrors ? s.errorSummary : ''}
      </p>
      <div className={`grid grid-cols-1 gap-space-md ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label className="field-label" htmlFor={ids.name}>
            {s.name} <span aria-hidden="true" className="text-terracotta">*</span>
            <span className="sr-only">({s.required})</span>
          </label>
          <input
            ref={nameRef}
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            className="field"
            placeholder={s.namePlaceholder}
            value={values.name}
            onChange={update('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? `${ids.name}-e` : undefined}
            required
          />
          {errors.name && (
            <p id={`${ids.name}-e`} className="mt-1 flex items-center gap-1 font-body text-body-sm text-error">
              <Icon name="error" size={16} />
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="field-label" htmlFor={ids.phone}>
            {s.phone} <span aria-hidden="true" className="text-terracotta">*</span>
            <span className="sr-only">({s.required})</span>
          </label>
          <input
            ref={phoneRef}
            id={ids.phone}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            className="field rtl:text-end"
            placeholder={s.phonePlaceholder}
            maxLength={16}
            value={values.phone}
            onChange={onPhoneChange}
            onKeyDown={onPhoneKeyDown}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? `${ids.phone}-e ${ids.phone}-hint` : `${ids.phone}-hint`}
            required
          />
          {errors.phone ? (
            <p id={`${ids.phone}-e`} className="mt-1 flex items-start gap-1 font-body text-body-sm text-error">
              <Icon name="error" size={16} className="mt-0.5" />
              {errors.phone}
            </p>
          ) : null}
          <p id={`${ids.phone}-hint`} className={`mt-1 font-body text-[12px] leading-5 text-text-muted-dark ${errors.phone ? 'sr-only' : ''}`}>
            {s.phoneHint}
          </p>
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={ids.plot}>
          {s.plot}
        </label>
        <select id={ids.plot} name="plot" className="field" value={values.plot} onChange={update('plot')}>
          {plotOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label" htmlFor={ids.msg}>
          {s.message}
        </label>
        <textarea
          id={ids.msg}
          name="message"
          rows={compact ? 3 : 4}
          className="field resize-y"
          placeholder={s.messagePlaceholder}
          value={values.message}
          onChange={update('message')}
        />
      </div>

      <div className={`flex flex-col gap-space-sm pt-1 ${compact ? 'sm:flex-row' : 'sm:flex-row sm:items-center'}`}>
        <button
          type="submit"
          className="btn-fill inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-terracotta px-space-xl py-3 font-label text-label-badge uppercase text-white shadow-md transition-shadow [--btn-fill:var(--color-terracotta-hover)] hover:shadow-xl sm:flex-none"
        >
          <span>{s.submit}</span>
          <Icon name="send" size={18} flip />
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border-sand-medium px-space-lg font-body text-body-sm text-on-surface-variant transition-colors hover:bg-surface-container"
          >
            {s.cancel}
          </button>
        ) : null}
      </div>
      <p className="font-body text-[12px] leading-5 text-text-muted-dark">{s.submitHint}</p>
    </form>
  );
}
