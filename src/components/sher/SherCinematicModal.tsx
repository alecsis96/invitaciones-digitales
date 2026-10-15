"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SherHome.module.css";

export function SherCinematicModal({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
      overflow: document.documentElement.style.overflow,
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = parseFloat(getComputedStyle(body).paddingRight);

    dialog.showModal();
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = "100%";
    body.style.paddingRight = `${paddingRight + scrollbarWidth}px`;
    document.documentElement.style.overflow = "hidden";
    const video = videoRef.current;

    return () => {
      video?.pause();
      dialog.close();
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.width = previous.width;
      body.style.paddingRight = previous.paddingRight;
      document.documentElement.style.overflow = previous.overflow;
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog ref={dialogRef} className={styles.cinematicDialog} aria-labelledby="cinematic-modal-title" aria-describedby="cinematic-modal-description" onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className={styles.cinematicDialogHeader}>
        <h3 id="cinematic-modal-title">SHER Cinemática · Ana Sofía</h3>
        <button type="button" autoFocus onClick={onClose} aria-label="Cerrar video">✕</button>
      </div>
      <video ref={videoRef} className={styles.cinematicVideo} src="/videos/sher/cinematica-xv01-teaser.mp4" controls playsInline preload="metadata" aria-label="Teaser de Ana Sofía" onError={() => setHasError(true)} />
      <p id="cinematic-modal-description" className={styles.cinematicVideoDescription}>Un sobre se abre y se transforma en un jardín, revelando a Ana Sofía con su vestido de XV años.</p>
      {hasError && <p role="alert">No se pudo cargar el video. Cierra esta ventana e inténtalo de nuevo.</p>}
    </dialog>,
    document.getElementById("main-content")?.parentElement ?? document.body,
  );
}
