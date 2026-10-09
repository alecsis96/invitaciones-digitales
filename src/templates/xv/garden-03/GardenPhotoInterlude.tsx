import Image from "next/image";

export function GardenPhotoInterlude({ image, alt, alignment = "left", deckled = false }: { image?: string; alt: string; alignment?: "left" | "right" | "full"; deckled?: boolean }) {
  if (!image) return null;
  return <section className={`garden-photo garden-photo-${alignment} ${deckled ? "garden-photo-deckled-edge" : ""}`}><Image src={image} alt={alt} fill sizes="(max-width: 700px) 100vw, 700px" /></section>;
}
