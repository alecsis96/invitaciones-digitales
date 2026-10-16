import Image from "next/image";
import type { BodaColor, BodaDressExample, BodaRomanceEditorialData } from "./types";
import styles from "./BodaRomanceEditorialInvitation.module.css";

type DressCode = BodaRomanceEditorialData["dressCode"];

function validColors(colors?: BodaColor[]) {
  return (colors ?? []).filter(color => color.value?.trim()).map(color => ({ ...color, label: color.label?.trim() || color.value }));
}

function validExamples(examples?: BodaDressExample[]) {
  return (examples ?? []).filter(example => example.image?.trim()).slice(0, 2);
}

function Palette({ title, colors, variant }: { title: string; colors: BodaColor[]; variant: "suggested" | "restricted" }) {
  if (!colors.length) return null;

  return (
    <section className={`${styles.dressPalette} ${variant === "restricted" ? styles.dressPaletteRestricted : ""}`} aria-label={title}>
      <h3>{title}</h3>
      <ul>
        {colors.map(color => <li key={`${color.value}-${color.label}`}><i style={{ backgroundColor: color.value }} aria-hidden="true" /><span>{color.label}</span></li>)}
      </ul>
    </section>
  );
}

export function BodaDressCode({ dressCode }: { dressCode?: DressCode }) {
  const suggested = validColors(dressCode?.suggestedColors);
  const restricted = validColors(dressCode?.restrictedColors);
  const examples = validExamples(dressCode?.examples);
  const hasIntro = Boolean(dressCode?.style?.trim() || dressCode?.description?.trim());

  if (!hasIntro && !suggested.length && !restricted.length && !examples.length) return null;

  return (
    <section className={styles.dressCode} aria-labelledby="boda-dress-title">
      {dressCode?.botanical?.src ? <Image className={styles.dressBotanical} {...dressCode.botanical} alt="" sizes="160px" /> : null}
      <header className={styles.sectionHeader}>
        <p className={styles.sectionEyebrow}>Código de vestimenta</p>
        {dressCode?.style?.trim() ? <h2 id="boda-dress-title">{dressCode.style}</h2> : <h2 id="boda-dress-title">Vestimenta</h2>}
        {dressCode?.description?.trim() ? <p className={styles.dressDescription}>{dressCode.description}</p> : null}
      </header>
      {suggested.length || restricted.length ? <div className={styles.dressPalettes}><Palette title="Colores sugeridos" colors={suggested} variant="suggested" /><Palette title="Colores reservados" colors={restricted} variant="restricted" /></div> : null}
      {examples.length ? <div className={styles.dressExamples}>{examples.map(example => <figure key={`${example.label}-${example.image}`}><div><Image src={example.image!} alt={example.imageAlt ?? example.label} fill sizes="(max-width: 699px) 50vw, 280px" /></div><figcaption><strong>{example.label}</strong>{example.description ? <span>{example.description}</span> : null}</figcaption></figure>)}</div> : null}
    </section>
  );
}
