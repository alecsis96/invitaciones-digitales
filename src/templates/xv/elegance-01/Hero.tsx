import Image from "next/image";
import type { InvitationEvent } from "@/types/invitation";
export function Hero({ event }: { event: InvitationEvent }) { return <section className="hero">{event.heroImage && <Image src={event.heroImage} alt={event.heroImageAlt ?? ""} fill priority sizes="100vw" /> }<div className="hero-shade" /><div className="hero-copy"><p>{event.eventLabel}</p><h1>{event.honoreeName}</h1><time>{event.displayDate}</time><a href="#intro" className="scroll-cue">Desliza para descubrir <i>⌄</i></a></div></section>; }
