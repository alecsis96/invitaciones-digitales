'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './PequenaAventuraDino.module.css';

/** Entradas después de la apertura y loops solo en pantalla; sin listeners de scroll. */
export function DinoMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-dino-reveal], [data-dino-ambient]'));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const covered = root.querySelector<HTMLElement>('[data-dino-covered]');
    let revealObserver: IntersectionObserver | undefined;
    let ambientObserver: IntersectionObserver | undefined;
    const update = () => {
      revealObserver?.disconnect();
      ambientObserver?.disconnect();
      const ready = covered?.dataset.dinoCovered !== 'true';
      const reduced = media.matches;
      root.dataset.js = 'true';
      root.dataset.ready = String(ready);
      if (reduced || typeof IntersectionObserver === 'undefined') {
        nodes.forEach((el) => { el.dataset.visible = 'true'; el.dataset.ambientVisible = 'false'; });
        return;
      }
      nodes.forEach((el) => { el.dataset.ambientVisible = 'false'; });
      if (!ready) return;
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          (target as HTMLElement).dataset.visible = 'true';
          revealObserver?.unobserve(target);
        });
      }, { rootMargin: '0px 0px -4% 0px', threshold: 0.18 });
      ambientObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          (target as HTMLElement).dataset.ambientVisible = String(isIntersecting && !document.hidden);
        });
      }, { threshold: 0 });
      nodes.forEach((el) => {
        if (el.hasAttribute('data-dino-reveal') && el.dataset.visible !== 'true') revealObserver?.observe(el);
        if (el.hasAttribute('data-dino-ambient')) ambientObserver?.observe(el);
      });
    };
    const observer = new MutationObserver(update);
    // El scroll suave global no debe imponerse a quien solicita movimiento reducido.
    const navigate = (event: MouseEvent) => {
      if (!media.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#dino-"]') : null;
      const target = anchor && document.getElementById(anchor.hash.slice(1));
      if (!anchor || !target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.history.pushState(window.history.state, '', anchor.hash);
    };
    if (covered) observer.observe(covered, { attributes: true, attributeFilter: ['data-dino-covered'] });
    root.addEventListener('click', navigate);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      revealObserver?.disconnect();
      ambientObserver?.disconnect();
      observer.disconnect();
      root.removeEventListener('click', navigate);
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return <div ref={ref} className={styles.motionRoot}>{children}</div>;
}
