import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Lets visitors add the studio to their phone's home screen with our icon and colours. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rebornurself Permanent Makeup Studio",
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#9a563a",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
