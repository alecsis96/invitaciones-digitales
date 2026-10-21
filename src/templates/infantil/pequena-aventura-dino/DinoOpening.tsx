'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { dinoAsset } from './types';
import { dinoFonts } from './fonts';
import styles from './PequenaAventuraDino.module.css';

type Stage = 'checking' | 'closed' | 'cracked' | 'hatched' | 'revealing' | 'done';
const egg = (id: string) => dinoAsset(`opening/egg-${id}.webp`);
const CRACK_VOLUME = 0.30;

export function DinoOpening({ children, sessionId, forceOpening = false, onEggTouch, canPlayCrack }: {
  children: ReactNode;
  sessionId: string;
  forceOpening?: boolean;
  onEggTouch: () => void;
  canPlayCrack: () => boolean;
}) {
  const [stage, setStage] = useState<Stage>('checking');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const focusRaf = useRef<number | null>(null);
  const coveredRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const openedRef = useRef(false);
  const openingStartedRef = useRef(false);
  const crackRef = useRef<HTMLAudioElement | null>(null);
  const crackActiveRef = useRef(false);
  const sessionKey = `sher:dino-opening:${sessionId}`;
  const active = stage !== 'done' && stage !== 'checking';

  const stopCrack = useCallback(() => {
    crackActiveRef.current = false;
    crackRef.current?.pause();
  }, []);

  useEffect(() => {
    if (!active) return;
    const sound = new Audio();
    sound.preload = 'auto';
    sound.loop = false;
    try { sound.volume = CRACK_VOLUME; } catch { /* Volumen nativo en algunos móviles. */ }
    sound.src = '/audio/infantil-01/egg-crack.mp3';
    crackRef.current = sound;
    const guard = () => {
      if (crackRef.current !== sound || !crackActiveRef.current || !canPlayCrack()) sound.pause();
    };
    sound.addEventListener('playing', guard);
    return () => {
      stopCrack();
      sound.removeEventListener('playing', guard);
      sound.removeAttribute('src');
      sound.load();
      if (crackRef.current === sound) crackRef.current = null;
    };
  }, [active, canPlayCrack, stopCrack]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);
  const complete = useCallback(() => {
    if (openedRef.current) return;
    openedRef.current = true;
    stopCrack();
    clearTimers();
    try { window.sessionStorage.setItem(sessionKey, '1'); } catch { /* storage bloqueado */ }
    setStage('done');
    focusRaf.current = window.requestAnimationFrame(() => {
      const title = document.getElementById('dino-hero-title');
      if (title instanceof HTMLElement) title.focus({ preventScroll: true });
      else restoreFocusRef.current?.focus({ preventScroll: true });
    });
  }, [clearTimers, sessionKey, stopCrack]);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    let opened = false;
    try { opened = window.sessionStorage.getItem(sessionKey) === '1'; } catch { /* permitir apertura */ }
    setStage(!forceOpening && opened ? 'done' : 'closed');
    return () => { clearTimers(); if (focusRaf.current !== null) window.cancelAnimationFrame(focusRaf.current); };
  }, [sessionKey, forceOpening, clearTimers]);

  useEffect(() => {
    const covered = coveredRef.current;
    if (!covered) return;
    covered.inert = active || stage === 'checking';
    covered.setAttribute('aria-hidden', covered.inert ? 'true' : 'false');
    if (!active) return () => { covered.inert = false; covered.removeAttribute('aria-hidden'); };
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    focusRaf.current = window.requestAnimationFrame(() => (stage === 'closed' ? buttonRef.current : dialogRef.current)?.focus({ preventScroll: true }));
    return () => {
      covered.inert = false;
      covered.removeAttribute('aria-hidden');
      document.body.style.overflow = oldOverflow;
    };
  }, [active, stage]);

  const openEgg = () => {
    if (stage !== 'closed' || openingStartedRef.current) return;
    openingStartedRef.current = true;
    onEggTouch(); // llama audio.play() directamente en el gesto del usuario
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { complete(); return; }
    setStage('cracked');
    // La primera grieta aparece aquí: play() permanece dentro del gesto válido.
    const sound = crackRef.current;
    if (sound && canPlayCrack()) {
      crackActiveRef.current = true;
      try {
        void sound.play().then(() => {
          if (crackRef.current !== sound || !crackActiveRef.current || !canPlayCrack()) sound.pause();
        }).catch(() => { sound.pause(); });
      } catch { sound.pause(); /* La apertura continúa aunque el navegador bloquee audio. */ }
    }
    timersRef.current.push(setTimeout(() => setStage('hatched'), 520));
    timersRef.current.push(setTimeout(() => setStage('revealing'), 1320));
    timersRef.current.push(setTimeout(complete, 1920));
  };

  return <>
    <div ref={coveredRef} className={styles.coveredContent} data-dino-covered={stage !== 'done'}>
      {children}
    </div>
    {stage !== 'done' && <div
      ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="dino-opening-heading"
      className={`${styles.openingOverlay} ${dinoFonts} ${stage === 'revealing' ? styles.openingExit : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape') { event.preventDefault(); complete(); }
        if (event.key === 'Tab') { event.preventDefault(); (stage === 'closed' ? buttonRef.current : dialogRef.current)?.focus(); }
      }}
    >
      <div className={styles.openingCanopy} aria-hidden="true" />
      <div className={styles.openingInner}>
        <p className={styles.openingOverline}>SHER · Una pequeña aventura</p>
        <h2 id="dino-opening-heading" className={styles.openingHeading}>{stage === 'checking' ? 'Preparando la sorpresa…' : 'Una sorpresa está por nacer…'}</h2>
        <button ref={buttonRef} type="button" onClick={openEgg} disabled={stage !== 'closed'} className={styles.eggButton} aria-label="Tocar el huevo para abrir la invitación">
          <Image className={`${styles.eggImage} ${stage === 'closed' ? styles.eggIdle : ''}`} src={egg(stage === 'closed' ? 'closed' : stage === 'cracked' ? 'cracked' : 'open')} alt="" width={1254} height={1254} sizes="(max-width: 512px) 78vw, 400px" priority draggable={false}/>
          {(stage === 'hatched' || stage === 'revealing') && <Image className={styles.hatchDino} src={dinoAsset('characters/dino-master.webp')} alt="" width={1254} height={1254} sizes="(max-width: 512px) 34vw, 172px" draggable={false} />}
        </button>
        <p className={styles.eggHint}>{stage === 'checking' ? 'Un momento…' : stage === 'closed' ? 'Toca el huevo' : '¡Ya comienza la aventura!'}</p>
      </div>
    </div>}
  </>;
}
