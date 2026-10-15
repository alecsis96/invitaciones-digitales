import type { BodaRomanceEditorialData } from "@/templates/boda/romance-editorial/types";

export const sofiaDanielBodaDemo: BodaRomanceEditorialData = {
  couple: { firstName: "Sofía", secondName: "Daniel" },
  eventLabel: "Nuestra boda",
  date: "2026-11-14T17:00:00-06:00",
  displayDate: "14 · 11 · 2026",
  hero: {
    src: "/images/boda-01/sofia-daniel/sofia-daniel-hero.jpg",
    alt: "Sofía y Daniel en un jardín italiano al atardecer el día de su boda",
  },
  opening: {
    message: "Será un honor celebrar contigo.",
    countdownLabel: "Falta muy poco",
  },
  story: {
    title: "Un amor que eligió quedarse",
    body: "Todo comenzó con una conversación sin prisa y la certeza de que los mejores días se construyen juntos. Hoy celebramos el camino que nos trajo hasta aquí.",
    image: "/images/boda-01/sofia-daniel/sofia-daniel-story.jpg",
    imageAlt: "Sofía y Daniel caminando juntos entre olivos al atardecer",
  },
  locations: {
    ceremony: {
      label: "Ceremonia",
      time: "17:00 h",
      venue: "Parroquia de Santiago Apóstol",
      address: "Central 9, Centro, 29930 Yajalón, Chiapas.",
      mapUrl: "https://maps.app.goo.gl/iqiYZ2wFWUM3teMK9?g_st=ac",
    },
    reception: {
      label: "Recepción",
      time: "19:00 h",
      venue: "Salón Las Tejas",
      address: "Barranca Navil, 29930 Yajalón, Chiapas.",
      mapUrl: "https://maps.app.goo.gl/bSesnj7fdbd2a6R96?g_st=ac",
    },
  },
  itinerary: [
    { time: "17:00 h", title: "Ceremonia", icon: "ceremony" },
    { time: "18:00 h", title: "Cóctel", icon: "cocktail" },
    { time: "19:00 h", title: "Recepción", icon: "reception" },
    { time: "20:30 h", title: "Cena", icon: "dinner" },
    { time: "22:00 h", title: "Primer baile", icon: "dance" },
  ],
  rsvp: {
    phone: "529191565865",
    message: "Hola, confirmo mi asistencia a la boda de Sofía y Daniel.",
  },
};
