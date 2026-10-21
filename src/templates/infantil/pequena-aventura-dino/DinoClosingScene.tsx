'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { dinoAsset } from './types';
import styles from './PequenaAventuraDino.module.css';

/** Mismo parpadeo breve de Dónde, con registro ocular y temporizadores independientes. */
function ClosingDino({ kind, active, offset }: {
  kind: 'sauropod' | 'triceratops' | 'celebrating'; active: boolean; offset: number;
}) {
  const [ready, setReady] = useState(false);
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    setBlink(false);
    if (!active || !ready) return;
    let next: ReturnType<typeof setTimeout>;
    let reopen: ReturnType<typeof setTimeout>;
    const schedule = () => {
      next = setTimeout(() => {
        setBlink(true);
        reopen = setTimeout(() => { setBlink(false); schedule(); }, 120);
      }, 4500 + offset + Math.random() * 3000);
    };
    schedule();
    return () => { clearTimeout(next); clearTimeout(reopen); };
  }, [active, offset, ready]);
  const pose = kind === 'sauropod' ? styles.closingSauropod : kind === 'triceratops' ? styles.closingTriceratops : styles.closingMaster;
  const closed = kind === 'celebrating' ? 'dino-celebrando-eyes-closed.webp' : `dino-${kind}-eyes-closed.webp`;
  return <div className={`${styles.closingCharacter} ${pose}`} data-blink={blink && active}>
    <Image src={dinoAsset(`characters/dino-${kind}.webp`)} alt="" width={kind === 'sauropod' ? 1156 : 1254}
      height={kind === 'sauropod' ? 1229 : 1254} sizes="(max-width: 600px) 40vw, 350px" />
    <Image className={styles.closingEyes} src={dinoAsset(`characters/${closed}`)} alt="" width={1254} height={1254}
      sizes="(max-width: 600px) 44vw, 380px" onLoad={() => setReady(true)} onError={() => setReady(false)} />
  </div>;
}

export function DinoClosingScene() {
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);
  const [active, setActive] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  useEffect(() => {
    const node = root.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      const moving = visible && !document.hidden && !media.matches;
      setActive(moving);
      if (visible && !document.hidden && !played.current) {
        played.current = true;
        if (!media.matches) setCelebrated(true);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .15;
      update();
    }, { threshold: [0, .15] });
    observer.observe(node);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return <div ref={root} className={styles.closingScene} data-active={active} data-party={celebrated}
    role="img" aria-label="Tres dinosaurios celebran alrededor de un pastel de selva, entre globos y banderines">
    <div aria-hidden="true">
      <Image className={styles.closingBunting} src={dinoAsset('decor/celebration-bunting.webp')} alt="" width={2048} height={682} sizes="(max-width: 600px) 100vw, 950px" />
      <Image className={styles.closingBalloons} src={dinoAsset('decor/celebration-balloons.webp')} alt="" width={1086} height={1448} sizes="(max-width: 600px) 25vw, 200px" />
      <ClosingDino kind="sauropod" active={active} offset={0}/>
      <ClosingDino kind="celebrating" active={active} offset={1500}/>
      <ClosingDino kind="triceratops" active={active} offset={3000}/>
      <Image className={styles.closingCake} src={dinoAsset('decor/pastel-selva-v2.webp')} alt="" width={1312} height={1199} sizes="(max-width: 600px) 45vw, 405px" />
      <div className={styles.closingConfetti}><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
    </div>
  </div>;
}
