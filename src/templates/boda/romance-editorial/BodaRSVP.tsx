import { buildWhatsAppUrl } from "@/lib/invitation/rsvp";
import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

function internationalPhone(value?: string) {
  const input = value?.trim() ?? "";
  if (!/^\+?[\d\s().-]+$/.test(input)) return undefined;
  const digits = input.replace(/\D/g, "");
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : undefined;
}

function deadlineDate(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) return undefined;
  return new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

export function BodaRSVP({ rsvp }: { rsvp?: BodaRomanceEditorialData["rsvp"] }) {
  const phone = internationalPhone(rsvp?.phone);
  if (!rsvp || !phone) return null;
  const deadline = deadlineDate(rsvp.deadline);

  return (
    <section className={styles.rsvp} aria-labelledby="boda-rsvp-title">
      <p className={styles.sectionEyebrow}>Confirma tu asistencia</p>
      <h2 id="boda-rsvp-title">{rsvp.title?.trim() || "Nos encantaría compartir este día contigo"}</h2>
      {rsvp.description?.trim() ? <p className={styles.rsvpMessage}>{rsvp.description}</p> : null}
      {deadline ? <p className={styles.rsvpDeadline}>Confirma antes del <time dateTime={rsvp.deadline}>{deadline}</time>.</p> : null}
      <a className={styles.rsvpLink} href={buildWhatsAppUrl(phone, rsvp.message)} target="_blank" rel="noopener noreferrer">Confirmar por WhatsApp<span aria-hidden="true"> ↗</span></a>
    </section>
  );
}
