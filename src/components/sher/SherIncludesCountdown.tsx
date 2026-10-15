"use client";

import { useEffect, useState } from "react";
import styles from "./SherHome.module.css";

type CountdownState =
  | { kind: "pending" }
  | { kind: "complete" }
  | { kind: "remaining"; days: number; hours: number; minutes: number; seconds: number };

function getCountdownState(date: string): CountdownState {
  const difference = new Date(date).getTime() - Date.now();

  if (difference <= 0) return { kind: "complete" };

  const totalSeconds = Math.floor(difference / 1_000);
  return {
    kind: "remaining",
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function SherIncludesCountdown({ date, displayDate }: { date: string; displayDate: string }) {
  const [state, setState] = useState<CountdownState>({ kind: "pending" });

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    const update = () => setState(getCountdownState(date));
    const timeoutId = setTimeout(() => {
      update();
      intervalId = setInterval(update, 1_000);
    }, 1_000 - (Date.now() % 1_000));

    update();
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [date]);

  if (state.kind === "complete") {
    return (
      <p className={styles.includesCountdownComplete}>
        Evento de demostración realizado <time dateTime={date}>{displayDate}</time>
      </p>
    );
  }

  const values = state.kind === "remaining"
    ? [[state.days, "días"], [String(state.hours).padStart(2, "0"), "hrs"], [String(state.minutes).padStart(2, "0"), "min"], [String(state.seconds).padStart(2, "0"), "seg"]] as const
    : [["—", "días"], ["—", "hrs"], ["—", "min"], ["—", "seg"]] as const;
  const label = state.kind === "remaining"
    ? `Faltan ${state.days} días, ${state.hours} horas, ${state.minutes} minutos y ${state.seconds} segundos para el evento de demostración.`
    : "Cuenta regresiva para el evento de demostración.";

  return (
    <div className={styles.includesCountdownValues} aria-label={label}>
      {values.map(([value, unit]) => (
        <span key={unit}><strong>{value}</strong><small>{unit}</small></span>
      ))}
    </div>
  );
}
