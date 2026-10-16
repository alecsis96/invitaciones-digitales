import { Countdown } from "@/components/invitation/Countdown";
import styles from "./BodaRomanceEditorialInvitation.module.css";

export function BodaCountdown({ date }: { date: string }) {
  const isValid = Number.isFinite(Date.parse(date));

  return (
    <div className={styles.countdownFrame}>
      {isValid ? <Countdown date={date} /> : <p className={styles.countdownFallback} role="status">Fecha por confirmar</p>}
    </div>
  );
}
