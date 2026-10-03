"use client";

import { useState } from "react";
import { useOpeningSession } from "@/hooks/useOpeningSession";
import type { EventMusic, OpeningExperience } from "@/types/invitation";

type GlamOpeningProps = {
  openingExperience?: OpeningExperience;
  music?: EventMusic;
  storageKey: string;
  fallbackImage?: string;
  displayDate: string;
};

export function GlamOpening({ openingExperience, music, storageKey, fallbackImage, displayDate }: GlamOpeningProps) {
  const [opening, setOpening] = useState(false);
  const enabled = Boolean(openingExperience?.enabled && openingExperience.type === "cinematic-reveal");
  const { visible, markComplete, dismiss } = useOpeningSession({ enabled, storageKey, completionValue: "done", initiallyVisible: true });

  if (!visible) return null;
  const reveal = () => {
    if (openingExperience?.playMusicOnOpen && music?.src && music.enabled !== false) window.dispatchEvent(new Event("invitation:play-music"));
    markComplete();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return dismiss();
    setOpening(true);
    window.setTimeout(dismiss, 1350);
  };

  return <section className={`glam-opening ${opening ? "is-opening" : ""}`} style={{ backgroundImage: `url(${openingExperience?.image ?? fallbackImage})` }}>
    <button onClick={reveal} aria-label={openingExperience?.prompt ?? "Toca para descubrir"}>
      <b>XV</b><time>{displayDate}</time><span>{openingExperience?.prompt ?? "Toca para descubrir"}</span>
    </button>
  </section>;
}
