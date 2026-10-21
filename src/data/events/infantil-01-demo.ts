import type { DinoEvent } from '../../templates/infantil/pequena-aventura-dino/types';
import { dinoAsset } from '../../templates/infantil/pequena-aventura-dino/types';

/** Evento ficticio con ubicación pública de ejemplo, música aprobada y sin teléfono. */
export const infantil01Demo: DinoEvent = {
  id: 'infantil-01',
  name: 'Mateo',
  age: 1,
  startAt: '2027-05-24T16:00:00-06:00',
  timeZone: 'America/Mexico_City',
  venue: 'Bosque de Chapultepec',
  address: 'Av. Paseo de la Reforma s/n, Primera Sección, Miguel Hidalgo, Ciudad de México.',
  mapsUrl: 'https://www.google.com/maps/search/Bosque%20de%20Chapultepec%2C%20Ciudad%20de%20M%C3%A9xico%2C%2011590%2C%20M%C3%A9xico',
  mapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Bosque%20de%20Chapultepec%2C%20Ciudad%20de%20M%C3%A9xico&destination_place_id=ChIJP1dJRVf_0YURr8MZosHl4kI',
  isDemo: true,
  music: { src: '/audio/infantil-01/my-little-dino-adventure.mp3', title: 'My Little Dino Adventure' },
  heroPhotoCutout: dinoAsset('photos/baby-hero-cutout-v121.webp'),
  heroPhotoOriginal: dinoAsset('photos/baby-hero-original.webp'),
  heroPhotoAlt: 'Mateo, sonriente y sentado',
  galleryPhotos: [
    { src: dinoAsset('photos/baby-portrait.webp'), alt: 'Mateo sonríe a la cámara', caption: 'Una sonrisa llena de aventuras' },
    { src: dinoAsset('photos/baby-playing.webp'), alt: 'Mateo juega con bloques de madera', caption: 'Cada día, un descubrimiento' },
    { src: dinoAsset('photos/baby-birthday.webp'), alt: 'Mateo junto a su pastel de primer cumpleaños', caption: 'Un añito de momentos especiales' },
  ],
};
