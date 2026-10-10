import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SherBenefits } from "@/components/sher/SherBenefits";
import { SherHeader } from "@/components/sher/SherHeader";
import { SherHero } from "@/components/sher/SherHero";
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
      </main>
    </div>
  );
}
