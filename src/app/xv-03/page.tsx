import type { Metadata } from "next";
import { raquelGardenDemo } from "@/data/events/raquel.garden.demo";
import { XVGardenInvitation } from "@/templates/xv/garden-03/XVGardenInvitation";

export const metadata: Metadata = { title: "XV de Raquel | Jardín Editorial", description: "Te invitamos a celebrar los XV años de Raquel." };
export default function GardenPage() { return <XVGardenInvitation event={raquelGardenDemo} />; }
