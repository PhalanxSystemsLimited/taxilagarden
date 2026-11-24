import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import InquiryForm from './InquiryForm.jsx';

/**
 * "Book a Visit" / Express Plot Inquiry dialog.
 * Opened by any element with [data-inquiry] (value = plot to preselect) via the
 * `tghs:inquiry` event dispatched in BaseLayout. Uses the native <dialog> for
 * focus containment, Esc-to-close and aria-modal semantics; restores focus on close.
 *
 * @param {{
 *   strings: Record<string, string>;
 *   plotOptions: { value: string; label: string }[];
 *   waNumber: string;
 *   waDirectUrl: string;
 * }} props
 */
export default function BookVisitModal({ strings: s, plotOptions, waNumber, waDirectUrl }) {
  const dialogRef = useRef(/** @type {HTMLDialogElement | null} */ (null));
  const returnFocus = useRef(/** @type {HTMLElement | null} */ (null));
  const [plot, setPlot] = useState('');
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const show = useCallback((/** @type {string} */ value) => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    returnFocus.current = /** @type {HTMLElement | null} */ (document.activeElement);
    setPlot(value || '');
    setFormKey((k) => k + 1);
    if (!dlg.open) dlg.showModal();
    setOpen(true);
    document.documentElement.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('tghs:lock-scroll'));
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onOpen = (/** @type {Event} */ e) => show(/** @type {CustomEvent} */ (e).detail?.plot ?? '');
    window.addEventListener('tghs:inquiry', onOpen);
    // An inquiry button may have been clicked before this island hydrated.
    const pending = /** @type {any} */ (window).__tghsPendingInquiry;
    if (pending !== undefined) {
      /** @type {any} */ (window).__tghsPendingInquiry = undefined;
      show(pending);
    }
    /** @type {any} */ (window).__tghsModalReady = true;
    return () => window.removeEventListener('tghs:inquiry', onOpen);
  }, [show]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setOpen(false);
      document.documentElement.style.overflow = '';
      window.dispatchEvent(new CustomEvent('tghs:unlock-scroll'));
      returnFocus.current?.focus?.();
    };
    dlg.addEventListener('close', onClose);
    return () => dlg.removeEventListener('close', onClose);
  }, []);

  const label = plotOptions.find((o) => o.value === plot)?.label;
  const title = plot && label ? s.modalTitlePlot.replace('{size}', label) : s.modalTitle;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="inquiry-title"
      aria-describedby="inquiry-sub"
      aria-modal="true"
      className="tg-dialog m-auto w-[calc(100%-2rem)] max-w-lg overflow-visible rounded-2xl border border-secondary/30 bg-surface-cream-card p-0 text-on-surface shadow-2xl backdrop:bg-primary/70 backdrop:backdrop-blur-md"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      data-lenis-prevent
    >
      <div className="relative max-h-[90dvh] overflow-y-auto p-space-lg sm:p-space-xl">
        <button
          type="button"
          onClick={close}
          className="absolute end-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:text-on-surface"
          aria-label={s.close}
        >
          <Icon name="close" size={20} />
        </button>
        <div className="mb-space-md pe-10">
          <p className="eyebrow">{s.modalEyebrow}</p>
          <h2 id="inquiry-title" className="mt-1 font-display text-headline-md text-on-surface">
            {title}
          </h2>
          <p id="inquiry-sub" className="mt-1 font-body text-body-sm text-on-surface-variant">
            {s.modalSub}
          </p>
        </div>
        {open ? (
          <InquiryForm
            key={formKey}
            strings={s}
            plotOptions={plotOptions}
            waNumber={waNumber}
            initialPlot={plot}
            variant="modal"
            onCancel={close}
            autoFocus
          />
        ) : null}
        <div className="mt-space-md flex items-center gap-3 border-t border-border-sand-light pt-space-md">
          <span className="font-body text-body-sm text-text-muted-dark">{s.orChat}</span>
          <a
            href={waDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-whatsapp px-space-md py-2 font-label text-label-badge uppercase text-whatsapp-ink"
          >
            <Icon name="chat" size={18} />
            {s.whatsappDirect}
          </a>
        </div>
      </div>
    </dialog>
  );
}
