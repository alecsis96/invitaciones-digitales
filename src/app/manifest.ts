import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SHER | Invitaciones digitales",
    short_name: "SHER",
    description: "Invitaciones digitales interactivas y experiencias audiovisuales personalizadas para celebraciones especiales.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F4EF",
    theme_color: "#F8F4EF",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
