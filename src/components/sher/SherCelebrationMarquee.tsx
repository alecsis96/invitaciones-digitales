import styles from "./SherHome.module.css";

const celebrations = ["XV años", "Aniversarios", "Cumpleaños", "Bodas", "Bautizos", "Graduaciones"] as const;
const accessibleCelebrations = celebrations.join(" ✦ ");

function CelebrationCopy() {
  return (
    <p className={styles.celebrationMarqueeCopy}>
      {celebrations.map((celebration) => (
        <span key={celebration} className={styles.celebrationMarqueeItem}>
          {celebration}
          <span className={styles.celebrationMarqueeSeparator} aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </p>
  );
}

export function SherCelebrationMarquee() {
  return (
    <section className={styles.celebrationMarquee} aria-label="Celebraciones">
      <p className={styles.celebrationMarqueeAccessible}>{accessibleCelebrations}</p>
      <div className={styles.celebrationMarqueeViewport} aria-hidden="true">
        <div className={styles.celebrationMarqueeTrack}>
          {Array.from({ length: 4 }, (_, index) => (
            <CelebrationCopy key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
