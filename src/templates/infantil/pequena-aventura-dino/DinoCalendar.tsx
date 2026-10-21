import type { DinoEvent } from './types';
import { calendarUrls } from './utils';
import { DinoIcon } from './DinoShared';
import styles from './PequenaAventuraDino.module.css';

export function DinoCalendar({ event }: {event:DinoEvent}) {
  const calendar = calendarUrls(event);
  if (!calendar) return <p className={styles.note}>Podrás agendar cuando se confirme la fecha.</p>;
  return <div className={styles.calendarActions} data-dino-reveal>
    <a href={calendar.google} target="_blank" rel="noopener noreferrer" className={styles.smallAction}>
      <DinoIcon name="guardar-fecha" size={30}/><span>Agendar fecha</span>
    </a>
  </div>;
}
