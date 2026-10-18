import Image from "next/image";
import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

type Props = Pick<BodaRomanceEditorialData, "closing" | "couple" | "date" | "displayDate">;

export function BodaClosing({ closing, couple, date, displayDate }: Props) {
  if (!closing) return null;

  return (
    <section className={`${styles.closing} ${closing.image ? styles.closingWithImage : ""}`} aria-labelledby="boda-closing-title" data-boda-motion-frame="closing">
      {closing.image ? <Image className={styles.closingImage} src={closing.image} alt={closing.imageAlt ?? ""} fill sizes="(max-width: 760px) 100vw, 760px" style={{ objectPosition: closing.objectPosition ?? "center" }} data-boda-motion="closing-landscape" /> : null}
      <div className={styles.closingCopy}>
        <h2 id="boda-closing-title" data-boda-motion="closing-soft" data-boda-motion-group="closing-copy">{closing.title?.trim() || "Gracias por acompañarnos"}</h2>
        {closing.message?.trim() ? <p data-boda-motion="closing-soft" data-boda-motion-group="closing-copy">{closing.message}</p> : null}
        <p className={styles.closingNames} data-boda-motion="closing-names" data-boda-motion-group="closing-copy">{couple.firstName} <span>&amp;</span> {couple.secondName}</p>
        <time dateTime={date} data-boda-motion="closing-date" data-boda-motion-group="closing-copy">{displayDate}</time>
      </div>
    </section>
  );
}
