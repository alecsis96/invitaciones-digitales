import type { DinoEvent } from './types';
import { safeWhatsAppUrl } from './utils';
import { DinoAction } from './DinoShared';
import { DinoDemoRsvp } from './DinoDemoRsvp';
import { DinoClosingScene } from './DinoClosingScene';
import styles from './PequenaAventuraDino.module.css';

export function DinoClosing({event}:{event:DinoEvent}) {
  const rsvp = safeWhatsAppUrl(event);
  return <section className={styles.closing} id="dino-closing" aria-labelledby="dino-closing-title">
    <DinoClosingScene/>
    <div className={styles.closingCard} data-dino-reveal>
      <h2 id="dino-closing-title" className={styles.scriptHeading}>¡Te esperamos!</h2>
      <p>Una aventura tan especial es todavía mejor contigo.</p>
      {event.isDemo ? <DinoDemoRsvp/> : rsvp ? <DinoAction kind="green" icon="whatsapp" href={rsvp} external>Confirmar por WhatsApp</DinoAction> : <p className={styles.note}>Confirmación por WhatsApp pendiente de configurar.</p>}
    </div>
  </section>;
}
