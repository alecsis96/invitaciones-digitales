import type { GiftRegistry as Gifts } from "@/types/invitation";
import { SectionTitle } from "./EventLocation";
export function GiftRegistry({ gifts }: { gifts?: Gifts }) { if (!gifts) return null; return <section className="detail-section gift-section"><SectionTitle icon="♢" title="Mesa de regalos" /><p>{gifts.text}</p><a href={gifts.url} target="_blank" rel="noreferrer" className="pill-button">♢&nbsp;&nbsp; {gifts.label ?? "Ver mesa de regalos"}</a></section>; }
