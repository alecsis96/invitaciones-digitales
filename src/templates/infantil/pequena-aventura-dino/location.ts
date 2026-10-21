import type { DinoEvent } from './types';

function httpsUrl(input?: string): URL | null {
  if (!input) return null;
  try {
    const url = new URL(input);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port ? url : null;
  } catch { return null; }
}

export function safeLocationUrl(input?: string): string | null {
  const url = httpsUrl(input);
  if (!url) return null;
  if (url.hostname === 'www.google.com' && /^\/maps(?:\/|$)/.test(url.pathname)
    || url.hostname === 'maps.google.com' || url.hostname === 'maps.app.goo.gl') return url.toString();
  return null;
}

export function directionsUrl(event: Pick<DinoEvent, 'venue' | 'address' | 'mapsDirectionsUrl'>): string | null {
  const configured = httpsUrl(event.mapsDirectionsUrl);
  if (configured?.hostname === 'www.google.com' && /^\/maps\/dir\/?$/.test(configured.pathname)
    && configured.searchParams.get('api') === '1' && configured.searchParams.get('destination')?.trim()) {
    return configured.toString();
  }
  const destination = [event.venue?.trim(), event.address?.trim()].filter(Boolean).join(', ');
  if (!destination) return null;
  return `https://www.google.com/maps/dir/?${new URLSearchParams({ api: '1', destination })}`;
}
