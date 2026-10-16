import type { Metadata } from "next";
import { SherTemplateDemo } from "@/components/sher/SherTemplateDemo";
import { anaSofiaDemo } from "@/data/events/ana-sofia.demo";
import { XVInvitation } from "@/templates/xv/elegance-01/XVInvitation";

export const metadata: Metadata = {
  title: "Elegancia Contemporánea | SHER",
  description: "Plantilla de XV años Elegancia Contemporánea de SHER.",
};

export default function EleganciaContemporaneaPage() {
  return <SherTemplateDemo templateId="xv-01"><XVInvitation event={anaSofiaDemo} /></SherTemplateDemo>;
}
