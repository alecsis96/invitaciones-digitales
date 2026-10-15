"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { invitationCatalog } from "@/data/catalog";
import { SherCinematicModal } from "./SherCinematicModal";
import styles from "./SherHome.module.css";

const demoInvitation = invitationCatalog.find(({ id }) => id === "xv-01")!;
const cinematicPoster = "/images/sher/experiences/cinematica-xv01-poster.webp?v=editorial";

export function SherExperienceShowcase() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <div className={styles.experienceShowcase}>
      {/* Preserve destinations still referenced by the current pricing offers. */}
      {["clip", "historia", "protagonista"].map((id) => (
        <span className={styles.experienceHashAnchor} id={`experiencia-${id}`} key={id} aria-hidden="true" />
      ))}

      <header className={styles.experienceIntro}>
        <p className={styles.commercialEyebrow}>Experiencias SHER</p>
        <h2 id="experiences-title">Haz que tu celebración <em>empiece antes</em> del evento.</h2>
        <p>Experiencias audiovisuales creadas para acompañar tu invitación de una forma diferente.</p>
      </header>

      <div className={styles.cinematicPresentation}>
        <button
          className={styles.cinematicPoster}
          type="button"
          aria-label="Ver teaser de SHER Cinemática: Ana Sofía"
          aria-haspopup="dialog"
          onClick={() => setIsOpen(true)}
        >
          <Image src={cinematicPoster} alt="" fill sizes="(min-width: 1000px) 860px, (min-width: 700px) 90vw, calc(100vw - 40px)" />
          <span className={styles.cinematicPlay} aria-hidden="true">▶</span>
          <span className={styles.cinematicPosterCaption}>Ana Sofía · Ver teaser <span>8 segundos</span></span>
        </button>

        <div className={styles.cinematicDetails}>
          <div>
            <h3>SHER Cinemática</h3>
            <p>
              <span className={styles.cinematicMobileCopy}>Un adelanto que emociona. Una invitación que reúne todos los detalles</span>
              <span className={styles.cinematicDesktopCopy}>El teaser emociona. Tu invitación interactiva reúne todos los detalles de la celebración.</span>
            </p>
            <h4 className={styles.cinematicSharingTitle}>
              <span className={styles.cinematicMobileCopy}>Así se comparte</span>
              <span className={styles.cinematicDesktopCopy}>Así se comparte tu invitación</span>
            </h4>
            <p className={styles.cinematicSharingSubtitle}>Ejemplo ilustrativo en WhatsApp</p>
            <Link className={styles.cinematicMessageLink} href={demoInvitation.route}>Ver invitación de ejemplo</Link>
            <p className={styles.cinematicNote}>Personalizaciones bajo cotización.</p>
          </div>
          <figure className={styles.cinematicMessageExample}>
            <div className={styles.cinematicMessagePhone}>
              <Image
                src="/images/sher/experiences/sher_whatsapp_preview.webp"
                alt="Simulación de WhatsApp de Ana Sofía: un único mensaje reúne el teaser de sus XV años, una breve invitación y un enlace para consultar los detalles del evento."
                width={941}
                height={1672}
                sizes="(min-width: 700px) 270px, (min-width: 360px) 140px, 235px"
              />
            </div>
          </figure>
        </div>
      </div>

      {isOpen && <SherCinematicModal onClose={closeModal} />}
    </div>
  );
}
