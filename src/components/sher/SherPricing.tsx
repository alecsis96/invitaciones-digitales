import Image from "next/image";
import { invitationIncludes, sherPricing } from "@/data/sher-commercial";
import { buildSherWhatsAppHref } from "@/lib/sher/contact";
import styles from "./SherHome.module.css";

const interactiveCapabilities = invitationIncludes.slice(0, 3);

export function SherPricing() {
  const cinematicHref = buildSherWhatsAppHref(sherPricing.cinematic.message);
  const customHref = buildSherWhatsAppHref(sherPricing.custom.message);

  return (
    <section className={`${styles.commercialSection} ${styles.pricingSection}`} aria-labelledby="pricing-title">
      <div className={styles.pricingHeader}>
        <p className={styles.commercialEyebrow}>Precios SHER</p>
        <h2 id="pricing-title">Tu celebración, a tu manera.</h2>
        <p>Elige la experiencia que mejor se adapte a ti.</p>
      </div>

      <div className={styles.pricingComposition}>
        <article className={styles.pricingOffer}>
          <div className={styles.pricingOfferContent}>
            <p className={styles.pricingOfferLabel}>Precio de lanzamiento</p>
            <h3>{sherPricing.interactive.name}</h3>
            <p className={styles.pricingOfferDescription}>Una invitación tan especial como tu celebración.</p>
            <strong>{sherPricing.interactive.price}</strong>
            <ul className={styles.pricingOfferCapabilities}>
              {interactiveCapabilities.map((capability) => <li key={capability.id}>{capability.title}</li>)}
            </ul>
            <p className={styles.pricingOfferAvailability}>Funciones según plantilla y datos del evento.</p>
            <a className={styles.pricingOfferLink} href="#plantillas">Ver plantillas <span aria-hidden="true">→</span></a>
          </div>
          <span className={styles.pricingOfferVisual}>
            <Image src="/images/xv-01/ana/ana-sofia-01.webp" alt="Vista previa de una invitación interactiva SHER" fill sizes="(min-width: 700px) 180px, 116px" />
          </span>
        </article>

        <div className={styles.pricingEditorialPanel}>
          <section className={styles.pricingTier} aria-labelledby="pricing-cinematic-title">
            <p className={styles.pricingTierEyebrow}>
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M7 12h10" />
              </svg>
              INVITACIÓN + VIDEO
            </p>
            <h3 id="pricing-cinematic-title">{sherPricing.cinematic.name}</h3>
            <strong className={styles.pricingTierPrice}>{sherPricing.cinematic.price}</strong>
            <p>{sherPricing.cinematic.description}</p>
            <p>{sherPricing.cinematic.secondaryDescription}</p>
            <p className={styles.pricingUpgrade}>{sherPricing.cinematic.upgrade}</p>
            {cinematicHref ? (
              <a className={styles.pricingContactLink} href={cinematicHref} target="_blank" rel="noopener noreferrer">Solicitar Cinemática <span aria-hidden="true">→</span></a>
            ) : <p>Contacto por WhatsApp pendiente de configuración.</p>}
          </section>

          <section className={styles.pricingTier} aria-labelledby="pricing-custom-title">
            <h3 id="pricing-custom-title">{sherPricing.custom.name}</h3>
            <p className={styles.pricingCustomQuote}>{sherPricing.custom.price}</p>
            <p>{sherPricing.custom.description}</p>
            {customHref ? (
              <a className={styles.pricingContactLink} href={customHref} target="_blank" rel="noopener noreferrer">Cotizar proyecto <span aria-hidden="true">→</span></a>
            ) : <p>Contacto por WhatsApp pendiente de configuración.</p>}
          </section>

        </div>
      </div>
    </section>
  );
}
