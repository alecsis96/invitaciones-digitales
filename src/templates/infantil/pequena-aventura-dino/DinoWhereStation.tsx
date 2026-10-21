import type { DinoEvent } from './types';
import { directionsUrl } from './location';
import { DinoExplorerMap } from './DinoExplorerMap';
import styles from './PequenaAventuraDino.module.css';

export function DinoWhereStation({ event }: {event:DinoEvent}) {
  const directions = directionsUrl(event);
  return <section className={`${styles.station} ${styles.where}`} id="dino-where" aria-labelledby="dino-where-title">
    <div className={styles.whereContent}>
      <h2 className={styles.whereHeading} id="dino-where-title">¿Dónde será la aventura?</h2>
      <DinoExplorerMap>
        <h3>{event.venue.trim() || 'Lugar por confirmar'}</h3>
        {event.address && <p className={styles.explorerAddress}>{event.address}</p>}
        <div className={styles.explorerActions}>
          {directions ? <a className={`${styles.action} ${styles.actionGreen}`} href={directions} target="_blank" rel="noopener noreferrer">
            Cómo llegar<span className={styles.explorerSr}> (Google Maps, otra pestaña)</span>
          </a> : <span className={styles.explorerUnavailable}>Ruta por confirmar</span>}
        </div>
      </DinoExplorerMap>
    </div>
  </section>;
}
