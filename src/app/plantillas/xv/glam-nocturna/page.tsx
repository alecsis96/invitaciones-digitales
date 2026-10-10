import type { Metadata } from "next";
import { camilaGlamDemo } from "@/data/events/camila.glam.demo";
import { XVGlamInvitation } from "@/templates/xv/glam-02/XVGlamInvitation";

export const metadata: Metadata = {
  title: "Glam Nocturna | SHER",
  description: "Plantilla de XV años Glam Nocturna de SHER.",
};

export default function GlamNocturnaPage() {
  return <XVGlamInvitation event={camilaGlamDemo} />;
}
