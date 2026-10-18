import type { Metadata } from "next";
import { SherTemplateDemo } from "@/components/sher/SherTemplateDemo";
import { sofiaDanielBodaDemo } from "@/data/events/sofia-daniel.boda.demo";
import { BodaRomanceEditorialInvitation } from "@/templates/boda/romance-editorial/BodaRomanceEditorialInvitation";
import { BodaDemoExperience, BodaDemoReplayAction } from "@/templates/boda/romance-editorial/BodaDemoExperience";

export const metadata: Metadata = {
  title: "Romance Editorial | SHER",
  description: "Plantilla de boda Romance Editorial de SHER.",
  robots: { index: false, follow: false },
};

export default function RomanceEditorialPage() {
  return (
    <BodaDemoExperience music={sofiaDanielBodaDemo.music}>
      <SherTemplateDemo templateId="boda-01" demoActions={<BodaDemoReplayAction />}>
        <BodaRomanceEditorialInvitation event={sofiaDanielBodaDemo} />
      </SherTemplateDemo>
    </BodaDemoExperience>
  );
}
