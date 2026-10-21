'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { dinoAsset } from './types';
import styles from './PequenaAventuraDino.module.css';

export function useDinoMusic(music?: {src: string;title: string}) {
  const src = music?.src.trim() ?? '';
  const audio = useRef<HTMLAudioElement | null>(null);
  const desired = useRef(false);
  const attempted = useRef(false);
  const visitorPaused = useRef(false);
  const request = useRef(0);
  const frame = useRef<number | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const cancelFade = useCallback(() => {
    if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    frame.current = undefined;
  }, []);
  const invalidate = useCallback(() => {
    desired.current = false;
    request.current++;
    cancelFade();
  }, [cancelFade]);
  const pause = useCallback(() => {
    invalidate();
    audio.current?.pause();
    setPlaying(false);
  }, [invalidate]);
  const fail = useCallback(() => {
    pause();
    setError(true);
  }, [pause]);
  useEffect(() => {
    setPlaying(false);
    setError(false);
    if (!src) return;
    const instance = new Audio();
    instance.loop = true;
    instance.preload = 'none';
    try { instance.volume = 0.35; } catch { /* Volumen nativo en algunos móviles. */ }
    instance.src = src;
    const paused = () => {
      if (audio.current !== instance) return;
      if (desired.current) { visitorPaused.current = true; pause(); }
      else setPlaying(false);
    };
    const started = () => {
      if (audio.current === instance && desired.current) setPlaying(true);
      else instance.pause();
    };
    const failed = () => { if (audio.current === instance) fail(); };
    instance.addEventListener('playing', started);
    instance.addEventListener('pause', paused);
    instance.addEventListener('error', failed);
    audio.current = instance;
    return () => {
      invalidate();
      attempted.current = false;
      visitorPaused.current = false;
      instance.removeEventListener('playing', started);
      instance.removeEventListener('pause', paused);
      instance.removeEventListener('error', failed);
      instance.pause();
      instance.removeAttribute('src');
      instance.load();
      if (audio.current === instance) audio.current = null;
    };
  }, [src, invalidate, fail, pause]);
  const play = useCallback(() => {
    const current = audio.current;
    if (!current || desired.current) return;
    if (current.error) current.load();
    desired.current = true;
    const token = ++request.current;
    cancelFade();
    setError(false);
    let canFade = false;
    try { current.volume = 0; canFade = current.volume === 0; } catch { /* Usar volumen nativo. */ }
    try {
      // Mantener play() síncrono dentro del gesto del huevo o del control musical.
      void current.play().then(() => {
        if (audio.current !== current || token !== request.current || !desired.current) {
          if (audio.current !== current || !desired.current) current.pause();
          return;
        }
        setPlaying(true);
        if (!canFade) return;
        const beginning = performance.now();
        const fade = (now: number) => {
          if (audio.current !== current || token !== request.current || !desired.current) return;
          const progress = Math.min(1, (now - beginning) / 1500);
          try { current.volume = 0.35 * progress; } catch { frame.current = undefined; return; }
          frame.current = progress < 1 ? requestAnimationFrame(fade) : undefined;
        };
        frame.current = requestAnimationFrame(fade);
      }).catch(() => {
        if (audio.current === current && token === request.current && desired.current) fail();
      });
    } catch { if (audio.current === current && token === request.current) fail(); }
  }, [cancelFade, fail]);
  const start = useCallback(() => {
    if (attempted.current || visitorPaused.current) return;
    attempted.current = true;
    play();
  }, [play]);
  const toggle = useCallback(() => {
    const current = audio.current;
    if (!current) return;
    attempted.current = true;
    if (desired.current || !current.paused) { visitorPaused.current = true; pause(); }
    else { visitorPaused.current = false; play(); }
  }, [pause, play]);
  // Lectura para efectos locales: no cambia la reproducción ni la pausa elegida.
  const canPlayEffects = useCallback(() => !visitorPaused.current && !audio.current?.muted, []);
  return { start, playing, error, toggle, audio, canPlayEffects };
}

export function DinoMusicControl({ music, playing, error, onToggle }: {
  music?: {src:string;title:string}; playing:boolean; error:boolean; onToggle:()=>void;
}) {
  if (!music?.src) return null;
  return <button type="button" className={`${styles.musicToggle} music-control`} onClick={onToggle} title={music.title}
    aria-label={error ? 'Reintentar reproducir música' : playing ? 'Pausar música' : 'Reproducir música'} aria-pressed={playing}>
    <Image src={dinoAsset(`icons/${playing ? 'musica' : 'musica-off'}.svg`)} alt="" width={36} height={36} />
    <span>{error ? 'Reintentar' : playing ? 'Pausar' : 'Música'}</span>
  </button>;
}
