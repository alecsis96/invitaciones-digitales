import type { DressCode as Dress } from "@/types/invitation";
import { SectionTitle } from "./EventLocation";

export function DressCode({ dressCode }: { dressCode?: Dress }) {
  const groups = dressCode?.groups?.filter(({ label, description }) => label?.trim() || description?.trim()) ?? [];
  const notes = dressCode?.notes?.filter(note => note.trim()) ?? [];
  const reservedColors = dressCode?.reservedColors?.filter(color => color.trim()) ?? [];
  const hasContent = dressCode?.style?.trim() || dressCode?.description?.trim() || groups.length || reservedColors.length || notes.length;

  if (!dressCode || !hasContent) return null;

  return <section className="detail-section"><SectionTitle icon="♧" title="Código de vestimenta" /><div className="dress-content"><div className="dress-illustration" aria-label="Vestido formal y traje formal"><i className="formal-dress" /><i className="formal-suit" /></div><div>{dressCode.style?.trim() && <h3>{dressCode.style}</h3>}{dressCode.description?.trim() && <p>{dressCode.description}</p>}{groups.length ? <div className="dress-groups">{groups.map((group, index) => <div key={`${group.label ?? "grupo"}-${index}`}>{group.label?.trim() && <strong>{group.label}</strong>}{group.description?.trim() && <p>{group.description}</p>}</div>)}</div> : null}{reservedColors.length ? <div className="reserved-colors" aria-label="Colores reservados">{reservedColors.map(color => <i key={color} style={{ backgroundColor: color }} />)}</div> : null}{notes.length ? <ul className="dress-notes">{notes.map((note, index) => <li key={`${note}-${index}`}>{note}</li>)}</ul> : null}</div></div></section>;
}
