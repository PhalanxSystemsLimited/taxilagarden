import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';

const MIN = 1;
const MAX = 5;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

/**
 * Pan & zoom viewer for the approved master layout scan.
 * Drag to pan, pinch (touch) or wheel (after clicking) to zoom, +/−/reset buttons, keyboard arrows.
 *
 * @param {{
 *   src: string; srcSet?: string; width: number; height: number; alt: string;
 *   fullSrc: string;
 *   strings: { label: string; hint: string; zoomIn: string; zoomOut: string; reset: string; fullRes: string };
 * }} props
 */
export default function MasterPlanViewer({ src, srcSet, width, height, alt, fullSrc, strings: s }) {
  const frame = useRef(/** @type {HTMLDivElement | null} */ (null));
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const [wheelOn, setWheelOn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pointers = useRef(new Map());
  const gesture = useRef(/** @type {null | { x: number; y: number; vx: number; vy: number; dist?: number; scale?: number }} */ (null));

  /** Keep the image covering the frame (no empty gutters when zoomed). */
  const bound = useCallback((v) => {
    const f = frame.current;
    if (!f) return v;
    const w = f.clientWidth;
    const h = f.clientHeight;
    const maxX = ((v.scale - 1) * w) / 2;
    const maxY = ((v.scale - 1) * h) / 2;
    return { scale: v.scale, x: clamp(v.x, -maxX, maxX), y: clamp(v.y, -maxY, maxY) };
  }, []);

  /** Zoom keeping the point (cx, cy) — relative to frame centre — fixed. */
  const zoomAt = useCallback(
    (next, cx = 0, cy = 0) =>
      setView((v) => {
        const scale = clamp(next, MIN, MAX);
        const k = scale / v.scale;
        return bound({ scale, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k });
      }),
    [bound],
  );

  const reset = () => setView({ scale: 1, x: 0, y: 0 });

  const localPoint = (e) => {
    const r = frame.current.getBoundingClientRect();
    return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 };
  };

  const onPointerDown = (e) => {
    frame.current?.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      gesture.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      gesture.current = { x: 0, y: 0, vx: view.x, vy: view.y, dist: Math.hypot(a.x - b.x, a.y - b.y), scale: view.scale };
    }
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gesture.current;
    if (pointers.current.size === 2 && g.dist) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = frame.current.getBoundingClientRect();
      const mid = { x: (a.x + b.x) / 2 - r.left - r.width / 2, y: (a.y + b.y) / 2 - r.top - r.height / 2 };
      zoomAt((g.scale ?? 1) * (d / g.dist), mid.x, mid.y);
    } else if (pointers.current.size === 1) {
      setView((v) => bound({ scale: v.scale, x: g.vx + (e.clientX - g.x), y: g.vy + (e.clientY - g.y) }));
    }
  };

  const onPointerUp = (e) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 1) {
      const [p] = [...pointers.current.values()];
      setView((v) => {
        gesture.current = { x: p.x, y: p.y, vx: v.x, vy: v.y };
        return v;
      });
    } else if (pointers.current.size === 0) gesture.current = null;
  };

  // Wheel zoom only after the viewer is clicked (so page scroll is never hijacked).
  useEffect(() => {
    const f = frame.current;
    if (!f) return;
    const onWheel = (e) => {
      if (!wheelOn) return;
      e.preventDefault();
      const p = localPoint(e);
      setView((v) => {
        const scale = clamp(v.scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), MIN, MAX);
        const k = scale / v.scale;
        return bound({ scale, x: p.x - (p.x - v.x) * k, y: p.y - (p.y - v.y) * k });
      });
    };
    f.addEventListener('wheel', onWheel, { passive: false });
    return () => f.removeEventListener('wheel', onWheel);
  }, [wheelOn, bound]);

  useEffect(() => {
    const onResize = () => setView((v) => bound(v));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [bound]);

  const onKeyDown = (e) => {
    const step = 60;
    const map = {
      ArrowLeft: [step, 0],
      ArrowRight: [-step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    if (map[e.key]) {
      e.preventDefault();
      const [dx, dy] = map[e.key];
      setView((v) => bound({ scale: v.scale, x: v.x + dx, y: v.y + dy }));
    } else if (e.key === '+' || e.key === '=') zoomAt(view.scale * 1.3);
    else if (e.key === '-') zoomAt(view.scale / 1.3);
    else if (e.key === '0') reset();
  };

  const btn =
    'inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border-sand-medium bg-surface-cream-card/95 text-on-surface shadow-sm backdrop-blur transition-colors hover:border-secondary hover:text-secondary disabled:opacity-40';

  return (
    <div className="relative">
      <div
        ref={frame}
        tabIndex={0}
        role="application"
        aria-roledescription="zoomable image"
        aria-label={`${s.label}. ${s.hint}`}
        className={`relative aspect-[4/5] w-full touch-none overflow-hidden rounded-xl border border-border-sand-medium bg-white select-none sm:aspect-[5/4] lg:aspect-[16/11] ${
          view.scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
        }`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClick={() => setWheelOn(true)}
        onMouseLeave={() => setWheelOn(false)}
        onDoubleClick={(e) => {
          const p = localPoint(e);
          zoomAt(view.scale > 1.5 ? 1 : 2.5, p.x, p.y);
        }}
        onKeyDown={onKeyDown}
        data-lenis-prevent-wheel={wheelOn ? '' : undefined}
      >
        {!loaded && <div className="absolute inset-0 animate-pulse bg-surface-container" aria-hidden="true" />}
        <img
          src={src}
          srcSet={srcSet}
          sizes="(min-width: 1280px) 1200px, 100vw"
          width={width}
          height={height}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 h-full w-full object-contain will-change-transform"
          style={{
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
            transition: gesture.current ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      <div className="absolute end-3 top-3 flex flex-col gap-2">
        <button type="button" className={btn} onClick={() => zoomAt(view.scale * 1.4)} disabled={view.scale >= MAX} aria-label={s.zoomIn}>
          <Icon name="add" size={22} />
        </button>
        <button type="button" className={btn} onClick={() => zoomAt(view.scale / 1.4)} disabled={view.scale <= MIN} aria-label={s.zoomOut}>
          <Icon name="remove" size={22} />
        </button>
        <button type="button" className={btn} onClick={reset} aria-label={s.reset}>
          <Icon name="fit_screen" size={20} />
        </button>
      </div>

      <div className="mt-space-sm flex flex-wrap items-center justify-between gap-2">
        <p className="font-body text-body-sm text-text-muted-dark">{s.hint}</p>
        <a
          href={fullSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 font-label text-label-badge uppercase text-secondary hover:text-gold-antique-hover"
        >
          <Icon name="open_in_new" size={16} />
          {s.fullRes}
        </a>
      </div>
      <p className="sr-only" aria-live="polite">{`${Math.round(view.scale * 100)}%`}</p>
    </div>
  );
}
