export type EventLocation = { label: string; time: string; venue: string; address: string; mapUrl: string; image?: string; imageAlt?: string };
export type TimelineItem = { time: string; title: string; icon?: string };
export type GalleryPhoto = { src: string; alt: string };
export type DressCode = { title: string; description: string; reservedColors?: string[]; image?: string };
export type GiftRegistry = { title?: string; description?: string; url?: string; buttonLabel?: string };

export type InvitationEvent = {
  honoreeName: string; eventLabel: string; date: string; displayDate: string; heroImage?: string; heroImageAlt?: string;
  introText: string; parents?: string[]; ceremony?: EventLocation; reception?: EventLocation; itinerary?: TimelineItem[];
  gallery?: GalleryPhoto[]; dressCode?: DressCode; giftRegistry?: GiftRegistry; rsvp: { phone: string; message: string }; closingImage?: string; closingImageAlt?: string;
};
