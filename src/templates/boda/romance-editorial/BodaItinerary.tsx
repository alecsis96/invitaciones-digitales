import type { TimelineItem } from "@/types/invitation";
import styles from "./BodaRomanceEditorialInvitation.module.css";

function MomentIcon({ name }: { name?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.35 };

  switch (name) {
    case "ceremony":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 20h16M6 20v-8l6-5 6 5v8M9 20v-4h6v4M12 4v3M9 7h6" /></svg>;
    case "cocktail":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 4h14l-7 8v7M9 20h6M8 4l4 5 4-5" /></svg>;
    case "reception":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 20V9h14v11M3 20h18M8 9V5h8v4M9 13h.01M15 13h.01" /></svg>;
    case "dinner":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M6 3v7M4 3v4a2 2 0 0 0 4 0V3M6 10v11M15 3v18M15 3c3 1 4 4 4 7h-4" /></svg>;
    case "dance":
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M10 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM10 6l-2 5 4 2 3-3M8 11l-3 4 4 2 2 4M13 10l2 4 4 1" /></svg>;
    default:
      return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m12 3 1.7 5.3H19l-4.3 3.1 1.6 5.3-4.3-3.2-4.3 3.2 1.6-5.3L5 8.3h5.3Z" /></svg>;
  }
}

export function BodaItinerary({ itinerary }: { itinerary?: TimelineItem[] }) {
  if (!itinerary?.length) return null;

  return (
    <section className={styles.itinerary} aria-labelledby="boda-itinerary-title">
      <header className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>Nuestro itinerario</p>
        <h2 id="boda-itinerary-title">Momentos del día</h2>
      </header>
      <ol className={styles.itineraryList}>
        {itinerary.map((item, index) => (
          <li key={`${item.time}-${item.title}`} data-boda-motion="itinerary">
            <time>{item.time}</time>
            <span className={styles.itineraryMarker}><MomentIcon name={item.icon} /></span>
            <strong>{item.title}</strong>
            {index < itinerary.length - 1 ? <i aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
