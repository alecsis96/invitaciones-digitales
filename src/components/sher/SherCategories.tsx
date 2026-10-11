import Image from "next/image";
import Link from "next/link";
import { catalogCategories } from "@/data/catalog";
import styles from "./SherHome.module.css";

export function SherCategories() {
  return (
    <ul className={styles.categories} aria-label="Categorías de invitaciones">
      {catalogCategories.map((category) => {
        const content = (
          <>
            {category.cover ? <Image className={styles.categoryImage} src={category.cover} alt={category.coverAlt ?? ""} fill sizes="(min-width: 700px) 31vw, calc((100vw - 56px) / 3)" /> : <span className={styles.categoryFallback} aria-hidden="true">SHER</span>}
            <span className={styles.categoryShade} aria-hidden="true" />
            <div className={styles.categoryContent}>
              <span>{category.label}</span>
              <strong>{category.available ? "Disponible" : "Próximamente"}</strong>
            </div>
          </>
        );

        return (
          <li key={category.id} className={category.available ? styles.categoryAvailable : styles.categoryUpcoming}>
            {category.available ? <Link href="#plantillas-destacadas" aria-label={"Ver plantillas de " + category.label}>{content}</Link> : <div>{content}</div>}
          </li>
        );
      })}
    </ul>
  );
}
