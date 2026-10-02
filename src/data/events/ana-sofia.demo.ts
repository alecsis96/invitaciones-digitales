import type { InvitationEvent } from "@/types/invitation";

const portrait = "/images/ana-sofia-hero-clean.png";

export const anaSofiaDemo: InvitationEvent = {
  honoreeName: "Ana Sofía", eventLabel: "Mis XV años", date: "2026-11-14T17:00:00-06:00", displayDate: "14 · NOV · 2026",
  heroImage: portrait, heroImageAlt: "Retrato editorial de Ana Sofía con vestido rosa empolvado",
  introText: "Hay momentos que soñamos durante años y personas que queremos a nuestro lado cuando finalmente llegan.", parents: ["Laura Méndez", "Carlos Ramírez"],
  ceremony: { label: "Ceremonia", time: "5:00 PM", venue: "Parroquia de Santiago Apóstol", address: "Av. de la Paz 123, Col. Jardines, Monterrey, N.L.", mapUrl: "https://maps.app.goo.gl/iqiYZ2wFWUM3teMK9?g_st=ac", image: portrait, imageAlt: "Fachada de la parroquia" },
  reception: { label: "Recepción", time: "7:00 PM", venue: "Salón Las Tejas", address: "Blvd. del Valle 456, Monterrey, N.L.", mapUrl: "https://maps.app.goo.gl/bSesnj7fdbd2a6R96?g_st=ac", image: portrait, imageAlt: "Salón de recepción decorado" },
  itinerary: [{ time: "5:00 PM", title: "Ceremonia", icon: "♧" }, { time: "7:00 PM", title: "Recepción", icon: "♜" }, { time: "8:00 PM", title: "Presentación", icon: "♕" }, { time: "8:30 PM", title: "Vals", icon: "♫" }, { time: "9:00 PM", title: "Cena", icon: "♜" }, { time: "10:00 PM", title: "Fiesta", icon: "✦" }],
  gallery: [{ src: portrait, alt: "Ana Sofía sonriendo" }, { src: portrait, alt: "Detalle del vestido" }, { src: portrait, alt: "Ramo en tonos rosados" }, { src: portrait, alt: "Retrato de Ana Sofía" }],
  dressCode: { title: "Formal", description: "Tu presencia es lo más importante para mí. Si deseas seguir un código de color, te invito a evitar el rosa.", reservedColors: ["#d9b7b0"] },
  gifts: { text: "Tu compañía es el mejor regalo, pero si deseas tener un detalle conmigo, te comparto algunas opciones.", url: "https://example.com/mesa-de-regalos", label: "Ver mesa de regalos" },
  rsvp: { phone: "529191565865", message: "Hola, confirmo mi asistencia a los XV de Ana Sofía. Asistiremos ___ personas." }, closingImage: portrait, closingImageAlt: "Ana Sofía en su celebración"
};
