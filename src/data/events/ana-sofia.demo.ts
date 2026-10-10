import type { InvitationEvent } from "@/types/invitation";

const heroPortrait = "/images/xv-01/ana/ana-sofia-03.webp";
const closingPortrait = "/images/xv-01/ana/ana-sofia-04.webp";
const ceremonyImage = "/images/parroquia-santiago-apostol.jpg";
const receptionImage = "/images/salon-las-tejas.jpg";

export const anaSofiaDemo: InvitationEvent = {
  honoreeName: "Ana Sofía", eventLabel: "Mis XV años", date: "2026-11-14T17:00:00-06:00", displayDate: "14 · NOV · 2026",
  heroImage: heroPortrait, heroImageAlt: "Retrato editorial de Ana Sofía con vestido rosa empolvado",
  introText: "Hay momentos que soñamos durante años y personas que queremos a nuestro lado cuando finalmente llegan.", family: { parents: ["Laura Méndez", "Carlos Ramírez"] },
  ceremony: { label: "Ceremonia religiosa", time: "5:00 PM", venue: "Parroquia de Santiago Apóstol", address: "Central 9, Centro, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/iqiYZ2wFWUM3teMK9?g_st=ac", image: ceremonyImage, imageAlt: "Exterior de la Parroquia de Santiago Apóstol" },
  reception: { label: "Recepción", time: "7:00 PM", venue: "Salón Las Tejas", address: "Barranca Navil, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/bSesnj7fdbd2a6R96?g_st=ac", image: receptionImage, imageAlt: "Exterior del Salón Las Tejas" },
  itinerary: [{ time: "5:00 PM", title: "Ceremonia religiosa", icon: "♧" }, { time: "7:00 PM", title: "Recepción", icon: "♜" }, { time: "8:00 PM", title: "Presentación", icon: "♕" }, { time: "8:30 PM", title: "Vals", icon: "♫" }, { time: "9:00 PM", title: "Cena", icon: "♜" }, { time: "10:00 PM", title: "Fiesta", icon: "✦" }],
  gallery: [{ src: "/images/xv-01/ana/ana-sofia-01.webp", alt: "Retrato de Ana Sofía con vestido rosa" }, { src: "/images/xv-01/ana/ana-sofia-02.webp", alt: "Ana Sofía de cuerpo completo con vestido de quince años" }, { src: "/images/xv-01/ana/ana-sofia-04.webp", alt: "Ana Sofía en una pose alternativa" }],
  dressCode: { style: "Formal", description: "Tu presencia es lo más importante para mí. Si deseas seguir un código de color, te invito a evitar el rosa.", reservedColors: [{ value: "#d9b7b0", label: "Rosa" }] },
  calendar: { title: "XV de Ana Sofía", start: "2026-11-14T19:00:00-06:00", location: "Salón Las Tejas, Barranca Navil, 29930 Yajalón, Chis." },
  music: { src: "/audio/xv01-elegancia.mp3", title: "Música de la invitación", enabled: true },
  openingExperience: { enabled: true, type: "envelope", monogram: "AS", eyebrow: "Mis XV años", prompt: "Toca para abrir", skipLabel: "Omitir", playMusicOnOpen: true },
  giftRegistry: { description: "Tu compañía es el mejor regalo, pero si deseas tener un detalle conmigo, te comparto algunas opciones." },
  rsvp: { phone: "529191565865", message: "Hola, confirmo mi asistencia a los XV de Ana Sofía. Asistiremos ___ personas." }, closingImage: closingPortrait, closingImageAlt: "Ana Sofía en su celebración"
};
