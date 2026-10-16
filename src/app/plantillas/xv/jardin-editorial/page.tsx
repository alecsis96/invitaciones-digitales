import type { Metadata } from "next";
import { SherTemplateDemo } from "@/components/sher/SherTemplateDemo";
import { raquelGardenDemo } from "@/data/events/raquel.garden.demo";
import { XVGardenInvitation } from "@/templates/xv/garden-03/XVGardenInvitation";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Jardín Editorial | SHER",
  description: "Plantilla de XV años Jardín Editorial de SHER.",
};

export default function JardinEditorialPage() {
  return <SherTemplateDemo templateId="xv-03"><XVGardenInvitation event={raquelGardenDemo} /></SherTemplateDemo>;
}
