import { useEffect, useRef, useState } from 'react';
import { loadCss } from '../../lib/load-css.js';

/**
 * Leaflet + OpenStreetMap map (no API key). Hydrated with client:visible, so Leaflet is only
 * downloaded when the map scrolls into view. Scroll-wheel zoom stays off until the map is clicked.
 *
 * @param {{
 *   center: { lat: number; lng: number };
 *   landmarks: { id: string; name: string; distance: string; lat: number; lng: number }[];
 *   strings: { popupTitle: string; popupSub: string; quickPan: string; mapLabel: string; activate: string; directions: string };
 *   mapsUrl: string;
 *   showChips?: boolean;
 *   height?: number;
 *   zoom?: number;
 * }} props
 */
export default function LocationMap({ center, landmarks, strings: s, mapsUrl, showChips = true, height = 440, zoom = 13 }) {
  const el = useRef(/** @type {HTMLDivElement | null} */ (null));
  const mapRef = useRef(/** @type {any} */ (null));
  const markers = useRef(/** @type {Record<string, any>} */ ({}));
  const [active, setActive] = useState('center');
  const [wheel, setWheel] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Leaflet JS + CSS are fetched only when the map is about to show (no render-blocking CSS).
      const [{ default: L }] = await Promise.all([import('leaflet'), loadCss('/vendor/leaflet.css')]);
      if (cancelled || !el.current || mapRef.current) return;

      const map = L.map(el.current, {
        center: [center.lat, center.lng],
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const pin = L.divIcon({ className: '', html: '<span class="tg-pin"></span>', iconSize: [22, 22], iconAnchor: [11, 11] });
      const dot = L.divIcon({ className: '', html: '<span class="tg-dot"></span>', iconSize: [14, 14], iconAnchor: [7, 7] });

      const popup = `<strong style="font-family:var(--font-display);font-size:15px">${s.popupTitle}</strong><br/><span style="color:#5c5346">${s.popupSub}</span><br/><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" style="color:#795902;font-weight:600">${s.directions} →</a>`;
      markers.current.center = L.marker([center.lat, center.lng], { icon: pin, title: s.popupTitle, keyboard: true })
        .addTo(map)
        .bindPopup(popup);

      landmarks.forEach((l) => {
        if (l.id === 'center') return;
        markers.current[l.id] = L.marker([l.lat, l.lng], { icon: dot, title: l.name, keyboard: true })
          .addTo(map)
          .bindPopup(`<strong>${l.name}</strong>${l.distance ? `<br/><span style="color:#795902">${l.distance}</span>` : ''}`);
      });

      const fit = L.latLngBounds(landmarks.filter((l) => l.id !== 'airport').map((l) => [l.lat, l.lng]));
      map.fitBounds(fit.pad(0.15));

      map.on('click', () => {
        map.scrollWheelZoom.enable();
        setWheel(true);
      });
      map.on('mouseout', () => {
        map.scrollWheelZoom.disable();
        setWheel(false);
      });
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flyTo = (/** @type {string} */ id) => {
    const map = mapRef.current;
    const l = landmarks.find((x) => x.id === id);
    if (!map || !l) return;
    setActive(id);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const z = id === 'airport' ? 12 : 15;
    if (reduce) map.setView([l.lat, l.lng], z);
    else map.flyTo([l.lat, l.lng], z, { duration: 1.2 });
    map.once('moveend', () => markers.current[id]?.openPopup());
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-border-sand-medium bg-surface-container" style={{ height }}>
        <div ref={el} className="h-full w-full" role="region" aria-label={s.mapLabel} />
        {!wheel && (
          <p className="pointer-events-none absolute bottom-3 start-3 z-[500] rounded-md bg-dark-brown-surface/85 px-2.5 py-1 font-body text-[12px] text-surface-variant backdrop-blur">
            {s.activate}
          </p>
        )}
      </div>
      {showChips && (
        <div className="mt-space-md">
          <p className="mb-2 font-label text-label-badge uppercase text-text-muted-dark">{s.quickPan}</p>
          <div className="flex flex-wrap gap-2">
            {landmarks.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => flyTo(l.id)}
                aria-pressed={active === l.id}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 font-body text-body-sm transition-colors ${
                  active === l.id
                    ? 'border-secondary bg-secondary text-white'
                    : 'border-border-sand-medium bg-surface-cream-card text-on-surface hover:border-secondary hover:text-secondary'
                }`}
              >
                {l.name}
                {l.distance && (
                  <span className={`font-label text-label-badge ${active === l.id ? 'text-secondary-fixed' : 'text-secondary'}`} dir="ltr">
                    {l.distance}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
