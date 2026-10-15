import { sherWhatsAppHref } from "@/lib/sher/contact";
import styles from "./SherHome.module.css";

export function SherCommercialClosing() {
  return (
    <section className={`${styles.commercialSection} ${styles.commercialClosing}`} aria-labelledby="commercial-closing-title">
      <div className={styles.commercialClosingInner}>
        <p className={styles.commercialEyebrow}>SHER · Invitaciones digitales</p>
        <h2 id="commercial-closing-title">Hay momentos que merecen una invitación inolvidable.</h2>
        <p>Cuéntanos qué estás celebrando y hagamos que todo comience de una manera especial.</p>
        {sherWhatsAppHref ? (
          <a className={styles.commercialClosingAction} href={sherWhatsAppHref} target="_blank" rel="noopener noreferrer">
            Solicitar mi invitación <span aria-hidden="true">→</span>
          </a>
        ) : (
          <button className={styles.commercialClosingAction} type="button" disabled>
            Solicitar mi invitación
          </button>
        )}
        <p className={styles.commercialClosingMeta}>Atención personalizada por WhatsApp</p>
      </div>
    </section>
  );
}
