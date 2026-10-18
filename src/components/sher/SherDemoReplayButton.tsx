"use client";

import styles from "./SherTemplateDemo.module.css";

export function SherDemoReplayButton({ onReplayOpening, disabled = false }: { onReplayOpening?: () => void; disabled?: boolean }) {
  if (!onReplayOpening) return null;

  return <button className={styles.replayAction} type="button" onClick={onReplayOpening} disabled={disabled}>Repetir apertura</button>;
}
