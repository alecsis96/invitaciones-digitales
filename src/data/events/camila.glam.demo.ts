import type { InvitationEvent } from "@/types/invitation";

export const camilaGlamDemo: InvitationEvent = {
  honoreeName: "Camila", eventLabel: "Mis XV", date: "2026-11-14T17:00:00-06:00", displayDate: "14 · 11 · 26",
  heroImage: "/images/xv-02/camila/camila-azul-01.webp", heroImageAlt: "Camila con vestido azul rey en una escena editorial nocturna",
  introText: "Hay momentos en la vida que se convierten en para siempre.",
  ceremony: { label: "Ceremonia religiosa", time: "5:00 PM", venue: "Parroquia de Santiago Apóstol", address: "Central 9, Centro, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/iqiYZ2wFWUM3teMK9?g_st=ac", image: "/images/parroquia-santiago-apostol.jpg", imageAlt: "Exterior de la Parroquia de Santiago Apóstol" },
  reception: { label: "Recepción", time: "7:00 PM", venue: "Salón Las Tejas", address: "Barranca Navil, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/bSesnj7fdbd2a6R96?g_st=ac", image: "/images/salon-las-tejas.jpg", imageAlt: "Exterior del Salón Las Tejas" },
  itinerary: [
    { time: "5:00 PM", title: "Ceremonia religiosa", image: "/images/xv-02-agenda/ceremonia-religiosa.png", imageAlt: "Iglesia iluminada durante la noche" },
    { time: "7:00 PM", title: "Recepción", image: "/images/xv-02-agenda/recepcion.png", imageAlt: "Recepción elegante con flores y velas" },
    { time: "8:00 PM", title: "Presentación", image: "/images/xv-02-agenda/presentacion.png", imageAlt: "Entrada formal iluminada para la presentación" },
    { time: "8:30 PM", title: "Vals", image: "/images/xv-02-agenda/vals.png", imageAlt: "Vals elegante bajo candelabros" },
    { time: "9:00 PM", title: "Cena", image: "/images/xv-02-agenda/cena.png", imageAlt: "Mesa formal de cena con velas" },
    { time: "10:00 PM", title: "Fiesta", image: "/images/xv-02-agenda/fiesta.png", imageAlt: "Pista de baile glam con iluminación nocturna" }
  ],
  gallery: [{ src: "/images/xv-02/camila/camila-azul-01.webp", alt: "Camila con vestido azul rey en un retrato editorial" }, { src: "/images/xv-02/camila/camila-azul-02.webp", alt: "Camila de cuerpo completo con vestido azul rey" }, { src: "/images/xv-02/camila/camila-azul-03.webp", alt: "Camila en una pose editorial con vestido azul rey" }],
  dressCode: { style: "Formal y elegante", groups: [{ label: "Ellas", description: "Vestido largo" }, { label: "Ellos", description: "Traje formal" }], suggestedColors: [{ value: "#d1a76d", label: "Champagne" }, { value: "#9a6678", label: "Mauve" }, { value: "#171518", label: "Negro" }, { value: "#0e5a4f", label: "Verde esmeralda" }], reservedColors: [{ value: "#244aa5", label: "Azul rey" }], notes: ["Evita azul rey y tonos similares."] },
  giftRegistry: { title: "Mesa de regalos", description: "Tu presencia es el regalo más especial. Si deseas tener un detalle, será recibido con cariño." },
  calendar: { title: "XV de Camila", start: "2026-11-14T19:00:00-06:00", location: "Salón Las Tejas, Barranca Navil, 29930 Yajalón, Chis." },
  music: { src: "/audio/xv01-elegancia.mp3", title: "Música de la invitación", enabled: true },
  openingExperience: { enabled: true, type: "cinematic-reveal", prompt: "Toca para descubrir", playMusicOnOpen: true, image: "/images/xv-02/camila/camila-azul-02.webp" },
  rsvp: { phone: "529191565865", message: "Hola, confirmo mi asistencia a los XV de Camila. Asistiremos ___ personas." }, closingImage: "/images/xv-02/camila/camila-azul-03.webp", closingImageAlt: "Camila en una escena de despedida"
};
