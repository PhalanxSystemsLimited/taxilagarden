import { useEffect, useId, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { buildInquiryMessage, normalizePkMobile, waUrl } from '../../lib/whatsapp.js';

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
      buildInquiryMessage({ name: values.name, phone: values.phone, plot: values.plot, message: values.message }),
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
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? `${ids.phone}-e` : undefined}
            required
          />
          {errors.phone && (
            <p id={`${ids.phone}-e`} className="mt-1 flex items-start gap-1 font-body text-body-sm text-error">
              <Icon name="error" size={16} className="mt-0.5" />
              {errors.phone}
            </p>
          )}
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
