export const invitationCatalog = [
  {
    id: "xv-01",
    slug: "elegancia-contemporanea",
    category: "xv",
    name: "Elegancia Contemporánea",
    description: "Una propuesta cálida y atemporal con detalles suaves y una narrativa elegante.",
    cover: "/images/xv-01/ana/ana-sofia-03.webp",
    coverAlt: "Ana Sofía con vestido rosa en un entorno editorial al atardecer",
    route: "/plantillas/xv/elegancia-contemporanea",
    available: true,
  },
  {
    id: "xv-02",
    slug: "glam-nocturna",
    category: "xv",
    name: "Glam Nocturna",
    description: "Una experiencia nocturna y cinematográfica con contraste profundo y energía glam.",
    cover: "/images/xv-02/camila/camila-azul-01.webp",
    coverAlt: "Camila con vestido azul en una escena nocturna elegante",
    route: "/plantillas/xv/glam-nocturna",
    available: true,
  },
  {
    id: "xv-03",
    slug: "jardin-editorial",
    category: "xv",
    name: "Jardín Editorial",
    description: "Un recorrido editorial entre jardines, texturas orgánicas y una celebración luminosa.",
    cover: "/images/xv-03/raquel/raquel-verde-03.webp",
    coverAlt: "Raquel con vestido verde esmeralda en un jardín editorial",
    route: "/plantillas/xv/jardin-editorial",
    available: true,
  },
] as const;

export const catalogCategories = [
  {
    id: "xv",
    label: "XV años",
    available: true,
    cover: "/images/xv-01/ana/ana-sofia-02.webp",
    coverAlt: "Ana Sofía con vestido rosa en una escalera al atardecer",
  },
  { id: "infantiles", label: "Infantiles", available: false },
  { id: "bodas", label: "Bodas", available: false },
] as const;
