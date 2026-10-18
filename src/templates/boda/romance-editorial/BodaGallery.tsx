import Image from "next/image";
import type { CSSProperties } from "react";
import type { BodaGalleryPhoto } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

const MAX_GALLERY_PHOTOS = 5;

const aspectRatios = { portrait: "3 / 4", landscape: "4 / 3", square: "1" };

// Shared rows use one ratio; the lead image stretches across its desktop rows.
function rowRatios(items: BodaGalleryPhoto[], index: number): CSSProperties {
  const count = items.length;
  const mobileIndex = index === 0 || count === 2 || (count === 4 && index === 3)
    ? index : index % 2 === 0 ? index - 1 : index;
  const desktopIndex = count === 2 ? 0 : count === 4 && index > 0 ? 1 : mobileIndex;
  return {
    "--gallery-mobile-ratio": aspectRatios[items[mobileIndex].orientation ?? "portrait"],
    "--gallery-desktop-ratio": aspectRatios[items[desktopIndex].orientation ?? "portrait"],
  } as CSSProperties;
}

function imageSizes(count: number, index: number) {
  const mobileFull = index === 0 || count === 2 || (count === 4 && index === 3);
  const mobile = mobileFull
    ? "(min-width: 536px) 496px, calc(100vw - 2.5rem)"
    : "(min-width: 536px) 243px, calc(50vw - 1.575rem)";
  const desktop = count === 1 || (count === 4 && index === 0) ? [664, "calc(100vw - 6rem)"]
    : count === 2 ? [325, "calc(50vw - 3.45rem)"]
    : count === 3 ? index === 0 ? [406, "calc(62.5vw - 4.3125rem)"] : [244, "calc(37.5vw - 2.5875rem)"]
    : count === 4 ? [212, "calc(33.334vw - 2.6rem)"]
    : index === 0 ? [262, "calc(41.177vw - 3.212rem)"] : [187, "calc(29.412vw - 2.295rem)"];
  return `(min-width: 760px) ${desktop[0]}px, (min-width: 700px) ${desktop[1]}, ${mobile}`;
}

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
  const mixedOrientations = items.some(photo => photo.orientation && photo.orientation !== "portrait");

  return (
    <section className={styles.gallery} aria-labelledby="boda-gallery-title">
      <header className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>Recuerdos</p>
        <h2 id="boda-gallery-title">Momentos que guardamos</h2>
      </header>
      <div className={`${styles.galleryGrid} ${styles[`galleryCount${items.length}`]} ${mixedOrientations ? styles.galleryMixed : ""}`}>
        {items.map((photo, index) => {
          const orientation = photo.orientation ?? "portrait";
          return (
            <figure className={`${styles.galleryItem} ${styles[`gallery${orientation[0].toUpperCase()}${orientation.slice(1)}`]}`} style={mixedOrientations ? rowRatios(items, index) : undefined} key={photo.src} data-boda-motion={index === 0 ? "gallery-lead" : "rise"} data-boda-motion-group={index === 0 ? undefined : "gallery-secondary"}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={imageSizes(items.length, index)}
                style={{ objectPosition: photo.objectPosition ?? "center" }}
              />
            </figure>
          );
        })}
      </div>
    </section>
  );
}
