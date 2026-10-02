"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !ref.current || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
      setIsVisible(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`scroll-reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}>{children}</div>;
}
