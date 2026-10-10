import Image from "next/image";
import Link from "next/link";
import styles from "./SherHome.module.css";

export function SherHero() {
  return (
    <section className={styles.hero} aria-labelledby="sher-hero-title">
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Más que una invitación</p>
          <h1 id="sher-hero-title">Momentos extraordinarios <em>para compartir.</em></h1>
          <p className={styles.description}>Invitaciones digitales interactivas y experiencias audiovisuales personalizadas para hacer especial cada celebración desde el primer momento.</p>
          <Link className={styles.primaryAction} href="/plantillas/xv/elegancia-contemporanea">
            Ver plantillas
            <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>
          </Link>
        </div>

        <figure className={styles.preview}>
          <div className={styles.phone}>
            <div className={styles.phoneSpeaker} aria-hidden="true" />
            <Image
              src="/images/xv-01/ana/ana-sofia-01.webp"
              alt="Vista previa de la invitación XV Elegancia Contemporánea"
              fill
              priority
              sizes="(min-width: 1080px) 405px, (min-width: 700px) 39vw, min(78vw, 330px)"
            />
            <div className={styles.phoneOverlay} aria-hidden="true">
              <span>Mis XV años</span>
              <strong>Ana Sofía</strong>
            </div>
          </div>
          <figcaption>XV años · Elegancia Contemporánea</figcaption>
        </figure>
      </div>
    </section>
  );
}
