import styles from "./SherHome.module.css";

const benefits = [
  { label: "100% digital y fácil de compartir", icon: <><rect x="6" y="3" width="8" height="14" rx="1.5" /><path d="M8.5 5h3M9 15h2" /></> },
  { label: "Diseños elegantes y personalizables", icon: <><path d="m5 15 8-8 2 2-8 8H5zM12 6l1.5-1.5L16 7l-1.5 1.5" /></> },
  { label: "Videos creados con IA", icon: <><circle cx="10" cy="10" r="6.5" /><path d="m9 7 4 3-4 3z" /></> },
  { label: "Para XV años, bodas, infantiles y más", icon: <><path d="M10 16.5s-6-3.7-6-7.6A3.2 3.2 0 0 1 10 7a3.2 3.2 0 0 1 6 1.9c0 3.9-6 7.6-6 7.6Z" /></> },
] as const;

export function SherBenefits() {
  return (
    <section className={styles.benefits} aria-label="Beneficios de SHER">
      <ul>
        {benefits.map(({ label, icon }) => (
          <li key={label}>
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">{icon}</svg>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
