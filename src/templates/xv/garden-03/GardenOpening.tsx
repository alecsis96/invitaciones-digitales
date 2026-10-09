"use client";

import { useState } from "react";
import Image from "next/image";
import { useOpeningSession } from "@/hooks/useOpeningSession";
import type { EventMusic, OpeningExperience } from "@/types/invitation";

export function GardenOpening({ openingExperience, music, storageKey, displayDate, name }: { openingExperience?: OpeningExperience; music?: EventMusic; storageKey: string; displayDate: string; name: string }) {
  const [opening, setOpening] = useState(false);
  const enabled = Boolean(openingExperience?.enabled && openingExperience.type === "garden");
  const { visible, markComplete, dismiss } = useOpeningSession({ enabled, storageKey, completionValue: "done", initiallyVisible: true });
  if (!visible) return null;
  const open = () => {
    if (openingExperience?.playMusicOnOpen && music?.src && music.enabled !== false) window.dispatchEvent(new Event("invitation:play-music"));
    markComplete();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return dismiss();
    setOpening(true);
  };
  const finishOpening = (event: React.TransitionEvent<HTMLElement>) => {
    if (opening && event.target === event.currentTarget && event.propertyName === "opacity") dismiss();
  };
  return <section className={`garden-opening ${opening ? "is-opening" : ""}`} onTransitionEnd={finishOpening}>
    {openingExperience?.image ? <Image className="garden-opening-image" src={openingExperience.image} alt="" fill priority sizes="100vw" aria-hidden="true" /> : null}
    <div className="garden-opening-vellum"><Image className="garden-opening-emblem" src="/images/xv-03/svg/botanical-emblem.svg" alt="" width={38} height={38} aria-hidden="true" /><button type="button" onClick={open} aria-label={openingExperience?.prompt ?? "Descubre este día especial"}><span>{openingExperience?.eyebrow ?? "Mis XV"}</span><b>XV</b><h1>{name}</h1><time>{displayDate}</time><Image src="/images/xv-03/svg/editorial-divider.svg" alt="" width={136} height={12} aria-hidden="true" /><small>{openingExperience?.prompt ?? "Descubre este día especial"}</small></button></div>
  </section>;
}
