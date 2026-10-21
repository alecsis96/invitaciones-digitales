'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { dinoAsset } from './types';
import styles from './PequenaAventuraDino.module.css';

type Opening = 'static' | 'armed' | 'opening' | 'open';

function useDinoBlink(enabled: boolean, offset: number) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    setBlink(false);
    if (!enabled) return;
    let next: ReturnType<typeof setTimeout>;
    let reopen: ReturnType<typeof setTimeout>;
    const schedule = () => {
      next = setTimeout(() => {
        setBlink(true);
        reopen = setTimeout(() => { setBlink(false); schedule(); }, 120);
      }, 5000 + offset + Math.random() * 4000);
    };
    schedule();
    return () => { clearTimeout(next); clearTimeout(reopen); };
  }, [enabled, offset]);
  return blink;
}

/** El contenido procede del servidor; el mapa se abre sin deformar sus ilustraciones. */
export function DinoExplorerMap({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const roll = useRef<HTMLDivElement>(null);
  const animal = useRef<HTMLDivElement>(null);
  const triceratops = useRef<HTMLDivElement>(null);
  const phase = useRef<Opening>('static');
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [opening, setOpening] = useState<Opening>('static');
  const [ambient, setAmbient] = useState(false);
  const [triceratopsAmbient, setTriceratopsAmbient] = useState(false);
  const [closedReady, setClosedReady] = useState(false);
  const [triceratopsReady, setTriceratopsReady] = useState(false);
  const blink = useDinoBlink(ambient && closedReady, 0);
  const triceratopsBlink = useDinoBlink(triceratopsAmbient && triceratopsReady, 1800);
  const [rollReady, setRollReady] = useState(false);

  const finish = useCallback(() => {
    if (finishTimer.current !== null) clearTimeout(finishTimer.current);
    if (startTimer.current !== null) clearTimeout(startTimer.current);
    phase.current = 'open';
    setOpening('open');
  }, []);

  useLayoutEffect(() => {
    const node = root.current;
    const rollNode = roll.current;
    if (!node || !rollNode || typeof IntersectionObserver === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let trigger: IntersectionObserver | undefined;
    let animalVisible = false;
    let triceratopsVisible = false;
    const updateAmbient = () => {
      const moving = !media.matches && !document.hidden;
      setAmbient(animalVisible && moving);
      setTriceratopsAmbient(triceratopsVisible && moving);
    };
    const observeScrollEntrance = () => {
      trigger?.disconnect();
      if (phase.current !== 'armed' || media.matches) return;
      // Esperar al rollo visible y cargado, sin exigir que quepa todo el pergamino.
      const threshold = Math.min(.7, window.innerHeight * .25 / Math.max(1, rollNode.getBoundingClientRect().height));
      trigger = new IntersectionObserver(([entry]) => {
        if (phase.current !== 'armed') { trigger?.disconnect(); return; }
        if (document.hidden || !entry.isIntersecting || entry.intersectionRatio + .001 < threshold) {
          if (startTimer.current !== null) clearTimeout(startTimer.current);
          startTimer.current = null;
          if (finishTimer.current !== null) clearTimeout(finishTimer.current);
          return;
        }
        if (!rollReady) {
          // El límite de espera cuenta solo mientras el rollo está a la vista.
          if (finishTimer.current !== null) clearTimeout(finishTimer.current);
          finishTimer.current = setTimeout(finish, 8000);
          return;
        }
        if (startTimer.current !== null) clearTimeout(startTimer.current);
        startTimer.current = setTimeout(() => {
          if (phase.current !== 'armed' || document.hidden) return;
          startTimer.current = null;
          phase.current = 'opening';
          setOpening('opening');
          trigger?.disconnect();
          finishTimer.current = setTimeout(finish, 2600);
        }, 850);
      }, { threshold, rootMargin: '0px 0px -15% 0px' });
      trigger.observe(rollNode);
    };
    // SSR abierto. Armar solo fuera de pantalla: nunca rebobinar una ilustración ya visible.
    if (phase.current === 'static' && !media.matches && node.getBoundingClientRect().top >= window.innerHeight) {
      phase.current = 'armed';
      setOpening('armed');
    }
    observeScrollEntrance();
    const visibility = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === animal.current) { animalVisible = entry.isIntersecting; updateAmbient(); }
        if (entry.target === triceratops.current) { triceratopsVisible = entry.isIntersecting; updateAmbient(); }
        if (entry.target === node && !entry.isIntersecting && phase.current === 'opening') finish();
      });
    });
    visibility.observe(node);
    if (animal.current) visibility.observe(animal.current);
    if (triceratops.current) visibility.observe(triceratops.current);
    const preference = () => {
      if (media.matches) { trigger?.disconnect(); if (startTimer.current !== null) clearTimeout(startTimer.current); finish(); }
      updateAmbient();
    };
    const documentVisibility = () => {
      if (document.hidden && phase.current === 'opening') finish();
      updateAmbient();
      if (document.hidden && startTimer.current !== null) clearTimeout(startTimer.current);
      if (!document.hidden) observeScrollEntrance();
    };
    media.addEventListener('change', preference);
    document.addEventListener('visibilitychange', documentVisibility);
    window.addEventListener('resize', observeScrollEntrance);
    return () => {
      trigger?.disconnect();
      visibility.disconnect();
      if (finishTimer.current !== null) clearTimeout(finishTimer.current);
      if (startTimer.current !== null) clearTimeout(startTimer.current);
      media.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', documentVisibility);
      window.removeEventListener('resize', observeScrollEntrance);
    };
  }, [finish, rollReady]);

  return <div ref={root} className={styles.explorer} data-opening={opening} data-animal-active={ambient}>
    <div className={styles.explorerFold}>
      <div className={styles.explorerReveal} onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && phase.current === 'opening') finish();
      }}>
        <div className={styles.explorerRevealInner}>
          <div className={styles.explorerPaper} onFocusCapture={finish}>
            <div className={styles.explorerArt} aria-hidden="true">
              <div className={styles.explorerArtTop}>
                <Image src={dinoAsset('decor/explorer-map-extended.webp')} alt="" width={997} height={1578} sizes="(max-width: 540px) 96vw, 500px" />
              </div>
              <div className={styles.explorerArtBody}>
                <div className={styles.explorerArtBottom}>
                  <Image src={dinoAsset('decor/explorer-map-extended.webp')} alt="" width={997} height={1578} sizes="(max-width: 540px) 96vw, 500px" />
                </div>
              </div>
            </div>
            <div className={styles.explorerHeader} aria-hidden="true" />
            <div className={styles.explorerDetails}>{children}</div>
          </div>
        </div>
      </div>
      <div ref={roll} className={styles.explorerRoll} aria-hidden="true">
        <Image
          src={dinoAsset('decor/explorer-map-closed.webp')}
          alt=""
          width={1000}
          height={305}
          sizes="(max-width: 540px) 88vw, 430px"
          onLoad={() => setRollReady(true)}
          onError={finish}
        />
      </div>
    </div>
    <div ref={animal} className={styles.whereDino} aria-hidden="true" data-blink={blink && ambient} data-active={ambient}>
      <Image src={dinoAsset('characters/dino-sauropod.webp')} alt="" width={1156} height={1229} sizes="(min-width: 1100px) 230px, 160px" />
      <Image className={styles.whereClosedEyes} src={dinoAsset('characters/dino-sauropod-eyes-closed.webp')}
        alt="" width={1254} height={1254} sizes="(min-width: 1100px) 230px, 160px" onLoad={() => setClosedReady(true)} />
    </div>
    <div ref={triceratops} className={`${styles.whereDino} ${styles.whereTriceratops}`} aria-hidden="true"
      data-blink={triceratopsBlink && triceratopsAmbient} data-active={triceratopsAmbient}>
      <Image src={dinoAsset('characters/dino-triceratops.webp')} alt="" width={1254} height={1254} sizes="(min-width: 1100px) 230px, 150px" />
      <Image className={styles.whereClosedEyes} src={dinoAsset('characters/dino-triceratops-eyes-closed.webp')}
        alt="" width={1254} height={1254} sizes="(min-width: 1100px) 230px, 150px"
        onLoad={() => setTriceratopsReady(true)} onError={() => setTriceratopsReady(false)} />
    </div>
    <div className={styles.whereFoliage} aria-hidden="true">
      <Image src={dinoAsset('decor/foliage-foreground.webp')} alt="" width={1672} height={941} sizes="(min-width: 1100px) 340px, 230px" />
    </div>
  </div>;
}
