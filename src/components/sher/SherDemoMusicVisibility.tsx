"use client";

import { useEffect } from "react";

export function SherDemoMusicVisibility({ commercialId }: { commercialId: string }) {
  useEffect(() => {
    const commercial = document.getElementById(commercialId);
    const demo = commercial?.closest<HTMLElement>("[data-sher-template-demo]");
    if (!commercial || !demo || !("IntersectionObserver" in window)) return;

    let hidden = false;
    // Separate entry/exit thresholds prevent flicker near the section boundary.
    const observer = new IntersectionObserver(([entry]) => {
      const next = hidden ? entry.intersectionRatio > .05 : entry.intersectionRatio >= .25;
      if (next === hidden) return;
      hidden = next;

      const focused = document.activeElement;
      if (hidden && focused instanceof HTMLElement && demo.contains(focused)
        && focused.matches(".music-control") && getComputedStyle(commercial).visibility === "visible") {
        commercial.focus({ preventScroll: true });
      }
      demo.dataset.demoCommercialVisible = String(hidden);
    }, { threshold: [0, .05, .25] });

    observer.observe(commercial);
    return () => {
      observer.disconnect();
      delete demo.dataset.demoCommercialVisible;
    };
  }, [commercialId]);

  return null;
}
