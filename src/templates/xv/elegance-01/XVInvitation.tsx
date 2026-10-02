import type { InvitationEvent } from "@/types/invitation";
import { Countdown } from "@/components/invitation/Countdown";
import { DressCode } from "@/components/invitation/DressCode";
import { EventLocation, SectionTitle } from "@/components/invitation/EventLocation";
import { Gallery } from "@/components/invitation/Gallery";
import { GiftRegistry } from "@/components/invitation/GiftRegistry";
import { RSVP } from "@/components/invitation/RSVP";
import { Timeline } from "@/components/invitation/Timeline";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Hero } from "./Hero";
import { Intro } from "./Intro";

export function XVInvitation({ event }: { event: InvitationEvent }) { return <main className="xv-01"><Hero event={event} /><ScrollReveal className="reveal-intro"><Intro event={event} /></ScrollReveal><ScrollReveal className="reveal-countdown"><section className="countdown-section"><SectionTitle icon="◇" title="Cuenta regresiva" /><Countdown date={event.date} /></section></ScrollReveal>{event.ceremony && <ScrollReveal className="reveal-location reveal-ceremony"><EventLocation location={event.ceremony} /></ScrollReveal>}{event.reception && <ScrollReveal className="reveal-location reveal-reception"><EventLocation location={event.reception} /></ScrollReveal>}{event.itinerary?.length ? <ScrollReveal className="reveal-timeline"><Timeline items={event.itinerary} /></ScrollReveal> : null}<ScrollReveal className="reveal-gallery"><Gallery photos={event.gallery} /></ScrollReveal><ScrollReveal className="reveal-dress"><DressCode dressCode={event.dressCode} /></ScrollReveal><ScrollReveal className="reveal-gifts"><GiftRegistry giftRegistry={event.giftRegistry} /></ScrollReveal><ScrollReveal className="reveal-rsvp"><RSVP rsvp={event.rsvp} /></ScrollReveal><ScrollReveal className="reveal-closing"><Closing event={event} /></ScrollReveal></main>; }
function Closing({ event }: { event: InvitationEvent }) { return <section className={`closing ${event.closingImage ? "has-image" : ""}`} style={event.closingImage ? { backgroundImage: `url(${event.closingImage})` } : undefined}><div><span>Gracias</span><p>por ser parte<br />de este momento<br />tan especial.</p><b>♥</b></div></section>; }
