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
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const key = `glam-opening:${event.eventLabel}-${event.honoreeName}-${event.date}`;

  useEffect(() => {
    if (event.openingExperience?.enabled && event.openingExperience.type === "cinematic-reveal" && !sessionStorage.getItem(key)) setVisible(true);
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
    {event.calendar && <AddToCalendar calendar={event.calendar} compact />}
  </section>;
}

function GlamAgenda({ event }: { event: InvitationEvent }) {
  return <section className="glam-agenda"><p>LA NOCHE</p><h2>Agenda nocturna</h2><div className="glam-agenda-grid">
    {event.itinerary?.map((item, index) => <article key={`${item.time}-${item.title}`} className={`glam-agenda-moment glam-agenda-moment-${index + 1}`}>
      <GlamAgendaIcon name={item.icon} /><div><time>{item.time}</time><strong>{item.title}</strong></div>
    </article>)}
  </div></section>;
}

function GlamAgendaIcon({ name }: { name?: string }) {
  const shared = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "church": return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...shared} d="M8 40h32M12 40V22l12-10 12 10v18M20 40V29h8v11M24 7v10M20 12h8" /><path {...shared} d="M9 22h30" /></svg>;
    case "toast": return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...shared} d="M13 10h10l-2 21a5 5 0 0 1-10 0L9 10h4Z M25 10h10l-2 21a5 5 0 0 1-10 0l-2-21h4Z" /><path {...shared} d="m10 6 29 36M24 40h7" /></svg>;
    case "crown": return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...shared} d="m8 15 8 8 8-14 8 14 8-8-4 22H12L8 15Z M12 41h24" /></svg>;
    case "dance": return <svg viewBox="0 0 48 48" aria-hidden="true"><circle {...shared} cx="18" cy="10" r="4" /><circle {...shared} cx="32" cy="12" r="4" /><path {...shared} d="m18 14 5 9 8-5m-8 5-7 6-3 10m10-16 8 8 7 3m-7-3-3 10m-13-3h8m7 3h8" /></svg>;
    case "dinner": return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...shared} d="M11 7v14m-5-14v8c0 3 2 6 5 6s5-3 5-6V7m-5 14v20M31 7v34m0-34c6 4 7 13 0 17" /></svg>;
    case "disco": return <svg viewBox="0 0 48 48" aria-hidden="true"><circle {...shared} cx="24" cy="25" r="13" /><path {...shared} d="m15 16 18 18m0-18L15 34M24 12v26M11 25h26M24 4v4m0 34v2M5 9l3 3m32 24 3 3M43 9l-3 3M8 39l-3 3" /></svg>;
    default: return <svg viewBox="0 0 48 48" aria-hidden="true"><path {...shared} d="m24 6 4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z" /></svg>;
  }
}

function GlamLocations({ event }: { event: InvitationEvent }) {
  const locations = [event.ceremony, event.reception].filter((location): location is NonNullable<typeof location> => Boolean(location));
  return <section className="glam-locations"><p>UBICACIONES</p><h2>Donde comienza la noche</h2><div>
    {locations.map(location => <article key={location.label}>
      <div className="glam-location-media">{location.image ? <Image src={location.image} alt={location.imageAlt ?? location.venue} fill sizes="(max-width:700px) 100vw, 50vw" /> : <span>✦</span>}</div>
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
    {photos.length > 1 && <><div className="glam-dots">{photos.map((_, index) => <button key={index} aria-label={`Ver foto ${index + 1}`} className={index === active ? "active" : ""} onClick={() => setActive(index)} />)}</div><div className="glam-thumbnails">{photos.map((photo, index) => <button key={photo.src} className={index === active ? "active" : ""} aria-label={`Seleccionar foto ${index + 1}`} onClick={() => setActive(index)}><Image src={photo.src} alt="" fill sizes="72px" /></button>)}</div></>}
  </section>;
}

function colorName(color: ReservedColor) { return typeof color === "string" ? color : color.label ?? color.value; }
function colorValue(color: ReservedColor) { return typeof color === "string" ? color : color.value; }
function GlamDress({ dress }: { dress?: InvitationEvent["dressCode"] }) {
  if (!dress) return null;
  return <section className="glam-dress"><p>FASHION NOTE</p><h2>{dress.style}</h2><div className="glam-fashion-instructions">{dress.groups?.map(group => <p key={group.label}><b>{group.label}</b><span>{group.description}</span></p>)}</div>
    {dress.suggestedColors?.length ? <div className="glam-palette"><strong>Paleta sugerida</strong><div>{dress.suggestedColors.map(color => <span key={colorValue(color)}><i style={{ background: colorValue(color) }} />{colorName(color)}</span>)}</div></div> : null}
    {dress.reservedColors?.length ? <div className="glam-reserved"><strong>Color reservado para la quinceañera</strong><div>{dress.reservedColors.map(color => <span key={colorValue(color)}><i style={{ background: colorValue(color) }} />{colorName(color)}</span>)}</div></div> : null}
  </section>;
}

function GlamGifts({ event }: { event: InvitationEvent }) {
  const [selected, setSelected] = useState<"registry" | "envelopes" | null>(null);
  return <section className="glam-gifts"><p>DETALLES</p><h2>{event.giftRegistry?.title ?? "Un detalle especial"}</h2><span>{event.giftRegistry?.description}</span><div><button onClick={() => setSelected("registry")}>Mesa de regalos · Demo</button><button onClick={() => setSelected("envelopes")}>Lluvia de sobres · Demo</button></div>{selected && <small>{selected === "registry" ? "Demo: esta sección puede enlazar a Liverpool, Amazon u otra mesa de regalos." : "Tu presencia es nuestro mejor regalo. Si deseas tener un detalle, tendremos lluvia de sobres durante la recepción."}</small>}</section>;
}

function GlamRSVP({ event }: { event: InvitationEvent }) {
  const href = `https://wa.me/${event.rsvp.phone.replace(/\D/g, "")}?text=${encodeURIComponent(event.rsvp.message)}`;
  return <section className="glam-rsvp" style={{ backgroundImage: `linear-gradient(0deg,rgba(5,10,23,.96),rgba(5,10,23,.38)),url(${event.closingImage ?? event.heroImage})` }}><p>CONFIRMA</p><h2>TU ASISTENCIA</h2><span>Será un gusto compartir este día contigo.</span><a href={href} target="_blank" rel="noreferrer">Confirmar en WhatsApp</a></section>;
}

function GlamClosing({ event }: { event: InvitationEvent }) { return <section className="glam-closing" style={{ backgroundImage: `linear-gradient(0deg,rgba(8,13,28,.88),rgba(8,13,28,.2)),url(${event.closingImage ?? event.heroImage})` }}><h2>Nos vemos en mis XV</h2><p>Gracias por ser parte de esta noche tan especial.</p></section>; }
