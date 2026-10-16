import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SherBenefits } from "@/components/sher/SherBenefits";
import { SherCategories } from "@/components/sher/SherCategories";
import { SherHeader } from "@/components/sher/SherHeader";
import { SherHero } from "@/components/sher/SherHero";
import { SherExperiences } from "@/components/sher/SherExperiences";
import { SherCelebrationMarquee } from "@/components/sher/SherCelebrationMarquee";
import { SherInvitationIncludes } from "@/components/sher/SherInvitationIncludes";
import { SherPricing } from "@/components/sher/SherPricing";
import { SherProcess } from "@/components/sher/SherProcess";
import { SherTemplateCollection } from "@/components/sher/SherTemplateCollection";
import { SherFaq } from "@/components/sher/SherFaq";
import { SherCommercialClosing } from "@/components/sher/SherCommercialClosing";
import styles from "@/components/sher/SherHome.module.css";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

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
        <section className={styles.heroExperience} aria-labelledby="sher-hero-title">
          <SherHero />
          <SherBenefits />
        </section>
        <section className={styles.catalog} id="plantillas" aria-labelledby="catalog-title">
          <div className={styles.catalogIntro}>
            <p className={styles.eyebrow}>Nuestras plantillas</p>
            <h2 id="catalog-title">Diseños únicos para cada historia</h2>
          </div>
          <SherCategories />
        </section>
        <SherTemplateCollection />
        <SherExperiences />
        <SherInvitationIncludes />
        <SherCelebrationMarquee />
        <SherProcess />
        <SherPricing />
        <SherFaq />
        <SherCommercialClosing />
      </main>
    </div>
  );
}
