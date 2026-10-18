import { invitationCatalog } from "@/data/catalog";
import { SherTemplateCard } from "./SherTemplateCard";
import styles from "./SherHome.module.css";

const availableTemplates = invitationCatalog.filter((template) => template.available);

export function SherTemplateCollection() {
  return (
    <section className={styles.collection} id="plantillas-destacadas" aria-labelledby="template-collection-title">
      <div className={styles.collectionHeading}>
        <p className={styles.collectionKicker}>Plantillas destacadas</p>
        <h3 id="template-collection-title">Diseños hechos para sentirse tuyos.</h3>
      </div>
      <div className={styles.templateGrid} role="region" aria-label="Plantillas destacadas; desliza horizontalmente para ver más opciones">
        {availableTemplates.map((template) => <SherTemplateCard key={template.id} template={template} />)}
      </div>
    </section>
  );
}
