import Image from "next/image";
import Link from "next/link";
import styles from "./SherHome.module.css";

export function SherHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main-content">Saltar al contenido</a>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" aria-label="SHER, inicio">
          <Image src="/brand/wordmark-dark.svg" alt="SHER Invitaciones digitales" width={156} height={54} priority />
        </Link>
        <nav aria-label="Navegación principal">
          <Link className={styles.headerLink} href="#plantillas" aria-label="Ir a la sección de plantillas">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
