export type SherExperience = {
  id: "clip" | "historia" | "protagonista";
  name: string;
  description: string;
  poster: string;
  posterAlt: string;
  video?: string;
};

export const sherExperiences: readonly SherExperience[] = [
  {
    id: "clip",
    name: "Clip",
    description: "Una pieza breve para anunciar tu celebración.",
    poster: "/images/sher/experiences/sher-experience-clip.webp",
    posterAlt: "Captura de la experiencia audiovisual Clip de SHER",
  },
  {
    id: "historia",
    name: "Historia",
    description: "Tu momento contado como una pequeña historia visual.",
    poster: "/images/sher/experiences/sher-experience-historia.webp",
    posterAlt: "Captura de la experiencia audiovisual Historia de SHER",
  },
  {
    id: "protagonista",
    name: "Protagonista",
    description: "Una experiencia creada alrededor de quien celebra.",
    poster: "/images/sher/experiences/sher-experience-protagonista.webp",
    posterAlt: "Captura de la experiencia audiovisual Protagonista de SHER",
  },
] as const;

export const invitationIncludes = [
  {
    id: "countdown",
    title: "Fecha y cuenta regresiva",
    description: "La emoción empieza antes del evento.",
  },
  {
    id: "maps",
    title: "Ubicación y Maps",
    description: "Llega y comparte la ubicación fácilmente.",
  },
  {
    id: "calendar",
    title: "Calendario",
    description: "Guarda la fecha de tu celebración.",
  },
  {
    id: "gallery",
    title: "Galería y detalles",
    description: "Todo lo importante en un solo lugar.",
  },
  {
    id: "dress-code",
    title: "Vestimenta y regalos",
    description: "Cuando aplique a tu celebración.",
  },
  {
    id: "music-whatsapp",
    title: "Música y WhatsApp",
    description: "Música opcional y contacto según la plantilla.",
  },
] as const;

export const sherProcessSteps = [
  {
    id: "choose-template",
    title: "Elige tu plantilla",
    description: "Encuentra la base para tu celebración.",
  },
  {
    id: "send-details",
    title: "Envíanos tus datos y materiales",
    description: "Comparte la información que dará vida a tu invitación.",
  },
  {
    id: "review-proposal",
    title: "Recibe y revisa tu propuesta",
    description: "Conoce cómo tomará forma tu experiencia.",
  },
  {
    id: "receive-link",
    title: "Obtén tu enlace final",
    description: "Comparte tu celebración desde el primer momento.",
  },
] as const;

export const sherPricing = {
  interactive: {
    name: "Interactiva",
    price: "$349 MXN",
  },
  cinematic: {
    name: "SHER Cinemática",
    price: "$449 MXN",
    description: "Invitación interactiva + teaser cinematográfico personalizado de hasta 8 segundos",
    secondaryDescription: "Una forma de emocionar antes del evento y acompañar el enlace de tu invitación",
    upgrade: "+$100 respecto a Interactiva",
    message: "Hola, me interesa SHER Cinemática de $449 MXN: invitación interactiva + teaser fantástico y personalizado con IA de hasta 8 segundos, para compartir por separado. ¿Cómo puedo solicitarla?",
  },
  custom: {
    name: "SHER A Medida",
    price: "Cotización",
    description: "Historias audiovisuales, conceptos especiales y producciones personalizadas bajo cotización",
    message: "Hola, quiero cotizar un proyecto SHER A Medida: una historia audiovisual, escenas o un proyecto especial. ¿Qué información necesitan para preparar la cotización?",
  },
  flyer: { name: "Flyer digital opcional", price: "+$50 MXN" },
} as const;

export type SherFaqItem = {
  id: string;
  question: string;
  answer: string;
  published: boolean;
};

export const sherFaqs: readonly SherFaqItem[] = [
  {
    id: "pedido",
    question: "¿Cómo puedo hacer mi pedido?",
    answer: "Elige tu plantilla o experiencia y escríbenos por WhatsApp. Te indicaremos los materiales necesarios para comenzar.",
    published: true,
  },
  {
    id: "personalizacion",
    question: "¿Qué puedo personalizar?",
    answer: "Nombres, fecha, textos, fotografías y otras opciones disponibles según la plantilla. Los cambios fuera de su estructura se cotizan según complejidad.",
    published: true,
  },
  {
    id: "entrega",
    question: "¿Cuánto tarda la entrega?",
    answer: "El plazo estándar es de 48 horas desde que recibimos los materiales y la información completos y confirmamos el anticipo del 50 %. Las revisiones y los proyectos especiales pueden requerir más tiempo.",
    published: true,
  },
  {
    id: "cambios",
    question: "¿Cuántos cambios puedo solicitar?",
    answer: "La invitación interactiva incluye hasta 5 ajustes. Cinemática incluye 2 revisiones del teaser sobre el concepto previamente aprobado: edición, textos, música o montaje, según el material disponible. No incluye dos regeneraciones completas ni cambios sustanciales de concepto, protagonista o escenario; esos cambios se cotizan aparte.",
    published: true,
  },
  {
    id: "pago",
    question: "¿Cómo puedo pagar?",
    answer: "Aceptamos transferencia bancaria y efectivo. Se solicita el 50 % de anticipo y el resto antes de la entrega final.",
    published: true,
  },
  {
    id: "vigencia",
    question: "¿Cuánto tiempo estará activa mi invitación?",
    answer: "El enlace permanecerá activo durante 12 meses después de la fecha del evento. Esta condición deberá validarse técnicamente antes de su publicación definitiva.",
    published: false,
  },
  {
    id: "tematicas",
    question: "¿Puedo solicitar personajes o temáticas especiales?",
    answer: "Trabajamos con distintas temáticas y personajes originales. Las solicitudes de personajes o materiales de terceros requieren revisión de derechos y viabilidad.",
    published: true,
  },
] as const;
