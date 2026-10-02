import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";

const editorial = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-editorial", weight: ["400", "500", "600", "700"] });
const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600"] });
const script = Pinyon_Script({ subsets: ["latin"], variable: "--font-script", weight: "400" });

export const metadata: Metadata = {
  title: "XV de Ana Sofía | Invitación Digital",
  description: "Te invitamos a celebrar los XV años de Ana Sofía.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${editorial.variable} ${sans.variable} ${script.variable}`}>{children}</body></html>;
}
