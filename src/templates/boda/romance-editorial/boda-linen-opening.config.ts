export type BodaLinenOpeningConfig = {
  enabled: boolean;
  sessionKey: string;
  durationMs: number;
  eyebrow: string;
  prompt: string;
  envelopeLabel: string;
};

// Presentation/session settings deliberately do not belong to client event data.
export const bodaLinenOpeningConfig: BodaLinenOpeningConfig = {
  enabled: true,
  sessionKey: "boda-01:linen-opening:v1",
  durationMs: 2800,
  eyebrow: "Romance Editorial",
  prompt: "Toca el sobre para abrir",
  envelopeLabel: "Abrir el sobre y descubrir la invitación",
};
