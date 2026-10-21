'use client';

import { useEffect, useRef, useState } from 'react';
import { DinoIcon } from './DinoShared';
import styles from './PequenaAventuraDino.module.css';

/** Simulación local: no guarda datos ni construye enlaces a teléfonos reales. */
export function DinoDemoRsvp() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    if (confirmed) closeButton.current?.focus();
  }, [confirmed]);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const modal = dialog.current;
    const returnFocus = trigger.current;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
      returnFocus?.focus({ preventScroll: true });
    };
  }, [open]);
  return <>
    <button ref={trigger} type="button" className={`${styles.action} ${styles.actionGreen}`} onClick={() => { setConfirmed(false); setOpen(true); }}>
      <DinoIcon name="whatsapp" size={34}/><span>Confirmar por WhatsApp</span>
    </button>
    <dialog ref={dialog} className={styles.rsvpDialog} aria-labelledby="dino-rsvp-title" aria-describedby="dino-rsvp-description"
      onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
      <h3 id="dino-rsvp-title">{confirmed ? '¡Confirmación simulada!' : '¿Te unes a la aventura?'}</h3>
      <p id="dino-rsvp-description" role={confirmed ? 'status' : undefined}>{confirmed ? 'Así se vería tu confirmación. No se ha enviado ningún mensaje ni guardado tu respuesta.' : 'Esta es una demostración de RSVP. Puedes probar el botón con tranquilidad: no abriremos WhatsApp.'}</p>
      <div className={styles.rsvpActions}>
        {!confirmed && <button type="button" className={`${styles.action} ${styles.actionGreen}`} onClick={() => setConfirmed(true)}>Confirmar asistencia de prueba</button>}
        <button ref={closeButton} type="button" className={styles.smallAction} onClick={() => setOpen(false)}>{confirmed ? 'Cerrar' : 'Cancelar'}</button>
      </div>
    </dialog>
  </>;
}
