import type { InvitationEvent } from "@/types/invitation";
import { FamilyDetails } from "@/components/invitation/FamilyDetails";

export function Intro({ event }: { event: InvitationEvent }) { return <section id="intro" className="intro"><span className="botanical top">❧</span><p className="eyebrow">Un momento</p><h2>Muy Especial</h2><i /><p className="intro-copy">{event.introText}</p><FamilyDetails family={event.family} parentsFallback={event.parents} /><span className="botanical bottom">❧</span></section>; }
