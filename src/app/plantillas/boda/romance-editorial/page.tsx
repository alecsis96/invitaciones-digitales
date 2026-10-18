import type { Metadata } from "next";
import { sofiaDanielBodaDemo } from "@/data/events/sofia-daniel.boda.demo";
import { BodaRomanceEditorialInvitation } from "@/templates/boda/romance-editorial/BodaRomanceEditorialInvitation";
import { BodaLinenOpening } from "@/templates/boda/romance-editorial/BodaLinenOpening";
import { BodaNarrativeMotion } from "@/templates/boda/romance-editorial/BodaNarrativeMotion";
import { BodaMusic } from "@/templates/boda/romance-editorial/BodaMusic";

export const metadata: Metadata = {
  title: "Romance Editorial | SHER",
  description: "Plantilla de boda Romance Editorial de SHER.",
};

export default function RomanceEditorialPage() {
  return <BodaMusic music={sofiaDanielBodaDemo.music}><BodaNarrativeMotion><BodaLinenOpening><BodaRomanceEditorialInvitation event={sofiaDanielBodaDemo} /></BodaLinenOpening></BodaNarrativeMotion></BodaMusic>;
}
