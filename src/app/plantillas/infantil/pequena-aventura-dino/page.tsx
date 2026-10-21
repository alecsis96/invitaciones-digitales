import type { Metadata } from "next";
import { SherTemplateDemo } from "@/components/sher/SherTemplateDemo";
import { infantil01Demo } from "@/data/events/infantil-01-demo";
import { DinoDemoExperience } from "@/templates/infantil/pequena-aventura-dino/DinoDemoExperience";
import { DinoDemoReplayAction } from "@/templates/infantil/pequena-aventura-dino/DinoDemoReplayAction";
import { PequenaAventuraDinoInvitation } from "@/templates/infantil/pequena-aventura-dino/PequenaAventuraDinoInvitation";

export const metadata: Metadata = {
  title: "Mi Pequeña Aventura Dino | SHER",
  description: "Demostración de invitación infantil interactiva de SHER.",
  robots: { index: false, follow: false },
};

export default function PequenaAventuraDinoPage() {
  return (
    <DinoDemoExperience event={infantil01Demo}>
      <SherTemplateDemo templateId="infantil-01" demoActions={<DinoDemoReplayAction />}>
        <PequenaAventuraDinoInvitation event={infantil01Demo} />
      </SherTemplateDemo>
    </DinoDemoExperience>
  );
}
