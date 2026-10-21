/** Contrato propio de INFANTIL-01. No extender InvitationEvent por obligación. */
export type DinoGalleryPhoto = {
  src: string;
  alt: string;
  caption?: string;
  /** El recorte respeta fotografías verticales, horizontales y cuadradas. */
  objectPosition?: string;
};

export type DinoEvent = {
  id: string;
  name: string;
  age: number;
  /** ISO 8601 incluyendo Z u offset explícito, por ejemplo 2027-05-24T16:00:00-06:00. */
  startAt: string;
  /** IANA para mostrar hora local; si es inválida se usa la zona del timestamp. */
  timeZone?: string;
  endAt?: string;
  venue: string;
  address?: string;
  mapsUrl?: string;
  /** @deprecated Dónde V2 no incrusta mapas; se ignora para conservar compatibilidad con datos previos. */
  mapsEmbedUrl?: string;
  /** Enlace de indicaciones del mismo destino; sin origen ni geolocalización automática. */
  mapsDirectionsUrl?: string;
  rsvpPhone?: string;
  rsvpMessage?: string;
  heroPhotoCutout?: string;
  heroPhotoOriginal?: string;
  heroPhotoAlt?: string;
  /** Si el cliente carece de fotografías, la composición usa Dino en solitario. */
  galleryPhotos?: DinoGalleryPhoto[];
  /** Música opcional; utilizar únicamente recursos con autorización o licencia aprobada. */
  music?: { src: string; title: string };
  /** Permite distinguir texto ficticio y enlaces deshabilitados en una demo. */
  isDemo?: boolean;
};

export const DINO_ASSET_ROOT = '/images/infantil-01';
export const dinoAsset = (part: string): string => `${DINO_ASSET_ROOT}/${part}`;
