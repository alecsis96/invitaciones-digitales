import Image from "next/image";
import Link from "next/link";
import styles from "./SherHome.module.css";
import { SherHeroPreview } from "./SherHeroPreview";

export function SherHero() {
  return (
    <>
      <div className={styles.heroBackground} aria-hidden="true">
        <Image src="/images/sher/hero/ambient.png" alt="" fill priority sizes="100vw" />
      </div>
      <div className={styles.heroAtmosphere} aria-hidden="true" />
      <div className={styles.heroStage}>
        <div className={styles.heroHeading}>
          <p className={styles.eyebrow}>Más que una invitación</p>
          <h1 id="sher-hero-title">Momentos extraordinarios <em>para compartir.</em></h1>
        </div>
        <div className={styles.heroDetails}>
          <p className={styles.description}>
            <span className={styles.mobileDescription}>Invitaciones interactivas y experiencias audiovisuales personalizadas para celebrar desde el primer momento.</span>
            <span className={styles.desktopDescription}>Invitaciones digitales interactivas y experiencias audiovisuales personalizadas para hacer especial cada celebración desde el primer momento.</span>
          </p>
          <Link className={styles.primaryAction} href="#plantillas">
            Ver plantillas
            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>
          </Link>
        </div>

        <div className={styles.heroDeviceWell}>
          <figure className={styles.preview} aria-label="Vista previa animada de la invitación XV Elegancia Contemporánea de Ana Sofía">
            <div className={styles.phone}>
              <div className={styles.phoneSpeaker} aria-hidden="true" />
              <SherHeroPreview />
            </div>
            <figcaption>XV años · Elegancia Contemporánea</figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}
