import Image from "next/image";
import type { EventLocation as Location } from "@/types/invitation";

export function EventLocation({ location }: { location: Location }) {
  return <section className="location-section"><SectionTitle icon="⌂" title={location.label} /><article className="location-card">
    {location.image && <Image className="location-image" src={location.image} alt={location.imageAlt ?? ""} width={600} height={700} />}
    <div className="location-copy"><time>{location.time}</time><h3>{location.venue}</h3><p>{location.address}</p><a className="pill-button" href={location.mapUrl} target="_blank" rel="noreferrer">⌖&nbsp;&nbsp; Ver en mapa</a></div>
  </article></section>;
}
export function SectionTitle({ icon, title }: { icon: string; title: string }) { return <header className="section-title"><span aria-hidden="true">{icon}</span><h2>{title}</h2><i /></header>; }
