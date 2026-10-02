import type { EventFamily } from "@/types/invitation";

export function FamilyDetails({ family, parentsFallback }: { family?: EventFamily; parentsFallback?: string[] }) {
  const parents = (family?.parents ?? parentsFallback)?.filter(name => name.trim()) ?? [];
  const godparents = family?.godparents?.map(group => ({ role: group.role?.trim(), names: group.names.filter(name => name.trim()) })).filter(group => group.names.length) ?? [];

  if (!parents.length && !godparents.length) return null;

  return <>{parents.length ? <><i /><p className="parents">Con la bendición de mis padres<br /><strong>{parents.join(" & ")}</strong><br />te invito a celebrar<br />mis XV años.</p></> : null}{godparents.length ? <div className="godparents">{godparents.map((group, index) => <div key={`${group.role ?? "padrinos"}-${index}`}>{group.role ? <p>{group.role}</p> : null}<strong>{group.names.join(" & ")}</strong></div>)}</div> : null}</>;
}
