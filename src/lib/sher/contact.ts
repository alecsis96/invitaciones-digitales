import { buildWhatsAppUrl } from "@/lib/invitation/rsvp";

const configuredPhone = process.env.NEXT_PUBLIC_SHER_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

export const sherWhatsAppMessage = "Hola, me interesa una invitación digital de SHER. ¿Me pueden ayudar a elegir una plantilla o experiencia?";

export function buildSherWhatsAppHref(message: string) {
  return configuredPhone.length >= 8
    ? buildWhatsAppUrl(configuredPhone, message)
    : undefined;
}

export const sherWhatsAppHref = buildSherWhatsAppHref(sherWhatsAppMessage);
