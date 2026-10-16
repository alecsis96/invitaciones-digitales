import type { Metadata } from "next";
import { SherTemplateDemo } from "@/components/sher/SherTemplateDemo";
import { camilaGlamDemo } from "@/data/events/camila.glam.demo";
import { XVGlamInvitation } from "@/templates/xv/glam-02/XVGlamInvitation";

export const metadata: Metadata = {
  title: "Glam Nocturna | SHER",
  description: "Plantilla de XV años Glam Nocturna de SHER.",
};

export default function GlamNocturnaPage() {
  return <SherTemplateDemo templateId="xv-02"><XVGlamInvitation event={camilaGlamDemo} /></SherTemplateDemo>;
}
