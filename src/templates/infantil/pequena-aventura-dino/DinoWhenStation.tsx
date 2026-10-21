'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { DinoEvent } from './types';
import { dinoAsset } from './types';
import { formatDinoDate, countdownParts, eventInstant } from './utils';
import { DinoCalendar } from './DinoCalendar';
import { DinoIcon, DinoStationHeading } from './DinoShared';
import styles from './PequenaAventuraDino.module.css';

export function DinoWhenStation({ event }: {event:DinoEvent}) {
  const formatted = formatDinoDate(event.startAt, event.timeZone);
  const [parts, setParts] = useState<[number, number, number, number] | null>(null);
  useEffect(() => {
    if (!eventInstant(event.startAt)) return;
    const tick = () => setParts(countdownParts(event.startAt));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [event.startAt]);
  return <section className={`${styles.station} ${styles.when}`} id="dino-when" aria-labelledby="dino-when-title">
    <div className={styles.stationContent}>
      <DinoStationHeading icon="fecha" id="dino-when-title">¿Cuándo comienza la aventura?</DinoStationHeading>
      <div className={styles.whenDetails} data-dino-reveal>
        <div data-dino-reveal><DinoIcon name="fecha"/><p><strong>El gran día</strong><span>{formatted ? formatted.date : 'Fecha por confirmar'}</span></p></div>
        <div data-dino-reveal><DinoIcon name="hora"/><p><strong>Hora de llegada</strong><span>{formatted ? formatted.time : 'Horario por confirmar'}</span></p></div>
      </div>
      {formatted && <div className={styles.countdownBoard} data-dino-reveal>
        <p className={styles.countdownTitle}>Faltan para nuestra aventura</p>
        {parts ? <div className={styles.countdownValues} aria-label="Cuenta regresiva hasta el cumpleaños">
          {(['días','horas','min','seg'] as const).map((label, i) => <div className={styles.countdownCell} key={label}>
            <strong>{String(parts[i]).padStart(2, '0')}</strong><span>{label}</span>
          </div>)}
        </div> : <p className={styles.note}>Preparando cuenta regresiva…</p>}
        {parts?.every((number) => number === 0) && <p role="status">¡Hoy comienza la aventura!</p>}
      </div>}
      <DinoCalendar event={event}/>
      <div className={styles.footprintTrail} aria-hidden="true" data-dino-reveal>
        <Image src={dinoAsset('icons/huella-dino.svg')} width={50} height={50} alt=""/>
        <Image src={dinoAsset('icons/huella-dino.svg')} width={41} height={41} alt=""/>
        <Image src={dinoAsset('icons/huella-dino.svg')} width={32} height={32} alt=""/>
      </div>
    </div>
    <Image src={dinoAsset('characters/dino-master.webp')} alt="" width={1254} height={1254} className={styles.whenDino} aria-hidden="true" data-dino-ambient />
  </section>;
}
