import Image from "next/image";
import { catalogCategories } from "@/data/catalog";
import styles from "./SherHome.module.css";

export function SherCategories() {
  return (
    <ul className={styles.categories} aria-label="Categorías de invitaciones">
      {catalogCategories.map((category) => (
        <li key={category.id} className={category.available ? styles.categoryAvailable : styles.categoryUpcoming}>
          {"cover" in category ? (
            <Image className={styles.categoryImage} src={category.cover} alt={category.coverAlt} fill sizes="(min-width: 700px) 31vw, calc((100vw - 64px) / 3)" />
          ) : (
            <Image className={styles.categoryMonogram} src="/brand/monogram-gold.svg" alt="" aria-hidden="true" width={44} height={44} />
          )}
          <div className={styles.categoryContent}>
            <span>{category.label}</span>
            <strong>{category.available ? "Disponible" : "Próximamente"}</strong>
          </div>
        </li>
      ))}
    </ul>
  );
}
