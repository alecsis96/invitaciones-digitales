import { sherFaqs } from "@/data/sher-commercial";
import { sherWhatsAppHref } from "@/lib/sher/contact";
import styles from "./SherHome.module.css";

const publishedFaqs = sherFaqs.filter((item) => item.published);

export function SherFaq() {
  return (
    <section className={`${styles.commercialSection} ${styles.faqSection}`} aria-labelledby="faq-title">
      <div className={styles.faqInner}>
        <header className={styles.faqHeader}>
          <p className={styles.commercialEyebrow}>Preguntas frecuentes</p>
          <h2 id="faq-title">Todo claro antes de celebrar.</h2>
          <p>Resolvemos lo esencial para que puedas elegir y comenzar con tranquilidad.</p>
        </header>

        <div className={styles.faqList}>
          {publishedFaqs.map((item) => (
            <details className={styles.faqItem} key={item.id}>
              <summary>
                <span>{item.question}</span>
                <span className={styles.faqIndicator} aria-hidden="true" />
              </summary>
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {sherWhatsAppHref ? (
          <a className={styles.faqContact} href={sherWhatsAppHref} target="_blank" rel="noopener noreferrer">
            ¿Tienes otra pregunta? Escríbenos por WhatsApp <span aria-hidden="true">→</span>
          </a>
        ) : (
          <p className={styles.faqContactUnavailable}>Atención personalizada por WhatsApp.</p>
        )}
      </div>
    </section>
  );
}
