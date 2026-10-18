import type { ReactNode } from "react";
import { invitationCatalog } from "@/data/catalog";
import { buildSherWhatsAppHref } from "@/lib/sher/contact";
import { SherDemoMusicVisibility } from "./SherDemoMusicVisibility";
import styles from "./SherTemplateDemo.module.css";

type TemplateId = (typeof invitationCatalog)[number]["id"];

// Opt in only from commercial demo routes, never from reusable invitations.
export function SherTemplateDemo({ templateId, children, demoActions }: { templateId: TemplateId; children: ReactNode; demoActions?: ReactNode }) {
  const template = invitationCatalog.find((entry) => entry.id === templateId && entry.available);
  if (!template) return <>{children}</>;

  const href = buildSherWhatsAppHref(`Hola, me interesa la plantilla ${template.id.toUpperCase()} · ${template.name} de SHER. ¿Cómo puedo solicitarla?`);
  const headingId = `${template.id}-commercial-demo-title`;
  const commercialId = `${template.id}-commercial-demo`;

  return (
    <div className={styles.page} data-sher-template-demo="">
      {children}
      <aside className={styles.commercial} id={commercialId} tabIndex={-1} aria-labelledby={headingId}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>DEMOSTRACIÓN · SHER</p>
          <h2 className={styles.heading} id={headingId}>¿Te gustaría esta invitación para tu celebración?</h2>
          <p className={styles.description}>Personalizamos esta plantilla con los datos y fotografías de tu evento</p>
          {href && <a className={styles.action} href={href} target="_blank" rel="noopener noreferrer">Solicitar esta plantilla</a>}
          {demoActions}
        </div>
      </aside>
      <SherDemoMusicVisibility commercialId={commercialId} />
    </div>
  );
}
