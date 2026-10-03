"use client";

import { useEffect, useRef, useState } from "react";
import { useOpeningSession } from "@/hooks/useOpeningSession";
import type { EventMusic, OpeningExperience as OpeningConfig } from "@/types/invitation";

type OpeningExperienceProps = { experience?: OpeningConfig; music?: EventMusic; storageKey: string };

export function OpeningExperience({ experience, music, storageKey }: OpeningExperienceProps) {
  const [opening, setOpening] = useState(false);
  const envelopeRef = useRef<HTMLButtonElement>(null);
  const reducedMotionRef = useRef(false);
  const sessionKey = `invitation-opening:${storageKey}`;
  const enabled = experience?.enabled && experience.type === "envelope";

  const { visible, markComplete, dismiss } = useOpeningSession({ enabled: Boolean(enabled), storageKey: sessionKey, completionValue: "complete" });

  useEffect(() => {
    if (!visible) return;
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    envelopeRef.current?.focus();
  }, [visible]);

  if (!enabled || !visible) return null;

  const startMusic = () => {
    if (experience.playMusicOnOpen && music?.src?.trim() && music.enabled !== false) window.dispatchEvent(new Event("invitation:play-music"));
  };
  const finish = () => {
    markComplete();
    dismiss();
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const open = () => {
    if (opening) return;
    startMusic();
    if (reducedMotionRef.current) { finish(); return; }
    setOpening(true);
    window.setTimeout(finish, 1360);
  };
  const skip = () => { startMusic(); finish(); };

  return <section className={`opening-experience ${opening ? "is-opening" : ""}`} role="dialog" aria-modal="true" aria-label="Apertura de invitación"><p className="opening-eyebrow">{experience.eyebrow?.trim() || "Invitación"}</p><button ref={envelopeRef} className="envelope" type="button" onClick={open} aria-label={experience.prompt?.trim() || "Abrir invitación"} disabled={opening}><span className="envelope-card"><b>{experience.monogram?.trim() || ""}</b><i /></span><span className="envelope-back" /><span className="envelope-flap" /><span className="envelope-front" /><span className="envelope-seal" aria-hidden="true">{experience.monogram?.trim() || ""}</span></button><p className="opening-prompt">{experience.prompt?.trim() || "Abrir invitación"}</p><button className="opening-skip" type="button" onClick={skip}>{experience.skipLabel?.trim() || "Omitir"}</button></section>;
}
