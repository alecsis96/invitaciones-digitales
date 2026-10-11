import Image from "next/image";
import Link from "next/link";
import styles from "./SherHome.module.css";

export function SherProductBanner() {
  return (
    <section className={styles.productBanner} aria-labelledby="product-banner-title">
      <Image src="/images/xv-01/ana/ana-sofia-04.webp" alt="" fill sizes="100vw" />
      <div className={styles.productBannerContent}>
        <h2 id="product-banner-title">Convierte tus momentos<br />en recuerdos <em>inolvidables</em></h2>
        <p>Invitaciones interactivas y experiencias audiovisuales</p>
        <Link className={styles.bannerAction} href="#plantillas-destacadas">
          Ver plantillas
          <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>
        </Link>
      </div>
    </section>
  );
}
