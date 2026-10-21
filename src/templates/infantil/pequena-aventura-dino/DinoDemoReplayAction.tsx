'use client';

import { useContext } from 'react';
import { SherDemoReplayButton } from '@/components/sher/SherDemoReplayButton';
import { DinoReplayContext } from './DinoDemoExperience';

/** Puente dentro de demoActions; no mueve SherTemplateDemo al ámbito cliente. */
export function DinoDemoReplayAction() {
  const state = useContext(DinoReplayContext);
  if (!state) return null;
  return <SherDemoReplayButton onReplayOpening={state.replay} disabled={state.restarting} />;
}
