import type { DinoEvent } from './types';
import { DinoHero } from './DinoHero';
import { DinoWhenStation } from './DinoWhenStation';
import { DinoWhereStation } from './DinoWhereStation';
import { DinoGallery } from './DinoGallery';
import { DinoClosing } from './DinoClosing';
import { dinoFonts } from './fonts';
import styles from './PequenaAventuraDino.module.css';

/** Componente servidor: no depende de Browser APIs ni del wrapper comercial. */
export function PequenaAventuraDinoInvitation({ event }: { event: DinoEvent }) {
  return <main className={`${styles.invitation} ${dinoFonts}`} data-dino-template="infantil-01">
    <nav className={styles.quickNav} aria-label="Secciones de la invitación">
      <a href="#dino-hero">Inicio</a>
      <a href="#dino-when">Fecha</a>
      <a href="#dino-where">Lugar</a>
      {!!event.galleryPhotos?.length && <a href="#dino-gallery">Galería</a>}
      <a href="#dino-closing">Confirmar</a>
    </nav>
    <DinoHero event={event}/>
    <DinoWhenStation event={event}/>
    <DinoWhereStation event={event}/>
    <DinoGallery photos={event.galleryPhotos}/>
    <DinoClosing event={event}/>
  </main>;
}
