import type { EventMusic, GalleryPhoto, GiftRegistry, TimelineItem } from "@/types/invitation";

export type BodaColor = {
  value: string;
  label: string;
};

export type BodaDressExample = {
  label: string;
  description?: string;
  image?: string;
  imageAlt?: string;
};

export type BodaGalleryPhoto = GalleryPhoto & {
  orientation?: "portrait" | "landscape" | "square";
  objectPosition?: string;
};

export type BodaLocation = {
  label: string;
  time: string;
  venue: string;
  address?: string;
  mapUrl?: string;
  image?: string;
  imageAlt?: string;
};

export type BodaRomanceEditorialData = {
  couple: { firstName: string; secondName: string };
  eventLabel: string;
  date: string;
  displayDate: string;
  hero: { src: string; alt: string };
  opening?: { message?: string; countdownLabel?: string };
  story?: { title: string; body: string; image?: string; imageAlt?: string };
  locations?: { ceremony?: BodaLocation; reception?: BodaLocation };
  itinerary?: TimelineItem[];
  gallery?: BodaGalleryPhoto[];
  dressCode?: {
    style?: string;
    description?: string;
    suggestedColors?: BodaColor[];
    restrictedColors?: BodaColor[];
    examples?: BodaDressExample[];
  };
  giftRegistry?: GiftRegistry;
  music?: EventMusic;
  rsvp?: { phone: string; message: string };
  closing?: { message?: string; image?: string; imageAlt?: string };
};
