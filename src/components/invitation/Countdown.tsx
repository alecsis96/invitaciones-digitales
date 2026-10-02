"use client";
import { useEffect, useState } from "react";

const zero = { days: 0, hours: 0, minutes: 0, seconds: 0 };
function getRemaining(date: string) {
  const ms = new Date(date).getTime() - Date.now();
  if (ms <= 0) return zero;
  return { days: Math.floor(ms / 86400000), hours: Math.floor(ms / 3600000) % 24, minutes: Math.floor(ms / 60000) % 60, seconds: Math.floor(ms / 1000) % 60 };
}
export function Countdown({ date }: { date: string }) {
  const [remaining, setRemaining] = useState(zero);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); setRemaining(getRemaining(date)); const id = window.setInterval(() => setRemaining(getRemaining(date)), 1000); return () => window.clearInterval(id); }, [date]);
  if (mounted && new Date(date).getTime() <= Date.now()) return <p className="countdown-finished">¡El gran día ha llegado!</p>;
  return <div className="countdown" aria-label="Cuenta regresiva"><Time value={remaining.days} label="Días" /><Time value={remaining.hours} label="Horas" /><Time value={remaining.minutes} label="Minutos" /><Time value={remaining.seconds} label="Segundos" /></div>;
}
function Time({ value, label }: { value: number; label: string }) { return <div className="countdown-unit"><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>; }
