import Image from 'next/image';
import type { ReactNode } from 'react';
import { dinoAsset } from './types';
import styles from './PequenaAventuraDino.module.css';

export function DinoIcon({ name, size = 35 }: { name: string; size?: number }) {
  return <Image src={dinoAsset(`icons/${name}.svg`)} width={size} height={size} alt="" aria-hidden="true" />;
}

export function DinoStationHeading({ icon, children, id }: {icon: string;children:ReactNode;id: string}) {
  return <div className={styles.stationTitle} data-dino-reveal>
    <DinoIcon name={icon} size={48} />
    <h2 id={id}>{children}</h2>
  </div>;
}

export function DinoAction({ children, icon, href, download, external, disabled, kind = 'paper' }: {
  children: ReactNode; icon?: string; href?: string; download?: string | boolean; external?: boolean; disabled?: boolean; kind?: 'paper' | 'green';
}) {
  const cls = `${styles.action} ${kind === 'green' ? styles.actionGreen : ''}`;
  const content = <>{icon && <DinoIcon name={icon} size={34}/>}<span>{children}</span></>;
  if (disabled || !href) return <span className={`${cls} ${styles.actionDisabled}`} aria-disabled="true">{content}</span>;
  return <a className={cls} href={href} download={download} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{content}</a>;
}
