import Image from "next/image";
import type { BodaGalleryPhoto } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

const MAX_GALLERY_PHOTOS = 5;

function validPhotos(photos?: BodaGalleryPhoto[]) {
  const seen = new Set<string>();

  return (photos ?? []).filter(photo => {
    const src = photo.src?.trim();
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  }).slice(0, MAX_GALLERY_PHOTOS);
}

export function BodaGallery({ photos }: { photos?: BodaGalleryPhoto[] }) {
  const items = validPhotos(photos);
  if (!items.length) return null;

  return (
    <section className={styles.gallery} aria-labelledby="boda-gallery-title">
      <header className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>Recuerdos</p>
        <h2 id="boda-gallery-title">Momentos que guardamos</h2>
      </header>
      <div className={`${styles.galleryGrid} ${styles[`galleryCount${items.length}`]}`}>
        {items.map((photo, index) => {
          const orientation = photo.orientation ?? "portrait";
          return (
            <figure className={`${styles.galleryItem} ${styles[`gallery${orientation[0].toUpperCase()}${orientation.slice(1)}`]}`} key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={index === 0 ? "(max-width: 699px) 100vw, 420px" : "(max-width: 699px) 50vw, 340px"}
                style={{ objectPosition: photo.objectPosition ?? "center" }}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
