import Image from "next/image";
import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

export function BodaStory({ story }: { story?: BodaRomanceEditorialData["story"] }) {
  if (!story) return null;

  return (
    <section className={`${styles.story} ${!story.image ? styles.storyTextOnly : ""}`} aria-labelledby="boda-story-title">
      <div className={styles.storyCopy}>
        <p className={styles.sectionEyebrow} data-boda-motion="rise">Nuestra historia</p>
        <h2 id="boda-story-title" data-boda-motion="rise" data-boda-delay="100">{story.title}</h2>
        <p data-boda-motion="rise" data-boda-delay="200">{story.body}</p>
      </div>
      {story.image ? (
        <figure className={styles.storyMedia} data-boda-motion="story-photo">
          <Image src={story.image} alt={story.imageAlt ?? ""} fill sizes="(min-width: 700px) 280px, (min-width: 564px) 496px, 88vw" />
        </figure>
      ) : null}
    </section>
  );
}
