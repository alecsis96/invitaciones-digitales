"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/types/invitation";
import { SectionTitle } from "./EventLocation";

export function Gallery({ photos }: { photos?: GalleryPhoto[] }) {
  if (!photos?.length) return null;
  return <GalleryContent photos={photos.slice(0, 6)} />;
}

function GalleryContent({ photos }: { photos: GalleryPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const hasNavigation = photos.length > 1;
  const activePhoto = activeIndex === null ? null : photos[activeIndex];
  const shownIndex = activeIndex ?? 0;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => setActiveIndex(index => index === null ? null : (index - 1 + photos.length) % photos.length), [photos.length]);
  const showNext = useCallback(() => setActiveIndex(index => index === null ? null : (index + 1) % photos.length), [photos.length]);

  useEffect(() => {
    if (activeIndex === null) {
      previousFocusRef.current?.focus();
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => { document.body.style.overflow = originalOverflow; };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (hasNavigation && event.key === "ArrowLeft") showPrevious();
      if (hasNavigation && event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, close, hasNavigation, showNext, showPrevious]);

  const trapFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button:not([disabled])"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  return <section className={`gallery-section gallery-count-${photos.length}`}><SectionTitle icon="▣" title="Galería" /><div className="gallery-grid">{photos.map((photo, index) => <button className="gallery-trigger" type="button" key={`${photo.src}-${index}`} onClick={event => { previousFocusRef.current = event.currentTarget; setActiveIndex(index); }} aria-label={`Ver imagen ${index + 1}: ${photo.alt}`}><Image src={photo.src} alt={photo.alt} width={700} height={700} sizes="(max-width: 700px) 50vw, 280px" /></button>)}</div>{activePhoto && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Imagen ${shownIndex + 1} de ${photos.length}`} onClick={event => { if (event.target === event.currentTarget) close(); }} onKeyDown={trapFocus}><div className="gallery-lightbox-content" onPointerDown={event => { touchStartX.current = event.clientX; }} onPointerUp={event => { if (!hasNavigation || touchStartX.current === null) return; const distance = event.clientX - touchStartX.current; touchStartX.current = null; if (Math.abs(distance) < 40) return; if (distance > 0) showPrevious(); else showNext(); }}><button className="lightbox-close" type="button" ref={closeButtonRef} onClick={close} aria-label="Cerrar galería">×</button><Image className="lightbox-image" src={activePhoto.src} alt={activePhoto.alt} fill sizes="100vw" priority />{hasNavigation && <><button className="lightbox-control lightbox-previous" type="button" onClick={showPrevious} aria-label="Imagen anterior">‹</button><button className="lightbox-control lightbox-next" type="button" onClick={showNext} aria-label="Imagen siguiente">›</button><span className="lightbox-counter" aria-live="polite">{shownIndex + 1} / {photos.length}</span></>}</div></div>}</section>;
}
