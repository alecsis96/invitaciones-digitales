"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type OpeningSessionOptions = {
  enabled: boolean;
  storageKey: string;
  completionValue: string;
  initiallyVisible?: boolean;
  openingRef?: RefObject<HTMLElement>;
};

export function useOpeningSession({ enabled, storageKey, completionValue, initiallyVisible = false, openingRef }: OpeningSessionOptions) {
  const [visible, setVisible] = useState(() => enabled && initiallyVisible);
  const focusCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => () => { focusCleanupRef.current?.(); }, []);

  useEffect(() => {
    if (!enabled || window.sessionStorage.getItem(storageKey)) {
      setVisible(false);
      return;
    }

    setVisible(true);
  }, [enabled, storageKey]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  useEffect(() => {
    const overlay = openingRef?.current;
    const demo = overlay?.closest<HTMLElement>("[data-sher-template-demo]");
    if (!visible || !overlay || !demo) return;

    const blocked: { element: HTMLElement; inert: string | null }[] = [];
    let branch = overlay;
    // Block siblings along the ancestor chain, never the overlay or its ancestors.
    while (branch !== demo && branch.parentElement) {
      const parent = branch.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (sibling instanceof HTMLElement && sibling !== branch) {
          blocked.push({ element: sibling, inert: sibling.getAttribute("inert") });
          sibling.inert = true;
        }
      }
      branch = parent;
    }

    const attributes = ["role", "aria-modal", "aria-label", "tabindex"] as const;
    const previous = attributes.map((name) => [name, overlay.getAttribute(name)] as const);
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    if (!overlay.hasAttribute("aria-label") && !overlay.hasAttribute("aria-labelledby")) {
      overlay.setAttribute("aria-label", "Apertura de invitación");
    }
    const firstControl = Array.from(overlay.querySelectorAll<HTMLElement>(
      "button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])",
    )).find((element) => element.getClientRects().length && getComputedStyle(element).visibility === "visible");
    if (!firstControl) overlay.setAttribute("tabindex", "-1");
    (firstControl ?? overlay).focus({ preventScroll: true });

    return () => {
      for (const { element, inert } of blocked) {
        if (inert === null) element.removeAttribute("inert");
        else element.setAttribute("inert", inert);
      }
      for (const [name, value] of previous) {
        if (value === null) overlay.removeAttribute(name);
        else overlay.setAttribute(name, value);
      }
      // Do not steal focus during navigation or React's development effect replay.
      if (demo.isConnected && !overlay.isConnected) {
        const main = demo.querySelector<HTMLElement>("main");
        if (main) {
          focusCleanupRef.current?.();
          const tabIndex = main.getAttribute("tabindex");
          const restoreTabIndex = () => {
            main.removeEventListener("blur", restoreTabIndex);
            if (tabIndex === null) main.removeAttribute("tabindex");
            else main.setAttribute("tabindex", tabIndex);
            focusCleanupRef.current = null;
          };
          focusCleanupRef.current = restoreTabIndex;
          main.addEventListener("blur", restoreTabIndex, { once: true });
          main.setAttribute("tabindex", "-1");
          main.focus({ preventScroll: true });
          if (document.activeElement !== main) restoreTabIndex();
        }
      }
    };
  }, [visible, openingRef]);

  const markComplete = useCallback(() => {
    window.sessionStorage.setItem(storageKey, completionValue);
  }, [completionValue, storageKey]);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  return { visible, markComplete, dismiss };
}
