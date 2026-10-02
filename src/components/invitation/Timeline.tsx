import type { TimelineItem } from "@/types/invitation";
import { SectionTitle } from "./EventLocation";
export function Timeline({ items }: { items: TimelineItem[] }) {
  return <section className="timeline-section"><SectionTitle icon="▦" title="Itinerario" /><ol className="timeline">{items.map((item, index) => <li key={`${item.time}-${item.title}`}><span className="timeline-icon">{item.icon ?? "✦"}</span><time>{item.time}</time><strong>{item.title}</strong>{index < items.length - 1 && <i />}</li>)}</ol></section>;
}
