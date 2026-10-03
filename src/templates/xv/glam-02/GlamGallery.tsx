"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/types/invitation";

export function GlamGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [trackIndex, setTrackIndex] = useState(1);
  const [logicalIndex, setLogicalIndex] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isLoopResetting, setIsLoopResetting] = useState(false);
  const startX = useRef<number | null>(null);
  const pauseTimer = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackIndexRef = useRef(1);
  const logicalIndexRef = useRef(0);
  const isTransitioning = useRef(false);
  const pendingMoves = useRef<number[]>([]);
  const moveRef = useRef<(direction: number, manual?: boolean) => void>(() => undefined);

  const pauseForInteraction = () => {
    setInteractionPaused(true);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => setInteractionPaused(false), 5200);
  };

  const syncIndexes = (nextTrackIndex: number, nextLogicalIndex: number) => {
    trackIndexRef.current = nextTrackIndex;
    logicalIndexRef.current = nextLogicalIndex;
    setTrackIndex(nextTrackIndex);
    setLogicalIndex(nextLogicalIndex);
  };

  const startMove = (direction: number) => {
    if (photos.length < 2) return;
    isTransitioning.current = true;
    setTransitionEnabled(true);
    const nextLogicalIndex = (logicalIndexRef.current + direction + photos.length) % photos.length;
    syncIndexes(trackIndexRef.current + direction, nextLogicalIndex);
  };

  const move = (direction: number, manual = true) => {
    if (photos.length < 2) return;
    if (manual) pauseForInteraction();
    if (isTransitioning.current) {
      pendingMoves.current.push(direction);
      return;
    }
    startMove(direction);
  };
  moveRef.current = move;

  useEffect(() => {
    if (photos.length < 2 || interactionPaused || !autoplayEnabled || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => moveRef.current(1, false), 5000);
    return () => window.clearInterval(id);
  }, [autoplayEnabled, interactionPaused, photos.length]);
  useEffect(() => () => {
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
  }, []);
  if (!photos.length) return null;
  const slides = photos.length > 1 ? [photos[photos.length - 1], ...photos, photos[0]] : photos;
  const settleLoop = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform" || photos.length < 2) return;
    const snappedTrackIndex = trackIndexRef.current === 0 ? photos.length : trackIndexRef.current === photos.length + 1 ? 1 : null;
    const continueWithQueue = () => {
      isTransitioning.current = false;
      const nextMove = pendingMoves.current.shift();
      if (nextMove !== undefined) startMove(nextMove);
    };
    if (snappedTrackIndex !== null) {
      setTransitionEnabled(false);
      setIsLoopResetting(true);
      syncIndexes(snappedTrackIndex, logicalIndexRef.current);
      window.requestAnimationFrame(() => {
        // Commit the clone-to-real transform without animating either slide.
        void trackRef.current?.offsetWidth;
        window.requestAnimationFrame(() => {
          setIsLoopResetting(false);
          setTransitionEnabled(true);
          continueWithQueue();
        });
      });
      return;
    }
    continueWithQueue();
  };

  const goTo = (index: number) => {
    pauseForInteraction();
    if (index === logicalIndexRef.current) return;
    pendingMoves.current = [];
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setTransitionEnabled(true);
    syncIndexes(index + 1, index);
  };

  return <section className="glam-gallery"><p>RECUERDOS</p><h2>Un poco de mi historia</h2>
    <div className={`glam-carousel ${isLoopResetting ? "is-resetting" : ""}`} onPointerDown={event => { pauseForInteraction(); startX.current = event.clientX; }} onPointerUp={event => { if (startX.current === null) return; const delta = event.clientX - startX.current; startX.current = null; if (Math.abs(delta) > 36) move(delta < 0 ? 1 : -1); }}>
      <div className="glam-carousel-viewport">
        <div className="glam-carousel-track" ref={trackRef} onTransitionEnd={settleLoop} style={{ transform: `translate3d(calc(10% - ${trackIndex * 82}%), 0, 0)`, transitionDuration: transitionEnabled ? undefined : "0ms" }}>
          {slides.map((photo, index) => {
            const isClone = photos.length > 1 && (index === 0 || index === slides.length - 1);
            const isActive = index === trackIndex;
            return <article className={`glam-carousel-slide ${isActive ? "is-active" : ""}`} key={`${photo.src}-${index}`} aria-hidden={isClone || !isActive}><Image src={photo.src} alt={!isClone && isActive ? photo.alt : ""} fill sizes="(max-width:700px) 80vw, 520px" priority={isActive && logicalIndex === 0} /></article>;
          })}
        </div>
      </div>
      {photos.length > 1 && <><button className="glam-gallery-prev" type="button" aria-label="Foto anterior" onClick={() => move(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14.5 5-7 7 7 7" /></svg></button><button className="glam-gallery-next" type="button" aria-label="Foto siguiente" onClick={() => move(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 5 7 7-7 7" /></svg></button></>}
    </div>
    {photos.length > 1 && <div className="glam-gallery-pagination"><div className="glam-dots">{photos.map((_, index) => <button type="button" key={index} aria-label={`Ver foto ${index + 1}`} aria-current={index === logicalIndex} className={index === logicalIndex ? "active" : ""} onClick={() => goTo(index)} />)}</div><button className="glam-gallery-autoplay" type="button" aria-label={autoplayEnabled ? "Pausar carrusel" : "Reanudar carrusel"} aria-pressed={autoplayEnabled} onClick={() => setAutoplayEnabled(current => !current)}>{autoplayEnabled ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6v12M16 6v12" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6V6Z" /></svg>}</button></div>}
  </section>;
}
