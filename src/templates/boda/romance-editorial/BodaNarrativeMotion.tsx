"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./BodaNarrativeMotion.module.css";

export type BodaOpeningOutcome = "pending" | "waiting" | "completed" | "session" | "bypassed" | "interrupted" | "disabled";
const OpeningMotionContext = createContext<((outcome: BodaOpeningOutcome) => void) | null>(null);

export function useBodaOpeningMotion() {
  return useContext(OpeningMotionContext);
}

export function BodaNarrativeMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const consumed = useRef(new WeakSet<HTMLElement>());
  const [outcome, setOutcome] = useState<BodaOpeningOutcome>("pending");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || outcome === "pending") return;
    const reached = consumed.current;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-boda-motion]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const closingVariants: Record<string, string> = {
      "closing-landscape": styles.closingLandscape,
      "closing-soft": styles.closingSoft,
      "closing-names": styles.closingNames,
      "closing-date": styles.closingDate,
    };
    const classes = [styles.pending, styles.revealing, styles.rise, styles.photo, styles.left, styles.right, styles.itinerary, styles.heroPhoto, styles.heroText, styles.heroNames, styles.heroMessage, styles.countdown, styles.gift, styles.botanicalFade, ...Object.values(closingVariants)];
    const active = new Map<HTMLElement, ReturnType<typeof setTimeout>>();
    const groupStarts = new Map<string, number>();
    let observer: IntersectionObserver | undefined;
    let observerGuard: ReturnType<typeof setTimeout> | undefined;
    let scrollGuard: ReturnType<typeof setTimeout> | undefined;
    let anchorFrame = 0;
    let previousScroll = window.scrollY;
    let previousTime = performance.now();

    const reset = (element: HTMLElement) => {
      const timer = active.get(element);
      if (timer) clearTimeout(timer);
      active.delete(element);
      element.classList.remove(...classes);
      ["--boda-motion-delay", "--boda-motion-x"].forEach(property => element.style.removeProperty(property));
    };
    const complete = (element: HTMLElement) => {
      reset(element);
      reached.add(element);
      element.dataset.bodaMotionState = "seen";
      observer?.unobserve(element);
    };
    const prepare = (element: HTMLElement) => {
      if (reached.has(element) || element.contains(document.activeElement)) {
        complete(element);
        return;
      }
      const variant = element.dataset.bodaMotion;
      const extraVariant = variant === "gallery-lead" || variant === "dress-photo" ? styles.photo : variant === "gift-illustration" ? styles.gift : variant === "botanical" ? styles.botanicalFade : undefined;
      const animation = closingVariants[variant ?? ""] ?? extraVariant ?? (variant === "story-photo" ? styles.photo : variant === "location-left" ? styles.left : variant === "location-right" ? styles.right : variant === "itinerary" ? styles.itinerary : variant === "countdown" ? styles.countdown : variant === "hero-photo" ? styles.heroPhoto : variant === "hero-names" ? styles.heroNames : variant === "hero-message" ? styles.heroMessage : variant?.startsWith("hero-") ? styles.heroText : styles.rise);
      if (animation === styles.left || animation === styles.right) {
        const rect = element.getBoundingClientRect();
        const bounds = element.closest("main")?.getBoundingClientRect();
        const space = bounds ? animation === styles.left ? rect.left - bounds.left : bounds.right - rect.right : 0;
        element.style.setProperty("--boda-motion-x", `${Math.min(32, Math.max(0, space - 1))}px`);
      }
      // Client-only enhancement: the server never emits this hidden class.
      element.classList.add(animation, styles.pending);
      element.dataset.bodaMotionState = "pending";
    };
    const enter = (element: HTMLElement, delay = 0) => {
      if (reached.has(element)) return;
      if (reduced.matches || element.contains(document.activeElement)) {
        complete(element);
        return;
      }
      element.style.setProperty("--boda-motion-delay", `${delay}ms`);
      element.classList.remove(styles.pending);
      element.classList.add(styles.revealing);
      element.dataset.bodaMotionState = "revealing";
      reached.add(element);
      observer?.unobserve(element);
      // CSS ends visible; release classes even if animationend never arrives.
      active.set(element, setTimeout(() => complete(element), delay + (element.dataset.bodaMotion === "countdown" ? 1800 : 1400)));
    };
    const revealAll = () => {
      clearTimeout(observerGuard);
      observer?.disconnect();
      targets.forEach(complete);
    };
    const revealVisible = () => {
      if (outcome === "waiting") return;
      targets.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) complete(element);
      });
    };
    const recoverPending = () => {
      if (outcome === "waiting" || reduced.matches || scrollGuard !== undefined) return;
      if (!targets.some(element => element.dataset.bodaMotionState === "pending")) return;
      // An observer can stop responding after its initial callback. Only recover
      // stranded pending items; never shorten an entrance already in progress.
      scrollGuard = setTimeout(() => {
        scrollGuard = undefined;
        try {
          targets.forEach(element => {
            if (element.dataset.bodaMotionState !== "pending") return;
            const rect = element.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) complete(element);
          });
        } catch { revealAll(); }
      }, 250);
    };
    const focus = (event: FocusEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-boda-motion]") : null;
      if (element && root.contains(element)) complete(element);
    };
    const animationEnd = (event: AnimationEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-boda-motion]");
      if (!element || !active.has(element)) return;
      const lastPart = element.dataset.bodaMotion === "itinerary" ? element.querySelector("i") ?? element.querySelector("time") : element.dataset.bodaMotion === "countdown" ? element.querySelector(".countdown-unit:last-child") ?? element : element;
      if (event.target === lastPart) complete(element);
    };
    const motionChanged = () => { if (reduced.matches) revealAll(); };
    const hashChanged = () => {
      cancelAnimationFrame(anchorFrame);
      anchorFrame = requestAnimationFrame(revealVisible);
    };
    const visibilityChanged = () => { if (!document.hidden) revealVisible(); };
    root.addEventListener("focusin", focus, true);
    root.addEventListener("animationend", animationEnd);
    reduced.addEventListener("change", motionChanged);
    window.addEventListener("hashchange", hashChanged);
    window.addEventListener("scroll", recoverPending, { passive: true });
    window.addEventListener("resize", recoverPending);
    document.addEventListener("visibilitychange", visibilityChanged);

    try {
      if (reduced.matches || !("IntersectionObserver" in window)) {
        revealAll();
      } else if (outcome === "waiting") {
        // Keep the photograph in the live card; stage names before its expansion.
        targets.filter(element => element.dataset.bodaMotion !== "hero-photo").forEach(prepare);
      } else {
        const order = new Map(targets.map((element, index) => [element, index]));
        observer = new IntersectionObserver(entries => {
          clearTimeout(observerGuard);
          try {
            const now = performance.now();
            const jump = Math.abs(window.scrollY - previousScroll);
            const deepEntry = entries.some(entry => entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight * 0.6);
            const fastScroll = jump / Math.max(16, now - previousTime) > 1.2 || (jump > window.innerHeight * 0.35 && deepEntry);
            previousScroll = window.scrollY;
            previousTime = now;
            if (fastScroll) revealVisible();
            entries.sort((a, b) => (order.get(a.target as HTMLElement) ?? 0) - (order.get(b.target as HTMLElement) ?? 0));
            for (const entry of entries) {
              const element = entry.target as HTMLElement;
              if (reached.has(element)) continue;
              if (entry.boundingClientRect.bottom <= 0 || (fastScroll && entry.isIntersecting)) {
                complete(element);
              } else if (entry.isIntersecting) {
                const variant = element.dataset.bodaMotion;
                const extraGroup = element.dataset.bodaMotionGroup;
                const group = extraGroup ?? (variant === "itinerary" ? "itinerary" : variant?.startsWith("location-") ? "locations" : undefined);
                // Retain the cadence across observer batches without queuing a long sequence.
                const nextStart = group ? groupStarts.get(group) ?? now : now;
                const delay = group ? Math.min(extraGroup ? 540 : 360, Math.max(0, nextStart - now)) : (Number(element.dataset.bodaDelay) || 0) * 1.8;
                if (group) groupStarts.set(group, now + delay + 180);
                enter(element, delay);
              }
            }
          } catch { revealAll(); }
        }, { threshold: 0, rootMargin: "0px" });

        let observing = false;
        for (const element of targets) {
          if (reached.has(element)) continue;
          const hero = element.dataset.bodaMotion?.startsWith("hero-");
          if (hero) {
            const photo = element.dataset.bodaMotion === "hero-photo";
            const animateHero = outcome === "session" || outcome === "disabled" || (outcome === "completed" && !photo);
            if (animateHero && !window.location.hash && window.scrollY === 0) {
              prepare(element);
              enter(element, (Number(element.dataset.bodaDelay) || 0) * 1.8);
            } else complete(element);
          } else {
            const rect = element.getBoundingClientRect();
            if (rect.bottom <= 0 || ((window.location.hash || outcome === "bypassed") && rect.top < window.innerHeight)) complete(element);
            else {
              prepare(element);
              if (!reached.has(element)) {
                observer.observe(element);
                observing = true;
              }
            }
          }
        }
        // A present-but-broken observer must not strand hidden content.
        if (observing) observerGuard = setTimeout(revealAll, 1500);
      }
    } catch { revealAll(); }

    return () => {
      clearTimeout(observerGuard);
      clearTimeout(scrollGuard);
      cancelAnimationFrame(anchorFrame);
      observer?.disconnect();
      root.removeEventListener("focusin", focus, true);
      root.removeEventListener("animationend", animationEnd);
      reduced.removeEventListener("change", motionChanged);
      window.removeEventListener("hashchange", hashChanged);
      window.removeEventListener("scroll", recoverPending);
      window.removeEventListener("resize", recoverPending);
      document.removeEventListener("visibilitychange", visibilityChanged);
      targets.forEach(element => {
        reset(element);
        if (reached.has(element)) element.dataset.bodaMotionState = "seen";
        else delete element.dataset.bodaMotionState;
      });
    };
  }, [outcome]);

  return (
    <OpeningMotionContext.Provider value={setOutcome}>
      <div ref={rootRef} className={styles.scope}>{children}</div>
    </OpeningMotionContext.Provider>
  );
}
