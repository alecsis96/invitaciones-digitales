import Image from 'next/image';
import type { DinoEvent } from './types';
import { dinoAsset } from './types';
import styles from './DinoHero.module.css';

export function DinoHero({ event }: { event: DinoEvent }) {
  const name = event.name.trim() || 'Nuestro pequeño';
  const hasPhoto = !!(event.heroPhotoCutout || event.heroPhotoOriginal);
  const validAge = Number.isSafeInteger(event.age) && event.age > 0;
  const ageWord = event.age === 1 ? 'añito' : 'añitos';
  return <section className={`${styles.hero} ${!hasPhoto ? styles.heroWithoutPhoto : !event.heroPhotoCutout ? styles.heroFramed : ''}`} id="dino-hero" aria-labelledby="dino-hero-title">
    <div className={styles.landscape} aria-hidden="true" />
    <div className={styles.skywash} aria-hidden="true" />
    <div className={styles.sceneAmbience} aria-hidden="true">
      {Array.from({ length: 10 }, (_, index) => <i key={index} className={styles.leaf} data-dino-ambient />)}
    </div>
    <div className={`${styles.layer} ${styles.balloons}`} aria-hidden="true" data-dino-ambient>
      <Image src={dinoAsset('decor/celebration-balloons.webp')} alt="" fill sizes="(min-width: 800px) 210px, (min-width: 600px) 150px, 115px" />
    </div>
    <div className={`${styles.layer} ${styles.sauropod} ${hasPhoto ? '' : styles.sauropodSolo}`} aria-hidden="true" data-dino-ambient>
      <Image src={dinoAsset('characters/dino-sauropod.webp')} alt="" fill sizes="(min-width: 800px) 330px, (min-width: 600px) 285px, 210px" />
    </div>
    <div className={`${styles.layer} ${styles.triceratops}`} aria-hidden="true" data-dino-ambient>
      <Image src={dinoAsset('characters/dino-triceratops.webp')} alt="" fill sizes="(min-width: 800px) 250px, (min-width: 600px) 188px, 149px" />
    </div>
    <div className={`${styles.layer} ${styles.master}`} aria-hidden="true" data-dino-ambient>
      <Image src={dinoAsset('characters/dino-master.webp')} alt="" fill sizes="(min-width: 800px) 290px, (min-width: 600px) 190px, 154px" />
    </div>
    {hasPhoto && <div className={`${styles.layer} ${styles.baby} ${!event.heroPhotoCutout ? styles.babyFramed : ''}`}>
      {event.heroPhotoCutout ?
        <Image src={event.heroPhotoCutout} alt={event.heroPhotoAlt || `Fotografía de ${name}, el cumpleañero`} fill priority sizes="(min-width: 800px) 42vw, (min-width: 600px) 510px, 84vw" /> :
        <>
          <Image src={event.heroPhotoOriginal!} alt={event.heroPhotoAlt || `Fotografía de ${name}`} fill priority sizes="(min-width: 800px) 42vw, (min-width: 600px) 510px, 84vw" className={styles.framedPhoto} />
          <Image src={dinoAsset('frames/photo-frame.webp')} alt="" fill sizes="(min-width: 800px) 42vw, 84vw" aria-hidden="true" />
        </>}
    </div>}
    <div className={styles.foreground} aria-hidden="true" data-dino-ambient>
      <Image src={dinoAsset('decor/foliage-foreground.webp')} alt="" fill sizes="100vw" />
    </div>
    <div className={styles.copy}>
      <div className={styles.partyBoard}>
        <Image src={dinoAsset('decor/wooden-cta.webp')} alt="" fill sizes="(min-width: 800px) 440px, 305px" aria-hidden="true" />
        <p>¡Estamos de fiesta!</p>
      </div>
      <h1 tabIndex={-1} id="dino-hero-title" className={`${styles.name} ${name.length > 9 ? styles.nameLong : ''} ${name.length > 24 ? styles.nameVeryLong : ''}`}>{name}</h1>
    </div>
    {validAge && <div className={`${styles.ageIndicator} ${event.age > 9 ? styles.ageMultiple : ''}`} aria-label={`Cumple ${event.age} ${ageWord}`}>
      <span className={styles.ageNumber} aria-hidden="true">{event.age}</span><span className={styles.ageWord} aria-hidden="true">{ageWord}</span>
    </div>}
  </section>;
}
