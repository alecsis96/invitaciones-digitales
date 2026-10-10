import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";

const editorial = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-editorial", weight: ["400", "500", "600", "700"] });
const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "500", "600"] });
const script = Pinyon_Script({ subsets: ["latin"], variable: "--font-script", weight: "400" });

export const metadata: Metadata = {
  title: { default: "SHER | Invitaciones digitales", template: "%s" },
  description: "Invitaciones digitales interactivas y experiencias audiovisuales personalizadas para celebraciones especiales.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${editorial.variable} ${sans.variable} ${script.variable}`}>{children}</body></html>;
}
