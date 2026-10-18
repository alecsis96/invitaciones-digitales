"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { SherDemoReplayButton } from "@/components/sher/SherDemoReplayButton";
import { BodaLinenOpening } from "./BodaLinenOpening";
import { BodaMusic } from "./BodaMusic";
import { BodaNarrativeMotion } from "./BodaNarrativeMotion";
import type { BodaMusicConfig } from "./types";

const ReplayContext = createContext<(() => void) | null>(null);

// This adapter is used only by the commercial demo route.
export function BodaDemoExperience({ music, children }: { music?: BodaMusicConfig; children: ReactNode }) {
  const [generation, setGeneration] = useState(0);
  const replayPending = useRef(false);

  useEffect(() => { replayPending.current = false; }, [generation]);

  const replayOpening = useCallback(() => {
    if (replayPending.current) return;
    replayPending.current = true;
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Remounting disposes the previous audio, motion observers and opening.
    setGeneration(value => value + 1);
  }, []);

  return (
    <ReplayContext.Provider value={replayOpening}>
      <BodaMusic key={generation} music={music}>
        <BodaNarrativeMotion>
          <BodaLinenOpening forceOpening={generation > 0}>{children}</BodaLinenOpening>
        </BodaNarrativeMotion>
      </BodaMusic>
    </ReplayContext.Provider>
  );
}

// Client bridge rendered through the server wrapper's demoActions slot.
export function BodaDemoReplayAction() {
  const replayOpening = useContext(ReplayContext);
  return <SherDemoReplayButton onReplayOpening={replayOpening ?? undefined} />;
}
