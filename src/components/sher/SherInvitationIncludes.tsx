import Image from "next/image";
import { anaSofiaDemo } from "@/data/events/ana-sofia.demo";
import { invitationIncludes } from "@/data/sher-commercial";
import { SherIncludesCountdown } from "./SherIncludesCountdown";
import styles from "./SherHome.module.css";

function IncludeIcon({ id }: { id: (typeof invitationIncludes)[number]["id"] }) {
  const icons = {
    countdown: <><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M7 3v4M17 3v4M4 9h16M12 12v4l2.5 1.5" /></>,
    maps: <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    calendar: <><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M7 3v4M17 3v4M4 9h16M8 13h8M8 16h5" /></>,
    gallery: <><rect x="3" y="4" width="18" height="16" rx="1.5" /><circle cx="8" cy="9" r="1.5" /><path d="m5 18 5-5 3 3 2-2 4 4" /></>,
    "dress-code": <><path d="M8 4h8l3 5-3 2v9H8v-9l-3-2 3-5Z" /><path d="M10 4v4h4V4" /></>,
    "music-whatsapp": (
  <>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
    <path d="M8.2 7.5c-.4.2-1 1-1 1.7 0 2.3 3.3 5.8 6.1 6.9 1.3.5 2.2.3 2.9-.5l.7-.9-2.7-1.3-1.1 1c-1.8-.8-3-2-3.8-3.8l1-1.1-1.3-2.7-.8.7Z" />
  </>
),
  } as const;

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">{icons[id]}</svg>;
}

export function SherInvitationIncludes() {
  const galleryPhotos = anaSofiaDemo.gallery?.slice(0, 3) ?? [];
  const ceremony = anaSofiaDemo.ceremony;
  const locationAddress = ceremony?.address
    .replace(/\b\d{5}\s+/, "")
    .replace(/,\s*/, " · ");
  const secondaryFeatures = [
    { ...invitationIncludes[2], compactDescription: "Guarda la fecha" },
    { ...invitationIncludes[5], compactDescription: "Ambientación y contacto" },
    { ...invitationIncludes[4], compactDescription: "Indicaciones del evento" },
  ];

  return (
    <section className={`${styles.commercialSection} ${styles.includesSection}`} aria-labelledby="includes-title">
      <div className={styles.commercialHeader}>
        <p className={styles.commercialEyebrow}>Qué incluye tu invitación</p>
        <h2 id="includes-title">Todo lo importante, en un solo lugar.</h2>
      </div>
      <div className={styles.includesEditorial}>
        <article className={styles.includesGalleryCard}>
          <div className={styles.includesGalleryCopy}>
            <span className={styles.includesIcon}><IncludeIcon id="gallery" /></span>
            <h3>Galería</h3>
            <p>Comparte recuerdos, detalles y momentos especiales.</p>
          </div>
          <div className={styles.includesCollage} role="group" aria-label="Galería de demostración de Ana Sofía">
            {galleryPhotos.map((photo, index) => (
              <figure className={styles[`includesCollagePhoto${index + 1}` as keyof typeof styles]} key={photo.src}>
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 360px, (min-width: 700px) 44vw, 72vw" loading="eager" />
              </figure>
            ))}
          </div>
        </article>

        <div className={styles.includesDemoGrid}>
          <article className={styles.includesDemoCard}>
            <div className={styles.includesDemoHeading}>
              <span className={styles.includesIcon}><IncludeIcon id="countdown" /></span>
              <div><h3>Cuenta regresiva</h3><p className={styles.includesDemoDescription}>La emoción comienza antes de la celebración.</p></div>
            </div>
            <SherIncludesCountdown date={anaSofiaDemo.date} displayDate={anaSofiaDemo.displayDate} />
          </article>

          {ceremony && (
            <article className={`${styles.includesDemoCard} ${styles.includesLocationCard}`}>
              <div className={styles.includesDemoHeading}>
                <span className={styles.includesIcon}><IncludeIcon id="maps" /></span>
                <div><h3>Ubicación</h3></div>
              </div>
              <div className={styles.includesLocationVisual} aria-hidden="true">
                <span className={styles.includesLocationMapPin}><IncludeIcon id="maps" /></span>
              </div>
              <div className={styles.includesLocationDetails}>
                <div><strong>{ceremony.venue}</strong><span>{locationAddress}</span></div>
              </div>
            </article>
          )}
        </div>

        <ul className={styles.includesSecondaryFeatures}>
          {secondaryFeatures.map((item) => (
            <li key={item.id}>
              <span className={styles.includesIcon}><IncludeIcon id={item.id} /></span>
              <div><h3>{item.title.replace("Fecha y cuenta regresiva", "Cuenta regresiva")}</h3><p className={styles.includesSecondaryDescription}>{item.compactDescription}</p></div>
            </li>
          ))}
        </ul>
      </div>
      <p className={styles.includesNote}>Funciones disponibles según plantilla y datos del evento.</p>
    </section>
  );
}
