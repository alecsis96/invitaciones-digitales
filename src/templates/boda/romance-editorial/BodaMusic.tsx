"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { BodaMusicConfig } from "./types";
import styles from "./BodaMusic.module.css";

type MusicContext = { startFromOpening: () => void; setInvitationOpen: (open: boolean) => void };
const Context = createContext<MusicContext | null>(null);
export const useBodaMusic = () => useContext(Context);

export function BodaMusic({ music, children }: { music?: BodaMusicConfig; children: ReactNode }) {
  const src = music?.src.trim() ?? "";
  const enabled = Boolean(src && music?.enabled !== false);
  const volume = Number.isFinite(music?.volume) ? Math.min(1, Math.max(0, music!.volume!)) : 0.35;
  const audioRef = useRef<HTMLAudioElement>(null);
  const desired = useRef(false);
  const attempted = useRef(false);
  const visitorPaused = useRef(false);
  const request = useRef(0);
  const frame = useRef<number | undefined>(undefined);
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [state, setState] = useState<"idle" | "starting" | "playing" | "paused" | "error">("idle");

  const cancelFade = useCallback(() => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = undefined;
  }, []);

  const pause = useCallback(() => {
    desired.current = false;
    visitorPaused.current = true;
    request.current++;
    cancelFade();
    audioRef.current?.pause();
    setState("paused");
  }, [cancelFade]);

  const fail = useCallback(() => {
    desired.current = false;
    request.current++;
    cancelFade();
    audioRef.current?.pause();
    setState("error");
  }, [cancelFade]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!enabled || !audio || desired.current) return;
    // A failed media source must be reloaded before a user-triggered retry.
    if (audio.error) audio.load();
    desired.current = true;
    const token = ++request.current;
    cancelFade();
    setState("starting");
    let canFade = false;
    try {
      audio.volume = 0;
      canFade = audio.volume === 0;
    } catch { /* Some mobile browsers expose only native volume control. */ }
    try {
      // Keep this call synchronous in the envelope/button interaction.
      const started = audio.play();
      void started.then(() => {
        if (token !== request.current || !desired.current) {
          if (!desired.current) audio.pause();
          return;
        }
        setState("playing");
        if (!canFade) return;
        const start = performance.now();
        const fade = (now: number) => {
          if (token !== request.current || !desired.current) return;
          const progress = Math.min(1, (now - start) / 1500);
          try { audio.volume = volume * progress; } catch { return; }
          frame.current = progress < 1 ? requestAnimationFrame(fade) : undefined;
        };
        frame.current = requestAnimationFrame(fade);
      }).catch(() => { if (token === request.current && desired.current) fail(); });
    } catch { fail(); }
  }, [cancelFade, enabled, fail, volume]);

  const startFromOpening = useCallback(() => {
    if (attempted.current || visitorPaused.current) return;
    attempted.current = true;
    play();
  }, [play]);
  const context = useMemo(() => ({ startFromOpening, setInvitationOpen }), [startFromOpening]);

  const dispose = useCallback((audio: HTMLAudioElement | null) => {
    desired.current = false;
    attempted.current = false;
    visitorPaused.current = false;
    request.current++;
    cancelFade();
    audio?.pause();
  }, [cancelFade]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => dispose(audio);
  }, [src, enabled, dispose]);

  const active = state === "playing" || state === "starting";
  const label = active ? "Pausar música" : state === "paused" ? "Reanudar música" : state === "error" ? "Reintentar música" : "Reproducir música";

  return (
    <Context.Provider value={context}>
      {enabled ? <audio ref={audioRef} src={src} loop={music?.loop ?? true} preload="none"
        onPlaying={() => { if (desired.current) setState("playing"); else audioRef.current?.pause(); }}
        onPause={() => { if (desired.current) pause(); }} onEnded={pause} onError={fail} /> : null}
      {children}
      {enabled && invitationOpen ? <>
        <button type="button" className={styles.control} aria-label={label} title={label}
          aria-pressed={state === "playing"} aria-busy={state === "starting"}
          onClick={() => { if (active) pause(); else { visitorPaused.current = false; play(); } }}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {active ? <path d="M8 5v14M16 5v14" /> : <path d="m8 5 11 7-11 7Z" />}
          </svg>
        </button>
        <p className={styles.status} role="status">{state === "error" ? "No se pudo reproducir la música. Puedes intentarlo desde el control musical." : ""}</p>
      </> : null}
    </Context.Provider>
  );
}
