import Image from "next/image";
import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

export function BodaStory({ story }: { story?: BodaRomanceEditorialData["story"] }) {
  if (!story) return null;

  return (
    <section className={`${styles.story} ${!story.image ? styles.storyTextOnly : ""}`} aria-labelledby="boda-story-title">
      <div className={styles.storyCopy}>
        <p className={styles.sectionEyebrow}>Nuestra historia</p>
        <h2 id="boda-story-title">{story.title}</h2>
        <p>{story.body}</p>
      </div>
      {story.image ? (
        <figure className={styles.storyMedia}>
          <Image src={story.image} alt={story.imageAlt ?? ""} fill sizes="(min-width: 700px) 280px, (min-width: 564px) 496px, 88vw" />
        </figure>
      ) : null}
    </section>
  );
}
