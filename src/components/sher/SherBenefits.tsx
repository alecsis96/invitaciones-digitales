import styles from "./SherHome.module.css";

const benefits = [
  { label: "Diseño editorial", icon: <path d="M5 4h10v12H5zM8 7h4M8 10h4M8 13h2" /> },
  { label: "Experiencias interactivas", icon: <><circle cx="10" cy="10" r="6" /><path d="m9 7 4 3-4 3z" /></> },
  { label: "Listas para compartir", icon: <><path d="M6 5h8v10H6z" /><path d="m8 3 2-2 2 2M8 13l2 2 2-2" /></> },
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
