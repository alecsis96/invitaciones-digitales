import type { Metadata } from "next";
import { anaSofiaDemo } from "@/data/events/ana-sofia.demo";
import { XVInvitation } from "@/templates/xv/elegance-01/XVInvitation";

export const metadata: Metadata = {
  title: "Elegancia Contemporánea | SHER",
  description: "Plantilla de XV años Elegancia Contemporánea de SHER.",
};

export default function EleganciaContemporaneaPage() {
  return <XVInvitation event={anaSofiaDemo} />;
}
