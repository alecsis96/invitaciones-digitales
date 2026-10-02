import type { GiftRegistry as Gifts } from "@/types/invitation";
import { SectionTitle } from "./EventLocation";

function hasValidUrl(url?: string) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return (parsed.protocol === "https:" || parsed.protocol === "http:") && parsed.hostname !== "example.com";
  } catch {
    return false;
  }
}

export function GiftRegistry({ giftRegistry }: { giftRegistry?: Gifts }) {
  if (!giftRegistry) return null;
  const showCta = hasValidUrl(giftRegistry.url);
  if (!giftRegistry.description && !showCta) return null;

  return <section className="detail-section gift-section"><SectionTitle icon="♢" title={giftRegistry.title ?? "Mesa de regalos"} />{giftRegistry.description && <p>{giftRegistry.description}</p>}{showCta && <a href={giftRegistry.url} target="_blank" rel="noreferrer" className="pill-button">♢&nbsp;&nbsp; {giftRegistry.buttonLabel ?? "Ver mesa de regalos"}</a>}</section>;
}
