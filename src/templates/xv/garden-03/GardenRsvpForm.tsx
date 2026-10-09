"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { buildWhatsAppUrl } from "@/lib/invitation/rsvp";

export function GardenRsvpForm({ name, phone }: { name: string; phone: string }) {
  const [attending, setAttending] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [quantity, setQuantity] = useState(2);
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = guestName.trim();
    if (!cleanName) return setError("Escribe tu nombre para continuar.");
    if (attending && quantity < 1) return setError("Indica al menos un asistente.");
    const message = attending ? `Hola, soy ${cleanName}.\nConfirmo mi asistencia a los XV de ${name}.\nAsistiremos ${quantity} ${quantity === 1 ? "persona" : "personas"}.` : `Hola, soy ${cleanName}.\nGracias por la invitación a los XV de ${name}.\nLamentablemente no podré asistir.`;
    setError("");
    window.open(buildWhatsAppUrl(phone, message), "_blank", "noopener,noreferrer");
  };
  return (
    <section className="garden-rsvp">
      <ScrollReveal className="garden-reveal garden-reveal-center">
        <div className="garden-rsvp-heading">
          <p>CONFIRMACIÓN</p>
          <h2>¿Podrás acompañarnos?</h2>
          <span>Nos encantará contar contigo.</span>
        </div>
      </ScrollReveal>
      <form onSubmit={submit}>
        <ScrollReveal className="garden-reveal">
          <div className="garden-rsvp-choice" role="group" aria-label="Confirmación de asistencia">
            <button type="button" className={attending ? "is-selected" : ""} aria-pressed={attending} onClick={() => setAttending(true)}>Sí, asistiré</button>
            <button type="button" className={!attending ? "is-selected" : ""} aria-pressed={!attending} onClick={() => setAttending(false)}>No podré asistir</button>
          </div>
        </ScrollReveal>
        <ScrollReveal className="garden-reveal">
          <label>Tu nombre<input value={guestName} onChange={event => setGuestName(event.target.value)} autoComplete="name" /></label>
        </ScrollReveal>
        {attending ? (
          <ScrollReveal className="garden-reveal">
            <div className="garden-rsvp-quantity">
              <span>Número de asistentes</span>
              <div>
                <button type="button" aria-label="Reducir asistentes" onClick={() => setQuantity(current => Math.max(1, current - 1))}>−</button>
                <output>{quantity}</output>
                <button type="button" aria-label="Aumentar asistentes" onClick={() => setQuantity(current => current + 1)}>+</button>
              </div>
            </div>
          </ScrollReveal>
        ) : null}
        {error ? <p role="alert" className="garden-rsvp-error">{error}</p> : null}
        <ScrollReveal className="garden-reveal">
          <button className="garden-rsvp-submit" type="submit">Confirmar por WhatsApp</button>
        </ScrollReveal>
      </form>
    </section>
  );
}
