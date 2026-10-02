import type { InvitationEvent } from "@/types/invitation";

const portrait = "/images/ana-sofia-hero-clean.png";
const ceremonyImage = "/images/parroquia-santiago-apostol.jpg";
const receptionImage = "/images/salon-las-tejas.jpg";

export const anaSofiaDemo: InvitationEvent = {
  honoreeName: "Ana Sofía", eventLabel: "Mis XV años", date: "2026-11-14T17:00:00-06:00", displayDate: "14 · NOV · 2026",
  heroImage: portrait, heroImageAlt: "Retrato editorial de Ana Sofía con vestido rosa empolvado",
  introText: "Hay momentos que soñamos durante años y personas que queremos a nuestro lado cuando finalmente llegan.", family: { parents: ["Laura Méndez", "Carlos Ramírez"] },
  ceremony: { label: "Ceremonia", time: "5:00 PM", venue: "Parroquia de Santiago Apóstol", address: "Central 9, Centro, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/iqiYZ2wFWUM3teMK9?g_st=ac", image: ceremonyImage, imageAlt: "Exterior de la Parroquia de Santiago Apóstol" },
  reception: { label: "Recepción", time: "7:00 PM", venue: "Salón Las Tejas", address: "Barranca Navil, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/bSesnj7fdbd2a6R96?g_st=ac", image: receptionImage, imageAlt: "Exterior del Salón Las Tejas" },
  itinerary: [{ time: "5:00 PM", title: "Ceremonia", icon: "♧" }, { time: "7:00 PM", title: "Recepción", icon: "♜" }, { time: "8:00 PM", title: "Presentación", icon: "♕" }, { time: "8:30 PM", title: "Vals", icon: "♫" }, { time: "9:00 PM", title: "Cena", icon: "♜" }, { time: "10:00 PM", title: "Fiesta", icon: "✦" }],
  gallery: [{ src: "/images/ana-sofia-gallery-portrait.jpg", alt: "Retrato de Ana Sofía con vestido rosa" }, { src: "/images/ana-sofia-gallery-full-length.jpg", alt: "Ana Sofía de cuerpo completo con vestido de quince años" }, { src: "/images/ana-sofia-gallery-seated.jpg", alt: "Ana Sofía en una pose alternativa" }],
  dressCode: { style: "Formal", description: "Tu presencia es lo más importante para mí. Si deseas seguir un código de color, te invito a evitar el rosa.", reservedColors: [{ value: "#d9b7b0", label: "Rosa" }] },
  calendar: { title: "XV de Ana Sofía", start: "2026-11-14T19:00:00-06:00", location: "Salón Las Tejas, Barranca Navil, 29930 Yajalón, Chis." },
  giftRegistry: { description: "Tu compañía es el mejor regalo, pero si deseas tener un detalle conmigo, te comparto algunas opciones." },
  rsvp: { phone: "529191565865", message: "Hola, confirmo mi asistencia a los XV de Ana Sofía. Asistiremos ___ personas." }, closingImage: portrait, closingImageAlt: "Ana Sofía en su celebración"
};
