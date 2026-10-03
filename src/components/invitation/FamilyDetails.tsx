import type { EventFamily } from "@/types/invitation";
import { normalizeFamily } from "@/lib/invitation/family";

export function FamilyDetails({ family, parentsFallback }: { family?: EventFamily; parentsFallback?: string[] }) {
  const { parents, godparents } = normalizeFamily(family, parentsFallback);

  if (!parents.length && !godparents.length) return null;

  return <>{parents.length ? <><i /><p className="parents">Con la bendición de mis padres<br /><strong>{parents.join(" & ")}</strong><br />te invito a celebrar<br />mis XV años.</p></> : null}{godparents.length ? <div className="godparents">{godparents.map((group, index) => <div key={`${group.role ?? "padrinos"}-${index}`}>{group.role ? <p>{group.role}</p> : null}<strong>{group.names.join(" & ")}</strong></div>)}</div> : null}</>;
}
