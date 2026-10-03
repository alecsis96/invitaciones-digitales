export type EventLocation = { label: string; time: string; venue: string; address: string; mapUrl: string; image?: string; imageAlt?: string };
export type TimelineItem = { time: string; title: string; icon?: string; image?: string; imageAlt?: string };
export type GalleryPhoto = { src: string; alt: string };
export type DressCodeGroup = { label?: string; description?: string };
export type ReservedColor = string | { value: string; label?: string };
export type DressCode = { style?: string; description?: string; groups?: DressCodeGroup[]; suggestedColors?: ReservedColor[]; reservedColors?: ReservedColor[]; notes?: string[]; image?: string };
export type GiftRegistry = { title?: string; description?: string; url?: string; buttonLabel?: string };
export type EventMusic = { src: string; title?: string; enabled?: boolean };
export type EventCalendar = { title: string; start: string; end?: string; location?: string; description?: string };
export type EventFamily = { parents?: string[]; godparents?: Array<{ role?: string; names: string[] }> };
export type OpeningExperience = { enabled: boolean; type: "envelope" | "cinematic-reveal"; monogram?: string; eyebrow?: string; prompt?: string; skipLabel?: string; playMusicOnOpen?: boolean };

export type InvitationEvent = {
  honoreeName: string; eventLabel: string; date: string; displayDate: string; heroImage?: string; heroImageAlt?: string;
  introText: string; parents?: string[]; family?: EventFamily; ceremony?: EventLocation; reception?: EventLocation; itinerary?: TimelineItem[];
  gallery?: GalleryPhoto[]; dressCode?: DressCode; giftRegistry?: GiftRegistry; music?: EventMusic; calendar?: EventCalendar; openingExperience?: OpeningExperience; rsvp: { phone: string; message: string }; closingImage?: string; closingImageAlt?: string;
};
