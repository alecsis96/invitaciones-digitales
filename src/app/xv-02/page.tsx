import type { Metadata } from "next";
import { camilaGlamDemo } from "@/data/events/camila.glam.demo";
import { XVGlamInvitation } from "@/templates/xv/glam-02/XVGlamInvitation";

export const metadata: Metadata = {
  title: "XV de Camila | Invitación Digital",
  description: "Te invitamos a celebrar los XV años de Camila.",
};

export default function GlamPage() { return <XVGlamInvitation event={camilaGlamDemo} />; }
