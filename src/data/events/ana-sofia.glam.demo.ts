import type { InvitationEvent } from "@/types/invitation";

export const anaSofiaGlamDemo: InvitationEvent = {
  honoreeName: "Ana Sofía", eventLabel: "Mis XV", date: "2026-11-14T17:00:00-06:00", displayDate: "14 · 11 · 26",
  heroImage: "/images/ana-sofia-gallery-full-length.jpg", heroImageAlt: "Ana Sofía con vestido rosa en una escena editorial",
  introText: "Hay momentos en la vida que se convierten en para siempre.",
  ceremony: { label: "Ceremonia religiosa", time: "5:00 PM", venue: "Parroquia de Santiago Apóstol", address: "Central 9, Centro, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/iqiYZ2wFWUM3teMK9?g_st=ac", image: "/images/parroquia-santiago-apostol.jpg", imageAlt: "Exterior de la Parroquia de Santiago Apóstol" },
  reception: { label: "Recepción", time: "7:00 PM", venue: "Salón Las Tejas", address: "Barranca Navil, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/bSesnj7fdbd2a6R96?g_st=ac", image: "/images/salon-las-tejas.jpg", imageAlt: "Exterior del Salón Las Tejas" },
  itinerary: [{ time: "5:00 PM", title: "Ceremonia religiosa" }, { time: "7:00 PM", title: "Recepción" }, { time: "8:00 PM", title: "Presentación" }, { time: "8:30 PM", title: "Vals" }, { time: "9:00 PM", title: "Cena" }, { time: "10:00 PM", title: "Fiesta" }],
  gallery: [{ src: "/images/ana-sofia-gallery-portrait.jpg", alt: "Retrato de Ana Sofía" }, { src: "/images/ana-sofia-gallery-full-length.jpg", alt: "Ana Sofía de cuerpo completo" }, { src: "/images/ana-sofia-gallery-seated.jpg", alt: "Ana Sofía en pose editorial" }],
  dressCode: { style: "Formal y elegante", groups: [{ label: "Ellas", description: "Vestido largo" }, { label: "Ellos", description: "Traje formal" }], suggestedColors: [{ value: "#10182d", label: "Navy" }, { value: "#d1a76d", label: "Champagne" }, { value: "#9a6678", label: "Mauve" }, { value: "#171518", label: "Negro" }], reservedColors: [{ value: "#d9b7b0", label: "Rosa" }] },
  giftRegistry: { title: "Mesa de regalos", description: "Tu presencia es el regalo más especial. Si deseas tener un detalle, será recibido con cariño." },
  calendar: { title: "XV de Ana Sofía", start: "2026-11-14T19:00:00-06:00", location: "Salón Las Tejas, Barranca Navil, 29930 Yajalón, Chis." },
  music: { src: "/audio/xv01-elegancia.mp3", title: "Música de la invitación", enabled: true },
  openingExperience: { enabled: true, type: "cinematic-reveal", prompt: "Toca para descubrir", playMusicOnOpen: true },
  rsvp: { phone: "529191565865", message: "Hola, confirmo mi asistencia a los XV de Ana Sofía. Asistiremos ___ personas." }, closingImage: "/images/ana-sofia-gallery-seated.jpg", closingImageAlt: "Ana Sofía en una escena de despedida"
};
