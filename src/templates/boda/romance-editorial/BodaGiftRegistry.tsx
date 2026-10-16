"use client";

import Image from "next/image";
import { useState } from "react";
import type { BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

function validRegistryUrl(value?: string) {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function BodaGiftRegistry({ giftRegistry }: { giftRegistry?: BodaRomanceEditorialData["giftRegistry"] }) {
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  if (!giftRegistry || giftRegistry.enabled === false) return null;
  const url = validRegistryUrl(giftRegistry.url);
  const buttonLabel = giftRegistry.buttonLabel?.trim() || "Ver mesa de regalos";

  return (
    <section className={styles.gifts} aria-labelledby="boda-gifts-title">
      {giftRegistry.image ? <Image className={styles.giftIllustration} src={giftRegistry.image} alt={giftRegistry.imageAlt ?? ""} width={1122} height={1402} sizes="(max-width: 699px) 144px, 176px" /> : null}
      <div className={styles.giftsCopy}>
        <p className={styles.sectionEyebrow}>Mesa de regalos</p>
        <h2 id="boda-gifts-title">{giftRegistry.title?.trim() || "Tu compañía es nuestro mejor regalo"}</h2>
        {giftRegistry.description?.trim() ? <p className={styles.giftsMessage}>{giftRegistry.description}</p> : null}
        {url ? <a className={styles.giftLink} href={url} target="_blank" rel="noopener noreferrer">{buttonLabel}<span aria-hidden="true"> ↗</span></a> : giftRegistry.demoMode ? (
          <div className={styles.giftDemoAction}>
            <button className={styles.giftLink} type="button" onClick={() => setShowDemoNotice(true)}>{buttonLabel}</button>
            <div role="status" aria-live="polite" aria-atomic="true">
              {showDemoNotice ? <p className={styles.giftDemoNotice}>Esta es una demostración. En tu invitación, aquí se abrirá tu mesa de regalos.</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
