"use client";

import Image from "next/image";
import { AddToCalendar } from "@/components/invitation/AddToCalendar";
import { Countdown } from "@/components/invitation/Countdown";
import { EventMusic } from "@/components/invitation/EventMusic";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { normalizeFamily } from "@/lib/invitation/family";
import type { InvitationEvent, ReservedColor } from "@/types/invitation";
import { GardenOpening } from "./GardenOpening";
import { GardenPhotoInterlude } from "./GardenPhotoInterlude";
import { GardenRsvpForm } from "./GardenRsvpForm";
import { GardenTimeline } from "./GardenTimeline";

const photoAlt = "Raquel con vestido verde esmeralda en el jardín";
const colorName = (color: ReservedColor) => typeof color === "string" ? color : color.label ?? color.value;
const colorValue = (color: ReservedColor) => typeof color === "string" ? color : color.value;

export function XVGardenInvitation({ event }: { event: InvitationEvent }) {
  const photos = [
    { image: event.gardenPhotos?.first, alignment: "left" as const },
    { image: event.gardenPhotos?.second, alignment: "right" as const },
    { image: event.gardenPhotos?.portrait, alignment: "full" as const }
  ];
  return <main className="garden-03">
    <GardenOpening openingExperience={event.openingExperience} music={event.music} name={event.honoreeName} displayDate={event.displayDate} storageKey={`garden-opening:${event.eventLabel}-${event.honoreeName}-${event.date}`} />
    <EventMusic music={event.music} className="garden-music" />
    <GardenHero event={event} />
    <GardenMessage text={event.introText} />
    {event.inspiration ? <GardenInspiration text={event.inspiration.text} reference={event.inspiration.reference} /> : null}
    <GardenFamily event={event} />
    <GardenReveal variant="photo"><GardenPhotoInterlude image={photos[0].image} alt={photoAlt} alignment={photos[0].alignment} deckled /></GardenReveal>
    <GardenDate event={event} />
    <GardenLocations event={event} />
    <GardenReveal variant="photo"><GardenPhotoInterlude image={photos[1].image} alt={photoAlt} alignment={photos[1].alignment} deckled /></GardenReveal>
    <GardenTimeline itinerary={event.itinerary} />
    {event.dressCode ? <GardenDressCode dressCode={event.dressCode} /> : null}
    {event.giftRegistry ? <GardenGifts event={event} /> : null}
    {event.guestPass ? <GardenGuestPass guestPass={event.guestPass} /> : null}
    {event.policies?.length ? <GardenPolicies policies={event.policies} /> : null}
    <GardenReveal variant="photo"><GardenPhotoInterlude image={photos[2].image} alt={photoAlt} alignment={photos[2].alignment} deckled /></GardenReveal>
    <GardenRsvpForm name={event.honoreeName} phone={event.rsvp.phone} />
    <GardenClosing name={event.honoreeName} />
  </main>;
}

function GardenReveal({ children, variant = "left" }: { children: React.ReactNode; variant?: "left" | "right" | "center" | "photo" }) { return <ScrollReveal className={`garden-reveal garden-reveal-${variant}`}>{children}</ScrollReveal>; }

function GardenHero({ event }: { event: InvitationEvent }) {
  return <section className="garden-hero">{event.heroImage ? <Image src={event.heroImage} alt={event.heroImageAlt ?? ""} fill priority sizes="100vw" /> : null}<div><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={31} height={31} aria-hidden="true" /><p>{event.eventLabel}</p><h1>{event.honoreeName}</h1><time>{event.displayDate}</time><span>Un jardín de sueños, un día para recordar.</span></div></section>;
}
function GardenMessage({ text }: { text: string }) { return <section className="garden-message"><GardenReveal variant="center"><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={29} height={29} aria-hidden="true" /><p>UNA INVITACIÓN ESPECIAL</p><h2>Un día para compartir</h2><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={142} height={12} aria-hidden="true" /><span>{text}</span></GardenReveal></section>; }
function GardenInspiration({ text, reference }: { text: string; reference?: string }) { return <section className="garden-inspiration"><Image className="garden-section-floral garden-inspiration-floral" src="/images/xv-03/svg/floral-asset-square.svg" alt="" fill sizes="110px" aria-hidden="true" /><GardenReveal variant="center"><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={31} height={31} aria-hidden="true" /><blockquote>“{text}”</blockquote><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={132} height={12} aria-hidden="true" />{reference ? <cite>{reference}</cite> : null}</GardenReveal></section>; }
function GardenFamily({ event }: { event: InvitationEvent }) {
  const { parents, godparents } = normalizeFamily(event.family, event.parents);
  if (!parents.length && !godparents.length) return null;
  return <section className="garden-family">{parents.length ? <GardenReveal variant="left"><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={29} height={29} aria-hidden="true" /><p>Mis padres</p>{parents.map(name => <strong key={name}>{name}</strong>)}<Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={126} height={12} aria-hidden="true" /></GardenReveal> : null}{godparents.length ? <GardenReveal variant="right">{godparents.map((group, index) => <section key={`${group.role ?? "padrinos"}-${index}`}><p>{group.role ?? "Mis padrinos"}</p>{group.names.map(name => <strong key={name}>{name}</strong>)}</section>)}</GardenReveal> : null}</section>;
}
function GardenDate({ event }: { event: InvitationEvent }) {
  const date = new Date(event.date);
  return <section className="garden-date"><GardenReveal variant="center"><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={28} height={28} aria-hidden="true" /><p>GUARDA LA FECHA</p><div className="garden-date-display"><strong>{String(date.getDate()).padStart(2, "0")}</strong><span>{date.toLocaleDateString("es-MX", { month: "long" }).toUpperCase()}<br />{date.getFullYear()}</span></div></GardenReveal><GardenReveal variant="center"><Countdown date={event.date} /></GardenReveal>{event.calendar ? <GardenReveal variant="center"><AddToCalendar calendar={event.calendar} compact mode="google-only" /></GardenReveal> : null}</section>;
}
function GardenLocations({ event }: { event: InvitationEvent }) {
  const locations = [event.ceremony, event.reception].filter((location): location is NonNullable<typeof location> => Boolean(location));
  if (!locations.length) return null;
  return <section className="garden-locations"><GardenReveal variant="center"><header><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={29} height={29} aria-hidden="true" /><p>UBICACIONES</p><h2>Donde florece la celebración</h2><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={142} height={12} aria-hidden="true" /></header></GardenReveal><div>{locations.map((location, index) => <article key={location.label}>{location.image ? <GardenReveal variant="photo"><div className="garden-location-image"><Image src={location.image} alt={location.imageAlt ?? location.venue} fill sizes="(max-width: 700px) 100vw, 500px" /></div></GardenReveal> : <div className="garden-location-fallback" aria-hidden="true">✦</div>}<GardenReveal variant={index % 2 ? "right" : "left"}><div className="garden-location-content"><p>{location.label}</p><h3>{location.venue}</h3><span>{location.address}</span><a href={location.mapUrl} target="_blank" rel="noreferrer">Ver en Maps</a></div></GardenReveal></article>)}</div></section>;
}
function GardenDressCode({ dressCode }: { dressCode: NonNullable<InvitationEvent["dressCode"]> }) {
  const groups = dressCode.groups?.filter(group => group.label || group.description) ?? [];
  return <section className="garden-dress"><GardenReveal variant="center"><header><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={29} height={29} aria-hidden="true" /><p>CÓDIGO DE VESTIMENTA</p><h2>{dressCode.style}</h2><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={142} height={12} aria-hidden="true" /></header></GardenReveal>{groups.length ? <GardenReveal variant="center"><div className="garden-dress-groups">{groups.map(group => <article key={`${group.label}-${group.description}`}><Image src={`/images/xv-03/svg/${group.label === "Ellas" ? "dress-women.svg" : "dress-men.svg"}`} alt="" width={38} height={48} aria-hidden="true" /><strong>{group.label}</strong><span>{group.description}</span></article>)}</div></GardenReveal> : null}{dressCode.suggestedColors?.length ? <GardenReveal variant="left"><section className="garden-palette"><p>Paleta sugerida</p><ul>{dressCode.suggestedColors.map(color => <li key={colorValue(color)}><i style={{ background: colorValue(color) }} /><span>{colorName(color)}</span></li>)}</ul></section></GardenReveal> : null}{dressCode.reservedColors?.length ? <GardenReveal variant="right"><section className="garden-reserved"><p>Color reservado</p>{dressCode.reservedColors.map(color => <div key={colorValue(color)}><i style={{ background: colorValue(color) }} /><strong>{colorName(color)}</strong></div>)}{dressCode.notes?.map(note => <span key={note}>{note}</span>)}</section></GardenReveal> : null}</section>;
}
function GardenGifts({ event }: { event: InvitationEvent }) { const registry = event.giftRegistry; return <section className="garden-gifts"><GardenReveal variant="center"><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={29} height={29} aria-hidden="true" /><p>REGALOS</p><h2>{registry?.title ?? "Un detalle especial"}</h2><span>{registry?.description}</span></GardenReveal><div className="garden-gifts-options"><GardenReveal variant="left"><article><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={31} height={31} aria-hidden="true" /><strong>Mesa de regalos</strong><small>{registry?.url ? "Consulta las opciones seleccionadas para este día." : "Un ejemplo de las opciones que podrás compartir aquí."}</small>{registry?.url ? <a href={registry.url} target="_blank" rel="noreferrer">{registry.buttonLabel ?? "Ver mesa de regalos"}</a> : <button type="button" aria-disabled="true">Ver ejemplo</button>}</article></GardenReveal><GardenReveal variant="right"><article><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={44} height={20} aria-hidden="true" /><strong>Lluvia de sobres</strong><small>Tu presencia es nuestro mejor regalo; si deseas tener un detalle, habrá lluvia de sobres durante la recepción.</small><button type="button" aria-disabled="true">Ver ejemplo</button></article></GardenReveal></div></section>; }
function GardenGuestPass({ guestPass }: { guestPass: NonNullable<InvitationEvent["guestPass"]> }) { return <section className="garden-pass"><GardenReveal variant="center"><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={29} height={29} aria-hidden="true" /><p>PASE PARA INVITADOS</p><span className="garden-pass-valid">Pase válido para</span><strong>{guestPass.quantity}</strong><span className="garden-pass-quantity-label">{guestPass.quantity === 1 ? "persona" : "personas"}</span><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={130} height={12} aria-hidden="true" /><span className="garden-pass-message">{guestPass.message}</span></GardenReveal></section>; }
function GardenPolicies({ policies }: { policies: NonNullable<InvitationEvent["policies"]> }) { return <section className="garden-policies"><GardenReveal variant="center"><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={29} height={29} aria-hidden="true" /><p>PARA DISFRUTAR EL DÍA</p></GardenReveal><ul>{policies.slice(0, 3).map(policy => <li key={policy.text}><i aria-hidden="true">{policy.icon ?? "✦"}</i><span>{policy.text}</span></li>)}</ul></section>; }
function GardenClosing({ name }: { name: string }) { return <section className="garden-closing"><GardenReveal variant="center"><div><span>Gracias por ser parte<br />de este sueño</span><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={142} height={12} aria-hidden="true" /><p>{name}</p><h2>Mis XV</h2><Image src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={34} height={34} aria-hidden="true" /></div></GardenReveal></section>; }
