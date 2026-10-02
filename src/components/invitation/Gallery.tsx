import Image from "next/image";
import type { GalleryPhoto } from "@/types/invitation";
import { SectionTitle } from "./EventLocation";
export function Gallery({ photos }: { photos?: GalleryPhoto[] }) {
  if (!photos?.length) return null;
  return <section className={`gallery-section gallery-count-${Math.min(photos.length, 6)}`}><SectionTitle icon="▣" title="Galería" /><div className="gallery-grid">{photos.slice(0, 6).map((photo, index) => <Image key={`${photo.src}-${index}`} src={photo.src} alt={photo.alt} width={700} height={700} sizes="(max-width: 700px) 50vw, 280px" />)}</div></section>;
}
