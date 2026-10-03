"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AddToCalendar } from "@/components/invitation/AddToCalendar";
import { Countdown } from "@/components/invitation/Countdown";
import { EventMusic } from "@/components/invitation/EventMusic";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { GalleryPhoto, InvitationEvent, ReservedColor } from "@/types/invitation";

export function XVGlamInvitation({ event }: { event: InvitationEvent }) {
  return (
    <main className="glam-02">
      <GlamOpening event={event} />
      <EventMusic music={event.music} className="glam-music" />
      <GlamHero event={event} />
      <ScrollReveal className="glam-reveal"><GlamDate event={event} /></ScrollReveal>
      <ScrollReveal className="glam-reveal"><GlamAgenda event={event} /></ScrollReveal>
      <ScrollReveal className="glam-reveal"><GlamLocations event={event} /></ScrollReveal>
      <ScrollReveal className="glam-reveal"><GlamGallery photos={event.gallery ?? []} /></ScrollReveal>
      <ScrollReveal className="glam-reveal"><GlamDress dress={event.dressCode} /></ScrollReveal>
      {event.giftRegistry && <ScrollReveal className="glam-reveal"><GlamGifts event={event} /></ScrollReveal>}
      <ScrollReveal className="glam-reveal"><GlamRSVP event={event} /></ScrollReveal>
      <GlamClosing event={event} />
    </main>
  );
}

function GlamOpening({ event }: { event: InvitationEvent }) {
  const [visible, setVisible] = useState(() => Boolean(event.openingExperience?.enabled && event.openingExperience.type === "cinematic-reveal"));
  const [opening, setOpening] = useState(false);
  const key = `glam-opening:${event.eventLabel}-${event.honoreeName}-${event.date}`;

  useEffect(() => {
    if (sessionStorage.getItem(key)) setVisible(false);
  }, [event.openingExperience, key]);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [visible]);

  if (!visible) return null;
  const reveal = () => {
    if (event.openingExperience?.playMusicOnOpen && event.music?.src && event.music.enabled !== false) window.dispatchEvent(new Event("invitation:play-music"));
    sessionStorage.setItem(key, "done");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setVisible(false);
    setOpening(true);
    window.setTimeout(() => setVisible(false), 1350);
  };

  return <section className={`glam-opening ${opening ? "is-opening" : ""}`} style={{ backgroundImage: `url(${event.heroImage})` }}>
    <button onClick={reveal} aria-label={event.openingExperience?.prompt ?? "Toca para descubrir"}>
      <b>XV</b><time>{event.displayDate}</time><span>{event.openingExperience?.prompt ?? "Toca para descubrir"}</span>
    </button>
  </section>;
}

function GlamHero({ event }: { event: InvitationEvent }) {
  return <section className="glam-hero" style={{ backgroundImage: `linear-gradient(0deg,rgba(8,13,28,.96),rgba(8,13,28,.14)),url(${event.heroImage})` }}>
    <div><p>MIS XV</p><h1>{event.honoreeName}</h1><strong>Glam Nocturna</strong><span>Hay momentos en la vida que se convierten en para siempre.</span></div>
  </section>;
}

function GlamDate({ event }: { event: InvitationEvent }) {
  const date = new Date(event.date);
  return <section className="glam-date">
    <div className="glam-date-display"><strong>{String(date.getDate()).padStart(2, "0")}</strong><p>{date.toLocaleDateString("es-MX", { month: "long" }).toUpperCase()}<br />{date.getFullYear()}</p></div>
    <Countdown date={event.date} />
    {event.calendar && <GlamCalendarAction calendar={event.calendar} />}
  </section>;
}

function GlamCalendarAction({ calendar }: { calendar: NonNullable<InvitationEvent["calendar"]> }) {
  const [expanded, setExpanded] = useState(false);
  return <div className="glam-calendar"><button type="button" aria-expanded={expanded} onClick={() => setExpanded(current => !current)}>Agregar al calendario</button>{expanded && <AddToCalendar calendar={calendar} compact />}</div>;
}

function GlamAgenda({ event }: { event: InvitationEvent }) {
  return <section className="glam-agenda"><p>LA NOCHE</p><h2>Agenda nocturna</h2><div className="glam-agenda-grid">
    {event.itinerary?.map((item, index) => <article key={`${item.time}-${item.title}`} className={`glam-agenda-moment glam-agenda-moment-${index + 1}`}>
      {item.image ? <div className="glam-agenda-media" aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, 600px" /></div> : null}
      <div className="glam-agenda-content"><time>{item.time}</time><strong>{item.title}</strong></div>
    </article>)}
  </div></section>;
}

function GlamLocations({ event }: { event: InvitationEvent }) {
  const locations = [event.ceremony, event.reception].filter((location): location is NonNullable<typeof location> => Boolean(location));
  return <section className="glam-locations"><p>UBICACIONES</p><h2>Donde comienza la noche</h2><div>
    {locations.map(location => <article key={location.label}>
      <div className="glam-location-media">{location.image ? <Image src={location.image} alt={location.imageAlt ?? location.venue} fill sizes="(max-width:700px) 100vw, 50vw" /> : <GlamLocationFallback />}</div>
      <div className="glam-location-content"><p>{location.label}</p><time>{location.time}</time><h3>{location.venue}</h3><span>{location.address}</span><a href={location.mapUrl} target="_blank" rel="noreferrer">Ver en Maps</a></div>
    </article>)}
  </div></section>;
}

function GlamGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  if (!photos.length) return null;
  const move = (delta: number) => setActive(current => (current + delta + photos.length) % photos.length);
  const prev = (active - 1 + photos.length) % photos.length;
  const next = (active + 1) % photos.length;
  return <section className="glam-gallery"><p>RECUERDOS</p><h2>Un poco de mi historia</h2>
    <div className="glam-carousel" onPointerDown={event => { startX.current = event.clientX; }} onPointerUp={event => { if (startX.current === null) return; const delta = event.clientX - startX.current; startX.current = null; if (Math.abs(delta) > 36) move(delta < 0 ? 1 : -1); }}>
      <div className="glam-preview"><Image src={photos[prev].src} alt="" fill sizes="20vw" /></div>
      <div className="glam-main-photo"><Image src={photos[active].src} alt={photos[active].alt} fill sizes="(max-width:700px) 72vw, 520px" priority={active === 0} /></div>
      <div className="glam-preview"><Image src={photos[next].src} alt="" fill sizes="20vw" /></div>
      {photos.length > 1 && <><button className="glam-gallery-prev" aria-label="Foto anterior" onClick={() => move(-1)}>‹</button><button className="glam-gallery-next" aria-label="Foto siguiente" onClick={() => move(1)}>›</button></>}
    </div>
    {photos.length > 1 && <div className="glam-dots">{photos.map((_, index) => <button key={index} aria-label={`Ver foto ${index + 1}`} className={index === active ? "active" : ""} onClick={() => setActive(index)} />)}</div>}
  </section>;
}

function colorName(color: ReservedColor) { return typeof color === "string" ? color : color.label ?? color.value; }
function colorValue(color: ReservedColor) { return typeof color === "string" ? color : color.value; }
function GlamDress({ dress }: { dress?: InvitationEvent["dressCode"] }) {
  if (!dress) return null;
  const groups = dress.groups?.filter(group => group.label || group.description) ?? [];
  return <section className="glam-dress">
    <header className="glam-fashion-header"><p className="glam-fashion-eyebrow">Fashion Note</p><h2>{dress.style}</h2><p className="glam-fashion-caption">Etiqueta formal · tonos sugeridos para la noche</p></header>
    {groups.length ? <div className="glam-fashion-roles">{groups.map(group => <article key={`${group.label}-${group.description}`} className="glam-fashion-role-card"><span className="glam-fashion-role-label">{group.label}</span><p className="glam-fashion-role-description">{group.description}</p></article>)}</div> : null}
    {dress.suggestedColors?.length ? <section className="glam-fashion-palette" aria-label="Paleta sugerida"><h3>Paleta sugerida</h3><ul>{dress.suggestedColors.map(color => <li key={colorValue(color)}><i className="glam-palette-swatch" style={{ background: colorValue(color) }} /><span className="glam-palette-name">{colorName(color)}</span></li>)}</ul></section> : null}
    {dress.reservedColors?.length ? <section className="glam-fashion-reserved" aria-label="Color reservado para la quinceañera"><h3>Color reservado para la quinceañera</h3><ul>{dress.reservedColors.map(color => <li key={colorValue(color)}><i className="glam-reserved-swatch" style={{ background: colorValue(color) }} /><span className="glam-reserved-name">{colorName(color)}</span></li>)}</ul></section> : null}
  </section>;
}

function GlamGifts({ event }: { event: InvitationEvent }) {
  const [selected, setSelected] = useState<"registry" | "envelopes" | null>(null);
  const choose = (option: "registry" | "envelopes") => setSelected(current => current === option ? null : option);
  return <section className="glam-gifts"><p>DETALLES</p><h2>{event.giftRegistry?.title ?? "Un detalle especial"}</h2><span>{event.giftRegistry?.description}</span><div><button aria-expanded={selected === "registry"} onClick={() => choose("registry")}>Mesa de regalos</button><button aria-expanded={selected === "envelopes"} onClick={() => choose("envelopes")}>Lluvia de sobres</button></div>{selected && <small>{selected === "registry" ? "Consulta aquí las opciones de mesa de regalos seleccionadas para el evento." : "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle, contaremos con lluvia de sobres durante la recepción."}</small>}</section>;
}

function GlamLocationFallback() { return <span className="glam-location-fallback" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M24 42s13-12 13-23a13 13 0 1 0-26 0c0 11 13 23 13 23Z" fill="none" stroke="currentColor" strokeWidth="1.5" /><circle cx="24" cy="19" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></span>; }

function GlamRSVP({ event }: { event: InvitationEvent }) {
  const href = `https://wa.me/${event.rsvp.phone.replace(/\D/g, "")}?text=${encodeURIComponent(event.rsvp.message)}`;
  return <section className="glam-rsvp" style={{ backgroundImage: `linear-gradient(0deg,rgba(5,10,23,.96),rgba(5,10,23,.38)),url(${event.closingImage ?? event.heroImage})` }}><p>CONFIRMA</p><h2>TU ASISTENCIA</h2><span>Será un gusto compartir este día contigo.</span><a href={href} target="_blank" rel="noreferrer">Confirmar en WhatsApp</a></section>;
}

function GlamClosing({ event }: { event: InvitationEvent }) { return <section className="glam-closing" style={{ backgroundImage: `linear-gradient(0deg,rgba(8,13,28,.88),rgba(8,13,28,.2)),url(${event.closingImage ?? event.heroImage})` }}><h2>Nos vemos en mis XV</h2><p>Gracias por ser parte de esta noche tan especial.</p></section>; }
