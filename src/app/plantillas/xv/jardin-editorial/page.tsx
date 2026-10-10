import type { Metadata } from "next";
import { raquelGardenDemo } from "@/data/events/raquel.garden.demo";
import { XVGardenInvitation } from "@/templates/xv/garden-03/XVGardenInvitation";

export const metadata: Metadata = {
  title: "Jardín Editorial | SHER",
  description: "Plantilla de XV años Jardín Editorial de SHER.",
};

export default function JardinEditorialPage() {
  return <XVGardenInvitation event={raquelGardenDemo} />;
}
