"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./SherHome.module.css";

export function SherHeroPreview() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const element = previewRef.current;
    if (reducedMotion || !element || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div
      ref={previewRef}
      className={`${styles.phoneViewport} ${!isVisible || reducedMotion ? styles.phoneJourneyPaused : ""}`.trim()}
      aria-hidden="true"
    >
      <Image
        className={styles.phoneJourney}
        src="/images/sher/hero/xv-01-journey.webp"
        alt=""
        width={360}
        height={1920}
        priority
        sizes="(min-width: 1080px) 280px, (min-width: 700px) 260px, 43vw"
      />
    </div>
  );
}
