import Image from "next/image";
import { invitationIncludes, sherExperiences, sherPricing } from "@/data/sher-commercial";
import styles from "./SherHome.module.css";

const interactiveCapabilities = invitationIncludes.slice(0, 3);

function ExperienceMark({ id }: { id: "clip" | "historia" | "protagonista" }) {
  if (id === "clip") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 7 7 5-7 5V7Z" /></svg>;
  if (id === "historia") return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="9" cy="10" r="1.25" /><path d="m5 17 4.5-4 3 2.5 2.5-2.5 4 4" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m12 3 2.75 5.57 6.15.89-4.45 4.34 1.05 6.13L12 17.04 6.5 19.93l1.05-6.13L3.1 9.46l6.15-.89L12 3Z" /></svg>;
}

export function SherPricing() {
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
            <p className={styles.pricingOfferLabel}>{sherPricing.interactive.name}</p>
            <h3>Una invitación tan especial como tu celebración.</h3>
            <strong>{sherPricing.interactive.price}</strong>
            <ul className={styles.pricingOfferCapabilities}>
              {interactiveCapabilities.map((capability) => <li key={capability.id}>{capability.title}</li>)}
            </ul>
            <p className={styles.pricingOfferAvailability}>Funciones disponibles según plantilla y datos del evento.</p>
            <a className={styles.pricingOfferLink} href="#plantillas">Ver plantillas <span aria-hidden="true">→</span></a>
          </div>
          <span className={styles.pricingOfferVisual}>
            <Image src="/images/xv-01/ana/ana-sofia-01.webp" alt="Vista previa de una invitación interactiva SHER" fill sizes="(min-width: 700px) 180px, 116px" />
          </span>
        </article>

        <div className={styles.pricingEditorialPanel}>
          <section className={styles.pricingBundles} aria-labelledby="pricing-combos-title">
            <h3 id="pricing-combos-title">Combos especiales</h3>
            <ul className={styles.pricingBundleList}>
              {sherPricing.combos.map((item) => {
                const experience = sherExperiences.find(({ name }) => item.name.endsWith(name));
                if (!experience) return null;

                return (
                  <li className={styles.pricingBundle} key={item.name}>
                    <span className={styles.pricingBundleIcon}><ExperienceMark id={experience.id} /></span>
                    <div className={styles.pricingBundleDetails}>
                      <h4>{item.name}</h4>
                      <p>{experience.description}</p>
                    </div>
                    <strong>{item.price}</strong>
                    <a href={`#experiencia-${experience.id}`}>Ver ejemplo <span aria-hidden="true">→</span></a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={styles.pricingSingles} aria-labelledby="pricing-individual-title">
            <h3 id="pricing-individual-title">Experiencias audiovisuales individuales</h3>
            <ul className={styles.pricingSinglesList}>
              {sherPricing.audiovisual.map((item) => {
                const experience = sherExperiences.find(({ name }) => name === item.name);
                if (!experience) return null;

                return <li className={styles.pricingSingle} key={item.name}><ExperienceMark id={experience.id} /><span>{item.name}</span><strong>{item.price}</strong></li>;
              })}
            </ul>
          </section>

          <p className={styles.pricingEditorialNote}>{sherPricing.customNote}</p>
        </div>
      </div>
    </section>
  );
}
