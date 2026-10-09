import Image from "next/image";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { TimelineItem } from "@/types/invitation";

const timelineIcons: Record<string, string> = { "Ceremonia religiosa": "icon-ceremony.svg", "Recepción": "icon-reception.svg", Cena: "icon-dinner.svg", Vals: "icon-waltz.svg", Baile: "icon-party.svg", "Fin del evento": "icon-party.svg" };

export function GardenTimeline({ itinerary = [] }: { itinerary?: TimelineItem[] }) {
  if (!itinerary.length) return null;
  return <section className="garden-timeline"><ScrollReveal className="garden-reveal garden-reveal-center"><header><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={28} height={28} aria-hidden="true" /><p>EL DÍA</p><h2>Momentos para recordar</h2><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={142} height={12} aria-hidden="true" /></header></ScrollReveal><ol>{itinerary.map((item, index) => <li key={`${item.time}-${item.title}`}><ScrollReveal className="garden-reveal garden-reveal-right"><time>{item.time}</time><i aria-hidden="true" /><Image src={`/images/xv-03/svg/${timelineIcons[item.title] ?? "icon-party.svg"}`} alt="" width={28} height={28} aria-hidden="true" /><strong>{item.title}</strong>{index === itinerary.length - 1 ? null : <span aria-hidden="true" />}</ScrollReveal></li>)}</ol></section>;
}
