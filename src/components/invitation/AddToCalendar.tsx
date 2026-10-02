"use client";

import type { EventCalendar } from "@/types/invitation";

function asDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatUtc(value: string) {
  const date = asDate(value);
  return date ? date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "") : null;
}

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

export function buildGoogleCalendarUrl(calendar: EventCalendar) {
  const start = formatUtc(calendar.start);
  if (!start) return null;
  const end = calendar.end ? formatUtc(calendar.end) : null;
  const params = new URLSearchParams({ action: "TEMPLATE", text: calendar.title, dates: end ? `${start}/${end}` : start });
  if (calendar.location?.trim()) params.set("location", calendar.location);
  if (calendar.description?.trim()) params.set("details", calendar.description);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsCalendar(calendar: EventCalendar) {
  const start = formatUtc(calendar.start);
  if (!start) return null;
  const end = calendar.end ? formatUtc(calendar.end) : null;
  const uid = `${start}-${calendar.title.replace(/[^a-z0-9]/gi, "").toLowerCase() || "event"}@invitaciones-digitales`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitaciones Digitales//Event Calendar//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatUtc(new Date().toISOString())}`,
    `DTSTART:${start}`,
    ...(end ? [`DTEND:${end}`] : []),
    `SUMMARY:${escapeIcs(calendar.title)}`,
    ...(calendar.location?.trim() ? [`LOCATION:${escapeIcs(calendar.location)}`] : []),
    ...(calendar.description?.trim() ? [`DESCRIPTION:${escapeIcs(calendar.description)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
    ""
  ];
  return lines.join("\r\n");
}

export function AddToCalendar({ calendar }: { calendar?: EventCalendar }) {
  const googleCalendarUrl = calendar ? buildGoogleCalendarUrl(calendar) : null;
  const icsCalendar = calendar ? buildIcsCalendar(calendar) : null;

  if (!calendar || !googleCalendarUrl || !icsCalendar) return null;

  const downloadIcs = () => {
    const file = new Blob([icsCalendar], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = href;
    link.download = "evento.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(href), 0);
  };

  return <section className="calendar-section" aria-label="Agregar al calendario"><p className="eyebrow">Guarda la fecha</p><h2>Agregar al calendario</h2><i /><div className="calendar-actions"><a className="calendar-button" href={googleCalendarUrl} target="_blank" rel="noreferrer">Google Calendar</a><button className="calendar-button calendar-download" type="button" onClick={downloadIcs}>Apple / Outlook</button></div></section>;
}
