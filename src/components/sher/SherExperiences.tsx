import styles from "./SherHome.module.css";
import { SherExperienceShowcase } from "./SherExperienceShowcase";

export function SherExperiences() {
  return (
    <section className={`${styles.commercialSection} ${styles.experiencesSection}`} aria-labelledby="experiences-title">
      <SherExperienceShowcase />
    </section>
  );
}
