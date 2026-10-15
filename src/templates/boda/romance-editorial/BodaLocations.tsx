import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

type Location = NonNullable<BodaRomanceEditorialData["locations"]>["ceremony"];

function LocationIcon({ variant }: { variant: "ceremony" | "reception" }) {
  const common = { fill: "none", stroke: "currentColor", strokeLinecap: "round" as const, strokeLinejoin: "round" as const, strokeWidth: 1.25 };

  return variant === "ceremony" ? (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 20h16M6 20v-8l6-5 6 5v8M9 20v-4h6v4M12 4v3M9 7h6" /></svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M5 20V9h14v11M3 20h18M8 9V5h8v4M9 13h.01M15 13h.01" /></svg>
  );
}

function LocationCard({ location, variant }: { location?: Location; variant: "ceremony" | "reception" }) {
  if (!location) return null;

  return (
    <article className={`${styles.locationCard} ${styles[`locationCard${variant === "ceremony" ? "Ceremony" : "Reception"}`]}`}>
      <div className={styles.locationCopy}>
        <div className={styles.locationIdentity}>
          <span className={styles.locationIcon}><LocationIcon variant={variant} /></span>
          <div className={styles.locationMeta}>
            <p>{location.label}</p>
            <time>{location.time}</time>
          </div>
        </div>
        <h3>{location.venue}</h3>
        {location.address ? <span>{location.address}</span> : <small>Ubicación demostrativa</small>}
        {location.mapUrl ? <a href={location.mapUrl} target="_blank" rel="noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a> : null}
      </div>
    </article>
  );
}

export function BodaLocations({ locations }: { locations?: BodaRomanceEditorialData["locations"] }) {
  if (!locations?.ceremony && !locations?.reception) return null;

  return (
    <section className={styles.locations} aria-labelledby="boda-locations-title">
      <header className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>El gran día</p>
        <h2 id="boda-locations-title">Ceremonia y recepción</h2>
      </header>
      <div className={styles.locationsList}>
        <LocationCard location={locations.ceremony} variant="ceremony" />
        <LocationCard location={locations.reception} variant="reception" />
      </div>
    </section>
  );
}
