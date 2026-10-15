import type { Metadata } from "next";
import { sofiaDanielBodaDemo } from "@/data/events/sofia-daniel.boda.demo";
import { BodaRomanceEditorialInvitation } from "@/templates/boda/romance-editorial/BodaRomanceEditorialInvitation";

export const metadata: Metadata = {
  title: "Romance Editorial | SHER",
  description: "Plantilla de boda Romance Editorial de SHER.",
};

export default function RomanceEditorialPage() {
  return <BodaRomanceEditorialInvitation event={sofiaDanielBodaDemo} />;
}
