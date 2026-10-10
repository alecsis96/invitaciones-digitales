import Image from "next/image";
import Link from "next/link";
import type { invitationCatalog } from "@/data/catalog";
import styles from "./SherHome.module.css";

type CatalogTemplate = (typeof invitationCatalog)[number];

export function SherTemplateCard({ template }: { template: CatalogTemplate }) {
  return (
    <article className={styles.templateCard}>
      <div className={styles.templateCover}>
        <Image src={template.cover} alt={template.coverAlt} fill sizes="(min-width: 1080px) 360px, (min-width: 700px) calc((100vw - 108px) / 2), 42vw" />
      </div>
      <div className={styles.templateContent}>
        <p className={styles.templateCode}>{template.id.toUpperCase()}</p>
        <h4>{template.name}</h4>
        <p>{template.description}</p>
        <Link className={styles.templateAction} href={template.route}>
          Ver demo
          <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 5l5 5-5 5" /></svg>
        </Link>
      </div>
    </article>
  );
}
