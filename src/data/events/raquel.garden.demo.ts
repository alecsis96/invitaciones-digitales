import type { InvitationEvent } from "@/types/invitation";

const images = {
  first: "/images/xv-03/raquel/raquel-verde-01.webp",
  second: "/images/xv-03/raquel/raquel-verde-02.webp",
  hero: "/images/xv-03/raquel/raquel-verde-03.webp",
  portrait: "/images/xv-03/raquel/raquel-verde-04.webp"
};

export const raquelGardenDemo: InvitationEvent = {
  honoreeName: "Raquel", eventLabel: "Mis XV", date: "2026-11-14T17:00:00-06:00", displayDate: "14 · NOV · 2026",
  heroImage: images.hero, heroImageAlt: "Raquel con vestido verde esmeralda en un jardín editorial",
  introText: "Hay momentos en la vida que se vuelven inolvidables por las personas que los comparten. Me encantaría que formes parte de este día tan especial.",
  inspiration: { text: "Encomienda al Señor tu camino, confía en Él, y Él hará.", reference: "Salmo 37:5" },
  gardenPhotos: { first: images.first, second: images.second, portrait: images.portrait },
  family: { parents: ["Carlos Martínez", "Lucía Hernández"], godparents: [{ names: ["Javier Rodríguez", "Mariana López"] }] },
  ceremony: { label: "Ceremonia religiosa", time: "5:00 PM", venue: "Parroquia de Santiago Apóstol", address: "Central 9, Centro, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/iqiYZ2wFWUM3teMK9?g_st=ac", image: "/images/parroquia-santiago-apostol.jpg", imageAlt: "Exterior de la Parroquia de Santiago Apóstol" },
  reception: { label: "Recepción", time: "6:30 PM", venue: "Salón Las Tejas", address: "Barranca Navil, 29930 Yajalón, Chis.", mapUrl: "https://maps.app.goo.gl/bSesnj7fdbd2a6R96?g_st=ac", image: "/images/salon-las-tejas.jpg", imageAlt: "Exterior del Salón Las Tejas" },
  itinerary: [{ time: "5:00 PM", title: "Ceremonia religiosa" }, { time: "6:30 PM", title: "Recepción" }, { time: "7:00 PM", title: "Cena" }, { time: "8:00 PM", title: "Vals" }, { time: "9:00 PM", title: "Baile" }, { time: "11:00 PM", title: "Fin del evento" }],
  dressCode: { style: "Formal", groups: [{ label: "Ellas", description: "Vestido largo o cocktail formal" }, { label: "Ellos", description: "Traje formal" }], suggestedColors: [{ value: "#dfb6b0", label: "Rosa pétalo" }, { value: "#d6bd89", label: "Champagne" }, { value: "#b89663", label: "Dorado suave" }, { value: "#b9aa8a", label: "Tonos naturales" }], reservedColors: [{ value: "#075542", label: "Verde esmeralda" }], notes: ["El verde esmeralda y tonos similares están reservados para la quinceañera."] },
  giftRegistry: { title: "Un detalle especial", description: "Tu presencia es el regalo más especial. Si deseas tener un detalle, habrá mesa de regalos y lluvia de sobres durante la recepción." },
  calendar: { title: "XV de Raquel", start: "2026-11-14T18:30:00-06:00", location: "Salón Las Tejas, Barranca Navil, 29930 Yajalón, Chis." },
  music: { src: "/audio/xv01-elegancia.mp3", title: "Música de la invitación", enabled: true },
  openingExperience: { enabled: true, type: "garden", monogram: "R", eyebrow: "Mis XV", prompt: "Descubre este día especial", playMusicOnOpen: true, image: images.first },
  rsvp: { phone: "529191565865", message: "Hola, confirmo mi asistencia a los XV de Raquel." }
};
