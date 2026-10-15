import Image from "next/image";
import { Countdown } from "@/components/invitation/Countdown";
import { BodaDressCode } from "./BodaDressCode";
import { BodaGallery } from "./BodaGallery";
import { BodaItinerary } from "./BodaItinerary";
import { BodaLocations } from "./BodaLocations";
import { BodaStory } from "./BodaStory";
import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

export function BodaRomanceEditorialInvitation({ event }: { event: BodaRomanceEditorialData }) {
  const { couple, opening } = event;

  return (
    <main className={styles.invitation}>
      <section className={styles.opening} aria-labelledby="boda-opening-title">
        <div className={styles.heroMedia}>
          <Image src={event.hero.src} alt={event.hero.alt} fill priority sizes="(max-width: 760px) 100vw, 760px" />
        </div>
        <div className={styles.paperTransition} aria-hidden="true" />
        <div className={styles.openingContent}>
          <p className={styles.eyebrow}>{event.eventLabel}</p>
          <span className={styles.rule} aria-hidden="true" />
          <h1 id="boda-opening-title">
            <span>{couple.firstName}</span>
            <em>&amp;</em>
            <span>{couple.secondName}</span>
          </h1>
          <time dateTime={event.date}>{event.displayDate}</time>
          <i className={styles.botanical} aria-hidden="true" />
          {opening?.message ? <p className={styles.message}>{opening.message}</p> : null}
        </div>
      </section>

      <section className={styles.countdownSection} aria-label="Cuenta regresiva para la boda">
        <header className={styles.countdownHeader}>
          <span aria-hidden="true" />
          <p>{opening?.countdownLabel ?? "Falta muy poco"}</p>
          <span aria-hidden="true" />
        </header>
        <div className={styles.countdownPanel}>
          <Countdown date={event.date} />
        </div>
        <i className={`${styles.botanical} ${styles.botanicalBottom}`} aria-hidden="true" />
      </section>

      <BodaStory story={event.story} />
      <BodaLocations locations={event.locations} />
      <BodaItinerary itinerary={event.itinerary} />
      <BodaGallery photos={event.gallery} />
      <BodaDressCode dressCode={event.dressCode} />
    </main>
  );
}
