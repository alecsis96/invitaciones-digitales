import type { DinoEvent } from './types';

const EXPLICIT_TZ = /(?:Z|[+-]\d{2}:\d{2})$/i;

export function eventInstant(iso: string): Date | null {
  if (!EXPLICIT_TZ.test(iso)) return null;
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|([+-])(\d{2}):(\d{2}))$/i);
  if (!match) return null;
  const [year, month, day, hour, minute, second] = match.slice(1, 7).map(Number);
  const maxDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  if (month < 1 || month > 12 || day < 1 || day > maxDay || hour > 23 || minute > 59 || second > 59) return null;
  if (match[8] && (Number(match[8]) > 14 || Number(match[9]) > 59)) return null;
  const date = new Date(iso);
  return Number.isFinite(date.getTime()) ? date : null;
}

export function formatDinoDate(iso: string, timeZone?: string): { day: string; date: string; time: string } | null {
  const value = eventInstant(iso);
  if (!value) return null;
  // Sin zona IANA, mostrar la hora local escrita en el ISO, sin inferir ubicación del visitante.
  const displayInstant = timeZone ? value : new Date(iso.slice(0, 19) + 'Z');
  const isoOffset = /Z$/i.test(iso) ? '+00:00' : iso.slice(-6);
  try {
    const zone = timeZone || 'UTC';
    const date = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: zone }).format(displayInstant);
    const day = new Intl.DateTimeFormat('es-MX', { weekday: 'long', timeZone: zone }).format(displayInstant);
    const time = new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: zone }).format(displayInstant);
    return { day, date, time: timeZone ? time : `${time} (UTC${isoOffset})` };
  } catch {
    const fallback = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(displayInstant);
    const time = new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }).format(displayInstant);
    return { day: fallback.split(' ')[0], date: fallback, time: `${time} (UTC)` };
  }
}

export function countdownParts(iso: string, now = Date.now()): [number, number, number, number] | null {
  const at = eventInstant(iso);
  if (!at) return null;
  let seconds = Math.max(0, Math.floor((at.getTime() - now) / 1000));
  const days = Math.floor(seconds / 86400); seconds %= 86400;
  const hours = Math.floor(seconds / 3600); seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  return [days, hours, minutes, seconds % 60];
}

export function safeMapsUrl(input?: string): string | null {
  if (!input) return null;
  try {
    const url = new URL(input);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    const host = url.hostname.toLowerCase();
    if (host === 'maps.app.goo.gl' || host === 'maps.google.com' || host === 'www.google.com' && url.pathname.startsWith('/maps')) {
      return url.toString();
    }
  } catch { /* Invalid or relative */ }
  return null;
}

export function safeWhatsAppUrl(event: Pick<DinoEvent, 'rsvpPhone' | 'rsvpMessage' | 'name'>): string | null {
  const raw = event.rsvpPhone?.trim() ?? '';
  if (!/^\+?[\d\s().-]+$/.test(raw)) return null;
  const digits = raw.replace(/\D/g, '');
  if (digits.length < 11 || digits.length > 15) return null;
  const message = event.rsvpMessage?.trim() || `Hola, confirmo mi asistencia al cumpleaños de ${event.name}.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function calendarUrls(event: DinoEvent): { google: string; ics: string } | null {
  const start = eventInstant(event.startAt);
  if (!start) return null;
  const providedEnd = event.endAt ? eventInstant(event.endAt) : null;
  const end = providedEnd && providedEnd.getTime() > start.getTime() ? providedEnd : new Date(start.getTime() + 3 * 60 * 60 * 1000);
  const compact = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const title = `Cumpleaños de ${event.name}`;
  const query = new URLSearchParams({ action: 'TEMPLATE', text: title, dates: `${compact(start)}/${compact(end)}`, details: 'Invitación de cumpleaños', location: [event.venue, event.address].filter(Boolean).join(', ') });
  const esc = (v: string) => v.replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');
  const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//SHER//INFANTIL-01//ES','BEGIN:VEVENT',`DTSTART:${compact(start)}`,`DTEND:${compact(end)}`,`SUMMARY:${esc(title)}`,`LOCATION:${esc([event.venue, event.address].filter(Boolean).join(', '))}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  return { google: `https://calendar.google.com/calendar/render?${query.toString()}`, ics };
}
