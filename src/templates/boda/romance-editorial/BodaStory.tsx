import Image from "next/image";
import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

export function BodaStory({ story }: { story?: BodaRomanceEditorialData["story"] }) {
  if (!story) return null;

  return (
    <section className={styles.story} aria-labelledby="boda-story-title">
      <div className={styles.storyCopy}>
        <p className={styles.sectionEyebrow}>Nuestra historia</p>
        <h2 id="boda-story-title">{story.title}</h2>
        <p>{story.body}</p>
      </div>
      {story.image ? (
        <figure className={styles.storyMedia}>
          <Image src={story.image} alt={story.imageAlt ?? ""} fill sizes="(max-width: 700px) 74vw, 420px" />
        </figure>
      ) : null}
    </section>
  );
}
