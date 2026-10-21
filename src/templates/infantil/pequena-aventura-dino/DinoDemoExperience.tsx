'use client';

import { createContext, useCallback, useRef, useState, type ReactNode } from 'react';
import { DinoOpening } from './DinoOpening';
import { DinoMotion } from './DinoMotion';
import { DinoMusicControl, useDinoMusic } from './DinoMusic';
import type { DinoEvent } from './types';
import styles from './PequenaAventuraDino.module.css';

type DinoReplayContextValue = { replay: () => void; restarting: boolean };
export const DinoReplayContext = createContext<DinoReplayContextValue | null>(null);

function DinoExperienceGeneration({ children, event, forceOpening, onEggTouch, canPlayCrack }: {
  children: ReactNode; event: DinoEvent; forceOpening: boolean; onEggTouch: () => void; canPlayCrack: () => boolean;
}) {
  return <DinoMotion>
    <DinoOpening sessionId={event.id} forceOpening={forceOpening} onEggTouch={onEggTouch} canPlayCrack={canPlayCrack}>{children}</DinoOpening>
  </DinoMotion>;
}

/** Acepta children de servidor; NUNCA importa SherTemplateDemo (Server Component). */
export function DinoDemoExperience({ children, event }: { children: ReactNode; event: DinoEvent }) {
  const music = useDinoMusic(event.music);
  const [generation, setGeneration] = useState(0);
  const [restarting, setRestarting] = useState(false);
  const gate = useRef(false);
  const replay = useCallback(() => {
    if (gate.current) return;
    gate.current = true;
    setRestarting(true);
    // Reiniciar apertura y motion sin desmontar el audio ni perder la pausa del visitante.
    try { window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search); } catch { /* sin hash persistente */ }
    window.scrollTo({ top: 0, behavior: 'instant' });
    setGeneration((g) => g + 1);
    // Evita doble activación; el nuevo overlay adquiere el foco tras montar.
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => { gate.current = false; setRestarting(false); }));
  }, []);
  return <DinoReplayContext.Provider value={{ replay, restarting }}>
    <div className={styles.demoExperience}>
      <DinoExperienceGeneration key={generation} event={event} forceOpening={generation > 0} onEggTouch={music.start} canPlayCrack={music.canPlayEffects}>
        {children}
      </DinoExperienceGeneration>
      <DinoMusicControl music={event.music} playing={music.playing} error={music.error} onToggle={music.toggle}/>
    </div>
  </DinoReplayContext.Provider>;
}

