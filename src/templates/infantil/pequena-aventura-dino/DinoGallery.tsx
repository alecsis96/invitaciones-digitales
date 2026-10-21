'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { DinoGalleryPhoto } from './types';
import { dinoAsset } from './types';
import styles from './PequenaAventuraDino.module.css';

export function DinoGallery({ photos = [] }: {photos?:DinoGalleryPhoto[]}) {
  const items = photos.slice(0, 5).filter((photo) => Boolean(photo?.src && photo.alt));
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const current = items[Math.min(selected, items.length - 1)];
  useEffect(() => {
    if (!lightbox) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = oldOverflow; lastFocus.current?.focus(); };
  }, [lightbox]);
  if (!items.length || !current) return null;
  const move = (step: number) => setSelected((prev) => (prev + step + items.length) % items.length);
  const open = () => { lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setLightbox(true); };
  return <section className={styles.gallery} id="dino-gallery" aria-labelledby="dino-gallery-title">
    <div className={styles.galleryContent}>
      <div className={styles.galleryHeading} data-dino-reveal>
        <p className={styles.sectionOverline}>Un año de grandes descubrimientos</p>
        <h2 id="dino-gallery-title" className={styles.scriptHeading}>Nuestros recuerdos</h2>
      </div>
      <div className={styles.galleryStage} data-dino-reveal>
        {items.length > 1 && <button type="button" className={styles.galleryArrow} aria-label="Fotografía anterior" onClick={() => move(-1)}><Image src={dinoAsset('icons/flecha-izquierda.svg')} alt="" width={38} height={38}/></button>}
        <button type="button" className={styles.photoButton} onClick={open} aria-label={`Ampliar fotografía ${selected + 1}: ${current.alt}`}>
          <div key={selected} className={styles.memoryFrame}>
            <Image src={current.src} alt={current.alt} width={800} height={1067} sizes="(max-width: 768px) 65vw, 33vw" style={{objectPosition: current.objectPosition || 'center'}} className={styles.galleryPhoto}/>
            <Image src={dinoAsset('frames/gallery-frame-memory.webp')} alt="" width={1086} height={1448} className={styles.memoryFrameOverlay} aria-hidden="true" />
          </div>
        </button>
        {items.length > 1 && <button type="button" className={styles.galleryArrow} aria-label="Fotografía siguiente" onClick={() => move(1)}><Image src={dinoAsset('icons/flecha-derecha.svg')} alt="" width={38} height={38}/></button>}
      </div>
      {current.caption && <p className={styles.galleryCaption} aria-live="polite">{current.caption}</p>}
      {items.length > 1 && <div className={styles.galleryThumbs} aria-label="Elegir fotografía" data-dino-reveal>
        {items.map((photo, index) => <button type="button" key={`${photo.src}-${index}`} className={`${styles.thumb} ${selected === index ? styles.thumbSelected : ''}`}
          aria-label={`Mostrar fotografía ${index + 1}: ${photo.alt}`} aria-pressed={selected === index} onClick={() => setSelected(index)}>
          <Image src={photo.src} alt="" width={110} height={110} sizes="72px" style={{objectPosition:photo.objectPosition || 'center'}} />
        </button>)}
      </div>}
    </div>
    {lightbox && <div role="dialog" aria-modal="true" aria-label="Fotografía ampliada" className={styles.lightbox}
      onClick={(e) => { if (e.target === e.currentTarget) setLightbox(false); }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') { e.preventDefault(); setLightbox(false); }
        if (e.key === 'ArrowLeft' && items.length > 1) { e.preventDefault(); move(-1); }
        if (e.key === 'ArrowRight' && items.length > 1) { e.preventDefault(); move(1); }
        if (e.key === 'Tab') {
          const controls = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
        }
      }}>
      <button ref={closeRef} type="button" className={styles.lightboxClose} onClick={() => setLightbox(false)}>Cerrar ✕</button>
      <div className={styles.lightboxPhoto}><Image src={current.src} alt={current.alt} width={1086} height={1448} sizes="90vw" style={{objectFit:'contain'}} /></div>
      <p>{selected + 1} / {items.length}{current.caption ? ` · ${current.caption}` : ''}</p>
      {items.length > 1 && <div className={styles.lightboxNav}><button type="button" onClick={() => move(-1)}>← Anterior</button><button type="button" onClick={() => move(1)}>Siguiente →</button></div>}
    </div>}
  </section>;
}
