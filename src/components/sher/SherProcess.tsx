import Image from "next/image";
import { sherProcessSteps } from "@/data/sher-commercial";
import styles from "./SherHome.module.css";
import { SherProcessConnector } from "./SherProcessConnector";

const markerIds = sherProcessSteps.map((_, index) => `sher-process-marker-${index}`);

function ReviewIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="m7 12 3.2 3.2L17.5 8" /></svg>;
}

function ShareIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="19" r="2" /><path d="m8 11 8-5M8 13l8 5" /></svg>;
}

function ProcessVisual({ id }: { id: (typeof sherProcessSteps)[number]["id"] }) {
  if (id === "choose-template") {
    return (
      <div
        className={styles.processTemplateStack}
        role="img"
        aria-label="Previews de las plantillas XV-01, XV-02 y XV-03"
      >
        <Image src="/images/xv-02/camila/camila-azul-01.webp" alt="" width={180} height={320} sizes="(min-width: 700px) 12vw, 22vw" />
        <Image src="/images/xv-01/ana/ana-sofia-01.webp" alt="" width={180} height={320} sizes="(min-width: 700px) 14vw, 25vw" />
        <Image src="/images/xv-03/raquel/raquel-verde-01.webp" alt="" width={180} height={320} sizes="(min-width: 700px) 12vw, 22vw" />
      </div>
    );
  }

  if (id === "send-details") {
    return <div className={styles.processMaterials}><Image src="/images/sher/process/materiales.webp" alt="Materiales para personalizar una invitación SHER" fill sizes="(min-width: 700px) 18vw, 44vw" /></div>;
  }

  const isReview = id === "review-proposal";
  return (
    <div className={styles.processPhoneVisual}>
      <div className={styles.processPhoneFrame}>
        <Image src={isReview ? "/images/xv-02/camila/camila-azul-01.webp" : "/images/xv-03/raquel/raquel-verde-01.webp"} alt={isReview ? "Vista de una propuesta de invitación SHER" : "Vista de una invitación SHER lista para compartir"} fill sizes="(min-width: 700px) 14vw, 31vw" />
      </div>
      <span className={styles.processVisualBadge}>{isReview ? <ReviewIcon /> : <ShareIcon />}</span>
    </div>
  );
}

export function SherProcess() {
  return (
    <section className={`${styles.commercialSection} ${styles.processSection}`} aria-labelledby="process-title">
      <div className={styles.commercialHeader}>
        <p className={styles.commercialEyebrow}>Cómo funciona</p>
        <h2 id="process-title">Tu invitación lista en pocos pasos.</h2>
      </div>
      <ol id="sher-process-steps" className={styles.processSteps}>
        <SherProcessConnector markerIds={markerIds} />
        {sherProcessSteps.map((step, index) => (
          <li key={step.id} className={styles.processStep}>
            <span id={markerIds[index]} className={styles.processNumber} aria-hidden="true">0{index + 1}</span>
            <div className={styles.processStepText}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <ProcessVisual id={step.id} />
          </li>
        ))}
      </ol>
    </section>
  );
}
