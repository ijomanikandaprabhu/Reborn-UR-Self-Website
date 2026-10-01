import type { MetadataRoute } from "next";
import { galleryItems, heroSlides } from "@/data/content";
import { servicePath, services } from "@/data/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Photos listed with each page so they can show up in Google Images.
  const abs = (src: string) => `${site.url}${src}`;
  const page = (path: string, priority: number, images: string[] = []) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
    ...(images.length ? { images: [...new Set(images)].map(abs) } : {}),
  });

  return [
    page("/", 1, heroSlides.map((s) => s.image)),
    ...services.map((s) => page(servicePath(s), 0.9, [s.heroImage, ...s.pairImages])),
    page("/contact", 0.8),
    page("/about", 0.7, [site.founder.image]),
    page("/gallery", 0.7, galleryItems.map((g) => g.src)),
    page("/privacy", 0.3),
  ];
}
