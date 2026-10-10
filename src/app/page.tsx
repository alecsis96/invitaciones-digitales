import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SherBenefits } from "@/components/sher/SherBenefits";
import { SherCategories } from "@/components/sher/SherCategories";
import { SherHeader } from "@/components/sher/SherHeader";
import { SherHero } from "@/components/sher/SherHero";
import { SherTemplateCollection } from "@/components/sher/SherTemplateCollection";
import styles from "@/components/sher/SherHome.module.css";

const sherSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sher-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sherEditorial = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-sher-editorial",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Page() {
  return (
    <div className={`${styles.home} ${sherSans.variable} ${sherEditorial.variable}`}>
      <SherHeader />
      <main id="main-content" tabIndex={-1}>
        <SherHero />
        <SherBenefits />
        <section className={styles.catalog} id="plantillas" aria-labelledby="catalog-title">
          <div className={styles.catalogIntro}>
            <p className={styles.eyebrow}>Explora SHER</p>
            <h2 id="catalog-title">Plantillas para celebrar <em>momentos únicos.</em></h2>
          </div>
          <SherCategories />
          <SherTemplateCollection />
        </section>
      </main>
    </div>
  );
}
