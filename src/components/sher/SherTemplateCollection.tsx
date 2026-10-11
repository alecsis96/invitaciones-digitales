import { invitationCatalog } from "@/data/catalog";
import { SherTemplateCard } from "./SherTemplateCard";
import styles from "./SherHome.module.css";

const xvTemplates = invitationCatalog.filter((template) => template.category === "xv" && template.available);

export function SherTemplateCollection() {
  return (
    <section className={styles.collection} id="plantillas-destacadas" aria-labelledby="xv-collection-title">
      <div className={styles.collectionHeading}>
        <p className={styles.collectionKicker}>Plantillas destacadas</p>
        <h3 id="xv-collection-title">Diseños únicos, listos para personalizar</h3>
      </div>
      <div className={styles.templateGrid}>
        {xvTemplates.map((template) => <SherTemplateCard key={template.id} template={template} />)}
      </div>
    </section>
  );
}
