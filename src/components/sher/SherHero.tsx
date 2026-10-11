import Image from "next/image";
import Link from "next/link";
import styles from "./SherHome.module.css";

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
          <figure className={styles.preview}>
            <div className={styles.phone}>
              <div className={styles.phoneSpeaker} aria-hidden="true" />
              <Image
                src="/images/xv-01/ana/ana-sofia-01.webp"
                alt="Vista previa de la invitación XV Elegancia Contemporánea"
                fill
                priority
                sizes="(min-width: 1080px) 360px, (min-width: 700px) 34vw, 43vw"
              />
              <div className={styles.phoneOverlay} aria-hidden="true">
                <span>Mis XV años</span>
                <strong>Ana Sofía</strong>
              </div>
            </div>
            <figcaption>XV años · Elegancia Contemporánea</figcaption>
          </figure>
        </div>
      </div>
    </>
  );
}
