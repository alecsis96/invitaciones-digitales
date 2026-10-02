import type { EventCalendar } from "@/types/invitation";
import { AddToCalendar } from "./AddToCalendar";

const weekdays = ["D", "L", "M", "X", "J", "V", "S"];

function eventDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return null;
  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date : null;
}

function capitalize(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }

export function VisualEventCalendar({ calendar }: { calendar?: EventCalendar }) {
  const date = calendar ? eventDate(calendar.start) : null;
  if (!calendar || !date) return null;

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((firstWeekday + daysInMonth) / 7) * 7 }, (_, index) => index - firstWeekday + 1);
  const monthName = new Intl.DateTimeFormat("es-MX", { month: "long", timeZone: "UTC" }).format(date);
  const weekdayName = new Intl.DateTimeFormat("es-MX", { weekday: "long", timeZone: "UTC" }).format(date);

  return <section className="visual-calendar" aria-label={`Calendario de ${capitalize(monthName)} de ${year}`}><p className="eyebrow">Guarda la fecha</p><h2>{monthName.toUpperCase()} {year}</h2><table><thead><tr>{weekdays.map(weekday => <th key={weekday} scope="col">{weekday}</th>)}</tr></thead><tbody>{Array.from({ length: cells.length / 7 }, (_, row) => <tr key={row}>{cells.slice(row * 7, row * 7 + 7).map((cell, index) => <td key={index}>{cell > 0 && cell <= daysInMonth ? <span className={cell === day ? "is-event-day" : ""}>{cell}</span> : null}</td>)}</tr>)}</tbody></table><p className="calendar-date">{capitalize(weekdayName)} <i /> {day} de {monthName} <i /> {year}</p><AddToCalendar calendar={calendar} compact /></section>;
}
