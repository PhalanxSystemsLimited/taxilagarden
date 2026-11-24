import { landmarks } from '../data/landmarks';
import { site } from '../data/site';
import { getDict, tl } from './i18n';
import type { Lang } from '../data/types';

/** Serializable props for the <LocationMap> React island. */
export const mapProps = (lang: Lang) => {
  const t = getDict(lang);
  return {
    center: site.geo,
    mapsUrl: site.mapsUrl,
    landmarks: landmarks.map((l) => ({
      id: l.id,
      name: tl(l.name, lang),
      distance: l.distanceKm === null ? '' : `${l.distanceKm.toFixed(1)} km`,
      lat: l.lat,
      lng: l.lng,
    })),
    strings: {
      popupTitle: t.location.mapPopupTitle,
      popupSub: t.location.mapPopupSub,
      quickPan: t.location.quickPan,
      mapLabel: t.location.mapLabel,
      activate: t.location.mapActivate,
      directions: t.common.getDirections,
    },
  };
};
