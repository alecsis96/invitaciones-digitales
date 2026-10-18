"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { bodaLinenOpeningConfig, type BodaLinenOpeningConfig } from "./boda-linen-opening.config";
import styles from "./BodaLinenOpening.module.css";
import { useBodaOpeningMotion, type BodaOpeningOutcome } from "./BodaNarrativeMotion";
import { useBodaMusic } from "./BodaMusic";

export function BodaLinenOpening({ children, config, forceOpening = false }: { children: ReactNode; config?: Partial<BodaLinenOpeningConfig>; forceOpening?: boolean }) {
  const options = { ...bodaLinenOpeningConfig, ...config };
  const reportOpening = useBodaOpeningMotion();
  const music = useBodaMusic();
  const openingOutcome = useRef<BodaOpeningOutcome>("interrupted");
  const [phase, setPhase] = useState<"pending" | "closed" | "opening" | "open">(() => forceOpening && options.enabled ? "closed" : "pending");
  const contentRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const flapRef = useRef<HTMLSpanElement>(null);
  const sealRef = useRef<HTMLSpanElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);
  const watchdog = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const run = useRef(0);
  const busy = useRef(false);
  const promptId = useId();
  const active = phase === "closed" || phase === "opening";

  const cancel = useCallback(() => {
    run.current++;
    busy.current = false;
    clearTimeout(watchdog.current);
    animations.current.splice(0).forEach(animation => animation.cancel());
    const content = contentRef.current;
    if (content) {
      content.classList.remove(styles.liveCard);
      ["width", "height", "transform", "clip-path"].forEach(property => content.style.removeProperty(property));
    }
  }, []);

  const finish = useCallback(() => {
    // Do not paint reset animation styles between cancellation and unmount.
    if (dialogRef.current) dialogRef.current.style.visibility = "hidden";
    cancel();
    try { window.sessionStorage.setItem(options.sessionKey, "opened"); } catch { /* Storage must never gate access. */ }
    setPhase("open");
  }, [cancel, options.sessionKey]);

  const restoreFocus = useCallback((content: HTMLElement, previousFocus: HTMLElement | null, originalHash: string) => {
    requestAnimationFrame(() => {
      if (dialogRef.current) return;
      const readingDestination = content.querySelector<HTMLElement>("section[aria-labelledby]") ?? content.querySelector<HTMLElement>("h1");
      let target = previousFocus?.isConnected && previousFocus !== document.body && !previousFocus.contains(content) ? previousFocus : readingDestination;
      if (window.location.hash !== originalHash && window.location.hash) {
        try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))) ?? target; } catch { /* Malformed hash: retain the existing destination. */ }
        target?.scrollIntoView({ behavior: "instant" });
      }
      if (!target?.isConnected) return;
      // Focus the reading region, not the title whose entrance is still running.
      if (target === readingDestination) {
        target.classList.add(styles.focusDestination);
        const heading = target;
        heading.addEventListener("blur", () => heading.classList.remove(styles.focusDestination), { once: true });
      }
      if (!target.matches("a[href], button, input, select, textarea, [tabindex]")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener("blur", () => target?.removeAttribute("tabindex"), { once: true });
      }
      target.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    if (forceOpening && options.enabled) {
      openingOutcome.current = "interrupted";
      setPhase("closed");
      return cancel;
    }
    let seen = false;
    try { seen = Boolean(window.sessionStorage.getItem(options.sessionKey)); } catch { /* Continue without persistence. */ }
    openingOutcome.current = !options.enabled ? "disabled" : window.location.hash || window.scrollY > 0 ? "bypassed" : seen ? "session" : "interrupted";
    setPhase(!options.enabled || seen || window.location.hash || window.scrollY > 0 ? "open" : "closed");
    return cancel;
  }, [cancel, forceOpening, options.enabled, options.sessionKey]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    // DevTools only: window.dispatchEvent(new Event("boda-linen-opening:reset"))
    const reset = () => {
      try { window.sessionStorage.removeItem(options.sessionKey); } catch { /* Persistence is optional. */ }
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      window.location.reload();
    };
    window.addEventListener("boda-linen-opening:reset", reset);
    return () => window.removeEventListener("boda-linen-opening:reset", reset);
  }, [options.sessionKey]);

  useEffect(() => {
    if (!active || !contentRef.current) return;
    const content = contentRef.current;
    const wasInert = content.inert;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const { scrollX, scrollY } = window;
    const originalHash = window.location.hash;
    const body = document.body;
    const properties = ["position", "top", "left", "right", "width", "overflow", "padding-right"];
    const previousStyles = properties.map(property => [property, body.style.getPropertyValue(property), body.style.getPropertyPriority(property)]);
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    content.inert = true;
    Object.assign(body.style, { position: "fixed", top: `${-scrollY}px`, left: `${-scrollX}px`, right: "0", width: "100%", overflow: "hidden", paddingRight: `${padding + gutter}px` });
    const focusFrame = requestAnimationFrame(() => envelopeRef.current?.focus({ preventScroll: true }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const interrupt = () => { if (busy.current) finish(); };
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); finish(); }
    };
    const motionChanged = () => { if (reduced.matches) interrupt(); };
    const visibilityChanged = () => { if (document.hidden) interrupt(); };
    window.addEventListener("resize", interrupt);
    window.addEventListener("keydown", escape);
    window.addEventListener("hashchange", finish);
    reduced.addEventListener("change", motionChanged);
    document.addEventListener("visibilitychange", visibilityChanged);
    return () => {
      cancelAnimationFrame(focusFrame);
      content.inert = wasInert;
      previousStyles.forEach(([property, value, priority]) => value ? body.style.setProperty(property, value, priority) : body.style.removeProperty(property));
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      window.removeEventListener("resize", interrupt);
      window.removeEventListener("keydown", escape);
      window.removeEventListener("hashchange", finish);
      reduced.removeEventListener("change", motionChanged);
      document.removeEventListener("visibilitychange", visibilityChanged);
      restoreFocus(content, previousFocus, originalHash);
    };
  }, [active, finish, restoreFocus]);

  useEffect(() => {
    music?.setInvitationOpen(phase === "open");
    if (phase === "closed" || phase === "opening") reportOpening?.("waiting");
    else if (phase === "open") reportOpening?.(openingOutcome.current);
  }, [phase, reportOpening, music]);

  async function open() {
    if (busy.current || phase !== "closed") return;
    music?.startFromOpening();
    const dialog = dialogRef.current, envelope = envelopeRef.current, card = cardRef.current, flap = flapRef.current, seal = sealRef.current, content = contentRef.current;
    if (!dialog || !envelope || !card || !flap || !seal || !content || window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof card.animate !== "function") {
      finish();
      return;
    }
    busy.current = true;
    const token = ++run.current;
    const duration = Number.isFinite(options.durationMs) ? Math.min(4000, Math.max(2500, options.durationMs)) : 2800;
    const factor = duration / 2800;
    const play = (element: Element, frames: Keyframe[], ms: number, easing = "cubic-bezier(.22,.65,.3,1)") => {
      if (token !== run.current) throw new Error("Opening interrupted");
      const animation = element.animate(frames, { duration: ms * factor, easing, fill: "forwards" });
      animations.current.push(animation);
      return animation.finished;
    };
    setPhase("opening");
    watchdog.current = setTimeout(finish, duration + 1500);
    try {
      const heroImage = content.querySelector<HTMLImageElement>("img");
      const heroReady = heroImage?.decode ? heroImage.decode().catch(() => undefined) : Promise.resolve();
      const copyFades = Array.from(dialog.querySelectorAll("[data-linen-copy]")).map(element => play(element, [{ opacity: 1 }, { opacity: 0 }], 250));
      await Promise.all([...copyFades, play(seal, [{ transform: "translate(-50%, -50%) translateZ(0)", opacity: 1 }, { transform: "translate(-50%, -50%) translate3d(5px, 14px, 30px) rotate(8deg)", opacity: 0 }], 300)]);
      await play(flap, [{ transform: "rotateX(0deg)" }, { transform: "rotateX(90deg)" }], 300, "ease-in");
      flap.style.zIndex = "1";
      await play(flap, [{ transform: "rotateX(90deg)" }, { transform: "rotateX(180deg)" }], 300, "ease-out");
      // Animate the existing invitation, never a clone or a second Hero.
      await heroReady;
      if (token !== run.current) return;
      const envelopeRect = envelope.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const heroRect = content.querySelector("section")?.getBoundingClientRect();
      const sourceLeft = heroRect ? heroRect.left - contentRect.left : 0;
      const sourceWidth = heroRect?.width || contentRect.width;
      const scale = cardRect.width / sourceWidth;
      const viewportHeight = window.innerHeight;
      const rise = envelopeRect.height * 0.97;
      const left = cardRect.left - sourceLeft * scale;
      const pocketSide = envelopeRect.top + envelopeRect.height * 0.58 * 0.14;
      const pocketCenter = envelopeRect.top + envelopeRect.height * 0.58;
      const pocketClip = (travel: number) => {
        const top = cardRect.top - travel;
        const height = cardRect.height / scale;
        const side = Math.min(height, Math.max(0, (pocketSide - top) / scale));
        const center = Math.min(height, Math.max(0, (pocketCenter - top) / scale));
        const cross = Math.min(1, Math.max(0, (top + cardRect.height - pocketSide) / (pocketCenter - pocketSide))) * sourceWidth / 2;
        const right = sourceLeft + sourceWidth;
        return `polygon(${sourceLeft}px 0px, ${right}px 0px, ${right}px ${side}px, ${right - cross}px ${center}px, ${sourceLeft + sourceWidth / 2}px ${center}px, ${sourceLeft + cross}px ${center}px, ${sourceLeft}px ${side}px)`;
      };
      const tucked = `translate(${left}px, ${cardRect.top}px) scale(${scale})`;
      const emerged = `translate(${left}px, ${cardRect.top - rise}px) scale(${scale})`;
      content.style.width = `${contentRect.width}px`;
      content.style.height = `${viewportHeight}px`;
      content.style.transform = tucked;
      content.style.clipPath = pocketClip(0);
      content.classList.add(styles.liveCard);
      // Follow the existing V-shaped pocket, including its exposed center.
      const exitCenter = Math.min(1, Math.max(0, (cardRect.top + cardRect.height - pocketCenter) / rise));
      const exitSides = Math.min(1, Math.max(0, (cardRect.top + cardRect.height - pocketSide) / rise));
      await Promise.all([
        play(card, [{ transform: "translateY(0)" }, { transform: `translateY(${-rise}px)` }], 650),
        play(content, [{ transform: tucked }, { transform: emerged }], 650),
        play(content, [
          { clipPath: pocketClip(0), offset: 0 },
          { clipPath: pocketClip(rise * exitCenter), offset: exitCenter },
          { clipPath: pocketClip(rise * exitSides), offset: exitSides },
          { clipPath: pocketClip(rise), offset: 1 }
        ], 650)
      ]);
      card.style.zIndex = "6";
      const fading = Array.from(dialog.querySelectorAll("[data-linen-fade]")).map(element => play(element, [{ opacity: 1 }, { opacity: 0 }], 250));
      fading.push(play(envelope, [{ outlineColor: getComputedStyle(envelope).outlineColor }, { outlineColor: "transparent" }], 250));
      fading.push(play(flap, [{ opacity: 1 }, { opacity: 0 }], 250));
      if (surfaceRef.current) fading.push(play(surfaceRef.current, [{ opacity: 1, offset: 0 }, { opacity: 1, offset: 0.6 }, { opacity: 0, offset: 1 }], 1250));
      card.style.transformOrigin = "0 0";
      await Promise.all([
        ...fading,
        play(card, [
          { transform: `translateY(${-rise}px)` },
          { transform: `translate(${-cardRect.left}px, ${-cardRect.top}px) scale(${contentRect.width / cardRect.width}, ${viewportHeight / cardRect.height})` }
        ], 1250),
        // Uniform content scaling preserves faces and type; the crop opens up
        // from the landscape card to the viewport without changing Hero layout.
        play(content, [
          { transform: emerged, clipPath: pocketClip(rise) },
          { transform: "translate(0px, 0px) scale(1)", clipPath: `polygon(0px 0px, ${contentRect.width}px 0px, ${contentRect.width}px ${viewportHeight}px, ${contentRect.width}px ${viewportHeight}px, ${contentRect.width / 2}px ${viewportHeight}px, 0px ${viewportHeight}px, 0px ${viewportHeight}px)` }
        ], 1250)
      ]);
      if (token === run.current) {
        openingOutcome.current = "completed";
        finish();
      }
    } catch {
      if (token === run.current) finish();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  return (
    <div className={styles.root}>
      <div ref={contentRef}>{children}</div>
      {active ? (
        <div ref={dialogRef} className={styles.stage} role="dialog" aria-modal="true" aria-label="El sobre de lino" aria-describedby={promptId} onKeyDown={handleKeyDown}>
          <div ref={surfaceRef} className={styles.surface} aria-hidden="true">
            <svg className={styles.foliage} viewBox="0 0 200 300"><path d="M30 290Q140 170 150 15" /><g><ellipse cx="76" cy="230" rx="11" ry="31" transform="rotate(-55 76 230)" /><ellipse cx="108" cy="187" rx="11" ry="31" transform="rotate(45 108 187)" /><ellipse cx="130" cy="140" rx="10" ry="28" transform="rotate(-50 130 140)" /><ellipse cx="145" cy="90" rx="10" ry="27" transform="rotate(40 145 90)" /></g></svg>
          </div>
          <div className={styles.composition}>
            <p className={styles.eyebrow} data-linen-copy>{options.eyebrow}</p>
            <button ref={envelopeRef} type="button" className={styles.envelope} aria-label={options.envelopeLabel} aria-busy={phase === "opening"} onClick={open}>
              <span className={styles.back} data-linen-fade aria-hidden="true" />
              <span ref={flapRef} className={styles.flap} aria-hidden="true"><span /></span>
              <span ref={cardRef} className={styles.card} aria-hidden="true"><span className={styles.cardRule} /></span>
              <span className={styles.pocket} data-linen-fade aria-hidden="true" />
              <span ref={sealRef} className={styles.seal} aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M12 29Q24 22 27 10M18 24Q7 24 12 17Q20 16 18 24ZM23 18Q21 8 28 10Q32 16 23 18Z" /></svg></span>
            </button>
            <p id={promptId} className={styles.prompt} data-linen-copy>{options.prompt}</p>
          </div>
          <p className={styles.srOnly} role="status">{phase === "opening" ? "Abriendo invitación" : ""}</p>
        </div>
      ) : null}
    </div>
  );
}
