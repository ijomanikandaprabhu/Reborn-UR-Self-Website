import type { NextConfig } from "next";
import services from "./src/data/services.generated.json";

// Every address the old HTML site used, mapped to its new clean URL, so
// Google and old links carry over (permanent 308 redirects).
const pages = ["about", "contact", "gallery", ...services.map((s) => s.slug)];

const legacy: Record<string, string> = {
  "/index.html": "/",
  "/404.html": "/",
  "/appointment.html": "/contact",
  "/thank-you.html": "/contact",
  "/Molecreation.html": "/beauty-spot",
  "/Blushing.html": "/lip-blushing",
  "/blushing.html": "/lip-blushing",
  "/Blushingmale.html": "/lip-blushing-for-men",
  "/blushingmale.html": "/lip-blushing-for-men",
  "/Combination.html": "/combination-brows",
  "/combination.html": "/combination-brows",
  "/Combinationmale.html": "/combination-brows-for-men",
  "/combinationmale.html": "/combination-brows-for-men",
  "/Microblading.html": "/microblading",
  "/Microbladingmale.html": "/microblading-for-men",
  "/microbladingmale.html": "/microblading-for-men",
  "/Neutralization.html": "/lip-neutralization",
  "/neutralization.html": "/lip-neutralization",
  "/Neutralizationmale.html": "/lip-neutralization-for-men",
  "/neutralizationmale.html": "/lip-neutralization-for-men",
  "/Ombre.html": "/ombre-powder-brows",
  "/ombre.html": "/ombre-powder-brows",
  "/Ombremale.html": "/ombre-powder-brows-for-men",
  "/ombremale.html": "/ombre-powder-brows-for-men",
  // Renamed gallery photos.
  "/assets/img/WhatsApp Image 2026-02-05 at 22.58.37.jpeg": "/assets/img/gallery/client-at-studio.jpg",
  "/assets/img/WhatsApp Image 2026-02-05 at 22.58.39.jpeg": "/assets/img/gallery/certificate-presentation-1.jpg",
  "/assets/img/WhatsApp Image 2026-02-05 at 22.58.41.jpeg": "/assets/img/gallery/microblading-training-group.jpg",
  "/assets/img/WhatsApp Image 2026-02-05 at 22.58.43.jpeg": "/assets/img/gallery/certificate-presentation-2.jpg",
  "/assets/img/WhatsApp Image 2026-02-05 at 22.58.44.jpeg": "/assets/img/gallery/rebornurself-training-group.jpg",
};

const nextConfig: NextConfig = {
  turbopack: { root: import.meta.dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      ...pages.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
      ...Object.entries(legacy).map(([source, destination]) => ({
        source: source.replace(/ /g, "%20"),
        destination,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
