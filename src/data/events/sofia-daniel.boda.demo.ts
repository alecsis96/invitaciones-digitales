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
  gallery: [
    { src: "/images/boda-01/sofia-daniel/gallery-walking.webp", alt: "Sofía y Daniel caminando juntos en un jardín toscano", orientation: "portrait", objectPosition: "center" },
    { src: "/images/boda-01/sofia-daniel/gallery-detail.webp", alt: "Detalle de las manos de Sofía y Daniel junto al ramo de boda", orientation: "portrait", objectPosition: "center" },
    { src: "/images/boda-01/sofia-daniel/gallery-embrace.webp", alt: "Sofía y Daniel abrazados al atardecer", orientation: "portrait", objectPosition: "center" },
  ],
  dressCode: {
    botanical: { src: "/images/boda-01/sofia-daniel/rama_de_olivo_en_acuarela.webp", width: 1448, height: 1086 },
    style: "Formal de tarde",
    description: "Nos encantará celebrar contigo en tonos suaves y una elegancia relajada.",
    suggestedColors: [
      { value: "#7b8066", label: "Oliva suave" },
      { value: "#b89b72", label: "Champagne" },
      { value: "#c7b29a", label: "Arena" },
      { value: "#b8897d", label: "Terracota suave" },
    ],
    restrictedColors: [
      { value: "#f8f3e9", label: "Marfil" },
      { value: "#ffffff", label: "Blanco" },
    ],
    examples: [
      { label: "Para ellas", description: "Vestido largo o midi en tonos cálidos.", image: "/images/boda-01/sofia-daniel/elegancia_mediterrA1nea_al_atardecer.webp", imageAlt: "Invitada con vestido largo verde oliva y sandalias" },
      { label: "Para ellos", description: "Traje ligero en lino o tonos tierra.", image: "/images/boda-01/sofia-daniel/elegancia_mediterrA1nea_en_traje_de_lino.webp", imageAlt: "Invitado con traje de lino en tono tierra" },
    ],
  },
  giftRegistry: {
    demoMode: true,
    title: "Tu compañía es nuestro mejor regalo",
    description: "Lo más especial será compartir este día contigo. Si deseas obsequiarnos un detalle, lo recibiremos con todo nuestro cariño.",
    image: "/images/boda-01/sofia-daniel/regalo_nupcial_con_lazo_champagne_y_flores.webp",
    imageAlt: "",
  },
  rsvp: {
    title: "Nos encantaría compartir este día contigo",
    description: "Cada lugar en nuestra mesa guarda una historia especial. Será una alegría saber que estarás con nosotros.",
    phone: "529191565865",
    message: "Hola, confirmo mi asistencia a la boda de Sofía y Daniel.",
  },
  closing: {
    title: "Gracias por acompañarnos",
    message: "Nuestro para siempre será aún más bonito con ustedes cerca.",
    image: "/images/boda-01/sofia-daniel/terraza_toscana_al_atardecer.webp",
    imageAlt: "",
    objectPosition: "56% center",
  },
};
