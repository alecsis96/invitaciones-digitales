import { catalogCategories } from "@/data/catalog";
import styles from "./SherHome.module.css";

export function SherCategories() {
  return (
    <ul className={styles.categories} aria-label="Categorías de invitaciones">
      {catalogCategories.map((category) => (
        <li key={category.id}>
          <span>{category.label}</span>
          <strong>{category.available ? "Disponible" : "Próximamente"}</strong>
        </li>
      ))}
    </ul>
  );
}
